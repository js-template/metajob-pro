"use client"

import React, { useEffect, useState } from "react"
import { Box, IconButton, Typography, useTheme, Modal, Stack, TextField, CircularProgress } from "@mui/material"
import CIcon from "../../components/common/icon"
import { useForm } from "react-hook-form"
import { createEntry, find } from "../../lib/strapi"
import toast from "react-hot-toast"
import { LoadingButton } from "@mui/lab"
import { IJobApplyData } from "./types"
import { useSession } from "next-auth/react"

type Props = {
   open: boolean
   handleClose: () => void
   title?: string
   modalData: IJobApplyData
}

export const MessageModal = ({ open, handleClose, title, modalData }: Props) => {
   const theme = useTheme()

   // session data destructuring
   const { data: session } = useSession()
   const { user } = session || {}
   const { id: userId } = user || {}

   const [loading, setLoading] = useState(false)
   const [messageIdentifier, setMessageIdentifier] = useState(false)

   const { owner, job } = modalData || {}
   const { documentId: candidateDocId, id: candidateId } = owner || {}
   const { documentId: jobDocId } = job || {}

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         message: ""
      }
   })

   const [sessionData, setSessionData] = useState<{ documentId: string }[]>([])
   const [sessionLoading, setSessionLoading] = useState(false)
   const [isMute, setIsMute] = useState(false)

   const isMessaged = sessionData?.length > 0 || messageIdentifier
   const messageListData = sessionData?.[0]

   const handleMute = () => {
      setIsMute(!isMute)
   }

   //  fetch chat session data
   useEffect(() => {
      const getSessionData = async () => {
         setSessionLoading(true)
         const { data: sessionDataAll, error: sessionError } = await find(
            "api/metajob-backend/chats",
            {
               populate: "*",
               filters: {
                  sender: {
                     id: {
                        $eq: userId || undefined
                     }
                  },
                  receiver: {
                     documentId: {
                        $eq: candidateDocId || undefined
                     }
                  },
                  job: {
                     documentId: {
                        $eq: jobDocId || undefined
                     }
                  }
               }
            },
            "no-store"
         )
         if (!sessionError) {
            setSessionData(sessionDataAll?.data)
            setSessionLoading(false)
         } else {
            setSessionData([])
            setSessionLoading(false)
         }
      }
      if (userId) {
         if (!userId) return
         getSessionData()
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [userId, candidateDocId, jobDocId, isMute])

   // *** message send function handler ***
   const onSubmit = async (data: any) => {
      try {
         if (sessionLoading) {
            return toast.error("Please wait for the data load")
         }
         setLoading(true)
         // if already message session
         if (isMessaged) {
            const messageInputOld = {
               data: {
                  message: data?.message,
                  sender: [
                     {
                        id: userId
                     }
                  ],
                  receiver: [
                     {
                        id: candidateId
                     }
                  ],
                  chat_session: {
                     connect: [messageListData?.documentId]
                  },
                  read: false
               }
            }
            const { data: messagesData, error: messagesResponseError } = await createEntry(
               "metajob-backend/messages",
               messageInputOld
            )

            if (messagesResponseError) {
               toast.error(messagesResponseError || "Something went wrong")
            } else {
               handleClose()
               toast.success("Message Sent!")
            }
         } else {
            // if new message session
            const chatInput = {
               data: {
                  sender: [
                     {
                        id: userId
                     }
                  ],
                  receiver: [
                     {
                        id: candidateId
                     }
                  ],

                  job: {
                     connect: [jobDocId]
                  }
               }
            }
            const { data: chatData, error: chatResponseError } = await createEntry("metajob-backend/chats", chatInput)
            if (chatResponseError) {
               toast.error(chatResponseError || "Something went wrong")
            } else {
               const messageInput = {
                  data: {
                     message: data?.message,
                     sender: [
                        {
                           id: userId
                        }
                     ],
                     receiver: [
                        {
                           id: candidateId
                        }
                     ],
                     chat_session: {
                        connect: [chatData?.documentId]
                     },
                     read: false
                  }
               }
               const { data: messagesData, error: messagesResponseError } = await createEntry(
                  "metajob-backend/messages",
                  messageInput
               )
               if (messagesResponseError) {
                  toast.error(messagesResponseError || "Something went wrong")
               } else {
                  setMessageIdentifier(true)
                  handleClose()
                  handleMute()
                  toast.success("Message Sent!")
               }
            }
         }
      } catch (error: any) {
         toast.success(error?.message || "Something went wrong")
      } finally {
         setLoading(false)
      }
   }
   return (
      <Modal
         open={open}
         onClose={handleClose}
         sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999
         }}>
         <Box
            sx={{
               bgcolor: theme.palette.background.default,
               width: { xs: "100%", md: "570px" },
               overflowY: "auto",
               mx: "auto",
               boxShadow: "none",
               position: "relative",
               borderRadius: "12px"
            }}>
            {/* header  */}
            <Box
               sx={{
                  display: "flex",
                  justifyContent: title ? "space-between" : "flex-end",
                  alignItems: "center",
                  px: 3,
                  py: 2,
                  borderBottom: "1px solid",
                  borderColor: title ? theme.palette.divider : "transparent"
               }}>
               {title && <Typography variant='h6'>{title || "Cover Letter"}</Typography>}
               <IconButton
                  color='inherit'
                  onClick={handleClose}
                  edge='start'
                  sx={{
                     height: "42px",
                     width: "42px",
                     borderRadius: "8px"
                  }}>
                  <CIcon
                     icon='oui:cross'
                     sx={{
                        color: (theme) => theme.palette.error.main
                     }}
                  />
               </IconButton>
            </Box>
            {/* content  */}
            <Box sx={{ p: 2 }}>
               <Stack alignItems={"center"} gap={2} padding={2} component={"form"} onSubmit={handleSubmit(onSubmit)}>
                  {/* Message input */}
                  <TextField
                     fullWidth
                     id='outlined-basic'
                     placeholder={"Send a message"}
                     variant='outlined'
                     multiline
                     maxRows={4}
                     onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                           event.preventDefault()
                           handleSubmit(onSubmit)()
                        }
                     }}
                     {...register("message", {
                        required: true
                     })}
                     error={errors?.message ? true : false}
                     sx={{
                        "& .MuiInputBase-root": {
                           minHeight: "40px !important",
                           p: 0,
                           "& textarea": {
                              ...(theme.direction === "rtl" ? { marginLeft: "50px" } : { marginRight: "50px" })
                           }
                        }
                     }}
                  />
                  <LoadingButton
                     loading={loading}
                     variant='contained'
                     color='primary'
                     type='submit'
                     sx={{
                        // position: "absolute",
                        // ...(theme.direction === "rtl" ? { left: "25px" } : { right: "25px" }),
                        boxShadow: "none",
                        margin: 0 + " !important",
                        width: "40px",
                        p: 0,
                        minWidth: "40px",
                        height: "40px",
                        borderRadius: "100px",
                        "& svg": {
                           ...(!loading && {
                              color: (theme) => theme.palette.primary.contrastText
                           })
                        }
                     }}
                     // loading icon
                     loadingIndicator={
                        <CircularProgress
                           size={20}
                           sx={{
                              color: (theme) => theme.palette.primary.main
                           }}
                        />
                     }>
                     {/* Send message button */}
                     {loading ? null : (
                        <CIcon
                           icon={"tabler:arrow-big-up-lines-filled"}
                           sx={{
                              fontSize: {
                                 xs: "1rem",
                                 sm: "1.25rem"
                              }
                           }}
                        />
                     )}
                  </LoadingButton>
               </Stack>
            </Box>
         </Box>
      </Modal>
   )
}

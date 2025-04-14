"use client"
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { useTheme } from "next-themes"
import { useForm } from "react-hook-form"
import { Box, Typography, useTheme as muiTheme, Modal, Stack, TextField, CircularProgress, Button } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { createEntry, find } from "../../lib/strapi"
import { IJobApplyData } from "./types"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import CIcon from "../../components/common/icon"
import { getNameFromEmail } from "./hook"

type Props = {
   open: boolean
   handleClose: () => void
   title?: string
   modalData: IJobApplyData
}

export const MessageModal = ({ open, handleClose, title, modalData }: Props) => {
   const theme = muiTheme()
   const { theme: mode } = useTheme()

   // session data destructuring
   const { data: session } = useSession()
   const { user } = session || {}
   const { id: userId } = user || {}

   const [loading, setLoading] = useState(false)
   const [messageIdentifier, setMessageIdentifier] = useState(false)

   const { owner, job } = modalData || {}
   const { documentId: candidateDocId, id: candidateId, first_name, last_name, email } = owner || {}
   const applicantName = first_name ? `${first_name} ${last_name}` : getNameFromEmail(email)
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
               {/* <IconButton
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
               </IconButton> */}
            </Box>
            {/* content  */}
            <Box sx={{ p: 2 }}>
               <Stack alignItems={"center"} gap={2} padding={2} component={"form"} onSubmit={handleSubmit(onSubmit)}>
                  {/* Message input */}
                  <Box sx={{ width: "100%" }}>
                     <TextField
                        fullWidth
                        id='outlined-basic'
                        placeholder={"Write message"}
                        variant='outlined'
                        multiline
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
                              minHeight: { xs: "100px", md: "200px !important" },
                              p: 0,
                              "& textarea": {
                                 ...(theme.direction === "rtl" ? { marginLeft: "50px" } : { marginRight: "50px" })
                              }
                           }
                        }}
                     />
                     {/* note  */}
                     <Stack direction={"row"} alignItems={"center"} gap={0.5} mt={1}>
                        <CIcon
                           icon='arcticons:note-it'
                           sx={{
                              fontSize: 20,
                              color: theme.palette.text.disabled
                           }}
                        />
                        <Typography
                           sx={{
                              color: theme.palette.text.disabled,
                              fontSize: 12,
                              fontWeight: 400
                           }}>
                           You can directly send message to the candidate <b>{applicantName}</b>
                        </Typography>
                     </Stack>
                  </Box>
                  <Stack
                     direction={"row"}
                     justifyContent={"space-between"}
                     alignItems={"center"}
                     gap={2}
                     width={"100%"}>
                     <Button
                        onClick={handleClose}
                        sx={{
                           bgcolor:
                              mode === "light"
                                 ? hexToRGBA(theme.palette.text.disabled, 0.1)
                                 : hexToRGBA(theme.palette.error.main, 0.4),
                           color:
                              mode === "light"
                                 ? theme.palette.text.disabled
                                 : hexToRGBA(theme.palette.primary.contrastText, 0.8),
                           "&:hover": {
                              color: theme.palette.primary.contrastText,
                              bgcolor: theme.palette.error.main
                           }
                        }}>
                        Cancel
                     </Button>
                     {/* Send message button */}
                     <LoadingButton
                        loading={loading}
                        variant='contained'
                        color='primary'
                        type='submit'
                        sx={{
                           boxShadow: "none",
                           px: 3
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
                        Send Message
                     </LoadingButton>
                  </Stack>
               </Stack>
            </Box>
         </Box>
      </Modal>
   )
}

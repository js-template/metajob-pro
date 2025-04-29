"use client"
import { Fragment, useEffect, useMemo, useState } from "react"
import _ from "lodash"
import useSWR from "swr"
import toast from "react-hot-toast"
import { Box, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material"
import PerfectScrollbar from "react-perfect-scrollbar"
import MessageItem from "./item"
import { MessageDataProps } from "./type"
import SendMessage from "./send-message"
import { createEntry, updateOne } from "../../lib/strapi"

const MessageBox = ({
   noMessage,
   chatId,
   blockData,
   role,
   userId
}: {
   noMessage: boolean
   chatId?: number | string | null
   blockData: any
   role: string
   userId?: number
}) => {
   const theme = useTheme()
   const hidden = useMediaQuery(theme.breakpoints.up("lg"))
   const [scrollEl, setScrollEl] = useState()
   const [newLoading, setNewLoading] = useState(false)
   const [isSending, setIsSending] = useState(false)
   const [pagination, setPagination] = useState({
      perPage: 25
   })
   const [recentMessages, setRecentMessages] = useState<MessageDataProps[] | []>([])

   // ** Scroll to chat bottom
   const scrollToBottom = () => {
      if (scrollEl) {
         if (hidden) {
            // @ts-ignore
            scrollEl.scrollTop = scrollEl.scrollHeight
         } else {
            // @ts-ignore
            scrollEl.scrollTop = scrollEl.scrollHeight
         }
      }
   }

   // *** Get chat session fetcher function
   const chatSessionFetcher = async (url: string) => {
      const res = await fetch(url, {
         method: "GET",
         headers: {
            "Content-Type": "application/json"
         },
         cache: "no-store"
      })

      const result = await res.json()

      if (result.error) {
         throw new Error(result.error)
      }

      if (!result?.data?.data && result?.data?.data?.length === 0) {
         throw new Error("Chat session not found")
      }
      const resultData = result?.data?.data[0]

      return {
         id: resultData?.id,
         ...resultData,
         receiver: {
            id: resultData?.receiver?.id,
            ...resultData?.receiver,
            avatar: {
               id: resultData?.receiver?.avatar?.id,
               ...resultData?.receiver?.avatar
            }
         },
         sender: {
            id: resultData?.sender?.id,
            ...resultData?.sender,
            avatar: {
               id: resultData?.sender?.avatar?.id,
               ...resultData?.sender?.avatar
            }
         },
         job: {
            id: resultData?.job?.id,
            ...resultData?.job
         }
      }
   }

   // ?? create chat session query params
   const chatQueryParams = {
      // populate: "deep",
      populate: "*",
      filters: {
         documentId: {
            $eq: chatId
         }
      }
   }

   // ?? Convert chatQueryParams to a string for the URL
   const chatQueryString = encodeURIComponent(JSON.stringify(chatQueryParams))

   const { data: sessionInfo, mutate: chatSessionMutate } = useSWR(
      `/api/find?model=api/metajob-backend/chats&query=${chatQueryString}&cache=no-store`,
      chatId ? chatSessionFetcher : null,
      {
         // revalidateOnFocus: false,
         // revalidateOnReconnect: false
      }
   )

   // *** Get messages fetcher function
   const messageFetcher = async (url: string) => {
      const res = await fetch(url, {
         method: "GET",
         headers: {
            "Content-Type": "application/json"
         }
      })

      const result = await res.json()

      if (result.error) {
         throw new Error(result.error)
      }
      // data format
      const filtered = result?.data?.data?.map((c: any) => {
         return {
            messageId: c.id,
            documentId: c.documentId,
            id: c?.sender?.id,
            message: c?.message,
            date: c?.createdAt,
            name: c?.sender?.first_name + " " + c?.sender?.last_name,
            avatar: c?.sender?.avatar?.url,
            read: c?.read,
            images:
               _.map(c?.medias?.data, (item) => {
                  return {
                     id: item.id,
                     src: item?.url,
                     alt: item?.alternativeText,
                     caption: item?.caption,
                     width: item?.width,
                     height: item?.height,
                     createdAt: item?.createdAt,
                     updatedAt: item?.updatedAt
                  }
               }) || []
         }
      })

      return filtered
   }

   const queryParams = {
      // populate: "deep",
      // populate: "*",
      populate: {
         sender: {
            populate: "*"
         },
         receiver: {
            populate: "*"
         },
         chat_session: {
            populate: "*"
         }
      },
      sort: "createdAt:DESC",
      filters: {
         chat_session: {
            documentId: chatId
         }
         // sender: {
         //    firstName: {
         //       $ne: null
         //    },
         //    lastName: {
         //       $ne: null
         //    }
         // },
         // receiver: {
         //    firstName: {
         //       $ne: null
         //    },
         //    lastName: {
         //       $ne: null
         //    }
         // }
      },
      pagination: {
         page: 1,
         pageSize: pagination.perPage
      }
   }

   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   const {
      data: chatData,
      error,
      isLoading,
      mutate: messagesMutate
   } = useSWR(
      `/api/find?model=api/metajob-backend/messages&query=${queryString}&cache=no-store`,
      chatId ? messageFetcher : null,
      {
         refreshInterval: 10000,
         revalidateOnFocus: true,
         revalidateOnReconnect: true
      }
   )

   useEffect(() => {
      if (scrollEl) scrollToBottom()

      return () => {
         scrollToBottom()
      }
      // eslint-disable-next-line
   }, [scrollEl, hidden, chatData])

   // get read messages id not equal to the current user id
   const unreadMessages = useMemo(() => {
      return chatData
         ? chatData?.filter((message: MessageDataProps) => !message.read && message.id !== Number(userId))
         : []
   }, [chatData, userId])

   // *** Mark messages as read
   useEffect(() => {
      if (unreadMessages.length > 0) {
         unreadMessages.forEach(async (message: MessageDataProps) => {
            await updateOne("metajob-backend/messages", message?.documentId, {
               data: {
                  read: true,
                  send_notification: false
               }
            }).then((res) => {
               if (!res.error) {
                  messagesMutate()
               }
            })
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [unreadMessages])

   useEffect(() => {
      if (newLoading) {
         messagesMutate().finally(() => {
            setNewLoading(false)
         })
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [newLoading, pagination])

   // *** send message function handler
   const sendMessage = async (data: any) => {
      if (sessionInfo && chatId) {
         // ?? if sessionInfo receiver or sender id, undefined then return error
         if (!sessionInfo.receiver.id || !sessionInfo.sender.id) {
            toast.error("Chat session is missing, please refresh the page")
            window.location.reload()
            return
         }

         setIsSending(true)
         setRecentMessages([
            ...recentMessages,
            {
               messageId: data?.id,
               documentId: data?.documentId,
               id: role === "candidate" ? sessionInfo?.receiver?.id : sessionInfo?.sender?.id,
               name:
                  role === "candidate"
                     ? sessionInfo?.receiver?.first_name + " " + sessionInfo?.receiver?.last_name
                     : sessionInfo?.sender?.first_name + " " + sessionInfo?.sender?.last_name,
               avatar: role === "candidate" ? sessionInfo?.receiver?.avatar?.url : sessionInfo?.sender?.avatar?.url,
               message: data?.message,
               read: false,
               date: new Date().toString(),
               images: []
            }
         ])
         scrollToBottom()

         const messageInput = {
            data: {
               message: data?.message,
               sender: [
                  {
                     id: Number(userId)
                  }
               ],
               receiver: [
                  {
                     id: sessionInfo.receiver.id === Number(userId) ? sessionInfo.sender.id : sessionInfo.receiver.id
                  }
               ],
               chat_session: {
                  connect: [chatId]
               },
               read: false
               // createdBy: userId
            }
         }
         await createEntry("metajob-backend/messages", messageInput).then((res) => {
            if (res.error) {
               toast.error(res.error)
               setRecentMessages([])
               setIsSending(false)
               return
            }

            messagesMutate().finally(() => {
               setIsSending(false)
               setRecentMessages([])
            })
         })
      }
   }

   // *** edit message function handler ***
   const editMessage = async (id: string, data: any) => {
      const notify = toast.loading("Editing message...")
      await updateOne("metajob-backend/messages", id, {
         data: {
            message: data.message
         }
      }).then((res) => {
         if (res.error) {
            toast.error(res.error, {
               id: notify
            })
            return
         }
         messagesMutate().finally(() => {
            toast.success("Message updated successfully", {
               id: notify
            })
            return
         })
      })
   }

   return (
      <Box
         sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "12px"
         }}>
         {/* Loader */}
         {isLoading && (
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1000
               }}>
               {/* Overlay */}
               <CircularProgress
                  sx={{
                     position: "relative",
                     zIndex: 3
                  }}
                  disableShrink
               />
               <Box
                  sx={{
                     position: "absolute",
                     top: 0,
                     left: 0,
                     height: "100%",
                     width: "100%",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     filter: "blur(2px)",
                     backdropFilter: "blur(2px)",
                     zIndex: 1
                  }}
               />
            </Box>
         )}

         {/* If messages empty */}
         {noMessage ? (
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%"
               }}>
               <Box
                  sx={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     textAlign: "center",
                     gap: 1,
                     px: 5
                  }}>
                  <Typography
                     variant='h3'
                     sx={{
                        fontWeight: 600
                     }}>
                     {blockData?.empty_chat?.title}
                  </Typography>
                  <Typography
                     variant='body1'
                     sx={{
                        fontWeight: 400,
                        color: "text.secondary"
                     }}>
                     {blockData?.empty_chat?.description}
                  </Typography>
               </Box>
            </Box>
         ) : (
            <Fragment>
               {chatData && chatData.length === 0 && (
                  <Box
                     sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%"
                     }}>
                     <Box
                        sx={{
                           display: "flex",
                           flexDirection: "column",
                           alignItems: "center",
                           gap: 1
                        }}>
                        <Typography
                           variant='h3'
                           sx={{
                              fontWeight: 500
                           }}>
                           {blockData?.empty_messages?.title}
                        </Typography>
                        <Typography
                           variant='body1'
                           sx={{
                              fontWeight: 400,
                              color: "text.secondary"
                           }}>
                           {blockData?.empty_messages?.description}
                        </Typography>
                     </Box>
                  </Box>
               )}
               <Box
                  className='notranslate'
                  sx={{
                     height: "calc(100vh - 100px)",
                     overflowY: "auto"
                  }}>
                  <PerfectScrollbar
                     containerRef={(ref) => {
                        setScrollEl(ref as any)
                     }}
                     onScrollUp={(container) => {
                        if (container.scrollTop === 0 && chatData && chatData.length === pagination.perPage) {
                           setNewLoading(true)
                           setPagination({
                              perPage: pagination.perPage + 5
                           })
                        }
                     }}
                     options={{ wheelPropagation: false }}>
                     <Box
                        sx={{
                           p: 3,
                           display: "flex",
                           flexDirection: "column-reverse",
                           gap: 1.5,
                           width: "100%"
                        }}>
                        {_.map(_.unionBy(recentMessages, chatData), (item, index) => {
                           return (
                              <MessageItem
                                 key={index}
                                 data={item}
                                 isSender={item.id === Number(userId)}
                                 // onDelete={deleteMessage}
                                 onEdit={editMessage}
                                 blockData={blockData}
                              />
                           )
                        })}
                        {newLoading && (
                           <Box
                              sx={{
                                 display: "flex",
                                 justifyContent: "center",
                                 alignItems: "center",
                                 height: "100%",
                                 width: "100%",
                                 top: 0,
                                 left: 0,
                                 zIndex: 1000
                              }}>
                              {/* Overlay */}
                              <CircularProgress
                                 sx={{
                                    position: "relative",
                                    zIndex: 3
                                 }}
                                 disableShrink
                              />
                           </Box>
                        )}
                     </Box>
                  </PerfectScrollbar>
               </Box>
               <SendMessage
                  handleSendMessage={sendMessage}
                  loading={isSending}
                  setLoading={setIsSending}
                  sendPlaceholder={blockData?.sendMessagePlaceholder}
               />
            </Fragment>
         )}
      </Box>
   )
}

export default MessageBox

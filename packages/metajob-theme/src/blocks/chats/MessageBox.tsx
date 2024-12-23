"use client"
import { Box, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material"
import _ from "lodash"
import { Fragment, useEffect, useMemo, useState } from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import MessageItem from "./MessageItem"
import SendMessage from "./SendMessage"
import useSWR from "swr"
import { MessageDataProps } from "./type"
import { createEntry, updateOne } from "../../lib/strapi"
import toast from "react-hot-toast"
// { empty, candidateId, chatId }: { empty: boolean; candidateId?: number; chatId?: number }

const MessageBox = ({
   empty,
   candidateId,
   chatId,
   data,
   role,
   userId,
   setChatId
}: {
   empty: boolean
   candidateId?: number
   chatId?: number | null
   data: any
   role: string
   userId: number
   setChatId: React.Dispatch<React.SetStateAction<number | null>>
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

      if (!result?.data?.data && result?.data?.data.length === 0) {
         throw new Error("Chat session not found")
      }

      return {
         id: result?.data?.data[0]?.id,
         ...result?.data?.data[0]?.attributes,
         receiver: {
            id: result?.data?.data[0]?.attributes.receiver?.data?.id,
            ...result?.data?.data[0]?.attributes.receiver?.data?.attributes,
            avatar: {
               id: result?.data?.data[0]?.attributes.receiver?.data?.attributes?.avatar?.data?.id,
               ...result?.data?.data[0]?.attributes.receiver?.data?.attributes?.avatar?.data?.attributes
            }
         },
         sender: {
            id: result?.data?.data[0]?.attributes.sender?.data?.id,
            ...result?.data?.data[0]?.attributes.sender?.data?.attributes,
            avatar: {
               id: result?.data?.data[0]?.attributes.sender?.data?.attributes?.avatar?.data?.id,
               ...result?.data?.data[0]?.attributes.sender?.data?.attributes?.avatar?.data?.attributes
            }
         },
         job: {
            id: result?.data?.data[0]?.attributes.job?.data?.id,
            ...result?.data?.data[0]?.attributes.job?.data?.attributes
         }
      }
   }

   // ?? create chat session query params
   const chatQueryParams = {
      populate: "deep",
      filters: {
         id: {
            $eq: chatId
         }
      }
   }

   // ?? Convert chatQueryParams to a string for the URL
   const chatQueryString = encodeURIComponent(JSON.stringify(chatQueryParams))

   const { data: sessionInfo, mutate: chatSessionMutate } = useSWR(
      `/api/find?model=api/metajob-strapi/chats&query=${chatQueryString}&cache=no-store`,
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
            id: c.attributes.sender?.data?.id,
            message: c?.attributes?.message,
            date: c?.attributes?.createdAt,
            name:
               c?.attributes?.sender?.data?.attributes?.firstName +
               " " +
               c?.attributes?.sender?.data?.attributes?.lastName,
            avatar: c?.attributes?.sender?.data?.attributes?.avatar?.data?.attributes?.url,
            read: c?.attributes?.read,
            images:
               _.map(c?.attributes?.medias?.data, (item) => {
                  return {
                     id: item.id,
                     src: item?.attributes?.url,
                     alt: item?.attributes?.alternativeText,
                     caption: item?.attributes?.caption,
                     width: item?.attributes?.width,
                     height: item?.attributes?.height,
                     createdAt: item?.attributes?.createdAt,
                     updatedAt: item?.attributes?.updatedAt
                  }
               }) || []
         }
      })

      return filtered
   }

   const queryParams = {
      populate: "deep",
      sort: "createdAt:DESC",
      filters: {
         chat_session: {
            id: chatId
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
      `/api/find?model=api/metajob-strapi/messages&query=${queryString}&cache=no-store`,
      chatId ? messageFetcher : null,
      {
         refreshInterval: 10000,
         revalidateOnFocus: true,
         revalidateOnReconnect: true
      }
   )

   console.log("chatData", chatData)

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
            await updateOne("metajob-strapi/messages", message.messageId, {
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
         // ?? if sessionInfo receiver or sender id, firstName, lastName is not null or undefined then return error
         if (
            !sessionInfo.receiver.id ||
            !sessionInfo.receiver.firstName ||
            !sessionInfo.receiver.lastName ||
            !sessionInfo.sender.id ||
            !sessionInfo.sender.firstName ||
            !sessionInfo.sender.lastName
         ) {
            toast.error("Chat session is missing, please refresh the page")
            window.location.reload()
            return
         }

         setIsSending(true)
         setRecentMessages([
            ...recentMessages,
            {
               messageId: data.id,
               id: role === "candidate" ? sessionInfo?.receiver?.id : sessionInfo?.sender?.id,
               name:
                  role === "candidate"
                     ? sessionInfo?.receiver?.firstName + " " + sessionInfo?.receiver?.lastName
                     : sessionInfo?.sender?.firstName + " " + sessionInfo?.sender?.lastName,
               avatar: role === "candidate" ? sessionInfo?.receiver?.avatar?.url : sessionInfo?.sender?.avatar?.url,
               message: data?.message,
               read: false,
               date: new Date().toString(),
               images: []
            }
         ])
         scrollToBottom()

         await createEntry("metajob-strapi/messages", {
            data: {
               message: data.message,
               sender: userId,
               receiver: sessionInfo.receiver.id === Number(userId) ? sessionInfo.sender.id : sessionInfo.receiver.id,
               chat_session: chatId,
               read: false,
               createdBy: userId
            }
         }).then((res) => {
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

   // *** delete message function handler
   // const deleteMessage = async (id: number) => {
   //    const notify = toast.loading("Deleting message...")

   //    await deleteEntry("api/metajob-strapi/messages", id).then((res) => {
   //       if (res.error) {
   //          toast.error(res.error, {
   //             id: notify
   //          })
   //          return
   //       }
   //       messagesMutate().finally(() => {
   //          toast.success("Message deleted successfully", {
   //             id: notify
   //          })
   //       })
   //       setRecentMessages([])
   //       scrollToBottom()
   //       return
   //    })
   // }

   // *** edit message function handler ***
   const editMessage = async (id: number, data: any) => {
      const notify = toast.loading("Editing message...")

      await updateOne("metajob-strapi/messages", id, {
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
            height: "100%"
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
         {empty ? (
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
                     {data?.empty_chat?.title}
                  </Typography>
                  <Typography
                     variant='body1'
                     sx={{
                        fontWeight: 400,
                        color: "text.secondary"
                     }}>
                     {data?.empty_chat?.description}
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
                           {data?.empty_messages?.title}
                        </Typography>
                        <Typography
                           variant='body1'
                           sx={{
                              fontWeight: 400,
                              color: "text.secondary"
                           }}>
                           {data?.empty_messages?.description}
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
                                 {...item}
                                 isSender={item.id === Number(userId)}
                                 // onDelete={deleteMessage}
                                 onEdit={editMessage}
                                 data={data}
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
                  sendPlaceholder={data?.sendMessagePlaceholder}
               />
            </Fragment>
         )}
      </Box>
   )
}

export default MessageBox

"use client"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { Box, CircularProgress, Drawer, FormControl, TextField, Typography, useTheme } from "@mui/material"
import _ from "lodash"
import PerfectScrollbar from "react-perfect-scrollbar"
import { IMessageBock } from "./type"
import CIcon from "../../components/common/icon"
import UserItem from "./user-item"

const UsersBox = ({
   blockData,
   chatSidebar,
   setChatSidebar,
   hidden,
   activeId,
   role,
   userId,
   userEmail,
   setChatId
}: {
   blockData: IMessageBock
   activeId?: number | string | null
   chatSidebar: boolean
   setChatSidebar: (value: boolean) => void
   hidden: boolean
   role: string
   userId?: number
   userEmail?: string
   setChatId: React.Dispatch<React.SetStateAction<number | string | null>>
}) => {
   const theme = useTheme()
   const [searchQuery, setSearchQuery] = useState("")
   const [fetchFilter, setFetchFilter] = useState(false)

   // *** fetcher function for SWR
   const fetcher = async (url: string) => {
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

      // if no data, return empty array
      if (!result?.data?.data) {
         return []
      }

      const filtered = _.map(result?.data?.data, (c: any) => {
         const badge = c?.messages?.data.filter((m: any) => m?.receiver?.data?.id === Number(userId) && !m?.read).length

         return {
            id: c?.id,
            documentId: c?.documentId,
            ...(role === "employer"
               ? {
                    avatar: c?.receiver?.avatar?.url,
                    name: c?.receiver?.first_name + " " + c?.receiver?.last_name,
                    email: c?.receiver?.email,
                    date: c?.messages?.data[c?.messages?.data?.length - 1]?.updatedAt || c?.updatedAt,
                    badge: badge,
                    status: c?.receiver?.status,
                    message: c?.messages?.data[c?.messages?.data?.length - 1]?.message || ""
                 }
               : {
                    avatar: c?.sender?.avatar?.url,
                    name: c?.sender?.first_name + " " + c?.sender?.last_name,
                    email: c?.sender?.email,
                    date: c?.messages?.data[c?.messages?.data?.length - 1]?.updatedAt || c?.updatedAt,
                    badge: badge,
                    status: c?.sender?.status,
                    message: c?.messages?.data[c?.messages?.data?.length - 1]?.message || ""
                 })
         }
      })

      return filtered
   }

   const queryParams = {
      populate: {
         sender: {
            populate: "*"
         },
         receiver: {
            populate: "*"
         },
         job: {
            populate: "*"
         }
      },
      publicationState: "live",
      filters: {
         ...(role === "candidate"
            ? {
                 receiver: {
                    email: {
                       $eq: userEmail
                    }
                    //   id: {
                    //      $eq: userId
                    //   }
                 },
                 //   sender: {
                 //      first_name: {
                 //         $ne: null
                 //      },
                 //      last_name: {
                 //         $ne: null
                 //      }
                 //   },
                 ...(searchQuery &&
                    searchQuery.length > 0 && {
                       $or: [
                          {
                             sender: {
                                first_name: {
                                   $containsi: searchQuery
                                }
                             }
                          },
                          {
                             sender: {
                                last_name: {
                                   $containsi: searchQuery
                                }
                             }
                          },
                          {
                             sender: {
                                email: {
                                   $containsi: searchQuery
                                }
                             }
                          },
                          {
                             sender: {
                                phone: {
                                   $containsi: searchQuery
                                }
                             }
                          }
                       ]
                    })
              }
            : {
                 sender: {
                    email: {
                       $eq: userEmail
                    }
                    //   id: {
                    //      $eq: userId
                    //   }
                 },
                 //   receiver: {
                 //      first_name: {
                 //         $ne: null
                 //      },
                 //      last_name: {
                 //         $ne: null
                 //      }
                 //   },
                 ...(searchQuery &&
                    searchQuery.length > 0 && {
                       $or: [
                          {
                             receiver: {
                                first_name: {
                                   $containsi: searchQuery
                                }
                             }
                          },
                          {
                             receiver: {
                                last_name: {
                                   $containsi: searchQuery
                                }
                             }
                          },
                          {
                             receiver: {
                                email: {
                                   $containsi: searchQuery
                                }
                             }
                          },
                          {
                             receiver: {
                                phone: {
                                   $containsi: searchQuery
                                }
                             }
                          }
                       ]
                    })
              })
      }
   }

   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = `/api/find?model=api/metajob-backend/chats&query=${queryString}`

   const { data, error, mutate, isLoading } = useSWR(apiUrl, fetcher, {
      refreshInterval: 10000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true
   })

   // *** search filter called after 500ms timeout
   useEffect(() => {
      const closeId = setTimeout(() => {
         setFetchFilter(true)
         mutate()

         // if query is empty, reset the filter
         if (searchQuery.length === 0) {
            setFetchFilter(false)
         }
      }, 500)

      return () => {
         clearTimeout(closeId)
      }

      // eslint-disable-next-line
   }, [searchQuery])

   return (
      <Drawer
         open={chatSidebar}
         onClose={() => {
            setChatSidebar(false)
         }}
         variant={hidden ? "permanent" : "temporary"}
         ModalProps={{
            disablePortal: true,
            keepMounted: true // Better open performance on mobile.
         }}
         sx={{
            zIndex: 7,
            height: "100%",
            display: "block",
            position: hidden ? "static" : "absolute",
            "& .MuiDrawer-paper": {
               boxShadow: "none",
               width: hidden
                  ? 373
                  : {
                       xs: "95%",
                       sm: 400
                    },
               position: hidden ? "static" : "absolute",
               borderTopLeftRadius: (theme) => theme.shape.borderRadius,
               ...(theme.direction === "rtl"
                  ? { borderLeft: "1px solid", borderColor: "divider", borderRight: 0 }
                  : { borderRight: "1px solid", borderColor: "divider" }),
               borderBottomLeftRadius: (theme) => theme.shape.borderRadius
            },
            "& > .MuiBackdrop-root": {
               borderRadius: 1,
               position: "absolute",
               zIndex: (theme) => theme.zIndex.drawer - 1
            }
         }}>
         <Box
            sx={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               pl: 2,
               pr: 1.5,
               py: 1.5,
               mb: 1.5,
               borderBottom: "1px solid",
               borderColor: "divider"
            }}>
            {/* Search input */}
            <FormControl
               size='small'
               sx={{
                  width: "100%",
                  pr: 1
               }}>
               <TextField
                  id='outlined-basic'
                  placeholder={blockData?.searchPlaceholder}
                  variant='outlined'
                  onChange={(e) => {
                     setSearchQuery(e.target.value)
                  }}
                  InputProps={{
                     endAdornment: (
                        <CIcon
                           icon='iconoir:search'
                           size={24}
                           sx={{
                              color: theme.palette.text.secondary,
                              cursor: "pointer"
                           }}
                        />
                     )
                  }}
                  sx={{
                     "& .MuiInputBase-root": {
                        minHeight: "30px !important",
                        pl: (theme) => (theme.direction === "rtl" ? "10px !important" : "0px !important"),
                        "& input": {
                           py: 1.3,
                           px: 2
                        }
                     }
                  }}
               />
            </FormControl>
            {/* Close icon for mobile */}
            {!hidden && (
               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "flex-end",
                     p: 1
                  }}>
                  <CIcon
                     icon='tabler:x'
                     size={24}
                     sx={{
                        color: theme.palette.error.main,
                        cursor: "pointer"
                     }}
                     onClick={() => {
                        setChatSidebar(false)
                     }}
                  />
               </Box>
            )}
         </Box>

         {/* Chat session list */}
         <Box
            sx={{
               position: "relative"
               // overflowX: "hidden",
               // overflowY: "auto"
            }}>
            <PerfectScrollbar options={{ wheelPropagation: false }}>
               <Box
                  sx={{
                     pt: 0,
                     pb: 3,
                     px: 1,
                     display: "flex",
                     maxHeight: "calc(100vh - 285px)",
                     flexDirection: "column",
                     gap: 1.5
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

                  {_.map(data, (item, index) => {
                     return (
                        <UserItem
                           key={index}
                           item={item}
                           setChatSidebar={setChatSidebar}
                           userId={item?.id}
                           active={activeId === item?.documentId}
                           setChatId={setChatId}
                        />
                     )
                  })}

                  {/* Empty message */}
                  {(data?.length ?? 0) === 0 && (
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "center",
                           height: "100%",
                           width: "100%"
                        }}>
                        <Typography
                           sx={{
                              color: theme.palette.text.secondary,
                              fontSize: 14
                           }}>
                           No chat available
                        </Typography>
                     </Box>
                  )}
               </Box>
            </PerfectScrollbar>
         </Box>
      </Drawer>
   )
}

export default UsersBox

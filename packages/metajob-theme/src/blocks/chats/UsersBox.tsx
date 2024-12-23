"use client"
import { hexToRGBA } from "../../lib/hex-to-rgba"

import {
   Avatar,
   Badge,
   Box,
   Chip,
   CircularProgress,
   Drawer,
   FormControl,
   TextField,
   Typography,
   useMediaQuery,
   useTheme
} from "@mui/material"
import _ from "lodash"
import { useEffect, useState } from "react"
import Moment from "react-moment"
import PerfectScrollbar from "react-perfect-scrollbar"
import { ChatDataProps, ChatSectionProps } from "./type"
import CIcon from "../../components/common/icon"

import useSWR from "swr"

const UsersBox = ({
   chatData,
   chatSidebar,
   setChatSidebar,
   hidden,
   activeId,
   receiverId,
   chatId,
   role,
   userId,
   setChatId
}: {
   chatData: ChatSectionProps
   activeId?: number
   chatSidebar: boolean
   setChatSidebar: (value: boolean) => void
   hidden: boolean
   receiverId?: number
   chatId?: number
   role: string
   userId: number
   setChatId: React.Dispatch<React.SetStateAction<number | null>>
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
         const badge = c?.attributes?.messages?.data.filter(
            (m: any) => m?.attributes?.receiver?.data?.id === Number(userId) && !m?.attributes?.read
         ).length

         return {
            id: c?.id,
            ...(role === "employer"
               ? {
                    avatar: c?.attributes?.receiver?.data?.attributes?.avatar?.data?.attributes?.url,
                    name:
                       c?.attributes?.receiver?.data?.attributes?.firstName +
                       " " +
                       c?.attributes?.receiver?.data?.attributes?.lastName,
                    date:
                       c?.attributes?.messages?.data[c?.attributes?.messages?.data?.length - 1]?.attributes
                          ?.updatedAt || c?.attributes?.updatedAt,
                    badge: badge,
                    status: c?.attributes?.receiver?.data?.attributes?.status,
                    message:
                       c?.attributes?.messages?.data[c?.attributes?.messages?.data?.length - 1]?.attributes?.message ||
                       ""
                 }
               : {
                    avatar: c?.attributes?.sender?.data?.attributes?.avatar?.data?.attributes?.url,
                    name:
                       c?.attributes?.sender?.data?.attributes?.firstName +
                       " " +
                       c?.attributes?.sender?.data?.attributes?.lastName,
                    date:
                       c?.attributes?.messages?.data[c?.attributes?.messages?.data?.length - 1]?.attributes
                          ?.updatedAt || c?.attributes?.updatedAt,
                    badge: badge,
                    status: c?.attributes?.receiver?.data?.attributes?.status,
                    message:
                       c?.attributes?.messages?.data[c?.attributes?.messages?.data?.length - 1]?.attributes?.message ||
                       ""
                 })
         }
      })

      return filtered
   }

   const queryParams = {
      populate: "sender,sender.avatar,receiver,receiver.avatar,messages,messages.receiver,messages.sender",
      publicationState: "live",
      sort: "updatedAt:DESC",
      filters: {
         ...(role === "candidate"
            ? {
                 receiver: {
                    id: {
                       $eq: userId
                    }
                 },
                 sender: {
                    firstName: {
                       $ne: null
                    },
                    lastName: {
                       $ne: null
                    }
                 },
                 ...(searchQuery &&
                    searchQuery.length > 0 && {
                       $or: [
                          {
                             sender: {
                                firstName: {
                                   $containsi: searchQuery
                                }
                             }
                          },
                          {
                             sender: {
                                lastName: {
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
                    id: {
                       $eq: userId
                    }
                 },
                 receiver: {
                    firstName: {
                       $ne: null
                    },
                    lastName: {
                       $ne: null
                    }
                 },
                 ...(searchQuery &&
                    searchQuery.length > 0 && {
                       $or: [
                          {
                             receiver: {
                                firstName: {
                                   $containsi: searchQuery
                                }
                             }
                          },
                          {
                             receiver: {
                                lastName: {
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

   // Utility function for base filters based on role
   // const getBaseFilters = (role: string, userId: number) => {
   //    return role === "candidate"
   //       ? {
   //            receiver: { id: { $eq: userId } },
   //            sender: { id: { $ne: null } } // Ensure sender exists
   //         }
   //       : {
   //            sender: { id: { $eq: userId } },
   //            receiver: { id: { $ne: null } } // Ensure receiver exists
   //         }
   // }

   // // Main queryParams with deep population
   // const queryParams = {
   //    populate: "deep", // Automatically populates all relations deeply
   //    publicationState: "live",
   //    sort: "updatedAt:DESC",
   //    filters: getBaseFilters(role, userId)
   // }

   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = `/api/find?model=api/metajob-strapi/chats&query=${queryString}`

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
                  placeholder={chatData?.searchPlaceholder}
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
                           role={role}
                           key={index}
                           item={item}
                           setChatSidebar={setChatSidebar}
                           userId={item.id}
                           active={activeId === item.id}
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

// TODO: Need to seperate this component to another file
const UserItem = ({
   role,
   item,
   active,
   setChatSidebar,
   setChatId
}: {
   role: string
   item: ChatDataProps
   active?: boolean
   setChatId: React.Dispatch<React.SetStateAction<number | null>>
   setChatSidebar: (value: boolean) => void
   userId: number
}) => {
   // ** Hooks
   const theme = useTheme()
   const hidden = useMediaQuery(theme.breakpoints.down("lg"))

   const { avatar, name, date, badge, status, message } = item

   return (
      <Box
         onClick={() => {
            if (active) {
               setChatSidebar(false)
               setChatId(null)
               return
            }
            setChatSidebar(false)
            setChatId(item.id)
         }}
         sx={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            alignItems: "center",
            p: "6px 8px",
            borderRadius: "4px",
            transition: "all 200ms ease-in-out",
            backgroundColor: (theme) => (active ? hexToRGBA(theme.palette.text.primary, 0.08) : "transparent"),
            "&:hover": {
               cursor: "pointer",
               backgroundColor: (theme) => hexToRGBA(theme.palette.text.primary, 0.08)
            },
            textDecoration: "none"
         }}>
         <Box
            sx={{
               display: "flex",
               alignItems: "center",
               gap: 2
            }}>
            <Badge
               color='success'
               overlap='circular'
               badgeContent=' '
               variant='dot'
               anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
               }}
               sx={{
                  "& .MuiBadge-badge": {
                     backgroundColor: (theme) =>
                        status === "active"
                           ? theme.palette.success.main
                           : status === "away"
                             ? theme.palette.warning.main
                             : theme.palette.text.secondary,
                     color: (theme) => theme.palette.primary.main,
                     boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`,
                     borderRadius: "50%"
                  }
               }}>
               <Avatar
                  // component={NextLink}
                  // href={slug}
                  className='notranslate'
                  sx={{
                     width: hidden ? "38px" : "48px",
                     height: hidden ? "38px" : "48px"
                  }}
                  src={avatar}
                  alt={"User Name"}
               />
            </Badge>
            <Box>
               <Typography
                  variant='body1'
                  className='notranslate'
                  sx={{
                     color: (theme) => theme.palette.text.primary,
                     fontSize: "14px",
                     fontWeight: 500,
                     lineHeight: "20px",
                     // lineClamp 1
                     overflow: "hidden",
                     textOverflow: "ellipsis",
                     display: "-webkit-box",
                     WebkitLineClamp: 1,
                     WebkitBoxOrient: "vertical",
                     mb: 0.5
                  }}>
                  {name}
               </Typography>
               <Typography
                  className='notranslate'
                  variant='body2'
                  sx={{
                     color: (theme) => theme.palette.text.secondary,
                     fontSize: "12px",
                     lineHeight: "16px",
                     // lineClamp 1
                     overflow: "hidden",
                     textOverflow: "ellipsis",
                     display: "-webkit-box",
                     WebkitLineClamp: 1,
                     WebkitBoxOrient: "vertical"
                  }}>
                  {message}
               </Typography>
            </Box>
         </Box>
         <Box
            sx={{
               textAlign: "right"
            }}>
            <Typography
               variant='body1'
               fontWeight={500}
               lineHeight={"16px"}
               fontSize={"12px"}
               sx={{
                  mb: 0.5,
                  flex: "none",
                  color: (theme) => theme.palette.text.secondary
               }}>
               <Moment fromNow>{date}</Moment>
            </Typography>
            {/* Badge */}
            {badge === 0 && <Box sx={{ height: "24px" }} />}
            {badge > 0 && (
               <Chip
                  label={badge}
                  size='small'
                  color='primary'
                  sx={{
                     "& .MuiChip-label": {
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px"
                     }
                  }}
               />
            )}
         </Box>
      </Box>
   )
}

export default UsersBox

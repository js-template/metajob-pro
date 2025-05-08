"use client"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Avatar, Box, Button, CircularProgress, Divider, IconButton, Stack, Typography } from "@mui/material"
import _ from "lodash"
import moment from "moment"
import { useTheme } from "next-themes"
import { Card } from "../../components/common/card"
import CIcon from "../../components/common/icon"
import { IResumeDetailsBlock, ISingleResume } from "./types"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { createEntry, deleteEntry, find } from "../../lib/strapi"

export default function ProfileSection({
   data,
   block,
   language
}: {
   data: ISingleResume
   block: IResumeDetailsBlock
   language?: string
}) {
   const { theme: mode } = useTheme()
   const { open_placeholder, industry_placeholder, member_placeholder, experience_placeholder, styles } = block || {}
   const { color, secondary_color } = styles || {}

   const { documentId, name, user, tagline, category, experience_time, contact, createdAt } = data || {}
   const image = user?.avatar?.url || ""
   const industry = category?.title || ""
   const location = contact?.location || ""

   const { data: session } = useSession()
   const userId = session?.user?.id

   const [bookmarkLoading, setBookmarkLoading] = useState(false)
   const [bookmarkData, setBookmarkData] = useState<{ documentId: string }[] | []>([])
   const [bookmarkIdentifier, setBookmarkIdentifier] = useState(false)

   //===================Starts bookmark resume============
   // get the bookmark data
   useEffect(() => {
      const getBookmark = async () => {
         setBookmarkLoading(true)
         const { data: bookmarkDataAll, error: bookmarkError } = await find(
            "api/metajob-backend/bookmarks",
            {
               filters: {
                  owner: {
                     id: {
                        $eq: userId || undefined
                     }
                  },
                  resume: {
                     id: {
                        $eq: data?.id || undefined
                     }
                  }
               },
               populate: "*",
               locale: language ?? "en"
            },
            "no-store"
         )
         if (!bookmarkError) {
            setBookmarkData(bookmarkDataAll?.data)
            setBookmarkLoading(false)
         } else {
            setBookmarkData([])
            setBookmarkLoading(false)
         }
      }
      if (userId) {
         if (!data?.id) return
         getBookmark()
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [userId, bookmarkIdentifier])

   const isBookmarked = bookmarkData?.length > 0 || bookmarkIdentifier
   // bookmark handler
   const resumeBookmarkHandler = async () => {
      try {
         if (!session) {
            return toast.error("Please login to bookmark")
         }

         if (isBookmarked) {
            if (!bookmarkData?.[0]?.documentId) {
               return toast.error("Please wait to load bookmark status")
            }
            setBookmarkLoading(true)
            const bookmarkDocId = bookmarkData?.[0]?.documentId
            const { success, error } = await deleteEntry("api/metajob-backend/bookmarks", bookmarkDocId, language)

            if (error) {
               return toast.error(error?.message || "Something went wrong")
            }

            if (success) {
               setBookmarkIdentifier(false)
               return toast.success("Bookmarked Removed")
            }
         } else {
            const inputData = {
               type: "resume",
               owner: {
                  id: session?.user?.id
               },
               resume: {
                  connect: [documentId]
               }
            }
            const {
               data: bookmarkData,
               error,
               message
            } = await createEntry(`metajob-backend/bookmarks?locale=${language ?? "en"}`, {
               data: inputData
            })

            if (error) {
               return toast.error(message || "Something went wrong")
            }

            if (bookmarkData) {
               setBookmarkIdentifier(true)
               return toast.success("Bookmarked Successfully")
            }
         }
      } catch (err: any) {
         return toast.error(err.message || "An Error Occurred")
      } finally {
         setBookmarkLoading(false)
      }
   }
   //===================Ends bookmark resume============

   return (
      <Card
         sx={{
            p: 3,
            borderRadius: 2
         }}>
         <Stack spacing={2}>
            <Stack display={"flex"} direction={"row"} alignItems={"center"} justifyContent={"space-between"} gap={1}>
               <Typography
                  fontWeight={400}
                  fontSize={14}
                  sx={{
                     color: (theme) => theme.palette.primary.contrastText
                  }}
                  bgcolor={(theme) => theme.palette.primary.main}
                  borderRadius={1.5}
                  px={1}
                  py={0.5}
                  width={"fit-content"}>
                  {open_placeholder || "Open To Work"}
               </Typography>
               {bookmarkLoading ? (
                  <Stack display={"flex"} alignItems={"flex-end"} justifyContent={"flex-start"} gap={1}>
                     <IconButton color='primary'>
                        <CircularProgress
                           size={20}
                           sx={{
                              color: (theme) => theme.palette.primary.main
                           }}
                        />
                     </IconButton>
                  </Stack>
               ) : (
                  <Stack display={"flex"} alignItems={"flex-end"} justifyContent={"flex-start"} gap={1}>
                     {isBookmarked ? (
                        <IconButton onClick={resumeBookmarkHandler} color='primary'>
                           <CIcon
                              icon='mdi:heart'
                              size={24}
                              sx={{
                                 cursor: "pointer",
                                 color: "primary.main"
                              }}
                           />
                        </IconButton>
                     ) : (
                        <IconButton onClick={resumeBookmarkHandler} color='primary'>
                           <CIcon
                              icon='mdi:heart-outline'
                              size={24}
                              color='text.primary'
                              sx={{
                                 color: "primary.main",
                                 cursor: "pointer"
                              }}
                           />
                        </IconButton>
                     )}
                  </Stack>
               )}
            </Stack>
            <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
               {/* avatar  */}
               <Box
                  sx={{
                     borderWidth: 1,
                     borderColor: (theme) => theme.palette.divider,
                     borderStyle: "solid",
                     borderRadius: "50%",
                     p: 1
                  }}>
                  <Avatar
                     src={image}
                     alt='avatar'
                     sx={{
                        bgcolor: (theme) =>
                           mode === "light" ? theme.palette.primary.main : hexToRGBA(theme.palette.primary.main, 0.5),
                        color: (theme) => theme.palette.primary.contrastText,
                        fontSize: { xs: 24, md: 30 },
                        width: 130,
                        height: 130
                     }}>
                     {name?.charAt(0) || ""}
                  </Avatar>
               </Box>

               <Box>
                  {name && (
                     <Typography
                        fontWeight={700}
                        fontSize={24}
                        sx={{
                           color: (theme) =>
                              mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary
                        }}
                        textAlign={"center"}>
                        {name}
                     </Typography>
                  )}
                  {tagline && (
                     <Typography
                        fontWeight={400}
                        fontSize={16}
                        sx={{
                           color: (theme) =>
                              mode === "light"
                                 ? secondary_color || theme.palette.text.disabled
                                 : theme.palette.text.disabled
                        }}
                        textAlign={"center"}>
                        {tagline}
                     </Typography>
                  )}
               </Box>
            </Stack>
            {/* {skillsValue && skillsValue?.length > 0 && (
               <Stack direction={"row"} gap={1} flexWrap={"wrap"} justifyContent={"center"} py={1}>
                  {_.map(skillsValue, (item, index) => (
                     <Typography
                        key={item?.id || index}
                        sx={{
                           bgcolor: (theme) => theme.palette.background.paper,
                           borderColor: (theme) => theme.palette.divider,
                           borderWidth: 1,
                           borderStyle: "solid",
                           borderRadius: 1,
                           py: 0.5,
                           px: 2
                        }}
                        variant={"body1"}
                        fontWeight={400}
                        fontSize={14}
                        color={(theme) => theme.palette.text.disabled}>
                        {item?.attributes?.title}
                     </Typography>
                  ))}
               </Stack>
            )} */}
            <Divider />
            <Stack spacing={1} py={1}>
               {industry && (
                  <Stack spacing={2} direction='row'>
                     <Box
                        sx={{
                           bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                           borderRadius: 2,
                           p: 1.5
                        }}>
                        <CIcon icon={"bytesize:work"} size={24} color='primary.main' />
                     </Box>
                     <Stack>
                        <Typography
                           fontWeight={500}
                           fontSize={14}
                           sx={{
                              color: (theme) =>
                                 mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary
                           }}>
                           {industry_placeholder || "Industry"}
                        </Typography>
                        <Typography
                           fontWeight={400}
                           fontSize={16}
                           sx={{
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.disabled
                                    : theme.palette.text.disabled
                           }}>
                           {industry}
                        </Typography>
                     </Stack>
                  </Stack>
               )}
               {experience_time && (
                  <Stack spacing={2} direction='row'>
                     <Box
                        sx={{
                           bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                           borderRadius: 2,
                           p: 1.5
                        }}>
                        <CIcon icon={"ri:award-line"} size={24} color='primary.main' />
                     </Box>
                     <Stack>
                        <Typography
                           fontWeight={500}
                           fontSize={14}
                           sx={{
                              color: (theme) =>
                                 mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary
                           }}>
                           {experience_placeholder || "Experience"}
                        </Typography>
                        <Typography
                           fontWeight={400}
                           fontSize={16}
                           sx={{
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.disabled
                                    : theme.palette.text.disabled
                           }}>
                           {experience_time?.title}
                        </Typography>
                     </Stack>
                  </Stack>
               )}
               {location && (
                  <Stack spacing={2} direction='row'>
                     <Box
                        sx={{
                           bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                           borderRadius: 2,
                           p: 1.5
                        }}>
                        <CIcon icon={"ph:map-pin"} size={24} color='primary.main' />
                     </Box>
                     <Stack>
                        <Typography
                           fontWeight={500}
                           fontSize={14}
                           sx={{
                              color: (theme) =>
                                 mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary
                           }}>
                           Location
                        </Typography>
                        <Typography
                           fontWeight={400}
                           fontSize={16}
                           sx={{
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.disabled
                                    : theme.palette.text.disabled
                           }}>
                           {location}
                        </Typography>
                     </Stack>
                  </Stack>
               )}
               {createdAt && (
                  <Stack spacing={2} direction='row'>
                     <Box
                        sx={{
                           bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                           borderRadius: 2,
                           p: 1.5
                        }}>
                        <CIcon icon={"uil:calender"} size={24} color='primary.main' />
                     </Box>
                     <Stack>
                        <Typography
                           fontWeight={500}
                           fontSize={14}
                           sx={{
                              color: (theme) =>
                                 mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary
                           }}>
                           {member_placeholder || "Member Since"}
                        </Typography>
                        <Typography
                           fontWeight={400}
                           fontSize={16}
                           sx={{
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.disabled
                                    : theme.palette.text.disabled
                           }}>
                           {moment(createdAt).format("DD MMMM YYYY")}
                        </Typography>
                     </Stack>
                  </Stack>
               )}
            </Stack>
            <Divider />
            {/* TODO: Feature will be enhance later in update version */}
            {/* <Button variant='contained' color='primary' size='large'>
               Invite for Interview
            </Button> */}
            {/* <Button
               sx={{
                  bgcolor: (theme) => theme.palette.background.default,
                  color: (theme) =>
                     mode === "dark" ? theme.palette.primary.contrastText : theme.palette.text.disabled,
                  "&:hover": {
                     color: (theme) => theme.palette.primary.contrastText,
                     bgcolor: (theme) => theme.palette.primary.main
                  }
               }}
               size='large'>
               Download My Resume
            </Button> */}
         </Stack>
      </Card>
   )
}

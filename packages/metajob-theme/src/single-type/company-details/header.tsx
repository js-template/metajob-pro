"use client"
import NextLink from "next/link"
import { useTheme } from "next-themes"
import { Avatar, Box, CircularProgress, Grid, IconButton, Stack, Typography } from "@mui/material"
import { Card } from "../../components/common/card"
import CIcon from "../../components/common/icon"
import { ISingleCompany } from "./types"
import { getSocialLink } from "./hook"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { createEntry, deleteEntry, find } from "../../lib/strapi"

type Props = {
   data: ISingleCompany
   language?: string
   color?: string
   secondary_color?: string
}

const CompanyHeader = ({ data, language, color, secondary_color }: Props) => {
   const { theme: mode } = useTheme()

   const { data: session } = useSession()
   const userId = session?.user?.id

   const { documentId, logo, name, email, phone, tagline, website, social_links } = data || {}
   const companyLogo = logo?.url || ""

   const facebook = getSocialLink("facebook", social_links)
   const twitter = getSocialLink("twitter", social_links)

   const [bookmarkLoading, setBookmarkLoading] = useState(false)
   const [bookmarkData, setBookmarkData] = useState<{ documentId: string }[] | []>([])
   const [bookmarkIdentifier, setBookmarkIdentifier] = useState(false)

   //===================Starts bookmark company============
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
                  company: {
                     documentId: {
                        $eq: data?.documentId || undefined
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
   }, [userId, bookmarkIdentifier, language])

   const isBookmarked = bookmarkData?.length > 0 || bookmarkIdentifier
   // bookmark handler
   const companyBookmarkHandler = async () => {
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
               type: "company",
               owner: {
                  id: session?.user?.id
               },
               company: {
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
   //===================Ends bookmark company============

   return (
      <Card
         sx={{
            position: "relative",
            borderRadius: 2,
            px: { xs: 1.5, md: 2 },
            py: { xs: 3, md: 2 }
         }}>
         <Grid container spacing={{ xs: 2.5, md: 4 }} alignItems={"center"}>
            <Grid item xs={12} sm={8}>
               <Stack
                  direction={{
                     sm: "row",
                     xs: "row"
                  }}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  gap={{ xs: 2, sm: 4 }}>
                  {/* logo  */}
                  <Stack
                     sx={{
                        justifyContent: "center",
                        alignItems: "center"
                     }}>
                     <Avatar
                        src={companyLogo}
                        alt={name || "companyLogo"}
                        sx={{
                           width: { xs: 70, sm: 80, md: 100 },
                           height: { xs: 70, sm: 80, md: 100 },
                           fontWeight: 700,
                           fontSize: "30px"
                        }}>
                        {name?.charAt(0) || ""}
                     </Avatar>
                  </Stack>
                  <Stack spacing={1.5}>
                     <Stack spacing={{ xs: 0.5, md: 1 }}>
                        {name && (
                           <Typography
                              variant={"h4"}
                              fontWeight={700}
                              fontSize={20}
                              sx={{
                                 color: (theme) =>
                                    mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary
                              }}>
                              {name}
                           </Typography>
                        )}
                        {tagline && (
                           <Typography
                              variant={"body1"}
                              fontWeight={400}
                              fontSize={16}
                              sx={{
                                 color: (theme) =>
                                    mode === "light"
                                       ? secondary_color || theme.palette.text.disabled
                                       : theme.palette.text.disabled
                              }}>
                              {tagline}
                           </Typography>
                        )}
                     </Stack>
                     <Stack direction='row' gap={1.5}>
                        {website && (
                           <Box
                              component={NextLink}
                              href={website}
                              target={"_blank"}
                              sx={{
                                 p: 1,
                                 borderRadius: 50,
                                 borderColor: (theme) => theme.palette.divider,
                                 borderWidth: 1,
                                 borderStyle: "solid",
                                 "&:hover": {
                                    bgcolor: (theme) => theme.palette.divider
                                 }
                              }}>
                              <CIcon
                                 icon='ph:globe-bold'
                                 size={20}
                                 sx={{
                                    color: (theme) =>
                                       mode === "light"
                                          ? secondary_color || theme.palette.text.disabled
                                          : theme.palette.text.disabled
                                 }}
                              />
                           </Box>
                        )}
                        {facebook && (
                           <Box
                              component={NextLink}
                              target={"_blank"}
                              href={facebook}
                              sx={{
                                 p: 1,
                                 borderRadius: 50,
                                 borderColor: (theme) => theme.palette.divider,
                                 borderWidth: 1,
                                 borderStyle: "solid",
                                 "&:hover": {
                                    bgcolor: (theme) => theme.palette.divider
                                 }
                              }}>
                              <CIcon
                                 icon='ri:facebook-fill'
                                 size={20}
                                 sx={{
                                    color: (theme) =>
                                       mode === "light"
                                          ? secondary_color || theme.palette.text.disabled
                                          : theme.palette.text.disabled
                                 }}
                              />
                           </Box>
                        )}
                        {twitter && (
                           <Box
                              component={NextLink}
                              target={"_blank"}
                              href={twitter}
                              sx={{
                                 p: 1,
                                 borderRadius: 50,
                                 borderColor: (theme) => theme.palette.divider,
                                 borderWidth: 1,
                                 borderStyle: "solid",
                                 "&:hover": {
                                    bgcolor: (theme) => theme.palette.divider
                                 }
                              }}>
                              <CIcon
                                 icon='mdi:twitter'
                                 size={20}
                                 sx={{
                                    color: (theme) =>
                                       mode === "light"
                                          ? secondary_color || theme.palette.text.disabled
                                          : theme.palette.text.disabled
                                 }}
                              />
                           </Box>
                        )}
                     </Stack>
                  </Stack>
               </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
               <Stack display={"flex"} alignItems={{ xs: "center", md: "flex-end" }} gap={1.5}>
                  {/* bookmark button  */}
                  <Box
                     sx={{
                        position: "absolute",
                        top: 5,
                        right: 3
                     }}>
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
                              <IconButton onClick={companyBookmarkHandler} color='primary'>
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
                              <IconButton onClick={companyBookmarkHandler} color='primary'>
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
                  </Box>
                  <Stack display={"flex"} alignItems={{ xs: "center", md: "flex-end" }}>
                     {email && (
                        <Typography
                           component={NextLink}
                           target={"_blank"}
                           href={`mailto:${email}`}
                           variant={"body1"}
                           sx={{
                              fontWeight: 400,
                              fontSize: "18px",
                              // color: (theme) => theme.palette.text.secondary,
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.secondary
                                    : theme.palette.text.secondary,
                              textDecoration: "none"
                           }}>
                           {email}
                        </Typography>
                     )}
                     {phone && (
                        <Typography
                           component={NextLink}
                           target={"_blank"}
                           href={`tel:${phone}`}
                           variant={"body1"}
                           sx={{
                              fontWeight: 400,
                              fontSize: "18px",
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.secondary
                                    : theme.palette.text.secondary,
                              textDecoration: "none"
                           }}>
                           {phone}
                        </Typography>
                     )}
                  </Stack>
               </Stack>
            </Grid>
         </Grid>
      </Card>
   )
}
export default CompanyHeader

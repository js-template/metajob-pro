"use client"
import { Fragment, useEffect, useState } from "react"
import NextLink from "next/link"
import toast from "react-hot-toast"
import { useSession } from "next-auth/react"
import { Button, CircularProgress, IconButton } from "@mui/material"
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { Card } from "../../components/common/card"
import CIcon from "../../components/common/icon"
import { IJobDetailsBlock, ISingleCompany, ISingleJob } from "./types"
import { createEntry, deleteEntry, find } from "../../lib/strapi"
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share"
import { ShareModal } from "./share-modal"
import ApplyJobModal from "./apply-job-modal"
import { useTheme } from "next-themes"

type Props = {
   data: ISingleJob
   companyData: ISingleCompany
   block: IJobDetailsBlock
   language?: string
}

const JobTitleCard = ({ data, companyData, block, language }: Props) => {
   const { theme: mode } = useTheme()
   const { data: session } = useSession()

   const { share_placeholder, apply_placeholder, styles } = block || {}
   const { color, secondary_color } = styles || {}
   const { documentId, title, company, category } = data || {}
   const userId = session?.user?.id
   const userRole = session?.user?.role?.type

   const logo = companyData?.logo?.url || ""

   const companyName = company?.name || ""
   const categoryName = category?.title || ""

   const [applyLoading, setApplyLoading] = useState(false)
   const [applyIdentifier, setApplyIdentifier] = useState(false)
   const [applyData, setApplyData] = useState<{ documentId: string }[] | []>([])
   const [bookmarkLoading, setBookmarkLoading] = useState(false)
   const [bookmarkIdentifier, setBookmarkIdentifier] = useState(false)
   const [bookmarkData, setBookmarkData] = useState<{ documentId: string }[] | []>([])
   const [shareModalOpen, setShareModalOpen] = useState(false)
   const [applyJobModalOpen, setApplyJobModalOpen] = useState(false)

   const handleCardModalOpen = () => setShareModalOpen(true)
   const handleCardModalClose = () => {
      setShareModalOpen(false)
   }

   const handleApplyJobModalOpen = () => {
      if (!session) {
         handleApplyJobModalClose()
         return toast.error("Please login to apply for this job")
      }
      setApplyJobModalOpen(true)
   }
   const handleApplyJobModalClose = () => {
      setApplyJobModalOpen(false)
   }

   //===================Starts apply job============
   // get the job-apply data
   useEffect(() => {
      const getApplyData = async () => {
         setApplyLoading(true)
         const { data: applyDataAll, error: applyDataError } = await find(
            "api/metajob-backend/applied-jobs",
            {
               filters: {
                  owner: {
                     id: {
                        $eq: userId || undefined
                     }
                  },
                  job: {
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
         if (!applyDataError) {
            setApplyData(applyDataAll?.data)
            setApplyLoading(false)
         } else {
            setApplyData([])
            setApplyLoading(false)
         }
      }
      if (userId) {
         if (!data?.id) return
         getApplyData()
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [userId, applyIdentifier])

   const isApplied = applyData?.length > 0 || applyIdentifier

   // apply job handler
   const jobApplyHandler = async (letterValue?: string) => {
      try {
         if (!session) {
            handleApplyJobModalClose()
            return toast.error("Please login to apply for this job")
         }
         if (userRole !== "candidate") {
            handleApplyJobModalClose()
            return toast.error("Only candidate can apply for job")
         }
         setApplyLoading(true)
         const inputData = {
            owner: {
               id: session?.user?.id
            },
            job: {
               connect: [documentId]
            },
            cover_letter: letterValue || "",
            apply_status: "Pending"
         }
         const {
            data: applyData,
            error,
            message
         } = await createEntry(`metajob-backend/applied-jobs?locale=${language ?? "en"}`, {
            data: inputData
         })
         if (error) {
            return toast.error(message || "Something went wrong")
         }
         if (applyData) {
            setApplyIdentifier(true)
            handleApplyJobModalClose()
            return toast.success("Job Applied Successfully")
         }
      } catch (err: any) {
         toast.error(err.message || "An Error Occurred")
      } finally {
         setApplyLoading(false)
      }
   }
   //===================Ends apply jobs============

   //===================Starts bookmark jobs============
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
                  job: {
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
   const jobBookmarkHandler = async () => {
      try {
         if (!session) {
            return toast.error("Please login to bookmark for this job")
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
               // mutate(bookmarkApiUrl)
               setBookmarkIdentifier(false)
               return toast.success("Bookmarked Removed")
            }
         } else {
            const inputData = {
               type: "job",
               owner: {
                  id: session?.user?.id
               },
               job: {
                  connect: [documentId]
               },
               locale: language ?? "en"
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
   //===================Ends bookmark jobs============

   return (
      <Fragment>
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
                     gap={{ xs: 0.5, sm: 4 }}>
                     {logo && (
                        <Avatar
                           src={logo}
                           alt={companyName || "company-logo"}
                           sx={{
                              width: { xs: 70, sm: 80, md: 100 },
                              height: { xs: 70, sm: 80, md: 100 },
                              fontWeight: 700
                           }}>
                           {companyName?.charAt(0) || ""}
                        </Avatar>
                     )}

                     <Stack spacing={{ xs: 2, md: 3 }}>
                        <Stack spacing={1} sx={{ textAlign: { xs: "center", sm: "left" } }}>
                           {title && (
                              <Typography
                                 variant={"h4"}
                                 fontWeight={700}
                                 sx={{
                                    maxWidth: { xs: "200px", sm: "100%" },
                                    fontSize: { xs: 20, md: 24 },
                                    color: (theme) =>
                                       mode === "light"
                                          ? color || theme.palette.text.primary
                                          : theme.palette.text.primary
                                 }}>
                                 {title}
                              </Typography>
                           )}
                           {categoryName && (
                              <Typography
                                 component={NextLink}
                                 href={`/find-job?category=${categoryName}`}
                                 variant={"body1"}
                                 fontWeight={400}
                                 fontSize={14}
                                 sx={{
                                    color: (theme) =>
                                       mode === "light"
                                          ? secondary_color || theme.palette.text.disabled
                                          : theme.palette.text.disabled,
                                    textDecoration: "none",
                                    "&:hover": {
                                       color: (theme) => theme.palette.primary.main
                                    }
                                 }}>
                                 {categoryName}
                              </Typography>
                           )}
                        </Stack>
                        {/* social-share  */}
                        <Stack
                           direction={{
                              xs: "column",
                              sm: "row"
                           }}
                           gap={{ xs: 1, sm: 4 }}
                           display={"flex"}
                           alignItems={"center"}>
                           <Typography
                              variant={"h1"}
                              fontWeight={700}
                              fontSize={14}
                              sx={{
                                 color: (theme) =>
                                    mode === "light"
                                       ? secondary_color || theme.palette.text.disabled
                                       : theme.palette.text.disabled
                              }}>
                              {share_placeholder || "Share on"}
                           </Typography>
                           <Stack
                              direction={"row"}
                              gap={2}
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              component={"span"}>
                              {/* facebook share link */}
                              <FacebookShareButton url={`${process.env.NEXT_PUBLIC_BASE_URL}/job/${data?.slug}`}>
                                 <Box
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
                                       icon={"ri:facebook-fill"}
                                       size={20}
                                       sx={{
                                          color: (theme) =>
                                             mode === "light"
                                                ? secondary_color || theme.palette.text.disabled
                                                : theme.palette.text.disabled
                                       }}
                                    />
                                 </Box>
                              </FacebookShareButton>
                              {/* twitter share link */}
                              <TwitterShareButton
                                 url={`${process.env.NEXT_PUBLIC_BASE_URL}/job/${data?.slug}`}
                                 title={data?.title || ""}>
                                 <Box
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
                                       icon={"mdi:twitter"}
                                       size={20}
                                       sx={{
                                          color: (theme) =>
                                             mode === "light"
                                                ? secondary_color || theme.palette.text.disabled
                                                : theme.palette.text.disabled
                                       }}
                                    />
                                 </Box>
                              </TwitterShareButton>
                              {/* <Box
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
                              <CIcon icon={"mdi:instagram"} size={20} />
                           </Box> */}
                              {/* linkedin share link */}
                              <LinkedinShareButton
                                 url={`${process.env.NEXT_PUBLIC_BASE_URL}/job/${data?.slug}`}
                                 source={`Metajob`}
                                 title={data?.title || ""}
                                 summary={data?.title || ""}>
                                 <Box
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
                                       icon={"akar-icons:linkedin-fill"}
                                       size={20}
                                       sx={{
                                          color: (theme) =>
                                             mode === "light"
                                                ? secondary_color || theme.palette.text.disabled
                                                : theme.palette.text.disabled
                                       }}
                                    />
                                 </Box>
                              </LinkedinShareButton>
                              {/* More Share button  */}
                              <Box
                                 onClick={() => {
                                    handleCardModalOpen()
                                 }}
                                 sx={{
                                    cursor: "pointer",
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
                                    icon={"solar:share-bold"}
                                    size={20}
                                    sx={{
                                       color: (theme) =>
                                          mode === "light"
                                             ? secondary_color || theme.palette.text.disabled
                                             : theme.palette.text.disabled
                                    }}
                                 />
                              </Box>
                           </Stack>
                        </Stack>
                     </Stack>
                  </Stack>
               </Grid>
               {/* buttons  */}
               <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "flex-end",
                     height: "100%"
                  }}>
                  {/* bookmark button  */}
                  <Box
                     sx={{
                        position: "absolute",
                        top: 5,
                        right: 2
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
                              <IconButton onClick={jobBookmarkHandler} color='primary'>
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
                              <IconButton onClick={jobBookmarkHandler} color='primary'>
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
                  {/* apply button  */}
                  <Stack
                     display={"flex"}
                     alignItems={"flex-end"}
                     justifyContent={"flex-end"}
                     sx={{ pt: { xs: 0, sm: 6 } }}>
                     {isApplied ? (
                        <Button
                           disabled
                           sx={{
                              width: {
                                 xs: "100%",
                                 sm: 150
                              },
                              // line clamp 1
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              WebkitLineClamp: 1
                           }}
                           variant='contained'
                           color='primary'>
                           Applied
                        </Button>
                     ) : (
                        <LoadingButton
                           onClick={handleApplyJobModalOpen}
                           loading={applyLoading}
                           // loadingPosition='start'
                           sx={{
                              width: {
                                 // sm: "100%",
                                 xs: "100%",
                                 sm: 150
                              },
                              // line clamp 1
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              WebkitLineClamp: 1
                           }}
                           variant='contained'
                           color='primary'>
                           {applyLoading ? "Checking" : apply_placeholder || "Apply Now"}
                        </LoadingButton>
                     )}
                  </Stack>
               </Grid>
            </Grid>
         </Card>
         <ShareModal
            open={shareModalOpen}
            handleClose={handleCardModalClose}
            title='More Share Options'
            data={data}
            secondary_color={secondary_color}
         />
         <ApplyJobModal
            open={applyJobModalOpen}
            handleClose={handleApplyJobModalClose}
            jobApplyHandler={jobApplyHandler}
            applyLoading={applyLoading}
            title='Apply Job'
            data={data}
         />
      </Fragment>
   )
}

export default JobTitleCard

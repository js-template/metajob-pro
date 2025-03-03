"use client"
import { useEffect, useState } from "react"
import useSWR, { mutate } from "swr"
import toast from "react-hot-toast"
import { useSession } from "next-auth/react"
import { Button, CircularProgress, IconButton } from "@mui/material"
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { Card } from "../../components/common/card"
import CIcon from "../../components/common/icon"
import { ISingleCompany, ISingleJob } from "./types"
import { createEntry, deleteEntry, find } from "../../lib/strapi"
import { fetcher } from "./hook"

type Props = {
   data: ISingleJob
   companyData: ISingleCompany
}

const JobTitleCard = ({ data, companyData }: Props) => {
   const { data: session } = useSession()

   const { documentId, title, company, category } = data || {}
   const userId = session?.user?.id
   const userRole = session?.user?.role?.type

   const logo = companyData?.logo?.url || ""
   //===================Ends fetching company data============

   const companyName = company?.name || ""
   const categoryName = category?.title || ""

   //===================Starts apply jobs============
   const [applyLoading, setApplyLoading] = useState(false)
   const [applyIdentifier, setApplyIdentifier] = useState(false)
   const queryParams = {
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
      populate: "*"
   }
   const queryString = encodeURIComponent(JSON.stringify(queryParams))
   // Construct the API URL
   const apiUrl = userId ? `/api/find?model=api/metajob-backend/applied-jobs&query=${queryString}&cache=no-store` : null
   const { data: appliedListMain, error, isLoading } = useSWR(apiUrl, fetcher)
   // check the job is applied
   const isApplied = appliedListMain?.data?.length > 0 || applyIdentifier

   // apply job handler
   const jobApplyHandler = async () => {
      try {
         if (!session) {
            return toast.error("Please login to apply for this job")
         }
         if (userRole !== "candidate") {
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
            apply_status: "Pending"
         }
         const {
            data: applyData,
            error,
            message
         } = await createEntry("metajob-backend/applied-jobs", {
            data: inputData
         })

         if (error) {
            return toast.error(message || "Something went wrong")
         }

         if (applyData) {
            setApplyIdentifier(true)
            return toast.success("Job Applied Successfully", {
               icon: "🚀"
            })
         }
      } catch (err: any) {
         toast.error(err.message || "An Error Occurred")
      } finally {
         setApplyLoading(false)
      }
   }
   //===================Ends apply jobs============

   //===================Starts bookmark jobs============
   const [bookmarkLoading, setBookmarkLoading] = useState(false)
   const [bookmarkIdentifier, setBookmarkIdentifier] = useState(false)
   const [bookmarkData, setBookmarkData] = useState<{ documentId: string }[] | []>([])

   // *** get the bookmark data
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
                     id: {
                        $eq: data?.id || undefined
                     }
                  }
               },
               populate: "*"
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
   // apply job handler
   const jobBookmarkHandler = async () => {
      try {
         if (!session) {
            return toast.error("Please login to bookmark for this job")
         }
         setBookmarkLoading(true)
         if (isBookmarked) {
            if (!bookmarkData?.[0]?.documentId) {
               return toast.error("Please wait to load bookmark status")
            }
            const bookmarkDocId = bookmarkData?.[0]?.documentId
            const { success, error } = await deleteEntry("api/metajob-backend/bookmarks", bookmarkDocId)

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
               }
            }
            const {
               data: bookmarkData,
               error,
               message
            } = await createEntry("metajob-backend/bookmarks", {
               data: inputData
            })

            if (error) {
               return toast.error(message || "Something went wrong")
            }

            if (bookmarkData) {
               setBookmarkIdentifier(true)
               // mutate(bookmarkApiUrl)
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
      <Card
         sx={{
            borderRadius: 2,
            p: 2
         }}>
         <Grid container spacing={4} alignItems={"center"}>
            <Grid item xs={12} sm={8}>
               <Stack
                  direction={{
                     sm: "row",
                     xs: "column"
                  }}
                  alignItems={"center"}
                  gap={4}>
                  {logo && (
                     <Avatar
                        src={logo}
                        alt={companyName || "company-logo"}
                        sx={{
                           width: 100,
                           height: 100,
                           fontWeight: 700
                        }}>
                        {companyName?.charAt(0) || ""}
                     </Avatar>
                  )}

                  <Stack spacing={2}>
                     <Stack spacing={1}>
                        {title && (
                           <Typography
                              variant={"h4"}
                              fontWeight={700}
                              fontSize={24}
                              sx={{
                                 color: (theme) => theme.palette.text.primary
                              }}>
                              {title}
                           </Typography>
                        )}
                        {categoryName && (
                           <Typography
                              variant={"body1"}
                              fontWeight={400}
                              fontSize={14}
                              sx={{
                                 color: (theme) => theme.palette.text.disabled
                              }}>
                              {categoryName}
                           </Typography>
                        )}
                     </Stack>
                     {/* social-share  */}
                     <Stack
                        direction={{
                           xs: "column",
                           md: "row"
                        }}
                        gap={4}
                        display={"flex"}
                        alignItems={"center"}>
                        <Typography
                           variant={"h1"}
                           fontWeight={700}
                           fontSize={14}
                           sx={{
                              color: (theme) => theme.palette.text.disabled
                           }}>
                           Share on
                        </Typography>
                        <Stack
                           direction={"row"}
                           gap={2}
                           display={"flex"}
                           justifyContent={"center"}
                           alignItems={"center"}
                           component={"span"}>
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
                              <CIcon icon={"ri:facebook-fill"} size={20} />
                           </Box>
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
                              <CIcon icon={"mdi:twitter"} size={20} />
                           </Box>
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
                              <CIcon icon={"mdi:instagram"} size={20} />
                           </Box>
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
                              <CIcon icon={"akar-icons:linkedin-fill"} size={20} />
                           </Box>
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
                              <CIcon icon={"solar:share-bold"} size={20} />
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
                  gap: 5,
                  justifyContent: "space-between"
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
               <Stack display={"flex"} alignItems={"flex-end"} gap={1}>
                  {isApplied ? (
                     <Button
                        disabled
                        size='small'
                        sx={{
                           py: 1,
                           width: {
                              sm: 150,
                              xs: "100%"
                           }
                        }}
                        variant='contained'
                        color='primary'>
                        Applied
                     </Button>
                  ) : (
                     <LoadingButton
                        onClick={jobApplyHandler}
                        loading={applyLoading || isLoading}
                        // loadingPosition='start'
                        size='small'
                        sx={{
                           py: 1,
                           width: {
                              sm: 150,
                              xs: "100%"
                           }
                        }}
                        variant='contained'
                        color='primary'>
                        {isLoading ? "Checking" : "Apply Now"}
                     </LoadingButton>
                  )}
               </Stack>
            </Grid>
         </Grid>
      </Card>
   )
}

export default JobTitleCard

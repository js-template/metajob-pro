"use client"
import { useState } from "react"
import useSWR from "swr"
import toast from "react-hot-toast"
import { Button } from "@mui/material"
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { Card } from "../../components/common/card"
import CIcon from "../../components/common/icon"
import { ISingleJob, IUserSession } from "./types"
import { createEntry } from "../../lib/strapi"
import { fetcher } from "./hook"

type Props = {
   data: ISingleJob
   session?: IUserSession | null | any
}

const JobTitleCard = ({ data, session }: Props) => {
   const { documentId, title, company, category } = data || {}

   //===================Starts fetching company data============
   const companyQueryParams = {
      populate: {
         logo: {
            fields: ["url"]
         }
      },
      filters: {
         documentId: {
            $eq: company?.documentId
         }
      }
   }
   const companyQueryString = encodeURIComponent(JSON.stringify(companyQueryParams))
   const companyAPiUrl = `/api/find?model=api/metajob-backend/companies&query=${companyQueryString}`
   const { data: companyData } = useSWR(companyAPiUrl, fetcher, {
      fallbackData: []
   })

   const logo = companyData?.data?.[0]?.logo?.url || ""
   //===================Ends fetching company data============

   const companyName = company?.name || ""
   const categoryName = category?.title || ""

   //===================Starts apply jobs============
   const [applyLoading, setApplyLoading] = useState(false)
   const [applyIdentifier, setApplyIdentifier] = useState(false)

   const userId = session?.user?.id
   const userRole = session?.user?.role?.type

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

   // Convert queryParams to a string for the URL
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
            toast.error(message || "Something went wrong")
            return false
         }

         if (applyData) {
            setApplyIdentifier(true)
            toast.success("Job Applied Successfully", {
               icon: "🚀"
            })
            return true
         }
         return true
      } catch (err: any) {
         toast.error(err.message || "An Error Occurred")
      } finally {
         setApplyLoading(false)
      }
   }
   //===================Ends apply jobs============

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
                              color={(theme) => theme.palette.text.primary}>
                              {title}
                           </Typography>
                        )}
                        {categoryName && (
                           <Typography
                              variant={"body1"}
                              fontWeight={400}
                              fontSize={14}
                              color={(theme) => theme.palette.text.disabled}>
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
                           color={(theme) => theme.palette.text.disabled}>
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
            <Grid item xs={12} sm={4}>
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
                        loadingPosition='start'
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

"use client"
import useSWR from "swr"
import { Grid, Stack, Typography } from "@mui/material"
import { fetcher } from "./hook"
import OpenListLoader from "./job-loader"
import { JobItem } from "../../components/cards/job-item"
import { ISingleJob } from "./types"

type Props = {
   id?: number
   language?: string
   empty?: {
      title: string
      description: string
   }
}

const OpenJobs = ({ id, language, empty }: Props) => {
   const companyId = id

   const queryParams = {
      filters: {
         company: {
            id: {
               $eq: companyId || undefined
            }
         }
      },
      populate: {
         company: {
            populate: {
               logo: {
                  fields: ["url"]
               }
            }
         },
         type: {
            fields: ["title"]
         },
         category: {
            fields: ["title", "documentId"]
         }
      },
      pagination: {
         pageSize: 5,
         page: 1
      },
      publicationState: "live",
      locale: language ? [language] : ["en"]
   }

   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = companyId ? `/api/find?model=api/metajob-backend/jobs&query=${queryString}&cache=no-store` : null
   // fetch open list data
   const { data: openJobsData, error: jobsError, isLoading } = useSWR(apiUrl, fetcher)

   if (!companyId) {
      return ""
   }

   return (
      <Stack spacing={4}>
         <Typography variant={"h1"} fontWeight={700} fontSize={24} color={(theme) => theme.palette.text.primary}>
            Open Job
         </Typography>
         <Stack>
            {openJobsData && openJobsData?.data?.length > 0 && (
               <Grid container spacing={2}>
                  {openJobsData?.data?.slice(0, 4)?.map((item: ISingleJob) => (
                     <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <JobItem data={item} />
                     </Grid>
                  ))}
               </Grid>
            )}

            {/* not data found */}
            {!jobsError && openJobsData?.data?.length === 0 && (
               <Stack
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     py: 4
                  }}>
                  <Typography fontSize={16} fontWeight={400} color={(theme) => theme.palette.text.secondary}>
                     {empty?.title || "No Open Job Found"}
                  </Typography>
               </Stack>
            )}

            {/* loader */}
            {isLoading && (
               <Grid container spacing={2}>
                  {[...Array(3)].map((_, index) => (
                     <Grid key={index} item xs={12} sm={6} md={4}>
                        <OpenListLoader />
                     </Grid>
                  ))}
               </Grid>
            )}
         </Stack>
      </Stack>
   )
}

export default OpenJobs

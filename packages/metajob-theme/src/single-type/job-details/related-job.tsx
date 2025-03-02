"use client"
import useSWR from "swr"
import { Container, Grid, Stack, Typography } from "@mui/material"
import { fetcher } from "./hook"
import ListCardLoader from "./loader"
import { ISingleJob } from "./types"
import { JobItem } from "../../components/cards/job-item"

type Props = {
   data: ISingleJob
   language?: string
}
const RelatedJob = ({ data, language }: Props) => {
   const categoryId = data?.category?.id

   const queryParams = {
      filters: {
         id: {
            $ne: data?.id
         },
         category: {
            id: {
               $eq: categoryId
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
         pageSize: 4,
         page: 1
      },
      publicationState: "live",
      locale: language ?? ["en"]
   }

   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = categoryId ? `/api/find?model=api/metajob-backend/jobs&query=${queryString}&cache=no-store` : null
   // fetch related list data
   const { data: relatedJobsData, error: jobsError, isLoading } = useSWR(apiUrl, fetcher)

   if (!categoryId) {
      return ""
   }
   return (
      <Stack bgcolor={(theme) => theme.palette.background.paper}>
         <Container
            maxWidth='lg'
            sx={{
               py: 8
            }}>
            <Stack spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               <Stack spacing={1}>
                  <Typography
                     sx={{
                        color: (theme) => theme.palette.primary.main
                      }}
                     fontWeight={700}
                     fontSize={16}
                     textAlign={"center"}>
                     Related Jobs
                  </Typography>
                  <Typography
                    sx={{
                     color: (theme) => theme.palette.text.primary
                   }}
                     fontWeight={700}
                     fontSize={32}
                     textAlign={"center"}>
                     Latest Related Jobs For You
                  </Typography>
               </Stack>
               {/* loader */}
               {isLoading && (
                  <Grid container spacing={2}>
                     {[...Array(3)].map((_, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                           <ListCardLoader />
                        </Grid>
                     ))}
                  </Grid>
               )}

               {relatedJobsData && relatedJobsData?.data?.length > 0 && (
                  <Grid container spacing={2}>
                     {relatedJobsData?.data?.slice(0, 4)?.map((item: ISingleJob) => (
                        <Grid item xs={12} sm={6} md={3} key={item?.id}>
                           <JobItem data={item} />
                        </Grid>
                     ))}
                  </Grid>
               )}

               {/* not data found */}
               {!jobsError && relatedJobsData?.data?.length === 0 && (
                  <Stack
                     sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        py: 4
                     }}>
                     <Typography fontSize={16} fontWeight={400}   sx={{
     color: (theme) => theme.palette.text.secondary
   }}>
                        No Jobs Found
                     </Typography>
                  </Stack>
               )}
            </Stack>
         </Container>
      </Stack>
   )
}

export default RelatedJob

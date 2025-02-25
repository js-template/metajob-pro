"use client"

import { useParams } from "next/navigation"
import useSWR from "swr"
import { Container, Grid, Stack } from "@mui/material"
import ProfileSection from "./profile"
import DetailsSection from "./details"
import { Card } from "../../components/common/card"
import PageHeader from "../../components/common/public-page-header"
import { resumeFetcher } from "./hook"
import { IResumeDetailsBlock, ISingleResume } from "./types"

export const ResumeDetails = ({
   data,
   language,
   block
}: {
   data: ISingleResume
   language?: string
   block: IResumeDetailsBlock
}) => {
   const params = useParams<{ slug: string; item: string }>()
   const pageSlug = params.slug as string
   const itemSlug = params.item as string

   const { title, empty } = block

   const queryParams = {
      filters: {
         slug: {
            $eq: itemSlug
         }
      },
      // populate: "*",
      populate: {
         user: {
            populate: {
               avatar: {
                  fields: ["url"]
               }
            }
         },
         experience: {
            populate: "*"
         },
         education: {
            populate: "*"
         },
         portfolio: {
            populate: "*"
         },
         experience_time: {
            populate: "*"
         },
         category: {
            populate: "*"
         }
      },
      publicationState: "live",
      locale: language ?? ["en"]
   }

   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = `/api/find?model=api/metajob-backend/resumes&query=${queryString}&cache=no-store`

   const {
      data: resumeData,
      error: resumeError,
      isLoading
   } = useSWR(apiUrl, resumeFetcher, {
      fallback: data
   })

   return (
      <Stack>
         <PageHeader title={title || "Candidate Profile"} />
         <Container maxWidth='lg' sx={{ py: 6 }}>
            <Grid container spacing={4}>
               <Grid item xs={12} md={4}>
                  <ProfileSection data={resumeData} />
               </Grid>
               <Grid item xs={12} md={8}>
                  <Card
                     sx={{
                        p: 3,
                        borderRadius: 2
                     }}>
                     <DetailsSection data={resumeData} isLoading={isLoading} />
                  </Card>
               </Grid>
            </Grid>
         </Container>
      </Stack>
   )
}

"use client"
import NextLink from "next/link"
import { useTheme } from "next-themes"
import _ from "lodash"
import useSWR from "swr"
import { Box, Button, Container, Grid, Stack, Typography, useTheme as muiTheme } from "@mui/material"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { fetcher, getRelationIds } from "./hook"
import JobCardLoader from "./loader"
import { IJobCardBlock, IUserSession } from "./types"
import { SectionTitle } from "../../components/section-title"
import { JobItem } from "../../components/cards/job-item"

type Props = {
   block: IJobCardBlock
   data?: any
   language?: string
   session?: IUserSession | null | any
}

export const JobCard = ({ block, language }: Props) => {
   const { theme: mode } = useTheme()
   const theme = muiTheme()

   // destructure the block
   const { content, empty, style, button } = block || {}
   const { desktop, tab, mobile, backgroundColor, color } = style || {}
   const { label, link, target, disabled } = button || {}

   const queryParams = {
      filters: {
         // id: {
         //    $eq: jobIds?.length > 0 ? jobIds : undefined
         // }
         is_featured: {
            $eq: true
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
         }
      },

      pagination: {
         pageSize: 4,
         page: 1
      },
      publicationState: "live",
      locale: language ? [language] : ["en"]
   }

   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = `/api/find?model=api/metajob-backend/jobs&query=${queryString}&cache=no-store`
   // fetch job  data
   const { data: JobsData, error: JobsError, isLoading } = useSWR(apiUrl, fetcher)

   return (
      <Stack sx={{ bgcolor: backgroundColor ? backgroundColor : theme.palette.background.paper }}>
         <Container maxWidth='lg'>
            <Stack py={8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* section-title  */}
               {content && <SectionTitle data={content} />}
               {JobsData && JobsData?.data?.length > 0 && (
                  <Grid container spacing={2}>
                     {_.map(JobsData?.data, (item) => (
                        <Grid key={item?.id} item xs={mobile || 12} sm={tab || 6} md={desktop || 3}>
                           {/* <CardItem data={item} /> */}
                           <JobItem data={item} />
                        </Grid>
                     ))}
                  </Grid>
               )}
               {/* loader */}
               {isLoading && (
                  <Grid container spacing={2}>
                     {[...Array(4)].map((_, index) => (
                        <Grid key={index} item xs={mobile || 12} sm={tab || 6} md={desktop || 3}>
                           <JobCardLoader />
                        </Grid>
                     ))}
                  </Grid>
               )}

               {/* empty data */}
               {!JobsError && !isLoading && JobsData?.data?.length == 0 && (
                  <Grid container justifyContent={"center"} spacing={2}>
                     <Stack
                        sx={{
                           display: "flex",
                           flexDirection: "column",
                           alignItems: "center",
                           gap: 0.5,
                           py: 4
                        }}>
                        <Typography variant='body1' sx={{ color: (theme) => theme.palette.text.secondary }}>
                           {empty?.title || "No data found"}
                        </Typography>
                        <Typography variant='body2' sx={{ color: (theme) => theme.palette.text.secondary }}>
                           {empty?.description || "Try to refresh the page or check back later"}
                        </Typography>
                     </Stack>
                  </Grid>
               )}

               <Box>
                  <Button
                     disabled={disabled}
                     component={NextLink}
                     href={link || "/find-job"}
                     target={target ?? "_self"}
                     sx={{
                        bgcolor: (theme) =>
                           mode === "dark"
                              ? theme.palette.background.paper
                              : hexToRGBA(theme.palette.secondary.main, 0.7),
                        color: "white",
                        "&:hover": {
                           bgcolor: "primary.main"
                        }
                     }}>
                     {label || "View All Jobs"}
                  </Button>
               </Box>
            </Stack>
         </Container>
      </Stack>
   )
}

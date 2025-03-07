"use client"
import { Container, Grid, Stack, Typography } from "@mui/material"
import { ISingleJob } from "./types"
import { JobItem } from "../../components/cards/job-item"

type Props = {
   relatedJobsData?: ISingleJob[]
}
const RelatedJob = ({ relatedJobsData }: Props) => {
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
               {/* {isLoading && (
                  <Grid container spacing={2}>
                     {[...Array(3)].map((_, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                           <ListCardLoader />
                        </Grid>
                     ))}
                  </Grid>
               )} */}

               {relatedJobsData && relatedJobsData?.length > 0 && (
                  <Grid container spacing={2}>
                     {relatedJobsData?.slice(0, 4)?.map((item: ISingleJob) => (
                        <Grid item xs={12} sm={6} md={3} key={item?.id}>
                           <JobItem data={item} />
                        </Grid>
                     ))}
                  </Grid>
               )}

               {/* not data found */}
               {!relatedJobsData ||
                  (relatedJobsData?.length === 0 && (
                     <Stack
                        sx={{
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "center",
                           py: 4
                        }}>
                        <Typography
                           fontSize={16}
                           fontWeight={400}
                           sx={{
                              color: (theme) => theme.palette.text.secondary
                           }}>
                           No Jobs Found
                        </Typography>
                     </Stack>
                  ))}
            </Stack>
         </Container>
      </Stack>
   )
}

export default RelatedJob

"use client"
import { useTheme } from "next-themes"
import { Container, Grid, Stack, Typography } from "@mui/material"
import { IJobDetailsBlock, ISingleJob } from "./types"
import { JobItem } from "../../components/cards/job-item"

type Props = {
   relatedJobsData?: ISingleJob[]
   block: IJobDetailsBlock
}
const RelatedJob = ({ relatedJobsData, block }: Props) => {
   const { theme: mode } = useTheme()
   const { related_jobs_title, related_jobs_subtitle, card_button, empty, styles } = block || {}

   const { backgroundColor, color, secondary_color, header_color, sub_header_color, desktop, tab, mobile } =
      styles || {}

   return (
      <Stack
         bgcolor={(theme) =>
            mode === "light" ? backgroundColor || theme.palette.background.paper : theme.palette.background.paper
         }>
         <Container
            maxWidth='lg'
            sx={{
               py: 8
            }}>
            <Stack gap={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               <Stack spacing={1}>
                  <Typography
                     sx={{
                        color: (theme) =>
                           mode === "light"
                              ? sub_header_color || theme.palette.primary.main
                              : theme.palette.primary.main
                     }}
                     fontWeight={700}
                     fontSize={16}
                     textAlign={"center"}>
                     {related_jobs_subtitle || "Related Jobs"}
                  </Typography>
                  <Typography
                     sx={{
                        color: (theme) =>
                           mode === "light" ? header_color || theme.palette.text.primary : theme.palette.text.primary
                     }}
                     fontWeight={700}
                     fontSize={{ xs: 24, sm: 32 }}
                     textAlign={"center"}>
                     {related_jobs_title || "Latest Related Jobs For You"}
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
                  <Grid container spacing={{ xs: 1, md: 2 }}>
                     {relatedJobsData?.slice(0, 4)?.map((item: ISingleJob) => (
                        <Grid item xs={mobile || 12} sm={tab || 6} md={desktop || 3} key={item?.id}>
                           <JobItem
                              data={item}
                              button_label={card_button}
                              color={color}
                              secondary_color={secondary_color}
                           />
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
                           {empty?.title || "No Jobs Found"}
                        </Typography>
                     </Stack>
                  ))}
            </Stack>
         </Container>
      </Stack>
   )
}

export default RelatedJob

"use client"
import { Grid, Stack, Typography } from "@mui/material"
import { JobItem } from "../../components/cards/job-item"
import { ICompanyDetailsBlock, ISingleJob } from "./types"

type Props = {
   openJobsData?: ISingleJob[]
   block: ICompanyDetailsBlock
}

const OpenJobs = ({ block, openJobsData }: Props) => {
   const { empty, open_jobs_title, card_button } = block || {}
   console.log("OpenJobs block", block)
   return (
      <Stack spacing={4}>
         <Typography
            variant={"h1"}
            fontWeight={700}
            fontSize={24}
            sx={{
               color: (theme) => theme.palette.text.primary
            }}>
            {open_jobs_title || "Open Job"}
         </Typography>
         <Stack>
            {/* {openJobsData && openJobsData?.data?.length > 0 && ( */}
            {openJobsData && openJobsData?.length > 0 && (
               <Grid container spacing={2}>
                  {openJobsData?.slice(0, 4)?.map((item: ISingleJob) => (
                     <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <JobItem data={item} button_label={card_button} />
                     </Grid>
                  ))}
               </Grid>
            )}

            {/* not data found */}
            {(!openJobsData || openJobsData?.length === 0) && (
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
                     {empty?.title || "No Open Job Found"}
                  </Typography>
               </Stack>
            )}

            {/* loader */}
            {/* {isLoading && (
               <Grid container spacing={2}>
                  {[...Array(3)].map((_, index) => (
                     <Grid key={index} item xs={12} sm={6} md={4}>
                        <OpenListLoader />
                     </Grid>
                  ))}
               </Grid>
            )} */}
         </Stack>
      </Stack>
   )
}

export default OpenJobs

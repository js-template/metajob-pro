"use client"
import { Box, Container, Grid, Stack } from "@mui/material"
import GoBackBtn from "../../components/common/go-back-btn"
import PageHeader from "../../components/common/public-page-header"
import { Sidebar } from "./sidebar"
import CompanyHeader from "./header"
import AboutSection from "./about"
import { ICompanyDetailsBlock, ISingleCompany, ISingleJob } from "./types"
import OpenJobs from "./open-jobs"

type Props = {
   data: ISingleCompany
   language?: string
   block: ICompanyDetailsBlock
   openJobsData?: ISingleJob[]
}

const CompanyDetailsClient = ({ data, language, block, openJobsData }: Props) => {
   const { title, empty, open_jobs } = block || {}

   if (!data) {
      return (
         <Stack bgcolor={(theme) => theme.palette.background.default}>
            <PageHeader title={title || "Company Profile"} />
            <Stack
               sx={{
                  minHeight: "50vh",
                  justifyContent: "center",
                  alignItems: "center"
               }}>
               <h3>{empty?.title}</h3>
               <GoBackBtn />
            </Stack>
         </Stack>
      )
   }
   return (
      <Stack>
         <PageHeader title={title || "Company Profile"} />
         <Container maxWidth='lg' sx={{ py: 6 }}>
            <Grid container spacing={4}>
               <Grid item xs={12} md={8}>
                  <Stack spacing={4}>
                     <CompanyHeader data={data} />
                     <AboutSection data={data?.about} />
                     {open_jobs && <OpenJobs openJobsData={openJobsData} block={block} />}
                     {/* <CommentsSection /> */}
                  </Stack>
               </Grid>
               <Grid item xs={12} md={4}>
                  <Sidebar data={data} block={block} />
               </Grid>
            </Grid>
         </Container>
      </Stack>
   )
}

export default CompanyDetailsClient

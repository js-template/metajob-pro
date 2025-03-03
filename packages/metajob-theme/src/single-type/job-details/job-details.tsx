"use client"
import { Container, Grid, Stack } from "@mui/material"
import GoBackBtn from "../../components/common/go-back-btn"
import PageHeader from "../../components/common/public-page-header"
import Details from "./details"
import JobTitleCard from "./title-card"
import Sidebar from "./sidebar"
import { IJobDetailsBlock, ISingleCompany, ISingleJob, IUserSession } from "./types"
import RelatedJob from "./related-job"

type Props = {
   data: ISingleJob
   language?: string
   session?: IUserSession | null | any
   block: IJobDetailsBlock
   companyData: ISingleCompany
}

const JobDetailsClient = ({ data, block, language, companyData }: Props) => {
   const { title, empty, related_lists } = block || {}

   if (!data) {
      return (
         <Stack bgcolor={(theme) => theme.palette.background.default}>
            <PageHeader title={title || ""} />
            <Stack
               sx={{
                  minHeight: "50vh",
                  justifyContent: "center",
                  alignItems: "center"
               }}>
               <h3>{empty?.title || "No Job Found"}</h3>
               <GoBackBtn />
            </Stack>
         </Stack>
      )
   }
   return (
      <Stack>
         <Stack bgcolor={(theme) => theme.palette.background.default}>
            <PageHeader title={title || data?.title || ""} />
            <Container maxWidth='lg' sx={{ py: 6 }}>
               <Grid container spacing={4}>
                  <Grid item xs={12} md={8}>
                     <Stack spacing={4}>
                        <JobTitleCard data={data} companyData={companyData} />
                        <Details data={data} />
                     </Stack>
                  </Grid>
                  <Grid item xs={12} md={4}>
                     <Sidebar data={data} />
                  </Grid>
               </Grid>
            </Container>
         </Stack>
         {data && related_lists && <RelatedJob data={data} language={language} />}
      </Stack>
   )
}

export default JobDetailsClient

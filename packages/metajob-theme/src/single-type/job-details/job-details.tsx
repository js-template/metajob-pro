"use client"
import { useTheme } from "next-themes"
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
   block: IJobDetailsBlock
   companyData: ISingleCompany
   relatedJobsData: ISingleJob[]
}

const JobDetailsClient = ({ data, block, language, companyData, relatedJobsData }: Props) => {
   const { theme: mode } = useTheme()

   const { title, empty, related_lists, skill_placeholder, styles, show_header } = block || {}
   const { backgroundColor, color, secondary_color, header_color, header_bg_color, section_padding, sidebar } =
      styles || {}
   const isRightSidebar = sidebar === "Right Sidebar"
   const isNoSidebar = sidebar === "No Sidebar"

   if (!data) {
      return (
         <Stack bgcolor={(theme) => theme.palette.background.default}>
            <PageHeader title={title || ""} header_color={header_color} header_bg_color={header_bg_color} />
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
         <Stack
            bgcolor={(theme) =>
               mode === "light" ? backgroundColor || theme.palette.background.default : theme.palette.background.default
            }>
            {show_header && (
               <PageHeader
                  title={title || data?.title || ""}
                  header_bg_color={header_bg_color}
                  header_color={header_color}
               />
            )}
            <Container maxWidth='lg' sx={{ py: section_padding || 6 }}>
               <Grid container spacing={4} direction={isRightSidebar ? "row" : "row-reverse"}>
                  <Grid item xs={12} md={!isNoSidebar ? 8 : 12}>
                     <Stack spacing={4}>
                        <JobTitleCard data={data} companyData={companyData} block={block} language={language} />
                        <Details
                           data={data}
                           skillTitle={skill_placeholder}
                           color={color}
                           secondary_color={secondary_color}
                        />
                     </Stack>
                  </Grid>
                  {!isNoSidebar && (
                     <Grid item xs={12} md={4}>
                        <Sidebar data={data} companyData={companyData} block={block} />
                     </Grid>
                  )}
               </Grid>
            </Container>
         </Stack>
         {data && related_lists && <RelatedJob relatedJobsData={relatedJobsData} block={block} />}
      </Stack>
   )
}

export default JobDetailsClient

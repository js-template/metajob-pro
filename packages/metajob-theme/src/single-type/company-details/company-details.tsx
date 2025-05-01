"use client"
import { useTheme } from "next-themes"
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
   const { theme: mode } = useTheme()
   const { title, empty, open_jobs, styles, show_header } = block || {}
   const { backgroundColor, color, secondary_color, header_color, header_bg_color, section_padding, sidebar } =
      styles || {}
   const isRightSidebar = sidebar === "Right Sidebar"
   const isNoSidebar = sidebar === "No Sidebar"

   if (!data) {
      return (
         <Stack bgcolor={(theme) => theme.palette.background.default}>
            <PageHeader
               title={title || "Company Profile"}
               header_color={header_color}
               header_bg_color={header_bg_color}
            />
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
      <Stack
         bgcolor={(theme) =>
            mode === "light" ? backgroundColor || theme.palette.background.default : theme.palette.background.default
         }>
         {show_header && (
            <PageHeader
               title={title || "Company Profile"}
               header_color={header_color}
               header_bg_color={header_bg_color}
            />
         )}
         <Container maxWidth='lg' sx={{ py: section_padding || 6 }}>
            <Grid container spacing={4} direction={isRightSidebar ? "row" : "row-reverse"}>
               <Grid item xs={12} md={!isNoSidebar ? 8 : 12}>
                  <Stack spacing={{ xs: 3, md: 4 }}>
                     <CompanyHeader data={data} language={language} color={color} secondary_color={secondary_color} />
                     <AboutSection data={data?.about} />
                     {open_jobs && <OpenJobs openJobsData={openJobsData} block={block} />}
                     {/* <CommentsSection /> */}
                  </Stack>
               </Grid>
               {!isNoSidebar && (
                  <Grid item xs={12} md={4}>
                     <Sidebar data={data} block={block} />
                  </Grid>
               )}
            </Grid>
         </Container>
      </Stack>
   )
}

export default CompanyDetailsClient

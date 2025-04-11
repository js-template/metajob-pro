"use client"
import { useTheme } from "next-themes"
import { Container, Grid, Stack } from "@mui/material"
import ProfileSection from "./profile"
import DetailsSection from "./details"
import { Card } from "../../components/common/card"
import PageHeader from "../../components/common/public-page-header"
import { IResumeDetailsBlock, ISingleResume } from "./types"

type Props = {
   data: ISingleResume
   language?: string
   block: IResumeDetailsBlock
}

const ResumeDetailsClient = ({ data, block, language }: Props) => {
   const { theme: mode } = useTheme()

   const { title, empty, styles, show_header } = block
   const { backgroundColor, color, secondary_color, header_color, header_bg_color, section_padding, sidebar } =
      styles || {}
   const isRightSidebar = sidebar === "Right Sidebar"
   const isNoSidebar = sidebar === "No Sidebar"

   return (
      <Stack
         bgcolor={(theme) =>
            mode === "light" ? backgroundColor || theme.palette.background.default : theme.palette.background.default
         }>
         {show_header && (
            <PageHeader
               title={title || "Candidate Profile"}
               header_color={header_color}
               header_bg_color={header_bg_color}
            />
         )}
         <Container maxWidth='lg' sx={{ py: 6 }}>
            <Grid container spacing={4} direction={isRightSidebar ? "row-reverse" : "row"}>
               {!isNoSidebar && (
                  <Grid item xs={12} md={4}>
                     <ProfileSection data={data} block={block} language={language} />
                  </Grid>
               )}
               <Grid item xs={12} md={!isNoSidebar ? 8 : 12}>
                  <Card
                     sx={{
                        p: 3,
                        borderRadius: 2
                     }}>
                     <DetailsSection data={data} isLoading={false} block={block} />
                  </Card>
               </Grid>
            </Grid>
         </Container>
      </Stack>
   )
}

export default ResumeDetailsClient

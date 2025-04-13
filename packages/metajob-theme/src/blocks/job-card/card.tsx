"use client"
import NextLink from "next/link"
import { useTheme } from "next-themes"
import _ from "lodash"
import { Box, Button, Container, Grid, Stack, Typography, useTheme as muiTheme } from "@mui/material"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { IJobCardBlock, ISingleJob } from "./types"
import { SectionTitle } from "../../components/section-title"
import { JobItem } from "../../components/cards/job-item"

type Props = {
   block: IJobCardBlock
   language?: string
   JobsData?: ISingleJob[]
}

export const JobCardClient = ({ block, JobsData }: Props) => {
   const { theme: mode } = useTheme()
   const theme = muiTheme()

   // destructure the block
   const { content, empty, style, button, card_button } = block || {}
   const {
      backgroundColor,
      color,
      secondary_color,
      header_color,
      sub_header_color,
      section_padding,
      header_width,
      desktop,
      tab,
      mobile
   } = style || {}
   const { label, link, target, disabled } = button || {}
   const { label: card_label } = card_button || {}

   return (
      <Stack
         sx={{
            bgcolor:
               mode === "light" ? backgroundColor || theme.palette.background.paper : theme.palette.background.paper
         }}>
         <Container maxWidth='lg'>
            <Stack py={section_padding || 8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* section-title  */}
               {content && (
                  <SectionTitle data={content} color={{ header_color, sub_header_color }} width={header_width} />
               )}
               {JobsData && JobsData?.length > 0 && (
                  <Grid container spacing={2}>
                     {_.map(JobsData, (item) => (
                        <Grid key={item?.id} item xs={mobile || 12} sm={tab || 6} md={desktop || 3}>
                           <JobItem
                              data={item}
                              button_label={card_label}
                              color={color}
                              secondary_color={secondary_color}
                           />
                        </Grid>
                     ))}
                  </Grid>
               )}

               {/* empty data */}
               {JobsData?.length == 0 && (
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
                     //  @ts-ignore
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

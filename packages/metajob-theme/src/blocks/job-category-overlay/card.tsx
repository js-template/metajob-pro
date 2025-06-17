"use client"

import NextLink from "next/link"
import _ from "lodash"
import { useTheme } from "next-themes"
import { Box, Container, Grid, Stack, Typography, Button, useTheme as muiTheme } from "@mui/material"
import { ICategoryOverlayCardBlock, ISingleCategory } from "./types"
import { SectionTitle } from "../../components/section-title"
import { CategoryOverlayCardItem } from "../../components/cards/category-cards/category-overlay-card"

type Props = {
   block: ICategoryOverlayCardBlock
   categoryOverlayData: any
}

export const JobCategoryOverlayCard = ({ block, categoryOverlayData }: Props) => {
   const theme = muiTheme()
   const { theme: mode } = useTheme()

   // destructure the block
   const { content, empty, style, button, card_button, show_icon, overlay, show_description } = block || {}
   const { desktop, tab, mobile, backgroundColor } = style || {}
   const { label, link } = button || {}
   const { variation } = content || {}

   return (
      <Stack
         bgcolor={
            mode === "light" ? backgroundColor || theme.palette.background.default : theme.palette.background.default
         }>
         <Container maxWidth='lg'>
            <Stack py={8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* section-title  */}
               {content && <SectionTitle data={content} />}

               {/* category-items */}
               {categoryOverlayData && categoryOverlayData?.length > 0 && (
                  <Grid container spacing={2}>
                     {categoryOverlayData?.map((ctg: ISingleCategory) => (
                        <Grid item xs={mobile || 12} sm={4} md={tab || 3} lg={desktop || 2} key={ctg.id}>
                           <CategoryOverlayCardItem
                              show_icon={show_icon}
                              show_description={show_description}
                              overlay={overlay}
                              data={ctg}
                              button_label={card_button?.label}
                           />
                        </Grid>
                     ))}
                  </Grid>
               )}

               {/* empty data */}
               {categoryOverlayData && categoryOverlayData?.length == 0 && (
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

               {button && (
                  <Box>
                     <Button
                        // @ts-ignore
                        component={NextLink}
                        href={link || "/all-categories"}
                        sx={{
                           bgcolor: "secondary.dark",
                           color: "white",
                           "&:hover": {
                              bgcolor: "primary.main"
                           },
                           borderRadius: "4px"
                        }}>
                        {label || "Browse All Category"}
                     </Button>
                  </Box>
               )}
            </Stack>
         </Container>
      </Stack>
   )
}

"use client"
import NextLink from "next/link"
import _ from "lodash"
import { useTheme } from "next-themes"
import { Box, Container, Grid, Stack, Typography, Button, useTheme as muiTheme } from "@mui/material"
import { ICategoryCardBlock, ISingleCategory } from "./types"
import { SectionTitle } from "../../components/section-title"
import { CategoryCardItem } from "../../components/cards/category-cards/category-card"
import { hexToRGBA } from "../../lib/hex-to-rgba"

type Props = {
   block: ICategoryCardBlock
   categoryData: any
}

export const CategoryCard = ({ block, categoryData }: Props) => {
   const theme = muiTheme()
   const { theme: mode } = useTheme()

   // destructure the block
   const { content, empty, style, button, card_button, icon_type, show_description } = block || {}
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
   const { label, link } = button || {}

   return (
      <Stack
         bgcolor={
            mode === "light" ? backgroundColor || theme.palette.background.default : theme.palette.background.default
         }>
         <Container maxWidth='lg'>
            <Stack py={section_padding || 8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* section-title  */}
               {content && (
                  <SectionTitle data={content} color={{ header_color, sub_header_color }} width={header_width} />
               )}

               {/* category-items */}
               {categoryData && categoryData?.length > 0 && (
                  <Grid container spacing={2}>
                     {categoryData?.map((ctg: ISingleCategory) => (
                        <Grid item xs={mobile || 12} sm={4} md={tab || 3} lg={desktop || 2} key={ctg.id}>
                           <CategoryCardItem
                              data={ctg}
                              icon_type={icon_type}
                              show_description={show_description}
                              button_label={card_button?.label}
                              color={color}
                              secondary_color={secondary_color}
                           />
                        </Grid>
                     ))}
                  </Grid>
               )}

               {/* empty data */}
               {categoryData && categoryData?.length == 0 && (
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
                           bgcolor: (theme) =>
                              mode === "dark"
                                 ? theme.palette.background.paper
                                 : hexToRGBA(theme.palette.secondary.main, 0.7),
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

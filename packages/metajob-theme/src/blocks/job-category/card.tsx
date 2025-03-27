"use client"

import NextLink from "next/link"
import _ from "lodash"
import { Box, Container, Grid, Stack, Typography, Button, useTheme } from "@mui/material"
import { CardItemWithVariation } from "./item"
import { ICategoryCardBlock, ISingleCategory } from "./types"
import { SectionTitle } from "../../components/section-title"

type Props = {
   block: ICategoryCardBlock
   categoryData: any
}

export const CategoryCard = ({ block, categoryData }: Props) => {
   const theme = useTheme()

   // destructure the block
   const { content, empty, style, button, card_button } = block || {}
   const { desktop, tab, mobile, backgroundColor, color } = style || {}
   const { label, link } = button || {}
   const { variation } = content || {}

   return (
      <Stack bgcolor={backgroundColor ? backgroundColor : theme.palette.background.default}>
         <Container maxWidth='lg'>
            <Stack py={8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* section-title  */}
               {content && <SectionTitle data={content} />}

               {/* category-items */}
               {categoryData && categoryData?.length > 0 && (
                  <Grid container spacing={2}>
                     {categoryData?.slice(0, 12)?.map((ctg: ISingleCategory) => (
                        <Grid item xs={mobile || 12} sm={4} md={tab || 3} lg={desktop || 2} key={ctg.id}>
                           <CardItemWithVariation data={ctg} variation={variation} button_label={card_button?.label} />
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
                           bgcolor: "secondary.dark",
                           color: "white",
                           "&:hover": {
                              bgcolor: "primary.main"
                           }
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

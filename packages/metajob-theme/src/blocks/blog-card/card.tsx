"use client"
import Link from "next/link"
import { useTheme } from "next-themes"
import _ from "lodash"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Box, Button, Container, Grid, Stack, Typography, useTheme as muiTheme } from "@mui/material"
import CardItem from "./item"
import { SectionTitle } from "../../components/section-title"
import { IPostBlock, ISinglePost } from "./types"

type Props = {
   block: IPostBlock
   data?: any
   language?: string
   recentBlogs?: ISinglePost[]
}

export const BlogCardClient = ({ block, recentBlogs }: Props) => {
   const { theme: mode } = useTheme()
   const theme = muiTheme()

   // destructure the block
   const { content, empty, style, button, card_button } = block || {}
   const { desktop, tab, mobile, backgroundColor, color } = style || {}
   const { label, link } = button || {}
   const { label: card_label } = card_button || {}

   return (
      <Stack bgcolor={backgroundColor ? backgroundColor : theme.palette.background.paper}>
         <Container maxWidth='lg'>
            <Stack py={8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* section-title  */}
               {content && <SectionTitle data={content} />}
               {/* posts section  */}
               {recentBlogs && recentBlogs?.length > 0 && (
                  <Grid container spacing={2}>
                     {_.map(recentBlogs, (item) => (
                        <Grid item xs={mobile || 12} sm={tab || 6} md={desktop || 4} key={item?.id}>
                           <CardItem data={item} button_label={card_label} />
                        </Grid>
                     ))}
                  </Grid>
               )}
               <Grid container justifyContent={"center"} spacing={2}>
                  {/* empty data */}
                  {recentBlogs?.length == 0 && (
                     <Stack
                        sx={{
                           display: "flex",
                           flexDirection: "column",
                           alignItems: "center",
                           gap: 0.5,
                           py: 4
                        }}>
                        <Typography variant='body1' sx={{ color: theme.palette.text.secondary }}>
                           {empty?.title || "No data found"}
                        </Typography>
                        <Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>
                           {empty?.description || "Try to refresh the page or check back later"}
                        </Typography>
                     </Stack>
                  )}
               </Grid>

               <Box>
                  {button && (
                     <Button
                        sx={{
                           bgcolor: (theme) =>
                              mode === "dark"
                                 ? theme.palette.background.paper
                                 : hexToRGBA(theme.palette.secondary.main, 0.7),
                           color: "white",
                           "&:hover": {
                              bgcolor: "primary.main"
                           }
                        }}
                        // @ts-ignore
                        LinkComponent={Link}
                        href={link || "/career-advice"}>
                        {label || "See All Blogs"}
                     </Button>
                  )}
               </Box>
            </Stack>
         </Container>
      </Stack>
   )
}

"use client"
import Link from "next/link"
import { useTheme } from "next-themes"
import _ from "lodash"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Box, Button, Container, Grid, Stack, Typography, useTheme as muiTheme } from "@mui/material"
import CardItem from "./item"
import { SectionTitle } from "../../components/section-title"
import { IPostBlock, ISinglePost } from "./types"
import { Height } from "@mui/icons-material"

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
   const { content, empty, style, button, card_button, show_image } = block || {}

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
      mobile,
      bg_overlay
   } = style || {}
   const { label, link } = button || {}
   const { label: card_label } = card_button || {}
 

   return (
      <Stack
         bgcolor={
            mode === "light"
               ? (theme) => hexToRGBA(backgroundColor || theme.palette.background.paper, bg_overlay || 0.9)
               : (theme) => hexToRGBA(backgroundColor || theme.palette.background.paper, bg_overlay || 0.9)
         }>
         <Container maxWidth='lg'>
            <Stack py={section_padding || 8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* section-title  */}
               {content && (
                  <SectionTitle data={content} color={{ header_color, sub_header_color }} width={header_width} />
               )}
               {/* posts section  */}
               {recentBlogs && recentBlogs?.length > 0 && (
                  <Grid container spacing={2}>
                     {_.map(recentBlogs, (item) => (
                        <Grid item xs={mobile || 12} sm={tab || 6} md={desktop || 4} key={item?.id}>
                           <Box sx={{ height: "100%" }}>
                              <CardItem
                                 data={item}
                                 button_label={card_label}
                                 color={color}
                                 secondary_color={secondary_color}
                                 show_image={show_image}
                              />
                           </Box>
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
                           gap: 0.5
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
                        },
                        borderRadius: "4px",
                        marginTop: "0 !important"
                     }}
                     // @ts-ignore
                     LinkComponent={Link}
                     href={link || "/career-advice"}>
                     {label || "See All Blogs"}
                  </Button>
               )}
            </Stack>
         </Container>
      </Stack>
   )
}

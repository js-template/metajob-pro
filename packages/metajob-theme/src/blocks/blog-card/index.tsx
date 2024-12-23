"use client"
import Link from "next/link"
import { useTheme } from "next-themes"
import _ from "lodash"
import useSWR from "swr"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Box, Button, Container, Grid, Stack, Typography, useTheme as muiTheme } from "@mui/material"
import CardItem from "./item"
import { IUserSession } from "../../types/user"
import { SectionTitle } from "../../components/section-title"
import { fetcher } from "./hook"
import { IPostBlock } from "./types"

type Props = {
   block: IPostBlock
   data?: any
   language?: string
   session?: IUserSession | null | any
}

export const BlogCard = ({ block, language }: Props) => {
   const { theme: mode } = useTheme()
   const theme = muiTheme()

   // destructure the block
   // const { content, empty, style, posts, button } = block || {}
   const { content, empty, style, button } = block || {}
   const { desktop, tab, mobile, backgroundColor, color } = style || {}
   const { label, link } = button || {}

   const queryParams = {
      populate: {
         featuredImage: {
            fields: ["url"]
         }
      },
      sort: ["createdAt:desc"], //sorting to the most recent data
      pagination: {
         pageSize: 4, //fetch 3 recent post
         page: 1
      },
      publicationState: "live",
      locale: language ? [language] : ["en"]
   }

   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = `/api/find?model=api/padma-backend/posts&query=${queryString}&cache=no-store`
   // fetch related list data
   const { data: recentBlogsData, error: blogsError, isLoading } = useSWR(apiUrl, fetcher)
   const recentBlogs = recentBlogsData?.data

   return (
      <Stack bgcolor={backgroundColor ? backgroundColor : theme.palette.background.paper}>
         <Container maxWidth='lg'>
            <Stack py={8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* section-title  */}
               {content && <SectionTitle data={content} />}
               {/* posts section  */}
               {recentBlogs?.length > 0 && (
                  <Grid container spacing={2}>
                     {_.map(recentBlogs, (item) => (
                        <Grid item xs={mobile || 12} sm={tab || 6} md={desktop || 4} key={item?.id}>
                           <CardItem data={item} />
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

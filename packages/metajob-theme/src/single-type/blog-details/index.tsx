"use client"
import { Container, Grid, Stack } from "@mui/material"
import BlogContent from "./blog-content"
import RecentPost from "./recent-post"
import BlogCategory from "./blog-category"
import BlogAds from "./blog-ads"
import BlogHeader from "./header"
import { IBlogDetailsBlock, ISinglePost } from "./types"

type Props = {
   block: IBlogDetailsBlock
   data: ISinglePost
   language?: string
}

export const BlogDetails = ({ data, block, language }: Props) => {
   const { title, sidebar } = block || {}
   const isRightSidebar = !sidebar || sidebar === "Right Sidebar"
   const isLeftSidebar = sidebar === "Left Sidebar"
   const isBothSidebar = sidebar === "Both Sidebar"
   const isNoSidebar = sidebar === "No Sidebar"

   return (
      <Stack>
         <BlogHeader title={title || "Blog Details"} bg={data?.featuredImage} />
         <Container maxWidth='lg' sx={{ py: 6 }}>
            <Grid container spacing={4}>
               {/* blog-details  */}
               <Grid
                  item
                  xs={12}
                  md={isBothSidebar ? 6 : isNoSidebar ? 12 : 8}
                  order={{ xs: 1, md: isRightSidebar ? 1 : 2 }}>
                  <BlogContent data={data} />
               </Grid>
               {!isNoSidebar && (
                  <Grid item xs={12} md={isBothSidebar ? 3 : 4} order={{ xs: 2, md: isRightSidebar ? 2 : 1 }}>
                     <Stack spacing={4}>
                        <RecentPost language={language} />
                        {!isBothSidebar && <BlogCategory language={language} />}
                        <BlogAds />
                     </Stack>
                  </Grid>
               )}
               {isBothSidebar && (
                  <Grid item xs={12} md={isBothSidebar ? 3 : 4} order={{ xs: 3, md: isBothSidebar ? 3 : 3 }}>
                     <Stack spacing={4}>
                        <BlogCategory language={language} />
                     </Stack>
                  </Grid>
               )}
            </Grid>
         </Container>
      </Stack>
   )
}

"use client"
import { useTheme } from "next-themes"
import { Container, Grid, Stack } from "@mui/material"
import BlogContent from "./blog-content"
import RecentPost from "./recent-post"
import BlogCategory from "./blog-category"
import BlogAds from "./blog-ads"
import { IBlogCategory, IBlogDetailsBlock, ISinglePost } from "./types"
import { PageHeader } from "../../blocks/page-header"

type Props = {
   block: IBlogDetailsBlock
   data: ISinglePost
   language?: string
   recentBlogsData?: ISinglePost[]
   categoryData?: IBlogCategory[]
}

const BlogDetailsServer = ({ data, block, recentBlogsData, categoryData }: Props) => {
   const { theme: mode } = useTheme()
   const { title, style } = block || {}
   const {
      backgroundColor,
      color,
      secondary_color,
      header_color,
      header_bg_color,
      section_padding,
      bg_overlay,
      sidebar
   } = style || {}

   const isRightSidebar = !sidebar || sidebar === "Right Sidebar"
   const isNoSidebar = sidebar === "No Sidebar"

   return (
      <Stack
         bgcolor={(theme) =>
            mode === "light" ? backgroundColor || theme.palette.background.default : theme.palette.background.default
         }>
         <PageHeader
            block={{
               title: title || "Blog Details",
               image: data?.featuredImage,
               style: {
                  backgroundColor: header_bg_color,
                  color: header_color,
                  bg_overlay: bg_overlay
               }
            }}
         />
         <Container maxWidth='lg' sx={{ py: 6 }}>
            <Grid container spacing={4} direction={isRightSidebar ? "row" : "row-reverse"}>
               {/* blog-details  */}
               <Grid item xs={12} md={isNoSidebar ? 12 : 8}>
                  <BlogContent data={data} color={color} secondary_color={secondary_color} />
               </Grid>
               {!isNoSidebar && (
                  <Grid item xs={12} md={4}>
                     <Stack spacing={4}>
                        <RecentPost recentBlogsData={recentBlogsData} color={color} secondary_color={secondary_color} />
                        <BlogCategory blogCategoryData={categoryData} color={color} secondary_color={secondary_color} />
                        <BlogAds color={color} secondary_color={secondary_color} />
                     </Stack>
                  </Grid>
               )}
            </Grid>
         </Container>
      </Stack>
   )
}

export default BlogDetailsServer

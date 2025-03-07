"use server"
import { find } from "../../lib/strapi"
import BlogDetailsServer from "./blog-details"
import { IBlogDetailsBlock, ISinglePost } from "./types"

type Props = {
   block: IBlogDetailsBlock
   data: ISinglePost
   language?: string
}

export const BlogDetails = async ({ data, block, language }: Props) => {
   // fetch recent blogs data
   const { data: recentBlogsDataAll } = await find(
      "api/padma-backend/posts",
      {
         populate: {
            featuredImage: {
               fields: ["url"]
            }
         },
         fields: ["title", "slug", "publishedAt"],
         pagination: {
            pageSize: 3,
            page: 1
         },
         publicationState: "live",
         locale: language ?? ["en"]
      },
      "no-store"
   )
   // fetch  blog-category data
   const { data: categoryDataAll } = await find(
      "api/padma-backend/categories",
      {
         populate: {
            image: {
               fields: ["url"]
            },
            posts: {
               count: true
            }
         },
         fields: ["title", "slug"],
         pagination: {
            pageSize: 10, //fetch 10 blog-categories
            page: 1
         },
         locale: language ?? ["en"]
      },
      "no-store"
   )

   return (
      <BlogDetailsServer
         block={block}
         data={data}
         language={language}
         recentBlogsData={recentBlogsDataAll?.data}
         categoryData={categoryDataAll?.data}
      />
   )
}

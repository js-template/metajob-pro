"use server"
import { find } from "../../lib/strapi"
import { BlogCardClient } from "./card"
import { IPostBlock } from "./types"

type Props = {
   block: IPostBlock
   data?: any
   language?: string
}

export const BlogCard = async ({ block, data, language }: Props) => {
   const { data: recentBlogsAll } = await find(
      "api/padma-backend/posts",
      {
         populate: {
            featuredImage: {
               fields: ["url"]
            }
         },
         sort: ["createdAt:desc"],
         pagination: {
            pageSize: 4,
            page: 1
         },
         locale: language ?? ["en"]
      },
      "no-store"
   )

   return <BlogCardClient block={block} recentBlogs={recentBlogsAll?.data} data={data} />
}

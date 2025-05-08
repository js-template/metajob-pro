"use server"
import { Suspense } from "react"
import { find } from "../../lib/strapi"
import { BlogCardClient } from "./card"
import BlogCardLoader from "./loader"
import { IPostBlock } from "./types"

type Props = {
   block: IPostBlock
   data?: any
   language?: string
}

export const BlogCard = async ({ block, data, language }: Props) => {
   const { data: recentBlogsAll } = await find("api/padma-backend/posts", {
      populate: {
         featuredImage: {
            fields: ["url"]
         }
      },
      sort: ["createdAt:desc"],
      pagination: {
         pageSize: block?.item_count || 3,
         page: 1
      },
      locale: language ?? "en"
   })

   return (
      <Suspense fallback={<BlogCardLoader />}>
         <BlogCardClient block={block} recentBlogs={recentBlogsAll?.data} data={data} />
      </Suspense>
   )
}

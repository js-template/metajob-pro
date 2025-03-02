"use client"

import useSWR from "swr"
import _ from "lodash"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Stack, Typography } from "@mui/material"
import { Card } from "../../components/common/card"
import { IBlogCategory } from "./types"
import { fetcher } from "./hook"

type Props = {
   language?: string
}

const BlogCategory = ({ language }: Props) => {
   const queryParams = {
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
      }
      // locale: language ?? ["en"]
   }

   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = `/api/find?model=api/padma-backend/categories&query=${queryString}&cache=no-store`
   // fetch related list data
   const { data: categoryData, error: categoryError, isLoading } = useSWR(apiUrl, fetcher)
   const blogCategories = categoryData?.data

   return (
      <Card
         sx={{
            p: 2,
            borderRadius: 3,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: (theme) => theme.palette.divider
         }}>
         <Stack spacing={4}>
            <Typography fontSize={20} fontWeight={700}   sx={{
                                 color: (theme) => hexToRGBA(theme.palette.text.primary, 0.9)
                               }}>
               Category
            </Typography>
            {blogCategories && blogCategories?.length > 0 && (
               <Stack spacing={2}>
                  {blogCategories?.map((item: IBlogCategory, index: number) => {
                     const { title, posts } = item || {}
                     const count = posts?.count || 0

                     return (
                        <Stack
                           key={item.id}
                           direction={"row"}
                           justifyContent={"space-between"}
                           gap={2}
                           pb={1.5}
                           borderBottom={(theme) =>
                              index !== blogCategories?.length - 1 ? `1px solid ${theme.palette.divider}` : ""
                           }>
                           <Typography
                              fontSize={16}
                              fontWeight={600}
                              sx={{
                                 color: (theme) => hexToRGBA(theme.palette.text.primary, 0.9)
                               }}>
                              {title}
                           </Typography>
                           <Typography
                              fontSize={16}
                              fontWeight={600}
                              sx={{
                                 color: (theme) => hexToRGBA(theme.palette.text.primary, 0.9)
                               }}
                              >
                              {count}
                           </Typography>
                        </Stack>
                     )
                  })}
               </Stack>
            )}
         </Stack>
      </Card>
   )
}
export default BlogCategory

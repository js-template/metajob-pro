"use client"
import Link from "next/link"
import Image from "next/image"
import moment from "moment"
import _ from "lodash"
import useSWR from "swr"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Box, Stack, Typography } from "@mui/material"
import { Card } from "../../components/common/card"
import { fetcher } from "./hook"
import { ISinglePost } from "./types"

const RecentPost = ({ language }: { language?: string }) => {
   const queryParams = {
      populate: {
         featuredImage: {
            fields: ["url"]
         }
      },
      fields: ["title", "slug", "publishedAt"], // Fields to include in the response
      pagination: {
         pageSize: 3, //fetch 3 recent post
         page: 1
      },
      publicationState: "live",
      locale: language ?? ["en"]
   }

   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = `/api/find?model=api/padma-backend/posts&query=${queryString}&cache=no-store`
   // fetch related list data
   const { data: recentBlogsData, error: blogsError, isLoading } = useSWR(apiUrl, fetcher)
   const recentBlogs = recentBlogsData?.data

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
            <Typography fontSize={20} fontWeight={700} 
            sx={{
               color: (theme) => hexToRGBA(theme.palette.text.primary, 0.9)
              }}
           >
               Latest Post
            </Typography>
            {recentBlogs && recentBlogs?.length > 0 && (
               <Stack>
                  {_.map(recentBlogs, (item: ISinglePost) => {
                     return (
                        <Stack key={item?.id} gap={2} direction={"row"} alignItems='center'>
                           <Box
                              sx={{
                                 display: "flex",
                                 justifyContent: "center",
                                 alignItems: "center",
                                 overflow: "hidden",
                                 borderRadius: 1.5,
                                 position: "relative", // Make sure the container is positioned
                                 width: 200, // Define width and height for the container
                                 height: 100
                              }}
                              component={Link}
                              href={`/blog/${item?.slug}`}>
                              <Image
                                 src={item?.featuredImage?.url || "https://placehold.co/200x100"}
                                 alt={item?.title}
                                 fill={true}
                              />
                           </Box>
                           <Stack spacing={1}>
                              <Typography
                                 fontSize={18}
                                 fontWeight={700}
                                 sx={{
                                    color: (theme) => hexToRGBA(theme.palette.text.primary, 0.9),
                                    "&:hover": {
                                       color: (theme) => theme.palette.primary.main,
                                       cursor: "pointer",
                                       transition: "all .3s ease-in-out"
                                    },
                                    textDecoration: "none"
                                 }}
                                 component={Link}
                                 href={`/blog/${item?.slug}`}>
                                 {item?.title}
                              </Typography>
                              <Typography fontSize={14} fontWeight={400} sx={{
 color: (theme) => theme.palette.text.disabled
}}>
                                 {/* {item.datePosted} */}
                                 {moment(item?.publishedAt).format("DD MMMM YYYY")}
                              </Typography>
                           </Stack>
                        </Stack>
                     )
                  })}
               </Stack>
            )}
         </Stack>
      </Card>
   )
}

export default RecentPost

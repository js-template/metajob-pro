"use client"
import Link from "next/link"
import Image from "next/image"
import moment from "moment"
import _ from "lodash"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Box, Stack, Typography } from "@mui/material"
import { Card } from "../../components/common/card"
import { ISinglePost } from "./types"

type Props = {
   recentBlogsData?: ISinglePost[]
}
const RecentPost = ({ recentBlogsData }: Props) => {
   return recentBlogsData && recentBlogsData?.length > 0 ? (
      <Card
         sx={{
            p: 2,
            borderRadius: 3,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: (theme) => theme.palette.divider
         }}>
         <Stack spacing={4}>
            <Typography
               fontSize={20}
               fontWeight={700}
               sx={{
                  color: (theme) => hexToRGBA(theme.palette.text.primary, 0.9)
               }}>
               Latest Post
            </Typography>
            {recentBlogsData && recentBlogsData?.length > 0 && (
               <Stack>
                  {_.map(recentBlogsData, (item: ISinglePost) => {
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
                              <Typography
                                 fontSize={14}
                                 fontWeight={400}
                                 sx={{
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
   ) : (
      <></>
   )
}

export default RecentPost

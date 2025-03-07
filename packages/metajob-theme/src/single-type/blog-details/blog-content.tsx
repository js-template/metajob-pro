"use client"
import Image from "next/image"
import _ from "lodash"
import moment from "moment"
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { Card } from "../../components/common/card"
import { ISinglePost } from "./types"

const BlogContent = ({ data }: { data: ISinglePost }) => {
   const { title, publishedAt, featuredImage, description, user, post_categories } = data || {}
   const username = user?.username || ""
   const avatar = user?.avatar?.url || ""
   const image = featuredImage?.url || ""
   const { title: categoryTitle } = post_categories?.[0] || ""

   return (
      <Card
         sx={{
            p: 4,
            borderRadius: 3,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: (theme) => theme.palette.divider
         }}>
         <Stack spacing={2}>
            <Typography
               fontWeight={400}
               fontSize={14}
               sx={{
                  color: (theme) =>theme.palette.primary.contrastText
                }}
               bgcolor={(theme) => theme.palette.primary.main}
               borderRadius={1.5}
               px={1}
               py={0.5}
               mb={2}
               width={"fit-content"}>
               {categoryTitle}
            </Typography>
            <Stack pt={2} direction={"row"} gap={2} alignItems={"center"}>
               <Avatar
                  src={avatar}
                  alt='user img'
                  sx={{
                     height: 40,
                     width: 40
                  }}>
                  {username.charAt(0).toUpperCase()}
               </Avatar>
               {username && (
                  <Typography fontWeight={400} fontSize={16}   sx={{
                     color: (theme) => theme.palette.text.primary
                   }}>
                     {username}
                  </Typography>
               )}
               {publishedAt && (
                  <Typography fontWeight={400} fontSize={16}   sx={{
                     color: (theme) => theme.palette.text.primary
                   }}>
                     {moment(publishedAt).format("DD MMMM YYYY")}
                  </Typography>
               )}
            </Stack>
            <Divider />
            <Typography
               variant={"h3"}
               sx={{
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "34px",
                  color: (theme) => theme.palette.text.primary,
                  py: 3
               }}>
               {title}
            </Typography>

            {image && (
               <Box
                  sx={{
                     overflow: "hidden",
                     borderRadius: 4,
                     position: "relative", // Make sure the container is positioned
                     width: "100%", // Define width and height for the container
                     height: 500
                  }}>
                  <Image src={image} alt='blog image' fill={true} />
               </Box>
            )}
            {description && description.length > 0 && <BlocksRenderer content={description} />}
         </Stack>
      </Card>
   )
}
export default BlogContent

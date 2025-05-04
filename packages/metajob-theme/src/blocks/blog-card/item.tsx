"use client"
import Image from "next/image"
import Link from "next/link"
import moment from "moment"
import { useTheme } from "next-themes"
import _ from "lodash"
import { Box, Button, Icon, Stack, Typography } from "@mui/material"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { ISinglePost } from "./types"

const CardItem = ({
   data,
   button_label,
   color,
   secondary_color,
   show_image
}: {
   data: ISinglePost
   button_label?: string
   color?: string
   secondary_color?: string
   show_image?: boolean
}) => {
   const { theme: mode } = useTheme()

   const { title, slug, featuredImage, short_description, publishedAt } = data || {}
   // const image = featuredImage?.url || "https://placehold.co/300x250/png"
   const image = featuredImage?.url
   return (
      <Stack
         sx={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: (theme) => theme.palette.divider,
            p: { md: 3.75, xs: 2 },
            borderRadius: 1,
            "&:hover": {
               borderColor: (theme) => theme.palette.primary.main,
               transition: "all .3s ease-in-out"
            },
            "&:hover .image-scale": {
               transform: "scale(1.2)"
            },
            bgcolor: (theme) => theme.palette.background.paper,
            "&:hover .blog-button": {
               bgcolor: (theme) => theme.palette.primary.main,
               color: (theme) => theme.palette.primary.contrastText
            },
            "&:hover .blog-header": {
               color: (theme) => theme.palette.primary.main,
               cursor: "pointer",
               transition: "all .3s ease-in-out"
            },
            transition: "0.4s",
            height: "100%"
         }}>
         {show_image && (
            <Box
               sx={{
                  display: image ? "flex" : "none",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  borderRadius: 1,
                  position: "relative",
                  height: { xs: 180, sm: 220 },
                  mb: 2.5
               }}
               component={Link}
               href={`blog/${slug}`}>
               <Image
                  // src={image}
                  src={image || "https://placehold.co/300x250/png"}
                  alt={title}
                  style={{
                     transition: "transform 0.4s ease-in-out"
                  }}
                  className='image-scale'
                  fill={true}
               />
            </Box>
         )}
         <Stack spacing={1}>
            <Typography
               fontSize={14}
               fontWeight={400}
               sx={{
                  mb: 1,
                  color: (theme) =>
                     mode === "light" ? secondary_color || theme.palette.text.disabled : theme.palette.text.disabled
               }}>
               {moment(publishedAt).format("DD MMMM YYYY")}
            </Typography>
            <Typography
               className='blog-header'
               fontSize={20}
               fontWeight={700}
               sx={{
                  color: (theme) =>
                     mode === "light"
                        ? color || hexToRGBA(theme.palette.text.primary, 0.9)
                        : hexToRGBA(theme.palette.text.primary, 0.9),

                  textDecoration: "none",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
               }}
               component={Link}
               href={`blog/${slug}`}>
               {title}
            </Typography>
         </Stack>
         <Stack direction={"column"} justifyContent={"space-between"}>
            <Typography
               fontSize={16}
               fontWeight={400}
               sx={{
                  color: (theme) =>
                     mode === "light" ? secondary_color || theme.palette.text.disabled : theme.palette.text.disabled,
                  display: "-webkit-box",
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  height: 100,
                  mb: 2
               }}>
               {short_description}
            </Typography>
            <Button
               variant='contained'
               className='blog-button'
               sx={{
                  bgcolor: (theme) => theme.palette.background.default,
                  color: (theme) => hexToRGBA(theme.palette.text.primary, 0.9),
                  fontSize: 18,
                  fontWeight: 500,
                  transition: "transform 0.4s ease-in-out",
                  width: "auto",
                  alignSelf: "flex-start",
                  justifyContent: "flex-start",
                  gap: 2.5
               }}
               LinkComponent={Link}
               href={`blog/${slug}`}
               endIcon={<Icon className='icon-arrow-right' />}>
               {button_label || "Read More"}
            </Button>
         </Stack>
      </Stack>
   )
}

export default CardItem

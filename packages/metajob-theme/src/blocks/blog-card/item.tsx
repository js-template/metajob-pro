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
   secondary_color
}: {
   data: ISinglePost
   button_label?: string
   color?: string
   secondary_color?: string
}) => {
   const { theme: mode } = useTheme()

   const { title, slug, featuredImage, short_description, publishedAt } = data || {}
   //   Fearured mage support form clud as well as strapi local upload
   const finalFeaturedImage = `${process.env.NEXT_PUBLIC_BACKEND_URL}${featuredImage.url}` || featuredImage?.url

   return (
      <Stack
         sx={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: (theme) => theme.palette.divider,
            px: { xs: 1.5, sm: 2, md: 4 },
            py: 2.5,
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
         <Box
            sx={{
               display: finalFeaturedImage ? "flex" : "none",
               justifyContent: "center",
               alignItems: "center",
               overflow: "hidden",
               borderRadius: 1,
               position: "relative", // Make sure the container is positioned
               width: "100%", // Define width and height for the container
               minHeight: finalFeaturedImage ? { xs: "200px", sm: "250px", md: "250px" } : "0",
               mb: "20px"
            }}
            component={Link}
            href={`blog/${slug}`}>
            <Image
               // src={image}
               src={finalFeaturedImage}
               alt={title}
               style={{
                  transition: "transform 0.4s ease-in-out",
                  objectFit: "cover"
               }}
               className='image-scale'
               fill={true}
            />
         </Box>
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
                  mb: 3,
                  mt: 2,
                  display: "-webkit-box",
                  WebkitLineClamp: { xs: 3, md: 5 },
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
               }}>
               {short_description}
            </Typography>
            <Button
               variant='contained'
               className='blog-button'
               sx={{
                  px: { xs: 2, sm: "auto" },
                  bgcolor: (theme) => theme.palette.background.default,
                  color: (theme) => hexToRGBA(theme.palette.text.primary, 0.9),
                  fontSize: { xs: 14, sm: 14, md: 18 },
                  fontWeight: 500,
                  transition: "transform 0.4s ease-in-out",
                  width: { xs: "100%", sm: "auto" },
                  alignSelf: "flex-start",
                  justifyContent: { xs: "space-between", sm: "flex-start" }
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

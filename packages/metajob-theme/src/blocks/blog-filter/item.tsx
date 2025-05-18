"use client"
import Image from "next/image"
import { useTheme } from "next-themes"
import Link from "next/link"
import moment from "moment"
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
   // const image = featuredImage?.url || "https://placehold.co/300x250/png"
   const image = featuredImage?.url
   return (
      <Stack
         sx={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: (theme) => theme.palette.divider,
            p: "30px",
            borderRadius: 1.5,
            "&:hover": {
               borderColor: (theme) => theme.palette.primary.main,
               transition: "all .3s ease-in-out"
            },
            "&:hover .image-scale": {
               transform: "scale(1.2)"
            },
            "&:hover .blog-button": {
               bgcolor: (theme) => theme.palette.primary.main,
               color: (theme) => theme.palette.primary.contrastText
            },
            bgcolor: (theme) => theme.palette.background.paper,
            height: "100%"
         }}
         spacing={2}>
         <Box
            sx={{
               display: image ? "flex" : "none",
               justifyContent: "center",
               alignItems: "center",
               overflow: "hidden",
               borderRadius: 1.5,
               position: "relative", // Make sure the container is positioned
               width: "100%", // Define width and height for the container
               minHeight: image ? { xs: "150px", sm: "250px" } : 0
            }}
            component={Link}
            href={`blog/${slug}`}>
            <Image
               // src={image}
               src={image || "https://placehold.co/300x250/png"}
               alt={title}
               style={{
                  transition: "transform 0.3s ease-in-out"
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
                  color: (theme) =>
                     mode === "light" ? secondary_color || theme.palette.text.disabled : theme.palette.text.disabled
               }}>
               {moment(publishedAt).format("DD MMMM YYYY")}
            </Typography>
            <Typography
               fontSize={20}
               fontWeight={700}
               sx={{
                  color: (theme) =>
                     mode === "light"
                        ? color || hexToRGBA(theme.palette.text.primary, 0.9)
                        : hexToRGBA(theme.palette.text.primary, 0.9),
                  "&:hover": {
                     color: (theme) => theme.palette.primary.main,
                     cursor: "pointer",
                     transition: "all .3s ease-in-out"
                  },
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
         <Stack spacing={3} direction={"column"} height={"100%"} justifyContent={"space-between"}>
            <Typography
               fontSize={16}
               fontWeight={400}
               sx={{
                  color: (theme) =>
                     mode === "light" ? secondary_color || theme.palette.text.disabled : theme.palette.text.disabled,
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
               }}>
               {short_description}
            </Typography>
            <Button
               className='blog-button'
               sx={{
                  bgcolor: (theme) => theme.palette.background.default,
                  // color: (theme) => hexToRGBA(theme.palette.text.primary, 0.9),
                  color: (theme) =>
                     mode === "dark" ? theme.palette.primary.contrastText : theme.palette.text.disabled,
                  fontSize: 18,
                  fontWeight: 500,
                  width: "auto",
                  alignSelf: "flex-start",
                  justifyContent: "flex-start",
                  gap: "20px"
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

"use client"
import Image from "next/image"
import NextLink from "next/link"
import { useTheme } from "next-themes"
import { Stack, Box, Typography, Card, Icon } from "@mui/material"
import { ISingleCategory } from "./types"
import { hexToRGBA } from "../../../../lib/hex-to-rgba"

type Props = {
   data: ISingleCategory
   button_label?: string
   color?: string
   backgroundColor?: string
}
export const CategoryCardTwo = ({ data, button_label, color, backgroundColor }: Props) => {
   const { theme: mode } = useTheme()
   const { title, description, image } = data || {}
   const logo = image?.url || "https://placehold.co/60/png"

   return (
      //@ts-ignore
      <Card
         component={NextLink}
         href={`/find-job?category=${encodeURIComponent(title)}`}
         sx={{
            p: 3,
            display: "block",
            textDecoration: "none",
            cursor: "pointer",
            borderRadius: "12px",
            "&:hover .iconBox": {
               transform: "scale(1.2)"
            }
         }}>
         {/* logo*/}
         <Stack
            spacing={2}
            sx={{
               justifyContent: "center",
               alignItems: "center",
               mb: 2
            }}>
            <Box
               className='iconBox'
               sx={{
                  color: (theme) => theme.palette.primary.main,
                  bgcolor: (theme) => hexToRGBA(backgroundColor || theme.palette.primary.main, 0.1),
                  borderRadius: "12px",
                  width: "fit-content",
                  px: 2,
                  py: 1.5,
                  transition: "transform 0.3s ease-in-out"
               }}>
               <Image src={logo || "https://placehold.co/60/png"} alt={title} width={40} height={40} />
            </Box>
         </Stack>
         {/*  title, description  */}
         <Stack spacing={1}>
            <Typography
               sx={{
                  color: (theme) =>
                     mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary
               }}
               fontWeight={400}
               fontSize={16}
               textAlign={"center"}
               noWrap>
               {title}
            </Typography>
            {description && (
               <Typography
                  color={(theme) => theme.palette.text.secondary}
                  fontWeight={400}
                  fontSize={14}
                  textAlign={"center"}
                  sx={{
                     // line clamp 1
                     display: "-webkit-box",
                     WebkitBoxOrient: "vertical",
                     overflow: "hidden",
                     textOverflow: "ellipsis",
                     WebkitLineClamp: 2
                  }}>
                  {description}
               </Typography>
            )}
         </Stack>

         {/* button  */}
         <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Stack
               sx={{
                  mt: 2,
                  color: (theme) => backgroundColor || theme.palette.primary.main,
                  width: "100%"
               }}
               direction={"row"}
               alignItems={"center"}
               justifyContent={"center"}
               gap={2}>
               <Typography fontWeight={500} fontSize={14}>
                  {button_label || "View All Job"}
               </Typography>
               <Icon className='icon-arrow-right-circle' fontSize='small' />
            </Stack>
         </Box>
      </Card>
   )
}

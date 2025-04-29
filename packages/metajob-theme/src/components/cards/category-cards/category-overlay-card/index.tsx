"use client"
import Image from "next/image"
import NextLink from "next/link"
import { useTheme } from "next-themes"
import { Stack, Box, Typography, Card, Icon } from "@mui/material"
import { ISingleCategory } from "./types"
import { hexToRGBA } from "../../../../lib/hex-to-rgba"
import AdUnitsOutlinedIcon from "@mui/icons-material/AdUnitsOutlined"

type Props = {
   data: ISingleCategory
   button_label?: string
   color?: string
   backgroundColor?: string
   show_icon?: boolean
   overlay?: boolean
}
export const CategoryOverlayCardItem = ({ data, button_label, color, backgroundColor, show_icon, overlay }: Props) => {
   const { theme: mode } = useTheme()
   //destructure the data
   const { title, description, image, icon } = data || {}
   const logo = image?.url || "https://placehold.co/60/png"
   const topValue = overlay ? "10%" : "48%"
   const spacing = overlay ? "8px 8px 2px 8px" : "10px 10px 3px 10px"
   const titleTop = show_icon ? "20px" : "0px"

   return (
      //@ts-ignore
      <Card
         component={NextLink}
         href={`/find-job?category=${encodeURIComponent(title)}`}
         sx={{
            display: "block",
            textDecoration: "none",
            backgroundColor: (theme) =>
               mode === "light" ? color || theme.palette.secondary.main : theme.palette.text.primary,
            opacity: "0.9",
            cursor: "pointer",
            borderRadius: "6px",
            position: "relative",
            boxShadow: "4px 4px 10px 2px rgba(0, 0, 0, 0.15)",
            "&:hover .hover-scale": {
               transform: "scale(1.2)"
            },
            "&:hover .title-hover": {
               color: (theme) => (mode === "light" ? color || theme.palette.primary.main : theme.palette.primary.main)
            },
            "&:hover": {
               borderColor: (theme) =>
                  mode === "light" ? color || theme.palette.primary.main : theme.palette.primary.main
            },
            transition: "0.4s",
            border: "1px solid",
            borderColor: (theme) => (mode === "light" ? color || theme.palette.divider : theme.palette.divider)
         }}>
         {overlay ? (
            <Box
               sx={{
                  backgroundImage: `url(${logo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "220px",
                  "&:hover": {
                     transform: "scale(1.2)"
                  },
                  transition: "0.6s"
               }}></Box>
         ) : (
            <Box sx={{ overflow: "hidden", height: "220px" }}>
               <Box
                  className='hover-scale'
                  sx={{
                     height: "100%",
                     "&:hover": {
                        transform: "scale(1.2)"
                     },
                     transition: "0.6s"
                  }}>
                  <Box sx={{ height: "100%", width: "100%" }}>
                     <Image style={{ width: "100%" }} src={logo} alt='' height={220} width={500} />
                  </Box>
               </Box>
            </Box>
         )}

         {/* Icon */}
         {show_icon && (
            <Box
               sx={{
                  position: "absolute",
                  padding: spacing,
                  left: "20px",
                  top: topValue,
                  bgcolor: (theme) =>
                     mode === "light" ? color || theme.palette.success.main : theme.palette.success.main
               }}>
               <AdUnitsOutlinedIcon
                  sx={{
                     color: (theme) =>
                        mode === "light" ? color || theme.palette.primary.contrastText : theme.palette.text.primary,
                     fontSize: "50px"
                  }}
               />
            </Box>
         )}
         {/*  title or description */}
         {overlay ? (
            <Stack
               sx={{
                  position: "absolute",
                  left: "15px",
                  right: "15px",
                  bottom: "15px",
                  background: "rgba(0, 0, 0, 0.5)",
                  backdropFilter: "blur(5px)",
                  padding: "10px 15px"
               }}
               spacing={1}>
               <Typography
                  sx={{
                     color: (theme) =>
                        mode === "light" ? color || theme.palette.primary.contrastText : theme.palette.text.primary,
                     textAlign: "left"
                  }}
                  fontWeight={400}
                  fontSize={18}
                  textAlign={"center"}
                  noWrap>
                  {title}
               </Typography>
            </Stack>
         ) : (
            <Stack
               sx={{
                  padding: "20px",
                  height: "150px",
                  backgroundColor: (theme) =>
                     mode === "light" ? color || theme.palette.background.default : theme.palette.background.paper
               }}
               spacing={1}>
               <Typography
                  className='title-hover'
                  sx={{
                     color: (theme) =>
                        mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary,
                     textAlign: "left",
                     paddingTop: titleTop,
                     transition: "0.4s"
                  }}
                  fontWeight={700}
                  fontSize={20}
                  textAlign={"center"}
                  noWrap>
                  {title}
               </Typography>
               {description && (
                  <Typography
                     fontWeight={400}
                     fontSize={16}
                     sx={{
                        // line clamp 1
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2,
                        color: (theme) => theme.palette.text.secondary
                     }}>
                     {description}
                  </Typography>
               )}
            </Stack>
         )}
      </Card>
   )
}

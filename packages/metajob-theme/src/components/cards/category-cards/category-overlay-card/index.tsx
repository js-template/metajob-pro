"use client"
import Image from "next/image"
import NextLink from "next/link"
import { useTheme } from "next-themes"
import { Stack, Box, Typography, Card, Icon, Theme } from "@mui/material"
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
   show_description?: boolean
}
export const CategoryOverlayCardItem = ({
   data,
   button_label,
   color,
   backgroundColor,
   show_icon,
   overlay,
   show_description
}: Props) => {
   const { theme: mode } = useTheme()
   //destructure the data
   const { title, description, image, icon } = data || {}
   const logo = image?.url || "https://placehold.co/60/png"
   const iconData = icon?.url || "https://placehold.co/60/png"
   const topValue = overlay ? "10%" : show_description ? "53%" : "58%"
   const spacing = (theme: Theme) =>
      overlay
         ? `${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(0.25)} ${theme.spacing(1)}`
         : `${theme.spacing(1.25)} ${theme.spacing(1.25)} ${theme.spacing(0.375)} ${theme.spacing(1.25)}`

   const titleTop = (theme: Theme) => (show_icon ? theme.spacing(2.5) : 0)

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
                     mode === "light" ? color || theme.palette.primary.light : theme.palette.primary.light,
                  borderRadius: "6px"
               }}>
               <Image
                  src={iconData || "https://placehold.co/60/png"}
                  alt={title}
                  width={30}
                  height={30}
                  style={{ marginBottom: 0, paddingBottom: 0 }}
               />
               {/* <AdUnitsOutlinedIcon
                  sx={{
                     color: (theme) =>
                        mode === "light" ? color || theme.palette.primary.contrastText : theme.palette.text.primary,
                     fontSize: "50px"
                  }}
               /> */}
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
                  height: show_description ? "150px" : show_icon ? "110px" : "80px",
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
               {description && show_description ? (
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
               ) : (
                  ""
               )}
            </Stack>
         )}
      </Card>
   )
}

"use client"
import Image from "next/image"
import NextLink from "next/link"
import { useTheme } from "next-themes"
import { Stack, Box, Typography, Card, Icon } from "@mui/material"
import { ISingleCategory } from "./types"
import { hexToRGBA } from "../../../../lib/hex-to-rgba"
import CIcon from "../../../../components/common/icon"

type Props = {
   data: ISingleCategory
   color?: string
   secondary_color?: string
   icon_type?: "Icon Bg" | "Simple"
   show_description?: boolean
   button_label?: string
}

export const CategoryCardItem = ({
   data,
   color,
   icon_type,
   show_description,
   button_label,
   secondary_color
}: Props) => {
   const { theme: mode } = useTheme()

   //destructure the data
   const { title, image, description, icon } = data || {}

   return (
      //@ts-ignore
      <Card
         component={NextLink}
         href={`/find-job?category=${encodeURIComponent(title)}`}
         sx={{
            p: 4,
            display: "block",
            height: show_description ? "200px" : "180px",
            textDecoration: "none",
            cursor: "pointer",
            boxShadow: " 0 4px 20px rgba(0, 0, 0, 0.05)",
            "&:hover .iconBox": {
               transform: "scale(1.2)"
            },
            "&:hover .category-card-title": {
               color: (theme) => theme.palette.primary.main
            }
         }}>
         {/* logo */}
         {icon_type === "Simple" ? (
            <Stack
               sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2
               }}>
               <Box
                  className='iconBox'
                  sx={{
                     overflow: "hidden",
                     width: "fit-content",
                     transition: "transform 0.3s ease-in-out"
                  }}>
                  {icon ? (
                     <CIcon
                        icon={icon}
                        size={60}
                        sx={{
                           color: (theme) => theme.palette.primary.main
                        }}
                     />
                  ) : (
                     <Image src={"https://placehold.co/60/png"} alt='icon' height={60} width={60} />
                  )}
               </Box>
            </Stack>
         ) : (
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
                     bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                     borderRadius: "12px",
                     width: "fit-content",
                     px: 2,
                     py: 1.5,
                     transition: "transform 0.3s ease-in-out"
                  }}>
                  {icon ? (
                     <CIcon
                        icon={icon}
                        size={36}
                        sx={{
                           color: (theme) => theme.palette.primary.main
                        }}
                     />
                  ) : (
                     <Image
                        src={"https://placehold.co/30/png"}
                        alt={title}
                        width={30}
                        height={30}
                        style={{ marginBottom: 0, paddingBottom: 0 }}
                     />
                  )}
               </Box>
            </Stack>
         )}

         {/*title */}
         <Stack>
            <Typography
               className='category-card-title'
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
            {show_description && (
               <Typography
                  fontWeight={400}
                  fontSize={14}
                  textAlign={"center"}
                  sx={{
                     // line clamp 1
                     display: "-webkit-box",
                     WebkitBoxOrient: "vertical",
                     overflow: "hidden",
                     textOverflow: "ellipsis",
                     WebkitLineClamp: 2,
                     color: (theme) =>
                        mode === "light"
                           ? secondary_color || theme.palette.text.secondary
                           : theme.palette.text.secondary
                  }}>
                  {description}
               </Typography>
            )}

            {/* button  */}
            {button_label && (
               <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Stack
                     sx={{
                        mt: 2,
                        color: (theme) => theme.palette.primary.main,
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
            )}
            {/* <Typography
               color={(theme) => theme.palette.text.secondary}
               fontWeight={400}
               fontSize={14}
               textAlign={"center"}>
               99 Jobs
            </Typography> */}
         </Stack>
      </Card>
   )
}

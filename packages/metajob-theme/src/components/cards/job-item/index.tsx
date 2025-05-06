"use client"
import NextLink from "next/link"
import moment from "moment"
import { useTheme } from "next-themes"
import { Avatar, Box, Button, Icon, Stack, Typography, useTheme as muiTheme } from "@mui/material"
import { hexToRGBA } from "../../../lib/hex-to-rgba"
import { Card } from "../../common/card"
import { ISingleJob } from "./types"
import CIcon from "../../../components/common/icon"

type Props = {
   data: ISingleJob
   button_label?: string
   color?: string
   secondary_color?: string
   vacancy_placeholder?: string
   currency?: string
}
export const JobItem = ({ data, button_label, color, secondary_color, vacancy_placeholder, currency }: Props) => {
   const { theme: mode } = useTheme()
   const theme = muiTheme()

   const { title, type, company, location, vacancy, publishedAt, price, slug, is_featured } = data || {}
   const image = `${process.env.NEXT_PUBLIC_BACKEND_URL}${company?.logo?.url}` || company?.logo?.url
   const companyName = company?.name

   const getTagsColor = (tag: string, theme: any) => {
      switch (tag) {
         case "Full Time":
            return hexToRGBA(theme.palette.primary.main, 0.1)
         case "Remote":
            return hexToRGBA(theme.palette.error.main, 0.1)
            return "#06b6d4"
         case "Part Time":
            return hexToRGBA(theme.palette.success.main, 0.1)
         case "Contract Base":
            return hexToRGBA(theme.palette.info.main, 0.1)
         case "Freelance":
            return hexToRGBA(theme.palette.warning.main, 0.1)
         case "Internship":
            return hexToRGBA(theme.palette.warning.main, 0.1)
         default:
            return hexToRGBA(theme.palette.primary.main, 0.1)
      }
   }
   const getTagsLabelColor = (tag: string, theme: any) => {
      switch (tag) {
         case "Full Time":
            return theme.palette.primary.main
         case "Remote":
            return theme.palette.error.main
         case "Part Time":
            return theme.palette.success.main
         case "Contract Base":
            return theme.palette.info.main
         case "Freelance":
            return theme.palette.warning.main
         case "Internship":
            return theme.palette.warning.main
         default:
            return theme.palette.primary.main
      }
   }
   return (
      <Stack
         direction={"column"}
         // justifyContent={"space-between"}
         sx={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: theme.palette.divider,
            px: { xs: 1.5, sm: 3, md: 4 },
            py: 2.5,
            borderRadius: 2,
            "&:hover": {
               borderColor: theme.palette.primary.main,
               transition: "all 0.3s ease-in-out"
            },
            "&:hover .job-card-button": {
               color: theme.palette.primary.contrastText,
               bgcolor: theme.palette.primary.main
            },
            "&:hover .hover-scale": {
               transform: "scale(1.1)"
            },
            bgcolor: theme.palette.background.paper,
            height: "100%",
            position: "relative"
         }}>
         {is_featured && (
            <CIcon
               icon='ic:round-star'
               size={24}
               sx={{
                  color: theme.palette.primary.main,
                  position: "absolute",
                  right: "20px",
                  top: { xs: 16, md: 20 }
               }}
            />
         )}
         {type && (
            <Card
               sx={{
                  bgcolor: getTagsColor(type?.title, theme),
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  width: "fit-content",
                  position: "absolute",
                  left: { xs: 16, md: 20 },
                  top: { xs: 16, md: 20 }
               }}>
               <Typography fontSize={{ xs: 12, md: 14 }} fontWeight={400} color={getTagsLabelColor(type?.title, theme)}>
                  {type?.title}
               </Typography>
            </Card>
         )}

         <Stack
            className='hover-scale'
            sx={{
               justifyContent: "center",
               alignItems: "center",
               transition: "0.6s",
               pt: { xs: 3.5, md: 4 },
               pb: { xs: 1.5, sm: 2, md: 2.5 }
            }}>
            <Avatar
               src={image}
               alt='avatar'
               sx={{
                  width: { xs: "60px", sm: "80px", md: "100px" },
                  height: { xs: "60px", sm: "80px", md: "100px" },
                  borderRadius: { xs: "8px", md: "12px" }
               }}>
               {companyName?.charAt(0) || ""}
            </Avatar>
         </Stack>
         <Box>
            {title && (
               <Typography
                  fontWeight={400}
                  textAlign={"center"}
                  sx={{
                     mb: "4px",
                     fontSize: { xs: 16, md: 18 },
                     color: mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary,
                     // line clamp 1
                     display: "-webkit-box",
                     WebkitBoxOrient: "vertical",
                     overflow: "hidden",
                     textOverflow: "ellipsis",
                     WebkitLineClamp: 1
                  }}>
                  {title}
               </Typography>
            )}

            {/* location */}
            {/* {location ? (
               <Stack sx={{ mb: 3 }} direction={"row"} gap={1} alignItems={"center"} justifyContent={"center"}>
                  <Icon
                     fontSize='small'
                     className='icon-map-pin'
                     sx={{
                        color:
                           mode === "light"
                              ? secondary_color || theme.palette.text.secondary
                              : theme.palette.text.secondary
                     }}
                  />
                  <Typography
                     fontSize={14}
                     fontWeight={400}
                     color={
                        mode === "light"
                           ? secondary_color || theme.palette.text.secondary
                           : theme.palette.text.secondary
                     }>
                     {location}
                  </Typography>
               </Stack>
            ) : (
               <Stack sx={{ mb: 3 }} direction={"row"} gap={1} alignItems={"center"} justifyContent={"center"}>
                  <Icon
                     fontSize='small'
                     className='icon-map-pin'
                     sx={{
                        color:
                           mode === "light"
                              ? secondary_color || theme.palette.text.secondary
                              : theme.palette.text.secondary
                     }}
                  />
                  <Typography
                     fontSize={14}
                     fontWeight={400}
                     color={
                        mode === "light"
                           ? secondary_color || theme.palette.text.secondary
                           : theme.palette.text.secondary
                     }>
                     Location not available
                  </Typography>
               </Stack>
            )} */}
         </Box>
         <Stack sx={{ mb: { xs: 2, md: 3 }, mt: { xs: 2, md: 4 } }} gap={{ xs: 1, md: 1.5 }}>
            {vacancy && (
               <Stack direction={"row"} gap={2} alignItems={"center"}>
                  <Icon
                     fontSize='small'
                     className='icon-users'
                     sx={{
                        color:
                           mode === "light"
                              ? secondary_color || theme.palette.text.disabled
                              : theme.palette.text.disabled
                     }}
                  />
                  <Typography
                     fontSize={14}
                     fontWeight={400}
                     color={
                        mode === "light" ? secondary_color || theme.palette.text.disabled : theme.palette.text.disabled
                     }>
                     {/* {vacancy} */}
                     {vacancy} {vacancy_placeholder}
                  </Typography>
               </Stack>
            )}
            {price && (
               <Stack direction={"row"} gap={2} alignItems={"center"}>
                  <Icon
                     fontSize='small'
                     className='icon-dollar-sign'
                     sx={{
                        color:
                           mode === "light"
                              ? secondary_color || theme.palette.text.disabled
                              : theme.palette.text.disabled
                     }}
                  />
                  <Typography
                     fontSize={14}
                     fontWeight={400}
                     color={
                        mode === "light" ? secondary_color || theme.palette.text.disabled : theme.palette.text.disabled
                     }>
                     {price} {currency}
                  </Typography>
               </Stack>
            )}
            {publishedAt && (
               <Stack direction={"row"} gap={2} alignItems={"center"}>
                  <Icon
                     fontSize='small'
                     className='icon-clock'
                     sx={{
                        color:
                           mode === "light"
                              ? secondary_color || theme.palette.text.disabled
                              : theme.palette.text.disabled
                     }}
                  />
                  <Typography
                     fontSize={14}
                     fontWeight={400}
                     color={
                        mode === "light" ? secondary_color || theme.palette.text.disabled : theme.palette.text.disabled
                     }>
                     {moment(publishedAt).fromNow()}
                  </Typography>
               </Stack>
            )}
         </Stack>

         <Button
            className='job-card-button'
            component={NextLink}
            href={`/job/${slug}`}
            sx={{
               fontSize: { xs: 14, md: 16 },
               bgcolor: theme.palette.background.default,
               color: mode === "dark" ? theme.palette.primary.contrastText : theme.palette.text.disabled,
               "&:hover": {
                  color: theme.palette.primary.contrastText,
                  bgcolor: theme.palette.primary.main
               }
            }}>
            {button_label || "Apply Now"}
         </Button>
      </Stack>
   )
}

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
}
export const JobItem = ({ data }: Props) => {
   const { theme: mode } = useTheme()
   const theme = muiTheme()

   const { title, type, company, location, vacancy, publishedAt, price, slug, is_featured } = data || {}
   const image = company?.logo?.url
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
         sx={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: theme.palette.divider,
            p: 2,
            borderRadius: 2,
            "&:hover": {
               borderColor: theme.palette.primary.main,
               transition: "all 0.3s ease-in-out"
            },
            bgcolor: theme.palette.background.paper
         }}
         spacing={2}>
         {type && (
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} gap={1}>
               <Card
                  sx={{
                     bgcolor: getTagsColor(type?.title, theme),
                     py: 0.5,
                     px: 1,
                     borderRadius: 1,
                     width: "fit-content"
                  }}>
                  <Typography fontSize={14} fontWeight={400} color={getTagsLabelColor(type?.title, theme)}>
                     {type?.title}
                  </Typography>
               </Card>
               {is_featured && (
                  <CIcon
                     icon='ic:round-star'
                     size={24}
                     sx={{
                        color: theme.palette.primary.main
                     }}
                  />
               )}
            </Stack>
         )}
         <Stack
            sx={{
               justifyContent: "center",
               alignItems: "center"
            }}>
            <Avatar
               src={image}
               alt='avatar'
               sx={{
                  width: 100,
                  height: 100,
                  fontWeight: 700,
                  fontSize: "30px"
               }}>
               {companyName?.charAt(0) || ""}
            </Avatar>
         </Stack>
         <Box>
            {title && (
               <Typography
                  fontSize={18}
                  fontWeight={400}
                  color={theme.palette.text.primary}
                  textAlign={"center"}
                  pb={1}>
                  {title}
               </Typography>
            )}
            {location && (
               <Stack direction={"row"} gap={1} alignItems={"center"} justifyContent={"center"}>
                  <Icon
                     fontSize='small'
                     className='icon-map-pin'
                     sx={{
                        color: theme.palette.text.secondary
                     }}
                  />
                  <Typography fontSize={14} fontWeight={400} color={theme.palette.text.secondary}>
                     {location?.address}
                  </Typography>
               </Stack>
            )}
         </Box>
         <Stack spacing={2}>
            {vacancy && (
               <Stack direction={"row"} gap={2} alignItems={"center"}>
                  <Icon
                     fontSize='small'
                     className='icon-users'
                     sx={{
                        color: theme.palette.text.disabled
                     }}
                  />
                  <Typography fontSize={14} fontWeight={400} color={theme.palette.text.disabled}>
                     {vacancy} Vacancy
                  </Typography>
               </Stack>
            )}
            {price && (
               <Stack direction={"row"} gap={2} alignItems={"center"}>
                  <Icon
                     fontSize='small'
                     className='icon-dollar-sign'
                     sx={{
                        color: theme.palette.text.disabled
                     }}
                  />
                  <Typography fontSize={14} fontWeight={400} color={theme.palette.text.disabled}>
                     {price}
                  </Typography>
               </Stack>
            )}
            {publishedAt && (
               <Stack direction={"row"} gap={2} alignItems={"center"}>
                  <Icon
                     fontSize='small'
                     className='icon-clock'
                     sx={{
                        color: theme.palette.text.disabled
                     }}
                  />
                  <Typography fontSize={14} fontWeight={400} color={theme.palette.text.disabled}>
                     {moment(publishedAt).fromNow()}
                  </Typography>
               </Stack>
            )}
         </Stack>

         <Button
            component={NextLink}
            href={`/job/${slug}`}
            sx={{
               bgcolor: theme.palette.background.default,
               color: mode === "dark" ? theme.palette.primary.contrastText : theme.palette.text.disabled,
               "&:hover": {
                  color: theme.palette.primary.contrastText,
                  bgcolor: theme.palette.primary.main
               }
            }}>
            Apply Now
         </Button>
      </Stack>
   )
}

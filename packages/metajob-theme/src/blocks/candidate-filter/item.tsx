"use client"
import NextLink from "next/link"
import { Avatar, Box, Button, Icon, Stack, Typography } from "@mui/material"
import _ from "lodash"
import { useTheme } from "next-themes"
import { ISingleCandidate } from "./types"

const CandidateCardItem = ({
   data,
   button_label,
   color,
   secondary_color
}: {
   data: ISingleCandidate
   button_label?: string
   color?: string
   secondary_color?: string
}) => {
   const { theme: mode } = useTheme()

   const { name, tagline, contact, slug, user } = data || {}
   const { location } = contact || {}
   const image = user?.avatar?.url || ""

   return (
      <Stack
         sx={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: (theme) => theme.palette.background.paper,
            p: 4,
            borderRadius: 2,
            "&:hover": {
               borderColor: (theme) => theme.palette.primary.main,
               // cursor: 'pointer',
               transition: "all 0.3s ease-in-out"
            },
            "&:hover .avatar": {
               borderColor: (theme) => theme.palette.primary.main,
               transition: "all 0.3s ease-in-out"
            },
            bgcolor: (theme) => theme.palette.background.paper,
            height: "390px"
         }}
         spacing={2}>
         <Stack
            sx={{
               justifyContent: "center",
               alignItems: "center"
            }}>
            {/* avatar  */}
            <Box
               className='avatar'
               sx={{
                  borderWidth: 1,
                  borderColor: (theme) => theme.palette.divider,
                  borderStyle: "solid",
                  borderRadius: "50%",
                  p: 1,
                  fontWeight: 700
               }}>
               <Avatar
                  src={image}
                  alt='avatar'
                  sx={{
                     width: 80,
                     height: 80
                  }}>
                  {name?.charAt(0) || ""}
               </Avatar>
            </Box>
         </Stack>
         <Stack spacing={1}>
            {/* name - tagline  */}
            <Stack spacing={0.5}>
               <Typography
                  fontSize={18}
                  fontWeight={400}
                  sx={{
                     color: (theme) =>
                        mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary
                  }}
                  textAlign={"center"}>
                  {name}
               </Typography>

               {tagline && (
                  <Typography
                     textAlign={"center"}
                     fontSize={14}
                     fontWeight={400}
                     sx={{
                        color: (theme) =>
                           mode === "light"
                              ? secondary_color || theme.palette.text.secondary
                              : theme.palette.text.secondary
                     }}>
                     {tagline}
                  </Typography>
               )}
            </Stack>
            {/* location  */}
            {location && (
               <Stack direction={"row"} gap={1} justifyContent={"center"} alignItems={"center"}>
                  <Icon
                     fontSize='small'
                     className='icon-map-pin'
                     sx={{
                        color: (theme) =>
                           mode === "light"
                              ? secondary_color || theme.palette.text.secondary
                              : theme.palette.text.secondary
                     }}
                  />
                  <Typography
                     fontSize={14}
                     fontWeight={400}
                     sx={{
                        color: (theme) =>
                           mode === "light"
                              ? secondary_color || theme.palette.text.secondary
                              : theme.palette.text.secondary
                     }}>
                     {location}
                  </Typography>
               </Stack>
            )}
         </Stack>
         {/* {skills && (
            <Stack direction={"row"} gap={1} flexWrap={"wrap"} justifyContent={"center"}>
               {_.map(skills?.data, (item, index) => (
                  <Typography
                     key={index}
                     sx={{
                        bgcolor: (theme) => theme.palette.background.paper,
                        borderColor: (theme) => theme.palette.divider,
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderRadius: 1,
                        py: 0.5,
                        px: 2
                     }}
                     variant={"body1"}
                     fontWeight={400}
                     fontSize={14}
                     color={(theme) => theme.palette.text.disabled}>
                     {item?.attributes?.title}
                  </Typography>
               ))}
            </Stack>
         )} */}
         <Button
            component={NextLink}
            href={`/resume/${slug}`}
            sx={{
               bgcolor: (theme) => theme.palette.background.default,
               color: (theme) => (mode === "dark" ? theme.palette.primary.contrastText : theme.palette.text.disabled),
               "&:hover": {
                  color: (theme) => theme.palette.primary.contrastText,
                  bgcolor: (theme) => theme.palette.primary.main
               }
            }}>
            {button_label || "View Candidate"}
         </Button>
      </Stack>
   )
}
export default CandidateCardItem

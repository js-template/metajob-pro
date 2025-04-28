"use client"
import NextLink from "next/link"
import { Avatar, Box, Button, Icon, Stack, Typography } from "@mui/material"
import _ from "lodash"
import { useTheme } from "next-themes"
import { ISingleCandidate, ISingleCategory } from "./types"

const CandidateCardItem = ({
   data,
   button_label,
   color,
   secondary_color,
   skillsData
}: {
   data: ISingleCandidate
   button_label?: string
   color?: string
   secondary_color?: string
   skillsData?: ISingleCategory[]
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
            padding: "35px 30px 30px 30px",
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
            "&:hover .candidate-button": {
               color: (theme) => theme.palette.primary.contrastText,
               bgcolor: (theme) => theme.palette.primary.main
            },
            bgcolor: (theme) => theme.palette.background.paper,
            height: "390px"
         }}>
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
                  fontWeight: 700,
                  mb: "15px"
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
         <Stack spacing={1} sx={{ mb: "20px" }}>
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
         <Stack direction={"column"} justifyContent={"space-between"} height={"100%"}>
            {skillsData && skillsData?.length > 0 ? (
               <Stack sx={{ mb: "20px" }} direction={"row"} gap={1} flexWrap={"wrap"} justifyContent={"center"}>
                  {_.map(skillsData?.length >= 5 ? skillsData.slice(0, 5) : skillsData, (item, index) => (
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
                        {item?.title}
                        {/* {item} */}
                     </Typography>
                  ))}
               </Stack>
            ) : (
               <Typography
                  sx={{
                     bgcolor: (theme) => theme.palette.background.paper,
                     // borderColor: (theme) => theme.palette.divider,
                     borderWidth: 0,
                     borderStyle: "solid",
                     borderRadius: 1,
                     py: 1,
                     px: 2,
                     mb: "20px",
                     textAlign: "center"
                  }}
                  variant={"body1"}
                  fontWeight={400}
                  fontSize={14}
                  color={(theme) => theme.palette.text.disabled}>
                  Skills not Available
               </Typography>
            )}
            <Button
               className='candidate-button'
               component={NextLink}
               href={`/resume/${slug}`}
               sx={{
                  bgcolor: (theme) => theme.palette.background.default,
                  color: (theme) => (mode === "dark" ? theme.palette.primary.contrastText : theme.palette.text.disabled)
               }}>
               {button_label || "View Candidate"}
            </Button>
         </Stack>
      </Stack>
   )
}
export default CandidateCardItem

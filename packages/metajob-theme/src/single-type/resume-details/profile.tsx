"use client"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material"
import _ from "lodash"
import moment from "moment"
import { useTheme } from "next-themes"
import { Card } from "../../components/common/card"
import CIcon from "../../components/common/icon"
import { ISingleResume } from "./types"

export default function ProfileSection({ data }: { data: ISingleResume }) {
   const { theme: mode } = useTheme()
   const { name, user, tagline, category, experience_time, contact, createdAt } = data || {}
   const image = user?.avatar?.url || ""
   const industry = category?.title || ""
   const location = contact?.location || ""

   return (
      <Card
         sx={{
            p: 3,
            borderRadius: 2
         }}>
         <Stack spacing={2}>
            <Typography
               fontWeight={400}
               fontSize={14}
               sx={{
                  color: (theme) => theme.palette.primary.contrastText
                  }}
               bgcolor={(theme) => theme.palette.primary.main}
               borderRadius={1.5}
               px={1}
               py={0.5}
               width={"fit-content"}>
               Open To Work
            </Typography>
            <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
               {/* avatar  */}
               <Box
                  sx={{
                     borderWidth: 1,
                     borderColor: (theme) => theme.palette.divider,
                     borderStyle: "solid",
                     borderRadius: "50%",
                     p: 1
                  }}>
                  <Avatar
                     src={image}
                     alt='avatar'
                     sx={{
                        width: 130,
                        height: 130,
                        fontWeight: 700,
                        fontSize: "30px"
                     }}>
                     {name?.charAt(0) || ""}
                  </Avatar>
               </Box>

               <Box>
                  {name && (
                     <Typography
                        fontWeight={700}
                        fontSize={24}
                        sx={{
                           color: (theme) => theme.palette.text.primary
                         }}
                        textAlign={"center"}>
                        {name}
                     </Typography>
                  )}
                  {tagline && (
                     <Typography
                        fontWeight={400}
                        fontSize={16}
                        sx={{
                           color: (theme) => theme.palette.text.disabled
                           }}
                        textAlign={"center"}>
                        {tagline}
                     </Typography>
                  )}
               </Box>
            </Stack>
            {/* {skillsValue && skillsValue?.length > 0 && (
               <Stack direction={"row"} gap={1} flexWrap={"wrap"} justifyContent={"center"} py={1}>
                  {_.map(skillsValue, (item, index) => (
                     <Typography
                        key={item?.id || index}
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
            <Divider />
            <Stack spacing={1} py={1}>
               {industry && (
                  <Stack spacing={2} direction='row'>
                     <Box
                        sx={{
                           bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                           borderRadius: 2,
                           p: 1.5
                        }}>
                        <CIcon icon={"bytesize:work"} size={24} color='primary.main' />
                     </Box>
                     <Stack>
                        <Typography fontWeight={500} fontSize={14} 
                           sx={{
                              color: (theme) => theme.palette.text.primary
                             }}
                           >
                           Industry
                        </Typography>
                        <Typography fontWeight={400} fontSize={16}
                           sx={{
                              color: (theme) => theme.palette.text.disabled
                             }}
                             >
                           {industry}
                        </Typography>
                     </Stack>
                  </Stack>
               )}
               {experience_time && (
                  <Stack spacing={2} direction='row'>
                     <Box
                        sx={{
                           bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                           borderRadius: 2,
                           p: 1.5
                        }}>
                        <CIcon icon={"ri:award-line"} size={24} color='primary.main' />
                     </Box>
                     <Stack>
                        <Typography fontWeight={500} fontSize={14} 
                             sx={{
                              color: (theme) => theme.palette.text.primary
                            }}
                           >
                           Experience
                        </Typography>
                        <Typography fontWeight={400} fontSize={16} 
                         sx={{
                           color: (theme) => theme.palette.text.disabled
                        }}>
                           {experience_time?.title}
                        </Typography>
                     </Stack>
                  </Stack>
               )}
               {location && (
                  <Stack spacing={2} direction='row'>
                     <Box
                        sx={{
                           bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                           borderRadius: 2,
                           p: 1.5
                        }}>
                        <CIcon icon={"ph:map-pin"} size={24} color='primary.main' />
                     </Box>
                     <Stack>
                        <Typography fontWeight={500} fontSize={14}    sx={{
     color: (theme) => theme.palette.text.primary
   }}>
                           Location
                        </Typography>
                        <Typography fontWeight={400} fontSize={16} sx={{
color: (theme) => theme.palette.text.disabled
}}>
                           {location}
                        </Typography>
                     </Stack>
                  </Stack>
               )}
               {createdAt && (
                  <Stack spacing={2} direction='row'>
                     <Box
                        sx={{
                           bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                           borderRadius: 2,
                           p: 1.5
                        }}>
                        <CIcon icon={"uil:calender"} size={24} color='primary.main' />
                     </Box>
                     <Stack>
                        <Typography fontWeight={500} fontSize={14} 
                            sx={{
                              color: (theme) => theme.palette.text.primary
                             }}
                           >
                           Member Since
                        </Typography>
                        <Typography fontWeight={400} fontSize={16} 
                           sx={{
                              color: (theme) => theme.palette.text.disabled
                             }}
                           >
                           {moment(createdAt).format("DD MMMM YYYY")}
                        </Typography>
                     </Stack>
                  </Stack>
               )}
            </Stack>
            <Divider />
            {/* TODO: Feature will be enhance later in update version */}
            {/* <Button variant='contained' color='primary' size='large'>
               Invite for Interview
            </Button> */}
            {/* <Button
               sx={{
                  bgcolor: (theme) => theme.palette.background.default,
                  color: (theme) =>
                     mode === "dark" ? theme.palette.primary.contrastText : theme.palette.text.disabled,
                  "&:hover": {
                     color: (theme) => theme.palette.primary.contrastText,
                     bgcolor: (theme) => theme.palette.primary.main
                  }
               }}
               size='large'>
               Download My Resume
            </Button> */}
         </Stack>
      </Card>
   )
}

"use client"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Stack, Typography, useTheme as muiTheme } from "@mui/material"
import _ from "lodash"
import { ISingleReview } from "./types"
// import CIcon from "../../components/common/icon"

const CardItem = ({
   data,
   color,
   secondary_color
}: {
   data: ISingleReview
   color?: string
   secondary_color?: string
}) => {
   const { theme: mode } = useTheme()
   const theme = muiTheme()

   const { name, designation, review, avatar } = data || {}
   // const url = avatar?.url || "https://placehold.co/64/png"
   const url = avatar?.url

   return (
      <Stack
         sx={(theme) => ({
            bgcolor: "background.paper",
            px: {
               xs: theme.spacing(2),
               sm: theme.spacing(4)
            },
            py: {
               xs: theme.spacing(2),
               sm: theme.spacing(4)
            },
            borderRadius: 1.5,
            mx: 1.5
         })}>
         <Stack gap={2}>
            <Stack direction={"row"} spacing={"20px"} alignItems={"center"}>
               {url && (
                  <Image
                     height={64}
                     width={64}
                     style={{
                        borderRadius: 32
                     }}
                     alt='Remy Sharp'
                     src={url || "https://placehold.co/64/png"}
                  />
               )}
               <Stack>
                  {name && (
                     <Typography
                        color='text.primary'
                        sx={{
                           color: mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary
                        }}
                        fontWeight={400}
                        fontSize={20}>
                        {name}
                     </Typography>
                  )}
                  {designation && (
                     <Typography
                        sx={{
                           color:
                              mode === "light"
                                 ? secondary_color || theme.palette.text.disabled
                                 : theme.palette.text.disabled
                        }}
                        fontWeight={400}
                        fontSize={14}>
                        {designation}
                     </Typography>
                  )}
               </Stack>
            </Stack>

            <Stack direction={"row"} spacing={2} alignItems={"center"}>
               {/* <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  <CIcon
                     icon='solar:star-bold'
                     size={16}
                     color='warning.light'
                     sx={{
                        "&:hover": {
                           cursor: "pointer"
                        }
                     }}
                  />
                  <Typography
                     variant={"caption"}
                     sx={{
                        fontWeight: 300,
                        fontSize: "16px",
                        color: theme.palette.text.disabled
                     }}>
                     ({rating || "0"})
                  </Typography>
               </Stack> */}
               <Stack>
                  {review && (
                     <Typography
                        sx={{
                           display: "-webkit-box",
                           overflow: "hidden",
                           WebkitBoxOrient: "vertical",
                           WebkitLineClamp: 5,
                           color:
                              mode === "light"
                                 ? secondary_color || theme.palette.text.disabled
                                 : theme.palette.text.disabled
                        }}
                        fontWeight={400}
                        fontSize={16}>
                        {review}
                     </Typography>
                  )}
               </Stack>
            </Stack>
            {/* {review && (
               <Typography color='text.disabled' fontWeight={400} fontSize={16}>
                  {review}
               </Typography>
            )} */}
         </Stack>
      </Stack>
   )
}
export default CardItem

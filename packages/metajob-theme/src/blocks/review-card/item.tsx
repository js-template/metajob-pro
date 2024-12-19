"use client"
import Image from "next/image"
import { Stack, Typography, useTheme } from "@mui/material"
import _ from "lodash"
import { ISingleReview } from "./types"
import CIcon from "../../components/common/icon"

const CardItem = ({ data }: { data: ISingleReview }) => {
   const theme = useTheme()

   const { reviewer, review, avatar, rating } = data || {}
   const url = avatar?.url || "https://via.placeholder.com/64"

   return (
      <Stack
         sx={{
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 1.5,
            mx: 1.5
         }}>
         <Stack gap={2}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
               <Image
                  height={64}
                  width={64}
                  style={{
                     borderRadius: 32
                  }}
                  alt='Remy Sharp'
                  src={url}
               />
               <Stack>
                  {reviewer && (
                     <Typography color='text.primary' fontWeight={400} fontSize={20}>
                        {reviewer}
                     </Typography>
                  )}
                  {/* {designation && (
                     <Typography color='text.disabled' fontWeight={400} fontSize={14}>
                        {designation}
                     </Typography>
                  )} */}
               </Stack>
            </Stack>

            <Stack direction={"row"} spacing={2} alignItems={"center"}>
               <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
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
               </Stack>
               <Stack>
                  {review && (
                     <Typography color='text.disabled' fontWeight={400} fontSize={16}>
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

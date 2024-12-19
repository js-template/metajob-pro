"use client"
import { Box, Skeleton, Stack } from "@mui/material"
import _ from "lodash"

export default function CandidateCardLoader() {
   return (
      <Stack
         sx={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: (theme) => theme.palette.background.paper,
            p: 4,
            borderRadius: 2,
            bgcolor: (theme) => theme.palette.background.paper
         }}
         spacing={2}>
         <Stack
            sx={{
               justifyContent: "center",
               alignItems: "center"
            }}>
            <Box
               className='avatar'
               sx={{
                  borderWidth: 1,
                  borderColor: (theme) => theme.palette.divider,
                  borderStyle: "solid",
                  borderRadius: "50%",
                  p: 1
               }}>
               <Skeleton
                  sx={{
                     bgcolor: (theme) => theme.palette.background.default
                  }}
                  variant='circular'
                  width={80}
                  height={80}
               />
            </Box>
         </Stack>
         <Stack spacing={1}>
            <Skeleton variant='text' sx={{ fontSize: "1rem", bgcolor: (theme) => theme.palette.background.default }} />

            <Stack direction={"row"} gap={1} justifyContent={"center"} alignItems={"center"}>
               <Skeleton
                  variant='rounded'
                  sx={{ height: 20, width: 20, bgcolor: (theme) => theme.palette.background.default }}
               />
               <Skeleton
                  variant='text'
                  sx={{ width: 100, fontSize: "0.75rem", bgcolor: (theme) => theme.palette.background.default }}
               />
            </Stack>
         </Stack>
         <Stack direction={"row"} gap={1} flexWrap={"wrap"} justifyContent={"center"}>
            {_.times(4, (index) => (
               <Skeleton
                  sx={{
                     bgcolor: (theme) => theme.palette.background.default,
                     borderRadius: 1
                  }}
                  variant='rectangular'
                  width={60}
                  height={20}
                  key={index}
               />
            ))}
         </Stack>
      </Stack>
   )
}

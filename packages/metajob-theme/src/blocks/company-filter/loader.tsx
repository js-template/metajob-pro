"use client"
import { Box, Skeleton, Stack } from "@mui/material"

export default function CompanyCardLoader() {
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
            <Skeleton
               sx={{
                  bgcolor: (theme) => theme.palette.background.default,
                  borderRadius: 1.5
               }}
               variant='rectangular'
               width={100}
               height={100}
            />
         </Stack>
         <Box>
            <Skeleton variant='text' sx={{ fontSize: "1rem", bgcolor: (theme) => theme.palette.background.default }} />
            <Skeleton variant='text' sx={{ fontSize: "1rem", bgcolor: (theme) => theme.palette.background.default }} />
         </Box>

         <Stack spacing={2}>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
               <Skeleton
                  variant='rounded'
                  sx={{ height: 20, width: 20, bgcolor: (theme) => theme.palette.background.default }}
               />

               <Skeleton
                  variant='text'
                  sx={{ width: 100, fontSize: "0.75rem", bgcolor: (theme) => theme.palette.background.default }}
               />
            </Stack>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
               <Skeleton
                  variant='rounded'
                  sx={{ height: 20, width: 20, bgcolor: (theme) => theme.palette.background.default }}
               />

               <Skeleton
                  variant='text'
                  sx={{ width: 100, fontSize: "0.75rem", bgcolor: (theme) => theme.palette.background.default }}
               />
            </Stack>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
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
         <Skeleton
            variant='rectangular'
            sx={{ height: 45, borderRadius: 2, bgcolor: (theme) => theme.palette.background.default }}
         />
      </Stack>
   )
}

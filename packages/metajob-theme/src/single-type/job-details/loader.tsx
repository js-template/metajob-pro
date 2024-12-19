"use client"
import { Box, Skeleton, Stack } from "@mui/material"

const ListCardLoader = () => {
   return (
      <Stack
         sx={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: (theme) => theme.palette.divider,
            p: 2,
            borderRadius: 2,
            bgcolor: (theme) => theme.palette.background.default
         }}
         spacing={2}>
         <Stack
            direction={"row"}
            gap={1}
            sx={{
               display: "flex",
               flexWrap: "wrap"
            }}>
            <Skeleton
               sx={{
                  bgcolor: (theme) => theme.palette.background.paper,
                  borderRadius: 1
               }}
               variant='rectangular'
               width={80}
               height={20}
            />
            <Skeleton
               sx={{
                  bgcolor: (theme) => theme.palette.background.paper,
                  borderRadius: 1
               }}
               variant='rectangular'
               width={80}
               height={20}
            />
            <Skeleton
               sx={{
                  bgcolor: (theme) => theme.palette.background.paper,
                  borderRadius: 1
               }}
               variant='rectangular'
               width={80}
               height={20}
            />
            <Skeleton
               sx={{
                  bgcolor: (theme) => theme.palette.background.paper,
                  borderRadius: 1
               }}
               variant='rectangular'
               width={80}
               height={20}
            />
         </Stack>
         <Stack
            sx={{
               justifyContent: "center",
               alignItems: "center"
            }}>
            <Skeleton
               sx={{
                  bgcolor: (theme) => theme.palette.background.paper,
                  borderRadius: 1.5
               }}
               variant='circular'
               width={100}
               height={100}
            />
         </Stack>
         <Box>
            <Skeleton variant='text' sx={{ fontSize: "1rem", bgcolor: (theme) => theme.palette.background.paper }} />
            <Stack direction={"row"} gap={1} alignItems={"center"} justifyContent={"center"}>
               <Skeleton
                  variant='rounded'
                  sx={{ height: 20, width: 20, bgcolor: (theme) => theme.palette.background.paper }}
               />
               <Skeleton
                  variant='text'
                  sx={{ width: 100, fontSize: "0.75rem", bgcolor: (theme) => theme.palette.background.paper }}
               />
            </Stack>
         </Box>
         <Stack spacing={2}>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
               <Skeleton
                  variant='rounded'
                  sx={{ height: 20, width: 20, bgcolor: (theme) => theme.palette.background.paper }}
               />

               <Skeleton
                  variant='text'
                  sx={{ width: 100, fontSize: "0.75rem", bgcolor: (theme) => theme.palette.background.paper }}
               />
            </Stack>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
               <Skeleton
                  variant='rounded'
                  sx={{ height: 20, width: 20, bgcolor: (theme) => theme.palette.background.paper }}
               />

               <Skeleton
                  variant='text'
                  sx={{ width: 100, fontSize: "0.75rem", bgcolor: (theme) => theme.palette.background.paper }}
               />
            </Stack>
            <Stack direction={"row"} gap={2} alignItems={"center"}>
               <Skeleton
                  variant='rounded'
                  sx={{ height: 20, width: 20, bgcolor: (theme) => theme.palette.background.paper }}
               />

               <Skeleton
                  variant='text'
                  sx={{ width: 100, fontSize: "0.75rem", bgcolor: (theme) => theme.palette.background.paper }}
               />
            </Stack>
         </Stack>

         <Skeleton
            variant='rectangular'
            sx={{ height: 45, borderRadius: 2, bgcolor: (theme) => theme.palette.background.paper }}
         />
      </Stack>
   )
}

export default ListCardLoader

"use client"
import { Box, Skeleton, Stack } from "@mui/material"
import { Card } from "../../components/common/card"

const ItemLoader = () => {
   return (
      <Card
         sx={{
            p: 3,
            bgcolor: (theme) => theme.palette.background.paper,
            textDecoration: "none"
         }}>
         <Stack
            spacing={2}
            sx={{
               justifyContent: "center",
               alignItems: "center"
            }}>
            {/* logo-image  */}
            <Skeleton variant='rectangular' width={50} height={50} />
            {/* title  */}
            <Stack
               sx={{
                  justifyContent: "center",
                  alignItems: "center"
               }}>
               <Skeleton variant='text' width={80} height={20} />
            </Stack>
            {/* button  */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
               <Stack
                  sx={{
                     color: (theme) => theme.palette.primary.main,
                     width: "100%"
                  }}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={2}>
                  <Skeleton variant='text' width={60} height={20} />
                  <Skeleton variant='rectangular' width={20} height={20} />
               </Stack>
            </Box>
         </Stack>
      </Card>
   )
}
export default ItemLoader

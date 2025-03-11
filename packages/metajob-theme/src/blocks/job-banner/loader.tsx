"use client"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Box, Container, Stack, Skeleton } from "@mui/material"
import { useTheme } from "next-themes"
import { Card } from "../../components/common/card"

const JobBannerLoader = () => {
   const { theme: mode } = useTheme()
   const getBgColorWithImage = (theme: any) => {
      if (mode === "dark") {
         return `linear-gradient(0deg,${hexToRGBA(theme.palette.background.default, 0.7)},${hexToRGBA(theme.palette.background.default, 0.7)})`
      } else {
         return `linear-gradient(0deg,${hexToRGBA(theme.palette.primary.main, 0.7)},${hexToRGBA(theme.palette.primary.main, 0.7)}),`
      }
   }

   return (
      <Box
         sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: (theme) => getBgColorWithImage(theme),
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative"
         }}>
         <Skeleton variant='rectangular' width={"100%"} height={"509px"} />
         <Box
            sx={{
               width: "100%",
               position: "absolute"
            }}>
            <Container maxWidth='md'>
               <Stack spacing={5}>
                  <Stack
                     sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                     }}>
                     <Skeleton variant='rectangular' width={"100%"} height={75} />
                     <Skeleton variant='rectangular' width={"100%"} height={75} />
                     <Skeleton variant='rectangular' width={"100%"} height={35} />
                     <Skeleton variant='rectangular' width={"100%"} height={35} />
                  </Stack>
                  <Card
                     sx={{
                        bgcolor: (theme) => hexToRGBA(theme.palette.background.default, 0.5)
                     }}>
                     <Skeleton variant='rounded' width={"100%"} height={65} />
                  </Card>
               </Stack>
            </Container>
         </Box>
      </Box>
   )
}

export default JobBannerLoader

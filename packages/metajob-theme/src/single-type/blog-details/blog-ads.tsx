"use client"
import { useTheme } from "next-themes"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Stack, Typography } from "@mui/material"
import { Card } from "../../components/common/card"
// FIXME: Should be dynamic

type Props = {
   color?: string
   secondary_color?: string
}
const BlogAds = ({ color, secondary_color }: Props) => {
   const { theme: mode } = useTheme()
   return (
      <Stack p={4}>
         <Card
            sx={{
               p: 10,
               borderRadius: 3,
               borderWidth: 1,
               borderStyle: "solid",
               borderColor: (theme) => theme.palette.divider
            }}>
            <Typography
               fontSize={14}
               fontWeight={400}
               sx={{
                  color: (theme) =>
                     mode === "light"
                        ? color || hexToRGBA(theme.palette.text.primary, 0.9)
                        : hexToRGBA(theme.palette.text.primary, 0.9)
               }}
               textAlign={"center"}>
               Advertisement
            </Typography>
            <Typography
               fontSize={24}
               fontWeight={600}
               textAlign={"center"}
               sx={{
                  color: (theme) =>
                     mode === "light"
                        ? color || hexToRGBA(theme.palette.text.primary, 0.9)
                        : hexToRGBA(theme.palette.text.primary, 0.9)
               }}>
               You can place ads
            </Typography>
            <Typography
               fontSize={16}
               fontWeight={400}
               textAlign={"center"}
               sx={{
                  color: (theme) =>
                     mode === "light"
                        ? color || hexToRGBA(theme.palette.text.primary, 0.9)
                        : hexToRGBA(theme.palette.text.primary, 0.9)
               }}>
               250x360
            </Typography>
         </Card>
      </Stack>
   )
}

export default BlogAds

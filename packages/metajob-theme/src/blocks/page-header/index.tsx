"use client"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Stack, Typography } from "@mui/material"
import { useTheme } from "next-themes"
import { IPageHeaderBlock } from "./types"

type Props = {
   block: IPageHeaderBlock
   language?: string
}

export const PageHeader = ({ block }: Props) => {
   const { theme: mode } = useTheme()
   const { title, image, style } = block || {}
   const { backgroundColor, color, bg_overlay } = style || {}
   const bgImage = `${process.env.NEXT_PUBLIC_BACKEND_URL}${image?.url}` || image?.url
   return (
      <Stack position={"relative"}>
         <Stack
            sx={{
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               alignItems: "center",
               backgroundImage: bgImage ? `url(${bgImage})` : "",
               bgcolor: backgroundColor ? backgroundColor : "primary.main",
               backgroundSize: "cover",
               backgroundPosition: "center",
               textAlign: "center",
               padding: { xs: "1rem 2rem", sm: "3rem 2rem", md: "6rem 2rem" },
               "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor:
                     mode === "light"
                        ? (theme) => hexToRGBA(backgroundColor || theme.palette.primary.main, bg_overlay || 0.7)
                        : (theme) => hexToRGBA(theme.palette.background.default, bg_overlay || 0.7),
                  zIndex: 1
               },
               "& > *": {
                  position: "relative",
                  zIndex: 2
               }
            }}>
            <Typography
               fontSize={{ xs: 28, sm: 48 }}
               fontWeight={{ sm: 700, xs: 600 }}
               variant={"h1"}
               sx={{
                  color: (theme) => color ?? theme.palette.primary.contrastText
               }}>
               {title}
            </Typography>
         </Stack>
      </Stack>
   )
}

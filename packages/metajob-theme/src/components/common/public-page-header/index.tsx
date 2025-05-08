"use client"
import { hexToRGBA } from "../../../lib/hex-to-rgba"
import { Stack, Typography, useTheme as muiTheme } from "@mui/material"
import { useTheme } from "next-themes"

type Props = {
   title: string
   header_bg_color?: string
   header_color?: string
}

export default function PageHeader({ title, header_bg_color, header_color }: Props) {
   const theme = muiTheme()
   const { theme: mode } = useTheme()
   return (
      <Stack position={"relative"}>
         <Stack
            sx={{
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               alignItems: "center",
               // backgroundImage: "url(/images/jobs/findJob.png)",
               bgcolor:
                  mode === "light"
                     ? header_bg_color || "primary.main"
                     : hexToRGBA(header_bg_color || theme.palette.primary.main, 0.3),
               backgroundSize: "cover",
               backgroundPosition: "center",
               textAlign: "center",
               padding: { xs: "1rem 2rem", sm: "3rem 2rem", md: "6rem 2rem" },
               // "&::before": {
               //    content: '""',
               //    position: "absolute",
               //    top: 0,
               //    left: 0,
               //    right: 0,
               //    bottom: 0,
               //    backgroundColor:
               //       mode === "light"
               //          ? (theme) => hexToRGBA(theme.palette.primary.main, 0.7)
               //          : (theme) => hexToRGBA(theme.palette.background.paper, 0.7),
               //    zIndex: 1
               // },
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
                  color: (theme) =>
                     mode === "light"
                        ? header_color || theme.palette.primary.contrastText
                        : theme.palette.primary.contrastText
               }}>
               {title}
            </Typography>
         </Stack>
      </Stack>
   )
}

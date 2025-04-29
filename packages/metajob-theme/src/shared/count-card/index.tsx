"use client"
import CIcon from "../../components/common/icon"
import { Box, Typography } from "@mui/material"
import NextLink from "next/link"
import { countCardProps } from "./type"
import { useTheme } from "next-themes"

type Props = {
   item: countCardProps
   count: number
   bgColor?: string
   textColor?: string
}
export const CountCard = ({ item, count, bgColor, textColor }: Props) => {
   const { theme: mode } = useTheme()

   const { title, subTitle, link, target } = item

   return (
      <Box
         component={link ? NextLink : "div"}
         {...(link && { href: link ?? "" })}
         {...((link && { target: target ?? "_self" }) || {})}
         sx={{
            position: "relative",
            px: 3,
            py: 1.5,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "8px",
            backgroundColor: (theme) =>
               mode === "light" ? bgColor || theme.palette.background.paper : theme.palette.background.paper,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 2,
            height: "100%",
            transition: "all 0.3s ease",
            cursor: link ? "pointer" : "default",
            textDecoration: "none",
            color: (theme) =>
               mode === "light" ? textColor || theme.palette.primary.contrastText : theme.palette.primary.contrastText,
            "&:hover": {
               borderColor: (theme) => theme.palette.primary.main,
               boxShadow: (theme) => `0 15px 40px 0 ${theme.palette.primary.main + "10"}`
            }
         }}>
         <Box
            sx={{
               textAlign: "center"
            }}>
            <Typography
               variant='body1'
               sx={{
                  width: "100%",
                  fontSize: "18px",
                  lineHeight: "28px",
                  fontWeight: 500
               }}>
               {title}
            </Typography>
         </Box>
         <Box
            sx={{
               textAlign: "center"
            }}>
            <Typography
               variant='h4'
               sx={{
                  fontSize: "36px",
                  lineHeight: "40px",
                  fontWeight: 500
               }}>
               {Math.abs(count) < 10 ? "0" + count : count}
            </Typography>
            <Typography
               variant='body2'
               sx={{
                  textAlign: "center",
                  fontSize: "14px",
                  lineHeight: "24px",
                  fontWeight: 400
               }}>
               {subTitle}
            </Typography>
         </Box>
      </Box>
   )
}

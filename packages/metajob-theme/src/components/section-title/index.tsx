"use client"
import React from "react"
import { useTheme } from "next-themes"
import { Stack, Typography, useTheme as muiTheme } from "@mui/material"

type Props = {
   data?: {
      sub_title: string
      title: string
      variation?: string
   }
   color?: {
      header_color?: string
      sub_header_color?: string
   }
   width?: "Full" | "Small"
}

export const SectionTitle = ({ data, color, width }: Props) => {
   const { theme: mode } = useTheme()
   const theme = muiTheme()
   const { title, sub_title, variation } = data || {}
   const { header_color, sub_header_color } = color || {}

   return (
      <Stack spacing={1} direction={variation === "Variation Two" ? "column-reverse" : "column"}>
         {sub_title && (
            <Typography
               maxWidth={width === "Full" ? "100%" : 650}
               sx={{
                  color: mode === "light" ? sub_header_color || theme.palette.primary.main : theme.palette.primary.main,
                  fontWeight: 700,
                  fontSize: "16px",
                  textAlign: "center"
               }}>
               {sub_title}
            </Typography>
         )}
         {title && (
            <Typography
               maxWidth={width === "Full" ? "100%" : 650}
               sx={{
                  color: mode === "light" ? header_color || theme.palette.text.primary : theme.palette.text.primary,
                  fontWeight: 700,
                  fontSize: "32px",
                  textAlign: "center"
               }}>
               {title}
            </Typography>
         )}
      </Stack>
   )
}

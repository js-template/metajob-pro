"use client"

import React from "react"
import { Stack, Typography, useTheme } from "@mui/material"

type Props = {
   data?: {
      sub_title: string
      title: string
      variation: string
   }
}

export const SectionTitle = ({ data }: Props) => {
   const theme = useTheme()
   const { title, sub_title, variation } = data || {}

   return (
      <Stack spacing={1} direction={variation === "Variation Two" ? "column-reverse" : "column"}>
         {sub_title && (
            <Typography
               sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  fontSize: "16px",
                  textAlign: "center"
               }}>
               {sub_title}
            </Typography>
         )}
         {title && (
            <Typography
               sx={{
                  color: theme.palette.text.primary,
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

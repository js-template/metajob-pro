"use client"
import MarkdownCustomPreview from "../../components/markdown-preview"
import { Stack, Typography, useTheme } from "@mui/material"

export default function AboutSection({ data }: any) {
   const theme = useTheme()
   if (!data) return null

   return (
      <Stack pl={1} spacing={2}>
         <Typography fontSize={20} fontWeight={700} color={(theme) => theme.palette.text.primary}>
            About
         </Typography>
         <MarkdownCustomPreview
            source={data}
            wrapperElement={{
               "data-color-mode": theme.palette.mode
            }}
         />
      </Stack>
   )
}

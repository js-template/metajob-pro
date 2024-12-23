"use client"
import { useTheme } from "@mui/material"
import { Card } from "../../components/common/card"
import CustomPreview from "../../components/markdown-preview"

export default function AboutSection({ data }: any) {
   const theme = useTheme()

   return (
      <Card
         sx={{
            borderRadius: 2,
            p: 3,
            display: data ? "block" : "none"
         }}>
         <CustomPreview
            source={data}
            wrapperElement={{
               "data-color-mode": theme.palette.mode
            }}
         />
      </Card>
   )
}

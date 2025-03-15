"use client"
import { Stack, Typography, useTheme } from "@mui/material"
import { Card } from "../../components/common/card"
import CustomPreview from "../../components/markdown-preview"

type Props = {
   data: {
      description?: string
      skills?: {
         title: string
      }[]
   }
   skillTitle?: string
}
export default function Details({ data, skillTitle }: Props) {
   const theme = useTheme()

   const { skills, description } = data || {}

   return (
      <Card
         sx={{
            borderRadius: 2,
            p: 2
         }}>
         <Stack spacing={4}>
            {description && (
               <Stack spacing={2}>
                  {/* <Typography
                     variant={"h1"}
                     fontWeight={700}
                     fontSize={20}
                     color={(theme) => theme.palette.text.primary}>
                     Description
                  </Typography> */}
                  <CustomPreview
                     source={description}
                     wrapperElement={{
                        "data-color-mode": theme.palette.mode
                     }}
                  />
               </Stack>
            )}
            {skills && skills?.length > 0 && (
               <Stack spacing={2}>
                  <Typography
                     variant={"h1"}
                     fontWeight={700}
                     fontSize={20}
                     sx={{
                        color: (theme) => theme.palette.text.secondary
                     }}>
                     {skillTitle || "Skills"}
                  </Typography>
                  <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
                     {skills?.map((item: any, index) => (
                        <Typography
                           key={index}
                           sx={{
                              color: (theme) => theme.palette.text.disabled,
                              bgcolor: (theme) => theme.palette.background.paper,
                              borderColor: (theme) => theme.palette.divider,
                              borderWidth: 1,
                              borderStyle: "solid",
                              borderRadius: 1,
                              py: 0.5,
                              px: 2
                           }}
                           variant={"body1"}
                           fontWeight={400}
                           fontSize={14}>
                           {item?.title}
                        </Typography>
                     ))}
                  </Stack>
               </Stack>
            )}
         </Stack>
      </Card>
   )
}

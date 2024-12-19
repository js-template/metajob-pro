"use client"

import { Grid, Stack, Typography } from "@mui/material"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import CIcon from "../../components/common/icon"
import { IContactWidgetBlock } from "./types"

type Props = {
   block: IContactWidgetBlock
}
export const ContactWidget = ({ block }: Props) => {
   const { title, description, location, phone, email, style } = block || {}

   return (
      <Grid item xs={style?.mobile || 12} sm={style?.tab || 6} md={style?.desktop || 3}>
         <Stack
            gap={2}
            pr={{
               xs: 0,
               md: 4
            }}>
            {title && (
               <Typography fontSize={24} fontWeight={700} color={(theme) => theme.palette.primary.contrastText}>
                  {title}
               </Typography>
            )}
            {description && (
               <Typography
                  fontSize={18}
                  fontWeight={400}
                  color={(theme) => hexToRGBA(theme.palette.primary.contrastText, 0.5)}>
                  {description}
               </Typography>
            )}
            {location && (
               <Stack direction='row' gap={2} alignItems={"center"}>
                  <CIcon icon={"mynaui:location"} color='primary.main' />
                  <Typography fontSize={18} fontWeight={400} color={(theme) => theme.palette.primary.contrastText}>
                     {location}
                  </Typography>
               </Stack>
            )}
            {phone && (
               <Stack direction='row' gap={2} alignItems={"center"}>
                  <CIcon icon={"mdi:phone-outline"} color='primary.main' />

                  <Typography
                     fontSize={18}
                     fontWeight={400}
                     color={(theme) => theme.palette.primary.contrastText}
                     component={"a"}
                     href='tel:1-202-555-0106'
                     sx={{
                        textDecoration: "none"
                     }}>
                     {phone}
                  </Typography>
               </Stack>
            )}
            {email && (
               <Stack direction='row' gap={2} alignItems={"center"}>
                  <CIcon icon={"mdi-light:email"} color='primary.main' />
                  <Typography
                     fontSize={18}
                     fontWeight={400}
                     color={(theme) => theme.palette.primary.contrastText}
                     component={"a"}
                     href='mailto:info@example.com'
                     sx={{
                        textDecoration: "none"
                     }}>
                     {email}
                  </Typography>
               </Stack>
            )}
         </Stack>
      </Grid>
   )
}

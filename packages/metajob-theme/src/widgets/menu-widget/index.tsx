"use client"

import { Grid, Stack, Typography } from "@mui/material"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import CIcon from "../../components/common/icon"
import { IContactWidgetBlock } from "./types"
import Link from "next/link"

type Props = {
   block: IContactWidgetBlock
}
export const MenuWidget = ({ block }: Props) => {
   const { title, menu_items, style } = block || {}

   return (
      <Grid item xs={style?.mobile || 12} sm={style?.tab || 6} md={style?.desktop || 3}>
         <Stack gap={2}>
            <Typography fontSize={24} fontWeight={700}
               sx={{
                  color:(theme) => theme.palette.primary.contrastText,
                 }}>
               {title}
            </Typography>
            <Stack gap={2}>
               {menu_items?.map((item: any) => (
                  <Typography
                     key={item?.id}
                     fontSize={16}
                     fontWeight={400}
                     component={Link}
                     href={item?.link ?? "#"}
                     target={item?.target ?? "_self"}
                     sx={{
                        color: (theme) => hexToRGBA(theme.palette.primary.contrastText, 0.5),
                        textDecoration: "none",
                        "&:hover": {
                           color: (theme) => theme.palette.primary.main
                        }
                     }}>
                     {item?.label ?? "No Label"}
                  </Typography>
               ))}
            </Stack>
         </Stack>
      </Grid>
   )
}

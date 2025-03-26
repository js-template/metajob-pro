"use client"
import NextLink from "next/link"
import Image from "next/image"
import { Box, Icon, Stack, Typography } from "@mui/material"
import { Card } from "../../components/common/card"
import { ISingleCategory } from "./types"

type Props = {
   data: ISingleCategory
   button_label?: string
}

const BlockItem = ({ data, button_label }: Props) => {
   const { title, image } = data || {}
   const logo = image?.url

   return (
      <Card
         component={NextLink}
         //@ts-ignore
         href={`/find-job?category=${encodeURIComponent(title)}`}
         sx={{
            p: 3,
            bgcolor: (theme) => theme.palette.background.paper,
            textDecoration: "none",
            "&:hover .iconBox": {
               transform: "scale(1.2)"
            }
         }}>
         <Stack
            spacing={2}
            sx={{
               justifyContent: "center",
               alignItems: "center"
            }}>
            {/* logo-image  */}
            <Stack
               sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2
               }}>
               <Box
                  className='iconBox'
                  sx={{
                     overflow: "hidden",
                     width: "fit-content",
                     transition: "transform 0.3s ease-in-out"
                  }}>
                  {logo && <Image src={logo || "https://placehold.co/60/png"} alt='icon' height={60} width={60} />}
               </Box>
            </Stack>
            {/* title  */}
            <Stack
               sx={{
                  justifyContent: "center",
                  alignItems: "center"
               }}>
               <Typography color={(theme) => theme.palette.text.primary} fontWeight={400} fontSize={18}>
                  {title}
               </Typography>
               {/* <Typography color={(theme) => theme.palette.text.secondary} fontWeight={400} fontSize={14}>
                  100 Jobs
               </Typography> */}
            </Stack>
            {/* button  */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
               <Stack
                  sx={{
                     color: (theme) => theme.palette.primary.main,
                     width: "100%"
                  }}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={2}>
                  <Typography fontWeight={500} fontSize={14}>
                     {button_label || "View All Job"}
                  </Typography>
                  <Icon className='icon-arrow-right-circle' fontSize='small' />
               </Stack>
            </Box>
         </Stack>
      </Card>
   )
}
export default BlockItem

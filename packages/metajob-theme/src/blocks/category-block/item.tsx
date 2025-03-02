"use client"
import NextLink from "next/link"
import { ISingleCategory } from "../../types/job-filter"
import { Box, Icon, Stack, Typography } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card } from "../../components/common/card"
import { hexToRGBA } from "../../lib/hex-to-rgba"

const BlockItem = ({ attributes }: ISingleCategory) => {
   const { title, image } = attributes
   const router = useRouter()

   return (
      <Card
         component={NextLink}
         //@ts-ignore
         href={`/find-job?category=${encodeURIComponent(attributes?.title)}`}
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
            <Box
               className='iconBox'
               sx={{
                  color: (theme) => theme.palette.primary.main,
                  bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                  borderRadius: "12px",
                  width: "fit-content",
                  p: 2,
                  transition: "transform 0.3s ease-in-out"
               }}>
               <Image
                  src={image?.data?.attributes?.url || "https://placehold.co/50"}
                  alt={title}
                  width={50}
                  height={50}
               />
            </Box>

            <Stack
               sx={{
                  justifyContent: "center",
                  alignItems: "center"
               }}>
               <Typography  sx={{
            color: (theme) => theme.palette.text.primary,
            }} fontWeight={400} fontSize={18}>
                  {title}
               </Typography>
               {/* <Typography color={(theme) => theme.palette.text.secondary} fontWeight={400} fontSize={14}>
                  100 Jobs
               </Typography> */}
            </Stack>
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
                     View All Job
                  </Typography>
                  <Icon className='icon-arrow-right-circle' fontSize='small' />
               </Stack>
            </Box>
         </Stack>
      </Card>
   )
}
export default BlockItem

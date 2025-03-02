"use client"
import Image from "next/image"
import NextLink from "next/link"
import { Stack, Box, Typography, Card } from "@mui/material"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { ISingleCategory } from "./types"

export const CardItem = ({ data }: { data: ISingleCategory }) => {
   const { title, image } = data || {}
   // const logo = image?.url || "https://placehold.co/60/png"
   const logo = image?.url

   return (
      //@ts-ignore
      <Card
         component={NextLink}
         href={`/find-job?category=${encodeURIComponent(title)}`}
         sx={{
            p: 4,
            display: "block",
            textDecoration: "none",
            cursor: "pointer",
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
            {/* <Box
               className='iconBox'
               sx={{
                  color: (theme) => theme.palette.primary.main,
                  bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                  borderRadius: "12px",
                  width: "fit-content",
                  p: 2,
                  transition: "transform 0.3s ease-in-out"
               }}>
               <Image src={logo} alt='icon' height={20} width={20} />
            </Box> */}
            <Box
               className='iconBox'
               sx={{
                  overflow: "hidden",
                  width: "fit-content",
                  transition: "transform 0.3s ease-in-out"
               }}>
               {logo && <Image src={logo || "https://placehold.co/60/png"} alt='icon' height={60} width={60} />}
            </Box>

            <Stack>
               <Typography
                  sx={{
                     color: (theme) => theme.palette.text.primary,
                   }}
                  fontWeight={400}
                  fontSize={16}
                  textAlign={"center"}
                  noWrap>
                  {title}
               </Typography>
               {/* <Typography
                   color={(theme) => theme.palette.text.secondary}
                   fontWeight={400}
                   fontSize={14}
                   textAlign={"center"}>
                   99 Jobs
                </Typography> */}
            </Stack>
         </Stack>
      </Card>
   )
}

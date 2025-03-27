"use client"
import Image from "next/image"
import NextLink from "next/link"
import { Stack, Box, Typography, Card } from "@mui/material"
import { ISingleCategory } from "./types"

type Props = {
   data: ISingleCategory
}

export const CategoryCardOne = ({ data }: Props) => {
   const { title, image } = data || {}
   const logo = image?.url || "https://placehold.co/60/png"

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
         {/* logo */}
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
               {logo && <Image src={logo} alt='icon' height={60} width={60} />}
            </Box>
         </Stack>

         {/*title */}
         <Stack>
            <Typography
               sx={{
                  color: (theme) => theme.palette.text.primary
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
      </Card>
   )
}

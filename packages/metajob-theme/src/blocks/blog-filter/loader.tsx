"use client"

import React from "react"
import { Skeleton, Stack } from "@mui/material"

const BlogItemLoader = () => {
   return (
      <Stack
         sx={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: (theme) => theme.palette.divider,
            p: 2,
            borderRadius: 1.5,
            "&:hover": {
               borderColor: (theme) => theme.palette.primary.main,
               transition: "all .3s ease-in-out"
            },
            "&:hover .image-scale": {
               transform: "scale(1.2)"
            }
         }}
         spacing={2}>
         <Skeleton variant='rounded' width={"100%"} height={250} />
         <Stack spacing={1}>
            <Skeleton variant='rounded' width={136} height={21} />
            <Skeleton variant='rounded' width={"100%"} height={30} />
         </Stack>
         <Skeleton variant='rounded' width={"100%"} height={24} />
         <Skeleton variant='rounded' width={"100%"} height={50} />
      </Stack>
   )
}

export default BlogItemLoader

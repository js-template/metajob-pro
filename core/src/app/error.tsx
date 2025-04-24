"use client"

import { startTransition } from "react"
import { useRouter } from "next/navigation"
import { Button, Container, Stack, Typography } from "@mui/material"

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
   const router = useRouter()
   const reload = () => {
      startTransition(() => {
         router.refresh()
         reset()
      })
   }
   return (
      <Stack
         sx={{
            bgcolor: (theme) => theme.palette.background.default,
            minHeight: "85vh"
         }}>
         <Container maxWidth='lg'>
            <Stack py={10} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               <Typography
                  variant='h3'
                  component='h3'
                  sx={{
                     fontWeight: 700,
                     mb: 2
                  }}>
                  Something Went Wrong
               </Typography>
               <Button onClick={reload} variant='contained' color='primary'>
                  Try again
               </Button>
            </Stack>
         </Container>
      </Stack>
   )
}

export default Error

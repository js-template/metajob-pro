"use client"

import { startTransition } from "react"
import { Button, Container, Stack, Typography } from "@mui/material"

const GlobalError = () => {
   const reload = () => {
      startTransition(() => {
         if (typeof window !== "undefined") {
            window.location.reload()
         }
      })
   }
   return (
      <html>
         <body>
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
         </body>
      </html>
   )
}

export default GlobalError

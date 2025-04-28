"use client"
import { startTransition, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { getCookie } from "cookies-next"
import { Button, Container, Skeleton, Stack, Typography } from "@mui/material"
import { IErrorBlock } from "@/types/error"
import { find } from "@/lib/strapi"

const GlobalError = () => {
   const { theme: mode } = useTheme()
   const language = getCookie("lang")

   const [isLoading, setIsLoading] = useState(false)
   const [errorData, setErrorData] = useState<IErrorBlock | null>(null)

   //  fetch global  error-data from db
   useEffect(() => {
      const getErrorData = async () => {
         setIsLoading(true)
         const { data: errorDataAll, error: errorDataError } = await find(
            "api/metajob-backend/error-setting",
            {
               populate: {
                  global: { populate: "*" }
               },
               locale: language ?? "en"
            },
            "no-store"
         )
         if (!errorDataError) {
            setErrorData(errorDataAll?.data?.global?.[0])
            setIsLoading(false)
         } else {
            setErrorData(null)
            setIsLoading(false)
         }
      }

      getErrorData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const { content, style, button_placeholder } = errorData || {}
   const { title, sub_title } = content || {}
   const { header_color, sub_header_color, backgroundColor, section_padding } = style || {}

   //handle load function
   const reloadHandler = () => {
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
                  bgcolor: (theme) =>
                     mode === "light"
                        ? backgroundColor || theme.palette.background.default
                        : theme.palette.background.default,
                  minHeight: "85vh"
               }}>
               <Container maxWidth='lg'>
                  <Stack py={section_padding || 12} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
                     <Stack spacing={2} sx={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        {/* title  */}
                        {isLoading ? (
                           <Skeleton variant='rounded' width={350} height={35} />
                        ) : (
                           <Typography
                              variant='h3'
                              component='h3'
                              sx={{
                                 fontWeight: 700,
                                 color: (theme) => (mode === "light" ? header_color : theme.palette.text.primary)
                              }}>
                              {title || "Something Went Wrong"}
                           </Typography>
                        )}

                        {/* sub-title  */}
                        {isLoading ? (
                           <Skeleton variant='rounded' width={350} height={35} />
                        ) : sub_title ? (
                           <Typography
                              variant='body1'
                              component='h5'
                              sx={{
                                 color: (theme) => (mode === "light" ? sub_header_color : theme.palette.text.primary)
                              }}>
                              {sub_title || "Please try again later"}
                           </Typography>
                        ) : (
                           <></>
                        )}
                     </Stack>
                     {/* button  */}
                     {isLoading ? (
                        <Skeleton variant='rounded' width={122} height={42} />
                     ) : (
                        <Button onClick={reloadHandler} variant='contained' color='primary'>
                           {button_placeholder || "Try again"}
                        </Button>
                     )}
                  </Stack>
               </Container>
            </Stack>
         </body>
      </html>
   )
}

export default GlobalError

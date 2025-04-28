"use client"
import NextLink from "next/link"
import { useTheme } from "next-themes"
import { Box, Icon, Stack, Typography, Button, Avatar } from "@mui/material"
import { ISingleCompany } from "./types"

type Props = {
   data: ISingleCompany
   button_label?: string
   color?: string
   secondary_color?: string
}
const CompanyCardItem = ({ data, button_label, color, secondary_color }: Props) => {
   const { theme: mode } = useTheme()

   const { name, tagline, slug, revenue, company_size, location, logo } = data || {}
   const companyLogo = logo?.url || ""

   return (
      <Stack
         sx={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: (theme) => theme.palette.background.paper,
            padding: "40px 30px 30px 30px",
            borderRadius: 2,
            "&:hover": {
               borderColor: (theme) => theme.palette.primary.main,
               transition: "all 0.3s ease-in-out"
            },
            "&:hover .company-button": {
               color: (theme) => theme.palette.primary.contrastText,
               bgcolor: (theme) => theme.palette.primary.main
            },
            bgcolor: (theme) => theme.palette.background.paper,
            height: "430px"
         }}>
         {/* logo  */}
         <Stack
            sx={{
               justifyContent: "center",
               alignItems: "center"
            }}>
            <Avatar
               src={companyLogo}
               alt={name || "companyLogo"}
               sx={{
                  width: 100,
                  height: 100,
                  fontWeight: 700,
                  fontSize: "30px",
                  borderRadius: "12px",
                  mb: 3
               }}>
               {name?.charAt(0) || ""}
            </Avatar>
         </Stack>
         {/* name, tags  */}
         <Box sx={{ pb: "30px" }}>
            {name && (
               <Typography
                  fontSize={16}
                  fontWeight={400}
                  sx={{
                     color: (theme) =>
                        mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary
                  }}
                  textAlign={"center"}>
                  {name}
               </Typography>
            )}
            {tagline && (
               <Typography
                  fontSize={14}
                  fontWeight={400}
                  sx={{
                     color: (theme) =>
                        mode === "light" ? secondary_color || theme.palette.text.disabled : theme.palette.text.disabled
                  }}
                  textAlign={"center"}>
                  {tagline}
               </Typography>
            )}
         </Box>
         {/* details  */}
         <Stack sx={{ mb: 3 }} spacing={"12px"}>
            {company_size && (
               <Stack direction={"row"} gap={2} alignItems={"center"}>
                  <Icon
                     fontSize='small'
                     className='icon-users'
                     sx={{
                        color: (theme) =>
                           mode === "light"
                              ? secondary_color || theme.palette.text.disabled
                              : theme.palette.text.disabled
                     }}
                  />
                  <Typography
                     fontSize={14}
                     fontWeight={400}
                     sx={{
                        color: (theme) =>
                           mode === "light"
                              ? secondary_color || theme.palette.text.disabled
                              : theme.palette.text.disabled
                     }}>
                     {company_size?.title} Employee
                  </Typography>
               </Stack>
            )}
            {revenue && (
               <Stack direction={"row"} gap={2} alignItems={"center"}>
                  <Icon
                     fontSize='small'
                     className='icon-dollar-sign'
                     sx={{
                        color: (theme) =>
                           mode === "light"
                              ? secondary_color || theme.palette.text.disabled
                              : theme.palette.text.disabled
                     }}
                  />
                  {revenue && (
                     <Typography
                        fontSize={14}
                        fontWeight={400}
                        sx={{
                           color: (theme) =>
                              mode === "light"
                                 ? secondary_color || theme.palette.text.disabled
                                 : theme.palette.text.disabled
                        }}>
                        {revenue?.title} Revenue
                     </Typography>
                  )}
               </Stack>
            )}

            {/* location */}

            {/* {location ? (
               <Stack direction={"row"} gap={2} alignItems={"center"}>
                  <Icon
                     fontSize='small'
                     className='icon-map-pin'
                     sx={{
                        color: (theme) => theme.palette.text.disabled
                     }}
                  />
                  <Typography fontSize={14} fontWeight={400} color={(theme) => theme.palette.text.disabled}>
                     {location?.address}
                  </Typography>
               </Stack>
            ) : (
               <Stack direction={"row"} gap={2} alignItems={"center"}>
                  <Icon
                     fontSize='small'
                     className='icon-map-pin'
                     sx={{
                        color: (theme) => theme.palette.text.disabled
                     }}
                  />
                  <Typography fontSize={14} fontWeight={400} color={(theme) => theme.palette.text.disabled}>
                     Location not Available
                  </Typography>
               </Stack>
            )} */}
         </Stack>
         {/* button  */}
         <Button
            className='company-button'
            fullWidth
            component={NextLink}
            href={`/company/${slug}`}
            sx={{
               bgcolor: (theme) => theme.palette.background.default,
               color: (theme) => (mode === "dark" ? theme.palette.primary.contrastText : theme.palette.text.disabled),
               mt: 2
            }}>
            {button_label || "See Details"}
         </Button>
      </Stack>
   )
}
export default CompanyCardItem

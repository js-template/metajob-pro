"use client"
import NextLink from "next/link"
import { useTheme } from "next-themes"
import { Box, Icon, Stack, Typography, Button, Avatar } from "@mui/material"
import { ISingleCompany } from "./types"
import { hexToRGBA } from "../../lib/hex-to-rgba"

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
         justifyContent={"space-between"}
         sx={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: (theme) => theme.palette.background.paper,
            px: { xs: 1.5, sm: 3, md: 4 },
            py: { xs: 2, md: 4 },
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
            height: "100%"
         }}>
         {/* logo  */}
         <Stack
            sx={{
               justifyContent: "center",
               alignItems: "center",
               mb: { xs: 2, md: 3 }
            }}>
            <Avatar
               src={companyLogo}
               alt={name || "companyLogo"}
               sx={{
                  bgcolor: (theme) =>
                     mode === "light" ? theme.palette.primary.main : hexToRGBA(theme.palette.primary.main, 0.5),
                  color: (theme) => theme.palette.primary.contrastText,
                  fontSize: { xs: 24, md: 30 },
                  width: { xs: "60px", sm: "80px", md: "100px" },
                  height: { xs: "60px", sm: "80px", md: "100px" },
                  borderRadius: "12px"
               }}>
               {name?.charAt(0) || ""}
            </Avatar>
         </Stack>
         {/* name, tags  */}
         <Box sx={{ pb: { xs: 2, md: "30px" } }}>
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
         <Stack sx={{ mb: { xs: 2, md: 4 } }} spacing={"12px"}>
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
               fontSize: { xs: 14, md: 16 },
               bgcolor: (theme) => theme.palette.background.default,
               color: (theme) => (mode === "dark" ? theme.palette.primary.contrastText : theme.palette.text.disabled)
            }}>
            {button_label || "See Details"}
         </Button>
      </Stack>
   )
}
export default CompanyCardItem

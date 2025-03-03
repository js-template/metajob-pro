"use client"
import NextLink from "next/link"
import { useTheme } from "next-themes"
import { Box, Icon, Stack, Typography, Button, Avatar } from "@mui/material"
import { ISingleCompany } from "./types"

type Props = {
   data: ISingleCompany
}
const CompanyCardItem = ({ data }: Props) => {
   const { theme: mode } = useTheme()

   const { name, tagline, slug, revenue, company_size, location, logo } = data || {}
   const companyLogo = logo?.url || ""

   return (
      <Stack
         sx={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: (theme) => theme.palette.background.paper,
            p: 4,
            borderRadius: 2,
            "&:hover": {
               borderColor: (theme) => theme.palette.primary.main,
               transition: "all 0.3s ease-in-out"
            },
            bgcolor: (theme) => theme.palette.background.paper
         }}
         spacing={2}>
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
                  fontSize: "30px"
               }}>
               {name?.charAt(0) || ""}
            </Avatar>
         </Stack>
         {/* name, tags  */}
         <Box>
            {name && (
               <Typography
                  fontSize={16}
                  fontWeight={400}
                  sx={{
                     color: (theme) => theme.palette.text.primary,
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
                     color: (theme) => theme.palette.text.disabled,
                    }}
                  textAlign={"center"}>
                  {tagline}
               </Typography>
            )}
         </Box>
         {/* details  */}
         <Stack spacing={2}>
            {company_size && (
               <Stack direction={"row"} gap={2} alignItems={"center"}>
                  <Icon
                     fontSize='small'
                     className='icon-users'
                     sx={{
                        color: (theme) => theme.palette.text.disabled
                     }}
                  />
                  <Typography fontSize={14} fontWeight={400} sx={{
 color: (theme) => theme.palette.text.disabled,
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
                        color: (theme) => theme.palette.text.disabled
                     }}
                  />
                  {revenue && (
                     <Typography fontSize={14} fontWeight={400} sx={{
                        color: (theme) => theme.palette.text.disabled,
                       }}>
                        {revenue?.title} Revenue
                     </Typography>
                  )}
               </Stack>
            )}
            {/* {location && (
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
            )} */}
         </Stack>
         {/* button  */}
         <Button
            fullWidth
            component={NextLink}
            href={`/company/${slug}`}
            sx={{
               bgcolor: (theme) => theme.palette.background.default,
               color: (theme) => (mode === "dark" ? theme.palette.primary.contrastText : theme.palette.text.disabled),
               "&:hover": {
                  color: (theme) => theme.palette.primary.contrastText,
                  bgcolor: (theme) => theme.palette.primary.main
               }
            }}>
            See Details
         </Button>
      </Stack>
   )
}
export default CompanyCardItem

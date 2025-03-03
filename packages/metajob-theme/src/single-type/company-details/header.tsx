"use client"
import NextLink from "next/link"
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material"
import { Card } from "../../components/common/card"
import CIcon from "../../components/common/icon"
import { ISingleCompany, IUserSession } from "./types"
import { getSocialLink } from "./hook"

type Props = {
   data: ISingleCompany
   session?: IUserSession | null | any
}

const CompanyHeader = ({ data, session }: Props) => {
   const { logo, name, email, phone, tagline, website, social_links } = data || {}
   const companyLogo = logo?.url || ""

   const facebook = getSocialLink("facebook", social_links)
   const twitter = getSocialLink("twitter", social_links)

   // const CompanyBookmarkHandler = () => {
   //    if (!session) {
   //       toast.error("Please login to bookmark")
   //    }
   // }

   return (
      <Card
         sx={{
            borderRadius: 2,
            p: 3
         }}>
         <Grid container spacing={4} alignItems={"center"}>
            <Grid item xs={12} sm={8}>
               <Stack
                  direction={{
                     sm: "row",
                     xs: "column"
                  }}
                  alignItems={"center"}
                  gap={4}>
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
                  <Stack spacing={1.5}>
                     <Stack>
                        {name && (
                           <Typography
                              variant={"h1"}
                              fontWeight={700}
                              fontSize={20}
                              sx={{
                                 color: (theme) => theme.palette.text.primary
                               }}>
                              {name}
                           </Typography>
                        )}
                        {tagline && (
                           <Typography
                              variant={"body1"}
                              fontWeight={400}
                              fontSize={16}
                              sx={{
                                 color: (theme) => theme.palette.text.disabled
                                }}>
                              {tagline}
                           </Typography>
                        )}
                     </Stack>
                     <Stack direction='row' gap={1.5}>
                        {website && (
                           <Box
                              component={NextLink}
                              href={website}
                              target={"_blank"}
                              sx={{
                                 p: 1,
                                 borderRadius: 50,
                                 borderColor: (theme) => theme.palette.divider,
                                 borderWidth: 1,
                                 borderStyle: "solid",
                                 "&:hover": {
                                    bgcolor: (theme) => theme.palette.divider
                                 }
                              }}>
                              <CIcon icon='ph:globe-bold' size={20} />
                           </Box>
                        )}
                        {facebook && (
                           <Box
                              component={NextLink}
                              target={"_blank"}
                              href={facebook}
                              sx={{
                                 p: 1,
                                 borderRadius: 50,
                                 borderColor: (theme) => theme.palette.divider,
                                 borderWidth: 1,
                                 borderStyle: "solid",
                                 "&:hover": {
                                    bgcolor: (theme) => theme.palette.divider
                                 }
                              }}>
                              <CIcon icon='ri:facebook-fill' size={20} />
                           </Box>
                        )}
                        {twitter && (
                           <Box
                              component={NextLink}
                              target={"_blank"}
                              href={twitter}
                              sx={{
                                 p: 1,
                                 borderRadius: 50,
                                 borderColor: (theme) => theme.palette.divider,
                                 borderWidth: 1,
                                 borderStyle: "solid",
                                 "&:hover": {
                                    bgcolor: (theme) => theme.palette.divider
                                 }
                              }}>
                              <CIcon icon='mdi:twitter' size={20} />
                           </Box>
                        )}
                     </Stack>
                  </Stack>
               </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
               <Stack display={"flex"} alignItems={"flex-end"} gap={1.5}>
                  {/* <CIcon
                     onClick={CompanyBookmarkHandler}
                     icon='mdi:heart-outline'
                     size={24}
                     color='text.primary'
                     sx={{
                        "&:hover": {
                           color: "primary.main",
                           cursor: "pointer"
                        }
                     }}
                  /> */}
                  <Stack display={"flex"} alignItems={"flex-end"}>
                     {email && (
                        <Typography
                           component={NextLink}
                           target={"_blank"}
                           href={`mailto:${email}`}
                           variant={"body1"}
                           sx={{
                              fontWeight: 400,
                              fontSize: "18px",
                              // color: (theme) => theme.palette.primary.main,
                              color: (theme) => theme.palette.text.primary,
                              textDecoration: "none"
                           }}>
                           {email}
                        </Typography>
                     )}
                     {phone && (
                        <Typography
                           component={NextLink}
                           target={"_blank"}
                           href={`tel:${phone}`}
                           variant={"body1"}
                           sx={{
                              fontWeight: 400,
                              fontSize: "18px",
                              color: (theme) => theme.palette.text.primary,
                              textDecoration: "none"
                           }}>
                           {phone}
                        </Typography>
                     )}
                  </Stack>
               </Stack>
            </Grid>
         </Grid>
      </Card>
   )
}
export default CompanyHeader

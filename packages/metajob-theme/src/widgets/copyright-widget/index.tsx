"use client"

import { Box, Divider, IconButton, Stack, Typography } from "@mui/material"
import CIcon from "../../components/common/icon"
import { ICopyrightBlock } from "./types"
import { getSocialLink } from "./hooks"
import Link from "next/link"

type Props = {
   block: ICopyrightBlock
}
export const CopyrightWidget = ({ block }: Props) => {
   const { content, social_link } = block || {}
   const facebook = getSocialLink(social_link, "facebook")
   const twitter = getSocialLink(social_link, "twitter")
   const linkedin = getSocialLink(social_link, "linkedin")
   const instagram = getSocialLink(social_link, "instagram")
   return (
      <>
         <Divider
            color={"#FFF"}
            sx={{
               my: 4
            }}
         />
         <Stack direction={{ xs: "column", sm: "row" }} justifyContent={"space-between"} gap={{ xs: 2, sm: 0 }}>
            <Typography
               fontSize={16}
               fontWeight={400}
               textAlign='center'
               sx={{
                  color: (theme) => theme.palette.primary.contrastText
               }}>
               {content}
            </Typography>
            {social_link && social_link?.length > 0 && (
               <Stack direction={"row"} gap={2} justifyContent={"center"}>
                  {facebook && (
                     <IconButton
                        component={Link}
                        href={facebook}
                        target={"_blank"}
                        sx={{
                           p: 0,
                           "&:hover": {
                              color: (theme) => theme.palette.primary.main
                           }
                        }}>
                        <CIcon
                           icon={"gg:facebook"}
                           size={28}
                           sx={{
                              color: (theme) => theme.palette.primary.contrastText,
                              "&:hover": {
                                 color: (theme) => theme.palette.primary.main
                              }
                           }}
                        />
                     </IconButton>
                  )}
                  {twitter && (
                     <IconButton component={Link} href={twitter} target={"_blank"} sx={{ p: 0 }}>
                        <CIcon
                           icon={"mdi:twitter"}
                           size={28}
                           sx={{
                              color: (theme) => theme.palette.primary.contrastText,
                              "&:hover": {
                                 color: (theme) => theme.palette.primary.main
                              }
                           }}
                        />
                     </IconButton>
                  )}
                  {linkedin && (
                     <IconButton component={Link} href={linkedin} target={"_blank"} sx={{ p: 0 }}>
                        <CIcon
                           icon={"basil:linkedin-solid"}
                           size={28}
                           sx={{
                              color: (theme) => theme.palette.primary.contrastText,
                              "&:hover": {
                                 color: (theme) => theme.palette.primary.main
                              }
                           }}
                        />
                     </IconButton>
                  )}
                  {instagram && (
                     <IconButton component={Link} href={instagram} target={"_blank"} sx={{ p: 0 }}>
                        <CIcon
                           icon={"basil:instagram-solid"}
                           size={28}
                           sx={{
                              color: (theme) => theme.palette.primary.contrastText,
                              "&:hover": {
                                 color: (theme) => theme.palette.primary.main
                              }
                           }}
                        />
                     </IconButton>
                  )}
               </Stack>
            )}
         </Stack>
      </>
   )
}

"use client"
import React from "react"
import Moment from "react-moment"
import { Avatar, Badge, Box, Chip, Typography, useMediaQuery, useTheme } from "@mui/material"
import { ChatDataProps } from "./type"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { getNameFromEmail } from "./hook"

const UserItem = ({
   item,
   active,
   setChatSidebar,
   setChatId
}: {
   item: ChatDataProps
   active?: boolean
   setChatId: React.Dispatch<React.SetStateAction<number | string | null>>
   setChatSidebar: (value: boolean) => void
   userId: number
}) => {
   // ** Hooks
   const theme = useTheme()
   const hidden = useMediaQuery(theme.breakpoints.down("lg"))

   const { avatar, name, email, date, badge, status, message } = item || {}

   return (
      <Box
         onClick={() => {
            if (active) {
               setChatSidebar(false)
               setChatId(null)
               return
            }
            setChatSidebar(false)
            setChatId(item.documentId)
         }}
         sx={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            alignItems: "center",
            p: "6px 8px",
            borderRadius: "4px",
            transition: "all 200ms ease-in-out",
            backgroundColor: (theme) => (active ? hexToRGBA(theme.palette.text.primary, 0.08) : "transparent"),
            "&:hover": {
               cursor: "pointer",
               backgroundColor: (theme) => hexToRGBA(theme.palette.text.primary, 0.08)
            },
            textDecoration: "none"
         }}>
         <Box
            sx={{
               display: "flex",
               alignItems: "center",
               gap: 2
            }}>
            <Badge
               color='success'
               overlap='circular'
               badgeContent=' '
               variant='dot'
               anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
               }}
               sx={{
                  "& .MuiBadge-badge": {
                     backgroundColor: (theme) =>
                        status === "active"
                           ? theme.palette.success.main
                           : status === "away"
                             ? theme.palette.warning.main
                             : theme.palette.text.secondary,
                     color: (theme) => theme.palette.primary.main,
                     boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.paper}`,
                     borderRadius: "50%"
                  }
               }}>
               <Avatar
                  className='notranslate'
                  sx={{
                     width: hidden ? "38px" : "48px",
                     height: hidden ? "38px" : "48px"
                  }}
                  src={avatar}
                  alt={"User Name"}
               />
            </Badge>
            <Box>
               <Typography
                  variant='body1'
                  className='notranslate'
                  sx={{
                     color: (theme) => theme.palette.text.primary,
                     fontSize: "14px",
                     fontWeight: 500,
                     lineHeight: "20px",
                     // lineClamp 1
                     overflow: "hidden",
                     textOverflow: "ellipsis",
                     display: "-webkit-box",
                     WebkitLineClamp: 1,
                     WebkitBoxOrient: "vertical",
                     textTransform: "capitalize",
                     mb: 0.5
                  }}>
                  {name !== "null null" ? name : getNameFromEmail(email)}
               </Typography>
               <Typography
                  className='notranslate'
                  variant='body2'
                  sx={{
                     color: (theme) => theme.palette.text.secondary,
                     fontSize: "12px",
                     lineHeight: "16px",
                     // lineClamp 1
                     overflow: "hidden",
                     textOverflow: "ellipsis",
                     display: "-webkit-box",
                     WebkitLineClamp: 1,
                     WebkitBoxOrient: "vertical"
                  }}>
                  {message}
               </Typography>
            </Box>
         </Box>
         <Box
            sx={{
               textAlign: "right"
            }}>
            <Typography
               variant='body1'
               fontWeight={500}
               lineHeight={"16px"}
               fontSize={"12px"}
               sx={{
                  mb: 0.5,
                  flex: "none",
                  color: (theme) => theme.palette.text.secondary
               }}>
               <Moment fromNow>{date}</Moment>
            </Typography>
            {/* Badge */}
            {badge === 0 && <Box sx={{ height: "24px" }} />}
            {badge > 0 && (
               <Chip
                  label={badge}
                  size='small'
                  color='primary'
                  sx={{
                     "& .MuiChip-label": {
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px"
                     }
                  }}
               />
            )}
         </Box>
      </Box>
   )
}

export default UserItem

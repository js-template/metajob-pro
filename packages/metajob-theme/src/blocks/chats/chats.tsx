"use client"
import UsersBox from "./users-box"
import { Box, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import CIcon from "../../components/common/icon"
import MessageBox from "./message-box"
import { IMessageBock } from "./type"

type Props = {
   blockData: IMessageBock
   role: string
   userId?: number
   userEmail?: string
}

const ChatSection = ({ blockData, role, userId, userEmail }: Props) => {
   const theme = useTheme()
   const [chatSidebar, setChatSidebar] = useState(false)
   const lgAbove = useMediaQuery(theme.breakpoints.up("lg"))
   // ?? id is string or number
   const [chatId, setChatId] = useState<number | string | null>(null)

   // if user on mobile, open chat sidebar
   useEffect(() => {
      if (!lgAbove) {
         setChatSidebar(true)
      }
   }, [lgAbove])

   return (
      <Fragment>
         {/* Header Section */}
         <Box
            sx={{
               px: 3,
               py: 2,
               borderBottom: "1px solid",
               borderColor: "divider",
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               gap: 3
            }}>
            <Grid container spacing={0}>
               <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{
                     display: "flex",
                     alignItems: "center"
                  }}>
                  {lgAbove ? null : (
                     <IconButton sx={{ mr: 1 }} color='inherit' onClick={() => setChatSidebar((prev) => !prev)}>
                        <CIcon icon='tabler:menu-2' />
                     </IconButton>
                  )}
                  <Typography
                     variant='h3'
                     sx={{
                        fontSize: "24px",
                        fontWeight: 500,
                        lineHeight: "32px",
                        textTransform: "capitalize"
                     }}>
                     {blockData?.title}
                  </Typography>
               </Grid>
               <Grid item xs={12} sm={9}>
                  {/* <Typography
                     variant='body1'
                     sx={{
                        fontWeight: 500,
                        lineHeight: "24px"
                     }}>
                     Info
                  </Typography> */}
               </Grid>
            </Grid>
         </Box>

         {/* Body Section */}
         <Box
            sx={{
               display: "flex",
               height: "calc(-190px + 100vh)"
            }}>
            <UsersBox
               chatSidebar={chatSidebar}
               setChatSidebar={setChatSidebar}
               activeId={chatId}
               hidden={lgAbove}
               role={role}
               userId={userId}
               userEmail={userEmail}
               setChatId={setChatId}
               blockData={blockData}
            />
            <MessageBox
               blockData={blockData}
               noMessage={chatId === null ? true : false}
               chatId={chatId}
               role={role}
               userId={userId}
            />
         </Box>
      </Fragment>
   )
}

export default ChatSection

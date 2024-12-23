"use client"
import UsersBox from "./UsersBox"
import { Box, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import CIcon from "../../components/common/icon"
import MessageBox from "./MessageBox"
import { ChatSectionProps } from "./type"

const ChatSection = ({ data, role, userId }: { data: ChatSectionProps; role: string; userId: number }) => {
   const theme = useTheme()
   const [chatSidebar, setChatSidebar] = useState(false)
   const lgAbove = useMediaQuery(theme.breakpoints.up("lg"))
   // ?? id is string or number
   const [chatId, setChatId] = useState<number | null>(null)

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
                     {data?.title}
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
               activeId={Number(chatId)}
               chatId={Number(chatId)}
               hidden={lgAbove}
               role={role}
               userId={userId}
               setChatId={setChatId}
               chatData={data}
            />
            <MessageBox
               data={data}
               empty={chatId === null ? true : false}
               chatId={chatId}
               role={role}
               userId={userId}
               setChatId={setChatId}
            />
         </Box>
      </Fragment>
   )
}

export default ChatSection

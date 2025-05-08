"use client"
import { Box, CircularProgress, Grid, Paper } from "@mui/material"
import { Suspense } from "react"
import { useSession } from "next-auth/react"
import ChatSection from "./chats"
import { IMessageBock } from "./type"

type Props = {
   block: IMessageBock
   language?: string
}

export const MessageLayout = ({ block }: Props) => {
   // session data destructuring
   const { data: session } = useSession()
   const { user } = session || {}
   const { id: userId, role: userRole, email: userEmail } = user || {}
   const role = userRole?.type || ""

   // *** If the user role is not an candidate or employer, redirect to the dashboard
   // if (role?.type !== "candidate" && role?.type !== "employer") {
   //    redirect("/dashboard")
   // }

   return (
      <Grid item xs={12}>
         <Paper
            elevation={0}
            sx={{
               position: "relative",
               overflow: "hidden",
               width: "100%",
               height: "calc(100vh - 123px)",
               bgcolor: "background.default",

               p: 0
            }}>
            <Suspense
               fallback={
                  <Box
                     sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 1000
                     }}>
                     {/* Overlay */}
                     <CircularProgress
                        sx={{
                           position: "relative",
                           zIndex: 3
                        }}
                        disableShrink
                     />
                     <Box
                        sx={{
                           position: "absolute",
                           top: 0,
                           left: 0,
                           height: "100%",
                           width: "100%",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           filter: "blur(2px)",
                           backdropFilter: "blur(2px)",
                           zIndex: 1
                        }}
                     />
                  </Box>
               }>
               <ChatSection blockData={block} role={role} userId={userId} userEmail={userEmail} />
            </Suspense>
         </Paper>
      </Grid>
   )
}

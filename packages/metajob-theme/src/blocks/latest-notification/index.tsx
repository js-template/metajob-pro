import { recentActivitiesProps } from "./type"
import { IUserSession } from "../../types/user"
import { Grid, Paper, Box, Typography } from "@mui/material"
import { NotificationBody } from "./table-body"
import { find } from "../../lib/strapi"
import { table } from "console"

export const LatestNotifications = async ({
   block,
   session
}: {
   block: recentActivitiesProps
   session?: IUserSession
}) => {
   // session data destructuring
   const { user } = session || {}
   const { id: userId, role: userRole } = user || {}
   const role = userRole?.type || ""

   //const [isLoading, setIsLoading] = React.useState(false)

   const { title, style, empty, column_1 } = block

   const { data: emailData, error: emailError } = await find(
      "api/metajob-backend/email-histories",
      {
         filters: {
            owner: userId
         },
         sort: ["createdAt:desc"],
         fields: ["title", "createdAt"]
      },
      "no-store"
   )

   const tableData = emailData?.data || []

   return (
      <Grid item xs={style?.mobile} sm={style?.tab} md={style?.desktop}>
         <Paper
            elevation={0}
            sx={{
               width: "100%",
               border: "1px solid",
               borderColor: "divider",
               borderRadius: "12px",
               p: 0
            }}>
            {title && (
               <Box
                  sx={{
                     py: 2,
                     px: 3,
                     borderBottom: "1px solid",
                     borderColor: "divider"
                  }}>
                  <Typography
                     component={"h3"}
                     variant='h3'
                     fontWeight={700}
                     fontSize={{
                        xs: "1.1rem",
                        sm: "1.25rem"
                     }}
                     lineHeight={"24px"}>
                     {title}
                  </Typography>
               </Box>
            )}
            <NotificationBody block={block} session={session} tableData={tableData} />
         </Paper>
      </Grid>
   )
}

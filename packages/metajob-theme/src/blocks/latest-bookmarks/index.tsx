import { Box, Paper, Grid, Typography } from "@mui/material"
import _ from "lodash"

import { bookmarksListsProps } from "./type"

import { IUserSession } from "../../types/user"

import { BookmarksBody } from "./table-body"
import { find } from "../../lib/strapi"

export const LatestBookmarks = async ({
   block,
   session
}: {
   block: bookmarksListsProps
   session?: IUserSession | null | any
   data?: any
   language?: string
}) => {
   // session data destructuring
   const { user } = session || {}
   const { id: userId, role: userRole } = user || {}
   const role = userRole?.type || ""

   const { title, column_1, column_2, style, empty } = block

   const { data: bookmarkData, error: bookmarkError } = await find(
      "api/metajob-backend/bookmarks",
      {
         populate: {
            job: {
               fields: ["id", "title", "slug"]
            },
            resume: {
               fields: ["id", "name"]
            }
         },
         filters: {
            owner: userId
         }
      },
      "no-store"
   )

   const tableData = bookmarkData?.data || []

   return (
      <Grid item xs={style?.mobile} sm={style?.tab} md={style?.desktop}>
         <Paper
            elevation={0}
            sx={{
               width: "100%",
               height: "100%",
               border: "1px solid",
               borderColor: "divider",
               borderRadius: "12px",
               p: 0
            }}>
            {title && (
               <Box
                  sx={{
                     px: 3,
                     py: 2,
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
            <BookmarksBody block={block} session={session} tableData={tableData} />
         </Paper>
      </Grid>
   )
}

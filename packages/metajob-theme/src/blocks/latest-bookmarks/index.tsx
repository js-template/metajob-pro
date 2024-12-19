"use client"
import {
   Box,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   Grid,
   Typography
} from "@mui/material"
import _ from "lodash"
import toast from "react-hot-toast"
import PerfectScrollbar from "react-perfect-scrollbar"
import TableItem from "./item"

import useSWR from "swr"
import { bookmarksListsItemProps, bookmarksListsProps } from "./type"
import { bookmarksListsFetcher } from "./utils"
import { IUserSession } from "../../types/user"

export const LatestBookmarks = ({
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
   const queryParams = {
      populate: "job,job.title,company,company.name,resume,resume.name",
      filters: {
         owner: {
            id: userId
         }
      }
   }

   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = `/api/find?model=api/metajob-strapi/bookmarks&query=${queryString}&cache=no-store`

   const { data: tableData, error, isLoading } = useSWR(apiUrl, bookmarksListsFetcher)

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

            <PerfectScrollbar>
               <Box
                  sx={{
                     maxHeight: "calc(100vh - 271px)",
                     maxWidth: {
                        xs: "100vh",
                        sm: "100%"
                     }
                  }}>
                  <TableContainer component={Box}>
                     <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead
                           sx={{
                              "& th": {
                                 borderBottom: "1px solid",
                                 borderColor: "divider",
                                 color: (theme) => theme.palette.text.secondary,
                                 fontWeight: 400,
                                 fontSize: {
                                    xs: 16,
                                    sm: 18
                                 }
                              },
                              "& th:last-child": {
                                 pr: 5
                              }
                           }}>
                           <TableRow>
                              <TableCell
                                 align={"left"}
                                 sx={{
                                    minWidth: "200px",
                                    p: "14px 24px"
                                 }}>
                                 <Typography
                                    variant='body1'
                                    fontWeight={400}
                                    fontSize={{
                                       xs: "0.875rem",
                                       sm: "1rem"
                                    }}
                                    lineHeight={"24px"}
                                    sx={{
                                       borderRight: "1px solid",
                                       borderColor: (theme) => theme.palette.divider
                                    }}>
                                    {column_1 ?? "Job Title"}
                                 </Typography>
                              </TableCell>
                              <TableCell
                                 align={"left"}
                                 sx={{
                                    py: "14px"
                                 }}>
                                 <Typography
                                    variant='body1'
                                    fontWeight={400}
                                    fontSize={{
                                       xs: "0.875rem",
                                       sm: "1rem"
                                    }}
                                    lineHeight={"24px"}>
                                    {column_2 ?? "Type"}
                                 </Typography>
                              </TableCell>
                           </TableRow>
                        </TableHead>
                        {isLoading ? (
                           <TableBody>
                              {_.times(5, (index) => (
                                 <TableItem
                                    key={index}
                                    noteFunctionHandler={() => {
                                       toast.error("Note function not implemented yet")
                                    }}
                                    isLoading
                                 />
                              ))}
                           </TableBody>
                        ) : (
                           <TableBody>
                              {_.map(tableData, (item: bookmarksListsItemProps, index: number) => (
                                 <TableItem
                                    key={index}
                                    item={item}
                                    noteFunctionHandler={() => {
                                       toast.error("Note function not implemented yet")
                                    }}
                                 />
                              ))}
                           </TableBody>
                        )}

                        {/* Empty data */}
                        {tableData?.length === 0 && (
                           <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                              <TableCell colSpan={2} sx={{ py: 9.7 }}>
                                 <Box
                                    sx={{
                                       display: "flex",
                                       flexDirection: "column",
                                       alignItems: "center",
                                       gap: 0.5,
                                       py: 4
                                    }}>
                                    <Typography variant='body1' sx={{ color: (theme) => theme.palette.text.secondary }}>
                                       {empty?.title ?? "No Bookmarks"}
                                    </Typography>
                                    <Typography variant='body2' sx={{ color: (theme) => theme.palette.text.secondary }}>
                                       {empty?.description ?? "You haven't bookmarked any posts yet."}
                                    </Typography>
                                 </Box>
                              </TableCell>
                           </TableRow>
                        )}
                     </Table>
                  </TableContainer>
               </Box>
            </PerfectScrollbar>
         </Paper>
      </Grid>
   )
}

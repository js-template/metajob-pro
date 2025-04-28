"use client"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import _ from "lodash"
import { recentActivitiesItemProps, recentActivitiesProps } from "./type"
import TableItem from "./item"
import { IUserSession } from "../../types/user"

export const NotificationBody = ({
   block,
   session,
   tableData
}: {
   block: recentActivitiesProps
   session?: IUserSession | null | any
   data?: any
   language?: string
   tableData: any
}) => {
   // session data destructuring
   const { user } = session || {}
   const { id: userId, role: userRole } = user || {}
   const role = userRole?.type || ""

   //const [isLoading, setIsLoading] = React.useState(false)

   const { title, style, empty, column_1 } = block

   const isLoading = false

   return (
      <Box sx={{ overflow: "auto" }}>
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
                  {/* <TableHead
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
                              lineHeight={"24px"}>
                              {column_1 ?? "Title"}
                           </Typography>
                        </TableCell>
                     </TableRow>
                  </TableHead> */}
                  {isLoading ? (
                     <TableBody>
                        {_.times(5, (index) => (
                           <TableItem key={index} isLoading />
                        ))}
                     </TableBody>
                  ) : (
                     <TableBody>
                        {_.map(tableData, (item: recentActivitiesItemProps, index: number) => (
                           <TableItem key={index} item={item} />
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
                                 {empty?.title ?? "No Activity"}
                              </Typography>
                              <Typography variant='body2' sx={{ color: (theme) => theme.palette.text.secondary }}>
                                 {empty?.description ?? "You haven't done anything yet."}
                              </Typography>
                           </Box>
                        </TableCell>
                     </TableRow>
                  )}
               </Table>
            </TableContainer>
         </Box>
      </Box>
   )
}

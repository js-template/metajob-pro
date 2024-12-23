"use client"
import { Fragment } from "react/jsx-runtime"
import { TableRow, TableCell, Box, Skeleton, TableContainer, TableHead, Table, TableBody } from "@mui/material"
import PerfectScrollbar from "react-perfect-scrollbar"

export const TableLoader = ({ direction }: { direction: "ltr" | "rtl" }) => {
   return (
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
                           color: (theme) => theme.palette.text.secondary
                        },
                        "& th:last-child": {
                           pr: 5
                        }
                     }}>
                     <TableRow>
                        {[1, 2, 3, 4, 5]?.map((item: any, index) => (
                           <TableCell
                              key={index}
                              align={index === [1, 2, 3, 4, 5]?.length - 1 ? "center" : "left"}
                              sx={{
                                 ...(index === 0 && {
                                    minWidth: "200px"
                                 }),
                                 py: 1.5,
                                 textTransform: "capitalize"
                              }}>
                              <Skeleton variant='text' width={80} height={28} />
                           </TableCell>
                        ))}
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {Array.from(new Array(4)).map((_, index) => (
                        <Fragment key={index}>
                           <TableRow
                              sx={{
                                 "& td, th": {
                                    borderBottom: "1px solid",
                                    borderColor: "divider",
                                    color: (theme) => theme.palette.text.secondary
                                 },
                                 "& td": {
                                    py: 1
                                 },
                                 "& td:last-child": {
                                    pr: direction === "rtl" ? 0 : 5,
                                    pl: direction === "ltr" ? 0 : 5
                                 },
                                 "&:last-child td, &:last-child th": { border: 0 }
                              }}>
                              <TableCell>
                                 <Skeleton variant='text' width={60} height={20} />
                              </TableCell>
                              <TableCell>
                                 <Skeleton variant='text' width={60} height={20} />
                              </TableCell>
                              <TableCell>
                                 <Skeleton variant='text' width={60} height={20} />
                              </TableCell>
                              <TableCell
                                 sx={{
                                    color: (theme) => theme.palette.primary.main
                                 }}>
                                 <Skeleton variant='rounded' width={60} height={20} />
                              </TableCell>
                              <TableCell
                                 align='center'
                                 sx={{
                                    display: "flex",
                                    gap: 0.5,
                                    alignItems: "center",
                                    justifyContent: "center"
                                 }}>
                                 <Skeleton variant='rounded' width={24} height={24} />
                              </TableCell>
                           </TableRow>
                        </Fragment>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         </Box>
      </PerfectScrollbar>
   )
}

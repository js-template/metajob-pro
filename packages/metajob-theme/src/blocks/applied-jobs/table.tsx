"use client"
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import _ from "lodash"
import toast from "react-hot-toast"
import PerfectScrollbar from "react-perfect-scrollbar"
import TableItem from "./item"

import { KeyedMutator } from "swr"
import { emptyProps } from "../../shared/type"
import { formProps } from "../../types/forms"
import { ManageListsDataProps } from "./type"
import { TableLoader } from "./loader"

const ListsTable = ({
   headCells,
   selectAll,
   setSelectAll,
   userId,
   data,
   mutate,
   isLoading,
   empty,
   formData,
   pageSize,
   listData
}: {
   headCells: {
      label: string
      sort: boolean
      align: "left" | "center" | "right"
   }[]
   selectAll: boolean
   setSelectAll: (value: boolean) => void
   data: any
   listData: ManageListsDataProps
   mutate: KeyedMutator<any>
   isLoading: boolean
   empty: emptyProps
   formData: formProps
   userId: number
   pageSize: number
}) => {
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
            {
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
                           {_.map(headCells, (headCell, index) => (
                              <TableCell
                                 align={headCell.align}
                                 sx={{
                                    ...(index === 0 && {
                                       minWidth: "200px"
                                    }),
                                    py: 1.5
                                 }}
                                 key={index}>
                                 {headCell.sort ? (
                                    <Box
                                       sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                          justifyContent: "space-between",
                                          width: "100%"
                                       }}>
                                       <div>{headCell.label}</div>
                                    </Box>
                                 ) : (
                                    headCell.label
                                 )}
                              </TableCell>
                           ))}
                        </TableRow>
                     </TableHead>
                     {isLoading ? (
                        <TableLoader numberOfRows={pageSize} />
                     ) : (
                        <TableBody>
                           {data?.data?.map((job: any) => (
                              <TableItem
                                 key={job.id}
                                 job={job}
                                 selectAll={selectAll}
                                 listData={listData}
                                 mutate={mutate}
                                 noteFunctionHandler={() => {
                                    toast.error("Note function not implemented yet")
                                 }}
                                 formData={formData}
                                 userId={userId}
                              />
                           ))}

                           {/* Empty message */}
                           {data?.data.length === 0 && (
                              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                 <TableCell colSpan={headCells.length} sx={{ py: 9.7 }}>
                                    <Box
                                       sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                          gap: 0.5,
                                          py: 4
                                       }}>
                                       <Typography
                                          variant='body1'
                                          sx={{ color: (theme) => theme.palette.text.secondary }}>
                                          {empty?.title || "No data found"}
                                       </Typography>
                                       <Typography
                                          variant='body2'
                                          sx={{ color: (theme) => theme.palette.text.secondary }}>
                                          {empty?.description || "Try to refresh the page or check back later"}
                                       </Typography>
                                    </Box>
                                 </TableCell>
                              </TableRow>
                           )}
                        </TableBody>
                     )}
                  </Table>
               </TableContainer>
            }
         </Box>
      </PerfectScrollbar>
   )
}

export default ListsTable

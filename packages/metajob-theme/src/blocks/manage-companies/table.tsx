"use client"
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import _ from "lodash"
import toast from "react-hot-toast"
import PerfectScrollbar from "react-perfect-scrollbar"
import ManageCompaniesTableItem from "./tableItem"
import { KeyedMutator } from "swr"
import { TableLoader } from "../../components/loader"
import { emptyProps } from "../../shared/type"
import { formProps } from "@/types/forms"

const ManageCompaniesTable = ({
   headCells,
   rows,
   selectAll,
   setSelectAll,
   direction,
   data,
   mutate,
   isLoading,
   empty,
   formData,
   userId,
   pageSize
}: {
   headCells: {
      label: string
      sort: boolean
      align: "left" | "center" | "right"
   }[]
   rows: {
      id: number
      company: string
      createdAt: string
      publishedAt: string
      status: "Approved" | "Pending" | "Rejected"
   }[]
   selectAll: boolean
   setSelectAll: (value: boolean) => void
   direction: "ltr" | "rtl"
   data: any
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
            <TableContainer component={Box}>
               <Table
                  aria-label='simple table'
                  sx={{
                     minWidth: 650,
                     "& .MuiTableCell-root": {
                        textAlign: direction === "rtl" ? "right" : "left"
                     }
                  }}>
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
                              key={index}
                              align={headCell.align}
                              sx={{
                                 ...(index === 0 && {
                                    minWidth: "200px"
                                 }),
                                 // last item maxWidth
                                 ...(index === headCells.length - 1 && {
                                    width: "180px"
                                 }),
                                 py: 1.5
                              }}>
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
                                    {/* {headCell.sort && (
                                       <Box
                                          sx={{
                                             display: "flex",
                                             flexDirection: "column",
                                             cursor: "pointer"
                                          }}>
                                          <IconifyIcon icon='iconamoon:arrow-up-2-duotone' size={16} />
                                          <IconifyIcon icon='iconamoon:arrow-down-2-duotone' size={16} />
                                       </Box>
                                    )} */}
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
                        {data?.data.map((row: any) => (
                           <ManageCompaniesTableItem
                              key={row.id}
                              row={row}
                              selectAll={selectAll}
                              direction={direction}
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
                                    <Typography variant='body1' sx={{ color: (theme) => theme.palette.text.secondary }}>
                                       {empty?.title || "No data found"}
                                    </Typography>
                                    <Typography variant='body2' sx={{ color: (theme) => theme.palette.text.secondary }}>
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
         </Box>
      </PerfectScrollbar>
   )
}

export default ManageCompaniesTable

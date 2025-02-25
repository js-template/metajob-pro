"use client"
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import _ from "lodash"
import toast from "react-hot-toast"
import PerfectScrollbar from "react-perfect-scrollbar"
import ManageCompaniesTableItem from "./tableItem"
import { KeyedMutator } from "swr"
import { TableLoader } from "../../components/loader"
import { ISingleCompany } from "./types"

const ManageCompaniesTable = ({
   headCells,
   selectAll,
   setSelectAll,
   direction,
   data,
   mutate,
   isLoading,
   empty,
   pageSize
}: {
   headCells: { value: string }[]
   selectAll: boolean
   setSelectAll: (value: boolean) => void
   direction: "ltr" | "rtl"
   data: any
   mutate: KeyedMutator<any>
   isLoading: boolean
   empty?: {
      title: string
      description: string
   }
   pageSize: number
}) => {
   const totalHeader = 4
   if (headCells && headCells.length > 0 && headCells.length < totalHeader) {
      const remainHeader = totalHeader - headCells.length
      for (let i = 0; i < remainHeader; i++) {
         headCells.push({ value: "" })
      }
   }

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
                              align={index === headCells?.length - 1 ? "center" : "left"}
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
                              {headCell?.value}
                           </TableCell>
                        ))}
                     </TableRow>
                  </TableHead>

                  {isLoading ? (
                     <TableLoader numberOfRows={pageSize} />
                  ) : (
                     <TableBody>
                        {data?.data.map((row: ISingleCompany, index: number) => (
                           <ManageCompaniesTableItem
                              key={index}
                              row={row}
                              selectAll={selectAll}
                              direction={direction}
                              mutate={mutate}
                              noteFunctionHandler={() => {
                                 toast.error("Note function not implemented yet")
                              }}
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

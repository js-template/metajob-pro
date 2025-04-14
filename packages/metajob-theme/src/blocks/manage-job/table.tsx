"use client"
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import _ from "lodash"
import toast from "react-hot-toast"
import PerfectScrollbar from "react-perfect-scrollbar"
import TableItem from "./item"
import { IJobAttribute, IJobData, IManageJobBock } from "./types"
import { TableLoader } from "./loader"

const ManageListsTable = ({
   language,
   headCells,
   data,
   handleMute,
   isLoading,
   empty,
   pageSize,
   blockData,
   jobAttributes,
   jobCount
}: {
   language?: string
   headCells: { value: string }[]
   data: IJobData[]
   blockData: IManageJobBock
   handleMute: () => void
   isLoading: boolean
   empty?: {
      title: string
      description: string
   }
   jobCount?: {
      total: number
      featured: number
   }
   pageSize: number
   jobAttributes?: IJobAttribute
}) => {
   const totalHeader = 6
   if (headCells && headCells?.length > 0 && headCells?.length < totalHeader) {
      const remainHeader = totalHeader - headCells?.length
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
                                 align={index === headCells?.length - 1 ? "center" : "left"}
                                 sx={{
                                    ...(index === 0 && {
                                       minWidth: "200px"
                                    }),
                                    py: 1.5
                                 }}
                                 key={index}>
                                 {headCell?.value}
                              </TableCell>
                           ))}
                        </TableRow>
                     </TableHead>
                     {isLoading ? (
                        <TableBody>
                           <TableLoader numberOfRows={pageSize} />
                        </TableBody>
                     ) : (
                        <TableBody>
                           {data?.map((job: IJobData) => (
                              <TableItem
                                 key={job.id}
                                 job={job}
                                 language={language}
                                 blockData={blockData}
                                 handleMute={handleMute}
                                 jobAttributes={jobAttributes}
                                 jobCount={jobCount}
                                 noteFunctionHandler={() => {
                                    toast.error("Note function not implemented yet")
                                 }}
                              />
                           ))}

                           {/* Empty message */}
                           {data?.length === 0 && (
                              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                 <TableCell colSpan={headCells?.length} sx={{ py: 9.7 }}>
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

export default ManageListsTable

"use client"
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import _ from "lodash"
import PerfectScrollbar from "react-perfect-scrollbar"
import AllBookmarkTableItem from "./item"

const AllBookmarkTable = ({
   headCells,
   rows,
   direction,
   mutateUrl
}: {
   headCells: string[]
   rows: {
      title: string
      company: string
      location: string
      status: string
   }[]
   direction: "ltr" | "rtl"
   mutateUrl: string
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
                              key={index}
                              align={index === headCells?.length - 1 ? "center" : "left"}
                              sx={{
                                 ...(index === 0 && {
                                    minWidth: "200px"
                                 }),
                                 py: 1.5,
                                 textTransform: "capitalize"
                              }}>
                              {headCell}
                           </TableCell>
                        ))}
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {rows?.map((row: any) => (
                        <AllBookmarkTableItem mutateUrl={mutateUrl} key={row?.id} row={row} direction={direction} />
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         </Box>
      </PerfectScrollbar>
   )
}

export default AllBookmarkTable

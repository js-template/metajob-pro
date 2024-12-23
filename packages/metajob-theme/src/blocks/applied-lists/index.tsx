"use client"
import { useState } from "react"
import { Fragment } from "react/jsx-runtime"
import _ from "lodash"
import useSWR from "swr"
import {
   Box,
   CircularProgress,
   Pagination,
   PaginationItem,
   Paper,
   Stack,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow
} from "@mui/material"
import Typography from "@mui/material/Typography"
import PerfectScrollbar from "react-perfect-scrollbar"
import ListItem from "./item"
import { fetcher } from "./hook"
import CIcon from "../../components/common/icon"
import { IAppliedListData } from "./types"

export const AppliedLists = ({ data, userId }: { userId: number; data?: IAppliedListData }) => {
   const [page, setPage] = useState<number>(1)

   const queryParams = {
      filters: {
         owner: {
            id: {
               $eq: userId || undefined
            }
         }
      },
      pagination: {
         pageSize: 10,
         page: page
      },
      populate: {
         job: {
            fields: ["title", "slug", "status", "startDate", "endDate", "vacancy", "status"]
         }
      },
      fields: ["status"]
   }
   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = userId ? `/api/find?model=api/metajob-strapi/applied-jobs&query=${queryString}&cache=no-store` : null

   const { data: appliedListMain, error, isLoading } = useSWR(apiUrl, fetcher)
   const { data: AllAppliedData, meta } = appliedListMain || {}
   const totalPage = meta?.pagination?.pageCount || 0

   const { title: pageTitle } = data || {}

   // FIXME:  This headcell Should not be here. it will be dynamic or move to data file
   const headCells = [
      {
         label: "Title"
      },
      {
         label: "Start Date"
      },
      {
         label: "End Date"
      },
      {
         label: "Status"
      },
      {
         label: "Vacancy"
      }
   ]
   return (
      <Box>
         <Box sx={{ p: 3 }}>
            <Typography variant='body1' fontWeight={500} lineHeight={"24px"}>
               {pageTitle || "Applied List"}
            </Typography>
         </Box>

         <Box
            sx={{
               position: "relative",
               minHeight: "auto"
            }}>
            {/* loader */}
            {(isLoading || !appliedListMain) && (
               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     height: "100%",
                     width: "100%",
                     position: "absolute",
                     top: 0,
                     left: 0,
                     zIndex: 1000
                  }}>
                  {/* Overlay */}
                  <CircularProgress
                     sx={{
                        position: "relative",
                        zIndex: 3
                     }}
                     disableShrink
                  />
                  <Box
                     sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        filter: "blur(2px)",
                        backdropFilter: "blur(2px)",
                        zIndex: 1
                     }}
                  />
               </Box>
            )}

            {/* Table  */}
            <PerfectScrollbar>
               <Box
                  sx={{
                     maxHeight: "calc(100vh - 271px)",
                     maxWidth: {
                        xs: "100vh",
                        sm: "100%"
                     }
                  }}>
                  <TableContainer component={Paper}>
                     <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead
                           sx={{
                              "& th": {
                                 borderBottom: "1px solid",
                                 borderColor: "divider",
                                 color: (theme) => theme.palette.text.secondary
                              },
                              "& th:first-child": {
                                 px: 3
                              },
                              "& th:last-child": {
                                 pr: 5
                              }
                           }}>
                           <TableRow>
                              {_.map(headCells, (headCell, index) => (
                                 <TableCell
                                    align={"left"}
                                    className='notranslate'
                                    sx={{
                                       ...(index === 0 && {
                                          minWidth: "200px"
                                       }),
                                       py: 1.5
                                    }}>
                                    {headCell?.label}
                                 </TableCell>
                              ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {AllAppliedData ? (
                              <Fragment>
                                 {AllAppliedData?.length > 0 &&
                                    AllAppliedData?.map((item: any, index: number) => {
                                       const { attributes: AppliedAttributes, id: appliedId } = item || {}
                                       const appliedListData = AppliedAttributes?.list?.data

                                       return <ListItem key={index} data={appliedListData} />
                                    })}
                                 {/* Empty data */}
                                 {AllAppliedData?.length === 0 && (
                                    <TableRow>
                                       <TableCell
                                          align='center'
                                          className='notranslate'
                                          colSpan={headCells.length}
                                          sx={{
                                             py: 8
                                          }}>
                                          No data available
                                       </TableCell>
                                    </TableRow>
                                 )}
                              </Fragment>
                           ) : (
                              <TableRow>
                                 <TableCell
                                    align='center'
                                    className='notranslate'
                                    colSpan={headCells.length}
                                    sx={{
                                       py: 8
                                    }}>
                                    No data available
                                 </TableCell>
                              </TableRow>
                           )}
                        </TableBody>
                     </Table>
                  </TableContainer>
               </Box>
            </PerfectScrollbar>
         </Box>
         {/* Box Footer */}
         <Box
            sx={{
               py: 2.5,
               px: 3,
               borderTop: "1px solid",
               borderColor: "divider",
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center"
            }}>
            <Box
               sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
               }}>
               {totalPage > 0 && (
                  <Stack
                     sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        py: 4
                     }}>
                     <Pagination
                        variant='outlined'
                        shape='rounded'
                        count={totalPage}
                        renderItem={(item) => (
                           <PaginationItem
                              {...item}
                              components={{
                                 previous: (props) => <CIcon {...props} className='icon-arrow-left-circle' />,
                                 next: (props) => <CIcon {...props} className='icon-arrow-right-circle' />
                              }}
                              sx={{
                                 fontWeight: 400,
                                 fontSize: 16,
                                 color: (theme) => theme.palette.text.disabled,
                                 border: "none",
                                 height: 40,
                                 width: 40,

                                 "&.Mui-selected": {
                                    color: (theme) => theme.palette.primary.contrastText,
                                    backgroundColor: (theme) => theme.palette.primary.main,
                                    "&:hover": {
                                       backgroundColor: (theme) => theme.palette.secondary.main,
                                       color: (theme) => theme.palette.secondary.contrastText
                                    }
                                 },
                                 ...(item.type === "previous" || item.type === "next"
                                    ? {
                                         backgroundColor: (theme) => theme.palette.background.default
                                      }
                                    : {
                                         backgroundColor: (theme) => theme.palette.background.paper
                                      })
                              }}
                           />
                        )}
                        page={page}
                        onChange={(e, value) => {
                           setPage(value)
                           //   fetchJobs(value);
                        }}
                     />
                  </Stack>
               )}
            </Box>
         </Box>
      </Box>
   )
}

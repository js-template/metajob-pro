"use client"
import { Box, Skeleton, TableCell, TableRow, Typography, useTheme } from "@mui/material"
import CIcon from "../../components/common/icon"
import { Fragment } from "react"
import { recentActivitiesItemProps } from "./type"
import moment from "moment"

const TableItem = ({ item, isLoading }: { item?: recentActivitiesItemProps; isLoading?: boolean }) => {
   const theme = useTheme()
   //const direction = theme.direction

   const { title, dateTime } = item || {}

   return (
      <Fragment>
         <TableRow
            sx={{
               "& td, th": {
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  color: (theme) => theme.palette.text.secondary
               },
               "& td": {
                  py: "10px"
               },
               "&:last-child td, &:last-child th": { border: 0 }
            }}>
            <TableCell>
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: 2
                  }}>
                  <Box
                     sx={{
                        flex: "none"
                     }}>
                     {isLoading ? (
                        <Skeleton
                           variant='circular'
                           sx={{
                              width: {
                                 xs: "38px",
                                 sm: "48px"
                              },
                              height: {
                                 xs: "38px",
                                 sm: "48px"
                              }
                           }}
                        />
                     ) : (
                        <Box
                           sx={{
                              width: {
                                 xs: "38px",
                                 sm: "48px"
                              },
                              height: {
                                 xs: "38px",
                                 sm: "48px"
                              },
                              borderRadius: "50%",
                              backgroundColor: (theme) => theme.palette.text.primary + "10",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                           }}>
                           <CIcon
                              icon='tabler:bell-filled'
                              sx={{
                                 fontSize: {
                                    xs: "1.5rem",
                                    sm: "1.75rem"
                                 },
                                 color: theme.palette.text.primary + "80"
                              }}
                           />
                        </Box>
                     )}
                  </Box>
                  <Box
                     sx={{
                        width: "100%"
                     }}>
                     {isLoading ? (
                        <>
                           <Skeleton variant='text' width='100%' height={24} />
                           <Skeleton variant='text' width='100%' height={24} />
                        </>
                     ) : (
                        <>
                           <Typography
                              variant='subtitle2'
                              sx={{
                                 color: (theme) => theme.palette.text.primary + "80"
                              }}>
                              {moment(dateTime).fromNow()}
                           </Typography>
                           <Typography
                              variant='body1'
                              sx={{
                                 color: (theme) => theme.palette.text.primary,
                                 mb: "5px",
                                 lineClamp: 1,
                                 display: "-webkit-box",
                                 overflow: "hidden",
                                 textOverflow: "ellipsis",
                                 WebkitLineClamp: 1,
                                 WebkitBoxOrient: "vertical"
                              }}>
                              {title}
                           </Typography>
                        </>
                     )}
                  </Box>
               </Box>
            </TableCell>
         </TableRow>
      </Fragment>
   )
}

export default TableItem

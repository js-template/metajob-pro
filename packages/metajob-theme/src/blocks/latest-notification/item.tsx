"use client"
import { Box, Skeleton, Stack, TableCell, TableRow, Typography, useTheme } from "@mui/material"
import CIcon from "../../components/common/icon"
import { Fragment } from "react"
import { recentActivitiesItemProps } from "./type"
import moment from "moment"

const TableItem = ({ item, isLoading }: { item?: recentActivitiesItemProps; isLoading?: boolean }) => {
   const theme = useTheme()
   //const direction = theme.direction

   const { title, createdAt } = item || {}

   return (
      <Fragment>
         <TableRow
            sx={{
               "& td, th": {
                  color: (theme) => theme.palette.text.secondary
               },
               "& td": {
                  py: { xs: 1, md: 1.5 },
                  px: { xs: 1, md: 2 }
               },
               "&:last-child td, &:last-child th": { border: 0 }
            }}>
            <TableCell>
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: { xs: 1, md: 2 }
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
                              backgroundColor: (theme) => theme.palette.primary.main + "10",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                           }}>
                           <CIcon
                              icon='material-symbols-light:notification-add-sharp'
                              sx={{
                                 fontSize: {
                                    xs: 24,
                                    sm: 28
                                 },
                                 color: theme.palette.primary.main
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
                        <Stack gap={{ xs: 0, sm: 0.5 }}>
                           <Typography
                              variant='subtitle2'
                              sx={{
                                 color: (theme) => theme.palette.text.primary + "80"
                              }}>
                              {moment(createdAt).fromNow()}
                           </Typography>
                           <Typography
                              variant='body1'
                              sx={{
                                 color: (theme) => theme.palette.text.primary,
                                 fontSize: { xs: 16, md: 18 },
                                 lineClamp: 1,
                                 display: "-webkit-box",
                                 overflow: "hidden",
                                 textOverflow: "ellipsis",
                                 WebkitLineClamp: 1,
                                 WebkitBoxOrient: "vertical"
                              }}>
                              {title}
                           </Typography>
                        </Stack>
                     )}
                  </Box>
               </Box>
            </TableCell>
         </TableRow>
      </Fragment>
   )
}

export default TableItem

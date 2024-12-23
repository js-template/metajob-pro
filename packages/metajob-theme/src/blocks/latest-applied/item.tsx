"use client"
import { Chip, Skeleton, TableCell, TableRow, Typography, useTheme } from "@mui/material"
import { Fragment } from "react"
import { appliedListsItemProps } from "./type"

const TableItem = ({ item, isLoading }: { item?: appliedListsItemProps; isLoading?: boolean }) => {
   const theme = useTheme()
   const direction = theme.direction

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
                  py: "20px"
               },
               "& td:last-child": {
                  pr: direction === "rtl" ? 0 : 5,
                  pl: direction === "ltr" ? 0 : 5
               },
               "&:last-child td, &:last-child th": { border: 0 }
            }}>
            <TableCell>
               {isLoading ? (
                  <Skeleton variant='text' width='100%' height={24} />
               ) : (
                  <Typography
                     variant='body2'
                     fontWeight={500}
                     fontSize={{
                        xs: "0.875rem",
                        sm: "1rem"
                     }}
                     lineHeight={"24px"}
                     sx={{
                        color: (theme) => theme.palette.text.primary,
                        // line clamp 1
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 1
                     }}>
                     {item?.job?.title}
                  </Typography>
               )}
            </TableCell>
            <TableCell>
               {isLoading ? (
                  <Skeleton variant='text' width='100%' height={24} />
               ) : (
                  <Chip
                     label={item?.status}
                     size='small'
                     sx={{
                        textTransform: "capitalize",
                        fontWeight: 500,
                        ...(item?.status === "Shortlisted"
                           ? {
                                color: (theme) => theme.palette.primary.main,
                                backgroundColor: (theme) => theme.palette.primary.main + "20",
                                boxShadow: "0 0 0 1px " + theme.palette.primary.main
                             }
                           : item?.status === "Pending"
                             ? {
                                  color: (theme) => theme.palette.warning.main,
                                  backgroundColor: (theme) => theme.palette.warning.main + "20",
                                  boxShadow: "0 0 0 1px " + theme.palette.warning.main
                               }
                             : {
                                  color: (theme) => theme.palette.error.main,
                                  backgroundColor: (theme) => theme.palette.error.main + "20",
                                  boxShadow: "0 0 0 1px " + theme.palette.error.main
                               })
                     }}
                  />
               )}
            </TableCell>
         </TableRow>
      </Fragment>
   )
}

export default TableItem

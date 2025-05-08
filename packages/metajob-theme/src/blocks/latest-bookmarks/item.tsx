"use client"
import { Chip, Skeleton, TableCell, TableRow, Typography, useTheme } from "@mui/material"
import { Fragment } from "react"
import { bookmarksListsItemProps } from "./type"

const TableItem = ({
   item,
   noteFunctionHandler,
   isLoading
}: {
   item?: bookmarksListsItemProps
   noteFunctionHandler: () => void
   isLoading?: boolean
}) => {
   const theme = useTheme()
   const direction = theme.direction

   return (
      <Fragment>
         <TableRow
            sx={{
               "& td, th": {
                  color: (theme) => theme.palette.text.secondary
               },
               "& td": {
                  py: { xs: 1.5, md: 2.5 },
                  px: { xs: 1, md: 2 }
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
                        xs: 14,
                        sm: 16
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
                     {item?.job?.title || item?.resume?.name}
                  </Typography>
               )}
            </TableCell>
            <TableCell>
               {isLoading ? (
                  <Skeleton variant='text' width='100%' height={24} />
               ) : (
                  <Chip
                     label={item?.type}
                     size='small'
                     sx={{
                        textTransform: "capitalize",
                        fontWeight: 500,
                        ...(item?.type === "job"
                           ? {
                                color: (theme) => theme.palette.primary.main,
                                backgroundColor: (theme) => theme.palette.primary.main + "20",
                                boxShadow: "0 0 0 1px " + theme.palette.primary.main
                             }
                           : item?.type === "company"
                             ? {
                                  color: (theme) => theme.palette.success.main,
                                  backgroundColor: (theme) => theme.palette.success.main + "20",
                                  boxShadow: "0 0 0 1px " + theme.palette.success.main
                               }
                             : item?.type === "resume"
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

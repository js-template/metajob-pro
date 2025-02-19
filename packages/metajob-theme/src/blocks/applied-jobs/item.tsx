"use client"
import { Chip, TableCell, TableRow, Typography, useTheme } from "@mui/material"
import { Fragment } from "react"
import { dateFormatter } from "../../lib/date-format"
import { IApplyJobData } from "./type"
import Link from "next/link"

const TableItem = ({ application }: { application: IApplyJobData }) => {
   const theme = useTheme()

   const { apply_status } = application || {}
   const { title, vacancy, startDate, endDate, slug } = application?.job?.[0] || {}

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
                  py: 1
               },
               "& td:last-child": {
                  pr: theme.direction === "rtl" ? 0 : 5,
                  pl: theme.direction === "ltr" ? 0 : 5
               },
               "&:last-child td, &:last-child th": { border: 0 }
            }}>
            <TableCell>
               <Link href={`/job/${slug}`} target='_blank' passHref>
                  <Typography
                     variant='body2'
                     fontWeight={500}
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
                     {title}
                  </Typography>
               </Link>
            </TableCell>
            <TableCell>{dateFormatter(startDate)}</TableCell>
            <TableCell>{dateFormatter(endDate)}</TableCell>
            <TableCell>{vacancy}</TableCell>
            <TableCell
               sx={{
                  color: (theme) => theme.palette.primary.main,
                  textAlign: "center"
               }}>
               <Chip
                  label={<Typography variant='body2'>{apply_status}</Typography>}
                  color={apply_status === "Shortlisted" ? "primary" : apply_status === "Pending" ? "warning" : "error"}
                  variant='outlined'
                  size='small'
                  sx={{
                     px: 1
                  }}
               />
            </TableCell>
         </TableRow>
      </Fragment>
   )
}

export default TableItem

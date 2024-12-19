"use client"
import { Chip, TableCell, TableRow, Typography, useTheme } from "@mui/material"
import { Fragment } from "react"

import { dateFormatter } from "../../lib/date-format"

import { ManageListsDataProps } from "./type"

import { KeyedMutator } from "swr"
import { formProps } from "../../types/forms"
import Link from "next/link"

const TableItem = ({
   job
}: {
   job: any
   listData: ManageListsDataProps
   mutate: KeyedMutator<any>
   formData: formProps
   userId: number
   selectAll: boolean
   noteFunctionHandler: () => void
}) => {
   const { title, publishedAt, status, vacancy, startDate, endDate, slug } = job?.attributes.job?.data?.attributes || {}

   const theme = useTheme()
   //const [show, setShow] = useState(false)

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
            <TableCell>{dateFormatter(publishedAt)}</TableCell>
            <TableCell>{dateFormatter(endDate)}</TableCell>
            <TableCell>{vacancy}</TableCell>
            <TableCell
               sx={{
                  color: (theme) => theme.palette.primary.main
               }}>
               <Chip
                  label={<Typography variant='body2'>{status}</Typography>}
                  color={status === "open" ? "primary" : "error"}
                  variant='outlined'
                  size='small'
                  sx={{
                     px: 1
                  }}
               />
            </TableCell>
         </TableRow>

         {/* {show && (
            <EditList
               open={show}
               handleClickOpen={handleClickOpen}
               handleClose={handleClose}
               formData={formData}
               listID={listID}
               mutate={mutate}
               userId={userId}
               data={listData}
            />
         )} */}
      </Fragment>
   )
}

export default TableItem

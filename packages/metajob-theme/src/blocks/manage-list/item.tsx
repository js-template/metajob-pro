"use client"
import NextLink from "next/link"
import { Chip, IconButton, TableCell, TableRow, Typography, useTheme } from "@mui/material"
import { Fragment, useState } from "react"
import CIcon, { SpinnersClock } from "../../components/common/icon"
import { dateFormatter } from "../../lib/date-format"
import { deleteEntry } from "../../lib/strapi"
import toast from "react-hot-toast"
import { ManageListsDataProps } from "./type"
import EditList from "./edit-list"
import { KeyedMutator } from "swr"
import { formProps } from "../../types/forms"

const TableItem = ({
   job,
   selectAll,
   listData,
   mutate,
   formData,
   userId
}: {
   job: any
   listData: ManageListsDataProps
   mutate: KeyedMutator<any>
   formData: formProps
   userId: number
   selectAll: boolean
   noteFunctionHandler: () => void
}) => {
   const { title, slug, publishedAt, status, vacancy, startDate, endDate } = job?.attributes
   const [loading, setLoading] = useState(false)
   const theme = useTheme()
   const [show, setShow] = useState(false)

   const listID = job?.id
   const model = "api/metajob-strapi/jobs"

   const handleClickOpen = () => {
      setShow(true)
   }

   const handleClose = () => {
      setShow(false)
   }

   // *** Function to handle delete operation
   const handleDelete = async () => {
      if (confirm("Are you sure you want to delete this list?")) {
         setLoading(true)

         try {
            const { data, error } = await deleteEntry(model, listID)

            if (error) {
               throw new Error(error)
            }

            // Set success message after successful deletion
            mutate().finally(() => {
               toast.success("Successfully deleted!")
            })
         } catch (err: any) {
            toast.error(err.message || "An error occurred during deletion")
         } finally {
            setLoading(false)
         }
      } else {
         return
      }
   }

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
               <Typography
                  component={NextLink}
                  href={`/job/${slug}`}
                  variant='body2'
                  fontWeight={500}
                  lineHeight={"24px"}
                  sx={{
                     color: (theme) => theme.palette.text.primary,
                     transitionDuration: ".3s",
                     "&:hover": {
                        color: (theme) => theme.palette.primary.main
                     },
                     textDecoration: "none",
                     // line clamp 1
                     display: "-webkit-box",
                     WebkitBoxOrient: "vertical",
                     overflow: "hidden",
                     textOverflow: "ellipsis",
                     WebkitLineClamp: 1
                  }}>
                  {title}
               </Typography>
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
            <TableCell
               align='center'
               sx={{
                  display: "flex",
                  gap: 0.5,
                  alignItems: "center",
                  justifyContent: "center"
               }}>
               {/* Edit icon */}
               {listData?.tableConfig?.enableEdit && (
                  <IconButton
                     sx={{
                        color: (theme) => theme.palette.text.secondary
                     }}
                     onClick={() => handleClickOpen()}>
                     <CIcon icon='tabler:edit' size={24} />
                  </IconButton>
               )}
               {/* Delete icon */}
               {listData?.tableConfig?.enableDelete && (
                  <IconButton
                     sx={{
                        color: (theme) => theme.palette.text.secondary
                     }}
                     onClick={() => handleDelete()}
                     disabled={loading}>
                     {loading ? <SpinnersClock /> : <CIcon icon='tabler:trash' size={24} />}
                  </IconButton>
               )}
            </TableCell>
         </TableRow>

         {show && (
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
         )}
      </Fragment>
   )
}

export default TableItem

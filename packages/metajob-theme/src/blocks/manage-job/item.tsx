"use client"
import NextLink from "next/link"
import { Chip, IconButton, TableCell, TableRow, Typography, useTheme } from "@mui/material"
import { Fragment, useState } from "react"
import CIcon, { SpinnersClock } from "../../components/common/icon"
import { dateFormatter } from "../../lib/date-format"
import { deleteEntry } from "../../lib/strapi"
import toast from "react-hot-toast"
import { IJobData, IManageJobBock } from "./type"
import EditList from "./edit-list"
import { KeyedMutator } from "swr"
import { formProps } from "../../types/forms"
import JobApplications from "./job-applications"
import { hexToRGBA } from "../../lib/hex-to-rgba"

const TableItem = ({
   job,
   selectAll,
   blockData,
   mutate,
   formData,
   userId
}: {
   job: IJobData
   blockData: IManageJobBock
   mutate: KeyedMutator<any>
   formData: formProps
   userId?: number
   selectAll: boolean
   noteFunctionHandler: () => void
}) => {
   const { title, slug, publishedAt, status, applications, endDate, documentId } = job || {}
   const [loading, setLoading] = useState(false)
   const theme = useTheme()
   const [show, setShow] = useState(false)
   const [jobApplicationShow, setJobApplicationShow] = useState(false)

   const listID = job?.id
   const model = "api/metajob-backend/jobs"

   const handleApplicationOpen = () => {
      setJobApplicationShow(true)
   }
   const handleApplicationClose = () => {
      setJobApplicationShow(false)
   }

   const handleClickOpen = () => {
      return toast.error("This feature is under development")
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
            const { data, error } = await deleteEntry(model, documentId)

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
            <TableCell sx={{ cursor: "pointer" }} onClick={() => handleApplicationOpen()}>
               <Typography
                  variant='body2'
                  sx={{
                     bgcolor: hexToRGBA(theme.palette.primary.main, 0.2),
                     textAlign: "center",
                     borderRadius: "4px",
                     color: (theme) => theme.palette.text.primary,
                     p: 0.5
                  }}>
                  {applications?.count || 0}
               </Typography>
            </TableCell>
            <TableCell>
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
               <IconButton
                  sx={{
                     color: (theme) => theme.palette.text.secondary
                  }}
                  onClick={() => handleClickOpen()}>
                  <CIcon icon='tabler:edit' size={24} />
               </IconButton>
               {/* {blockData?.tableConfig?.enableEdit && (
                  <IconButton
                     sx={{
                        color: (theme) => theme.palette.text.secondary
                     }}
                     onClick={() => handleClickOpen()}>
                     <CIcon icon='tabler:edit' size={24} />
                  </IconButton>
               )} */}
               {/* Delete icon */}
               <IconButton
                  sx={{
                     color: (theme) => theme.palette.text.secondary
                  }}
                  onClick={() => handleDelete()}
                  disabled={loading}>
                  {loading ? <SpinnersClock /> : <CIcon icon='tabler:trash' size={24} />}
               </IconButton>
               {/* {blockData?.tableConfig?.enableDelete && (
                  <IconButton
                     sx={{
                        color: (theme) => theme.palette.text.secondary
                     }}
                     onClick={() => handleDelete()}
                     disabled={loading}>
                     {loading ? <SpinnersClock /> : <CIcon icon='tabler:trash' size={24} />}
                  </IconButton>
               )} */}
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
               blockData={blockData}
            />
         )}
         {jobApplicationShow && (
            <JobApplications
               open={jobApplicationShow}
               handleClose={handleApplicationClose}
               jobDocID={documentId}
               mutate={mutate}
               blockData={blockData}
            />
         )}
      </Fragment>
   )
}

export default TableItem

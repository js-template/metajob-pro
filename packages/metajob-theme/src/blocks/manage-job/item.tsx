"use client"
import NextLink from "next/link"
import { Chip, IconButton, MenuItem, Select, TableCell, TableRow, Typography, useTheme } from "@mui/material"
import { Fragment, useState } from "react"
import CIcon, { SpinnersClock } from "../../components/common/icon"
import { dateFormatter } from "../../lib/date-format"
import { deleteEntry, updateOne } from "../../lib/strapi"
import toast from "react-hot-toast"
import { IJobData, IManageJobBock } from "./types"
import EditJob from "./edit-job"
import { KeyedMutator } from "swr"
import JobApplications from "./job-applications"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import _ from "lodash"

const TableItem = ({
   job,
   blockData,
   mutate
}: {
   job: IJobData
   blockData: IManageJobBock
   mutate: KeyedMutator<any>
   noteFunctionHandler: () => void
}) => {
   const { title, slug, publishedAt, job_status, applications, endDate, documentId } = job || {}
   const [loading, setLoading] = useState(false)
   const [statusLoading, setStatusLoading] = useState(false)
   const [statusValue, setStatusValue] = useState(job_status)
   const theme = useTheme()
   const [show, setShow] = useState(false)
   const [jobApplicationShow, setJobApplicationShow] = useState(false)

   const model = "api/metajob-backend/jobs"

   const handleApplicationOpen = () => {
      setJobApplicationShow(true)
   }
   const handleApplicationClose = () => {
      setJobApplicationShow(false)
   }

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

   // *** handle update job status
   const handleUpdateStatus = async (value: "draft" | "open" | "closed") => {
      try {
         setStatusLoading(true)
         const updateInput = {
            data: {
               job_status: value
            }
         }
         const statusResponse = await updateOne("metajob-backend/jobs", documentId, updateInput)
         // Check if the response has any errors
         if (statusResponse.error) {
            toast.error(statusResponse?.error || "Something went wrong")
         } else {
            setStatusValue(value)
            // mutate("api/metajob-backend/applied-jobs")
            toast.success("Status updated successfully")
         }
      } catch (error: any) {
         toast.error(error?.message || "An unexpected error occurred. Please try again.")
      } finally {
         setStatusLoading(false)
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
               <Select
                  labelId='job-status'
                  id='job-status'
                  autoWidth
                  defaultValue={job_status || ""}
                  onChange={(e) => {
                     const value = e.target.value as "draft" | "open" | "closed"
                     handleUpdateStatus(value)
                  }}
                  renderValue={(selected) => {
                     const selectedValue = selected as string

                     return (
                        <Typography
                           variant='body1'
                           fontWeight={500}
                           lineHeight={"24px"}
                           sx={{ fontSize: "14px", py: 0 }}>
                           {selectedValue}
                        </Typography>
                     )
                  }}
                  IconComponent={() => (
                     <CIcon
                        icon='iconamoon:arrow-down-2-duotone'
                        size={20}
                        sx={{
                           position: "absolute",
                           right: "8px",
                           top: "50%",
                           transform: "translateY(-50%)",
                           pointerEvents: "none"
                        }}
                     />
                  )}
                  sx={{
                     backgroundColor: (theme: { palette: { text: { primary: string } } }) =>
                        theme.palette.text.primary + "10",
                     borderRadius: "8px",
                     width: { xs: "100%", md: "60%" },
                     borderColor: "divider",
                     "& .MuiSelect-select": {
                        py: 0.5
                     },

                     "& .MuiTypography-root": {
                        px: 1.5,
                        py: 0,
                        textTransform: "capitalize",
                        fontSize: "14px",
                        color:
                           statusValue === "draft"
                              ? "warning.main"
                              : statusValue === "open"
                                ? "primary.main"
                                : "error.main"
                     }
                  }}>
                  {_.map(["open", "draft", "closed"], (option, index) => (
                     <MenuItem key={index} value={option}>
                        {option}
                     </MenuItem>
                  ))}
               </Select>
            </TableCell>
            <TableCell align='center'>
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

         {show && <EditJob open={show} handleClose={handleClose} mutate={mutate} jobDocID={documentId} />}
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

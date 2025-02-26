"use client"
import { Button, MenuItem, Select, TableCell, TableRow, Typography, useTheme } from "@mui/material"
import { Fragment, useState } from "react"
import CIcon from "../../components/common/icon"
import toast from "react-hot-toast"
import { KeyedMutator } from "swr"
import { IJobApplyData } from "./types"
import _ from "lodash"
import { updateOne } from "../../lib/strapi"
import { CoveModal } from "./cover-modal"
import { getNameFromEmail } from "./hook"
import { MessageModal } from "./message-modal"

const ApplyItem = ({ apply, mutate }: { apply: IJobApplyData; mutate: KeyedMutator<any> }) => {
   const theme = useTheme()
   const { documentId, cover_letter, apply_status, publishedAt, owner, job } = apply || {}
   const { email, first_name, last_name } = owner || {}
   const { title, slug } = job || {}
   const applicantName = first_name ? `${first_name} ${last_name}` : getNameFromEmail(email)

   const [loading, setLoading] = useState(false)
   const [applyStatus, setApplyStatus] = useState(apply_status)
   const [messageModalData, setMessageModalData] = useState(apply)
   const [coverModalOpen, setCoverModalOpen] = useState(false)
   const [messageModalOpen, setMessageModalOpen] = useState(false)
   const handleCardModalOpen = () => setCoverModalOpen(true)
   const handleCardModalClose = () => {
      setCoverModalOpen(false)
   }
   const handleMessageModalOpen = () => setMessageModalOpen(true)
   const handleMessageModalClose = () => {
      setMessageModalOpen(false)
   }

   // *** handle update apply status
   const handleUpdateStatus = async (value: string) => {
      try {
         setLoading(true)
         const updateInput = {
            data: {
               apply_status: value
            }
         }
         const applyResponse = await updateOne("metajob-backend/applied-jobs", documentId, updateInput)
         // Check if the response has any errors
         if (applyResponse.error) {
            toast.error(applyResponse?.error || "Something went wrong")
         } else {
            setApplyStatus(value)
            // mutate("api/metajob-backend/applied-jobs")
            toast.success("Status updated successfully")
         }
      } catch (error: any) {
         toast.error(error?.message || "An unexpected error occurred. Please try again.")
      } finally {
         setLoading(false)
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
                  pr: theme.direction === "rtl" ? 0 : 2,
                  pl: theme.direction === "ltr" ? 0 : 2
               },
               "&:last-child td, &:last-child th": { border: 0 }
            }}>
            <TableCell>
               <Typography
                  variant='body2'
                  fontWeight={500}
                  lineHeight={"24px"}
                  sx={{
                     color: (theme) => theme.palette.text.primary,
                     transitionDuration: ".3s",
                     textDecoration: "none",
                     display: "-webkit-box",
                     WebkitBoxOrient: "vertical",
                     overflow: "hidden",
                     textOverflow: "ellipsis",
                     WebkitLineClamp: 1
                  }}>
                  {applicantName}
               </Typography>
            </TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>
               <Button
                  sx={{
                     px: 0,
                     bgcolor: "transparent",
                     color: "primary.main",
                     "&:hover": {
                        bgcolor: "transparent",
                        color: "primary.main"
                     }
                  }}
                  onClick={() => {
                     handleCardModalOpen()
                  }}>
                  Cover Letter
               </Button>
            </TableCell>
            <TableCell
               sx={{
                  color: (theme) => theme.palette.primary.main
               }}>
               <Select
                  labelId='apply-status'
                  id='apply-status'
                  autoWidth
                  defaultValue={apply_status || ""}
                  onChange={(e) => {
                     handleUpdateStatus(e.target.value)
                  }}
                  renderValue={(selected) => {
                     const selectedValue = selected as string

                     return (
                        <Typography variant='body1' fontWeight={500} lineHeight={"24px"}>
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
                     backgroundColor: (theme) => theme.palette.text.primary + "10",
                     borderRadius: "8px",
                     width: { xs: "100%", md: "80%" },
                     borderColor: "divider",
                     minWidth: "70px",
                     "& .MuiSelect-select": {
                        py: 0.5
                     },
                     "& .MuiTypography-root": {
                        px: 1.5,
                        color:
                           applyStatus === "Pending"
                              ? "warning.main"
                              : applyStatus === "Selected"
                                ? "primary.main"
                                : applyStatus === "Shortlisted"
                                  ? "info.main"
                                  : "error.main"
                     }
                  }}>
                  {_.map(["Pending", "Shortlisted", "Selected", "Rejected"], (option, index) => (
                     <MenuItem key={index} value={option}>
                        {option}
                     </MenuItem>
                  ))}
               </Select>
            </TableCell>
            <TableCell>
               <Button
                  sx={{
                     px: 0,
                     bgcolor: "transparent",
                     color: "primary.main",
                     "&:hover": {
                        bgcolor: "transparent",
                        color: "primary.main"
                     }
                  }}
                  onClick={() => {
                     handleMessageModalOpen()
                     setMessageModalData(apply)
                  }}>
                  Message
               </Button>
            </TableCell>
         </TableRow>
         <CoveModal open={coverModalOpen} handleClose={handleCardModalClose} title='Cover Letter' data={cover_letter} />
         <MessageModal
            open={messageModalOpen}
            handleClose={handleMessageModalClose}
            title='Message'
            modalData={messageModalData}
         />
      </Fragment>
   )
}

export default ApplyItem

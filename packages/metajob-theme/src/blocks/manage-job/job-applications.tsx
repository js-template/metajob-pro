"use client"
import * as React from "react"
import Dialog from "@mui/material/Dialog"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import { find } from "../../lib/strapi"
import _ from "lodash"
import toast from "react-hot-toast"
import { IJobApplyData, IManageJobBock } from "./types"
import {
   Box,
   IconButton,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography
} from "@mui/material"
import CIcon from "../../components/common/icon"
import PerfectScrollbar from "react-perfect-scrollbar"
import { ApplyTableLoader } from "./loader"
import ApplyItem from "./apply-item"

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement<any, any>
   },
   ref: React.Ref<unknown>
) {
   return <Slide direction='up' ref={ref} {...props} />
})

type Props = {
   open: boolean
   handleClose: () => void
   jobDocID: string
   handleMute: () => void
   blockData: IManageJobBock
   empty?: {
      title: string
      description: string
   }
}

export default function JobApplications({ open, handleClose, jobDocID, handleMute, blockData, empty }: Props) {
   const [loading, setLoading] = React.useState(false)
   const [jobApplyData, setJobApplyData] = React.useState<any | null>(null)

   const { apply_table_head: headCells } = blockData || {}
   const totalHeader = 5
   if (headCells && headCells?.length > 0 && headCells?.length < totalHeader) {
      const remainHeader = totalHeader - headCells.length
      for (let i = 0; i < remainHeader; i++) {
         headCells.push({ value: "" })
      }
   }

   // *** get the applied-jobs data by the jobDocID
   React.useEffect(() => {
      const getApplications = async () => {
         setLoading(true)
         const { data, error } = await find(
            "api/metajob-backend/applied-jobs",
            {
               populate: "*",
               filters: {
                  job: {
                     documentId: jobDocID
                  }
               }
            },
            "no-store"
         )

         if (error) {
            handleClose()
            toast.error(error ?? "Failed to fetch data")
            return
         }

         // set list data
         setJobApplyData(data)
         setLoading(false)
      }

      if (open) {
         if (!jobDocID) return
         // ?? get job applications data by jobDocID
         getApplications()
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [open])

   return (
      <Dialog
         open={open}
         TransitionComponent={Transition}
         keepMounted
         aria-describedby='apply-list'
         sx={{
            "& .MuiDialog-paper": {
               backgroundColor: (theme) => theme.palette.background.default,
               maxWidth: "1440px",
               width: "100%"
            }
         }}>
         <Box sx={{ width: "100%", minHeight: "calc(100vh - 271px)", py: 10, px: 2 }}>
            {/* Cancel icon */}
            <Box
               sx={{
                  position: "absolute",
                  top: 0,
                  right: 0
               }}>
               <IconButton
                  color='error'
                  onClick={() => {
                     handleClose()
                  }}>
                  <CIcon
                     icon='cil-x'
                     sx={{
                        color: (theme) => theme.palette.error.main
                     }}
                  />
               </IconButton>
            </Box>

            {/* application table  */}
            <PerfectScrollbar>
               <Box
                  sx={{
                     maxHeight: "calc(100vh - 271px)",
                     maxWidth: {
                        xs: "100vh",
                        sm: "100%"
                     }
                  }}>
                  {
                     <TableContainer component={Box}>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                           <TableHead
                              sx={{
                                 "& th": {
                                    borderBottom: "1px solid",
                                    borderColor: "divider",
                                    color: (theme) => theme.palette.text.secondary
                                 },
                                 "& th:last-child": {
                                    pr: 5
                                 }
                              }}>
                              <TableRow>
                                 {_.map(headCells, (headCell, index) => (
                                    <TableCell
                                       align={index === headCells?.length - 1 ? "center" : "left"}
                                       sx={{
                                          ...(index === 0 && {
                                             minWidth: "200px"
                                          }),
                                          py: 1.5
                                       }}
                                       key={index}>
                                       {headCell?.value}
                                    </TableCell>
                                 ))}
                              </TableRow>
                           </TableHead>
                           {loading ? (
                              <TableBody>
                                 <ApplyTableLoader numberOfRows={3} />
                              </TableBody>
                           ) : (
                              <TableBody>
                                 {jobApplyData?.data?.map((apply: IJobApplyData, index: number) => (
                                    <ApplyItem key={index} apply={apply} handleMute={handleMute} />
                                 ))}

                                 {/* Empty message */}
                                 {jobApplyData?.data?.length === 0 && (
                                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                       <TableCell colSpan={headCells.length} sx={{ py: 9.7 }}>
                                          <Box
                                             sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                gap: 0.5,
                                                py: 4
                                             }}>
                                             <Typography
                                                variant='body1'
                                                sx={{ color: (theme) => theme.palette.text.secondary }}>
                                                {empty?.title || "No data found"}
                                             </Typography>
                                             <Typography
                                                variant='body2'
                                                sx={{ color: (theme) => theme.palette.text.secondary }}>
                                                {empty?.description || "Try to refresh the page or check back later"}
                                             </Typography>
                                          </Box>
                                       </TableCell>
                                    </TableRow>
                                 )}
                              </TableBody>
                           )}
                        </Table>
                     </TableContainer>
                  }
               </Box>
            </PerfectScrollbar>
         </Box>
      </Dialog>
   )
}

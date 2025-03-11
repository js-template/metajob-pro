"use client"
import { useState } from "react"
import { Box, IconButton, Typography, useTheme, Modal, Stack, Grid } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import MDEditor from "@uiw/react-md-editor"
import CIcon from "../../components/common/icon"
import { ISingleJob } from "./types"

type Props = {
   open: boolean
   handleClose: () => void
   title?: string
   data: ISingleJob
   jobApplyHandler: (value?: string) => void
   applyLoading: boolean
}

const ApplyJobModal = ({ open, handleClose, title, data, jobApplyHandler, applyLoading }: Props) => {
   const theme = useTheme()
   const [applyLetter, setApplyLetter] = useState("")
   const applyEditorChange = (value?: string) => {
      setApplyLetter(value || "")
   }

   return (
      <Modal
         open={open}
         onClose={handleClose}
         sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999
         }}>
         <Box
            sx={{
               bgcolor: theme.palette.background.default,
               width: { xs: "100%", md: "570px" },
               overflowY: "auto",
               mx: "auto",
               boxShadow: "none",
               position: "relative",
               borderRadius: "12px"
            }}>
            {/* header  */}
            <Box
               sx={{
                  display: "flex",
                  justifyContent: title ? "space-between" : "flex-end",
                  alignItems: "center",
                  px: 3,
                  py: 2,
                  borderBottom: "1px solid",
                  borderColor: title ? theme.palette.divider : "transparent"
               }}>
               {title && <Typography variant='h6'>{title || "Cover Letter"}</Typography>}
               <IconButton
                  color='inherit'
                  onClick={handleClose}
                  edge='start'
                  sx={{
                     height: "42px",
                     width: "42px",
                     borderRadius: "8px"
                  }}>
                  <CIcon
                     icon='oui:cross'
                     sx={{
                        color: (theme) => theme.palette.error.main
                     }}
                  />
               </IconButton>
            </Box>
            {/* content  */}
            <Box sx={{ p: 2 }}>
               <Box>
                  <Grid container spacing={3} rowSpacing={2}>
                     {/* About me */}
                     <Grid item xs={12}>
                        <Box
                           component={"label"}
                           htmlFor='resume-cover-letter'
                           sx={{
                              display: "block",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              color: "text.primary",
                              mb: 1
                           }}>
                           Cover Letter
                        </Box>
                        <MDEditor
                           value={applyLetter}
                           onChange={applyEditorChange}
                           preview='edit'
                           data-color-mode={theme.palette.mode}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <Stack display={"flex"} alignItems={"center"} gap={1}>
                           <LoadingButton
                              onClick={() => {
                                 jobApplyHandler(applyLetter)
                              }}
                              loading={applyLoading}
                              size='small'
                              sx={{
                                 py: 1,
                                 width: {
                                    sm: 150,
                                    xs: "100%"
                                 }
                              }}
                              variant='contained'
                              color='primary'>
                              {applyLoading ? "Checking" : "Apply Now"}
                           </LoadingButton>
                        </Stack>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </Box>
      </Modal>
   )
}
export default ApplyJobModal

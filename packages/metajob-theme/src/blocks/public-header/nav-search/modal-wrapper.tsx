"use client"
import React from "react"
import { Box, IconButton, Typography, useTheme, Modal } from "@mui/material"
import CIcon from "../../../components/common/icon"

type Props = {
   open: boolean
   isOnClose?: boolean
   handleClose: () => void
   title?: string
   width?: string
   height?: string
   plain?: boolean
   children: React.ReactNode
   top?: boolean
}

const ModalWrapper = ({ open, handleClose, title, isOnClose = true, width, height, plain, children, top }: Props) => {
   const theme = useTheme()

   return (
      <Modal
         open={open}
         onClose={isOnClose ? handleClose : () => {}}
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
            zIndex: top ? 9999 : 9998
         }}>
         <Box
            sx={{
               bgcolor: theme.palette.background.default,
               width: { xs: "100%", md: width || "472px" },
               overflowY: "auto",
               mx: "auto",
               boxShadow: "none",
               position: "relative",
               ...(!plain && { borderRadius: "16px" }),
               ...(!height && { maxHeight: "calc(100vh - 32px)" }),
               ...(height && { height: height })
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
               {title && <Typography variant='h6'>{title || "Action"}</Typography>}
               {isOnClose && (
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
                           color: theme.palette.text.primary
                        }}
                     />
                  </IconButton>
               )}
            </Box>
            {/* content  */}
            <Box>{children}</Box>
         </Box>
      </Modal>
   )
}

export default ModalWrapper

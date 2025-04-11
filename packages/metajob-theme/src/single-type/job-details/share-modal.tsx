"use client"
import React from "react"
import { useTheme } from "next-themes"
import { Box, IconButton, Typography, useTheme as muiTheme, Modal, Stack } from "@mui/material"
import CIcon from "../../components/common/icon"
import { EmailShareButton, RedditShareButton, TelegramShareButton, WhatsappShareButton } from "react-share"
import { ISingleJob } from "./types"

type Props = {
   open: boolean
   handleClose: () => void
   title?: string
   data: ISingleJob
   secondary_color?: string
}

export const ShareModal = ({ open, handleClose, title, data, secondary_color }: Props) => {
   const theme = muiTheme()
   const { theme: mode } = useTheme()
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
               {title && (
                  <Typography
                     variant='h6'
                     sx={{
                        color: (theme) =>
                           mode === "light" ? secondary_color || theme.palette.text.primary : theme.palette.text.primary
                     }}>
                     {title || "Cover Letter"}
                  </Typography>
               )}
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
               {/* social-share  */}
               <Stack
                  direction={"row"}
                  gap={2}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  component={"span"}>
                  {/* whatsapp share link  */}
                  <WhatsappShareButton
                     url={`${process.env.NEXT_PUBLIC_BASE_URL}/job/${data?.slug}`}
                     title={data?.title || ""}>
                     <Box
                        sx={{
                           p: 1,
                           borderRadius: 50,
                           borderColor: (theme) => theme.palette.divider,
                           borderWidth: 1,
                           borderStyle: "solid",
                           "&:hover": {
                              bgcolor: (theme) => theme.palette.divider
                           }
                        }}>
                        <CIcon
                           icon={"formkit:whatsapp"}
                           size={20}
                           sx={{
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.disabled
                                    : theme.palette.text.disabled
                           }}
                        />
                     </Box>
                  </WhatsappShareButton>

                  {/* telegram share link  */}
                  <TelegramShareButton
                     url={`${process.env.NEXT_PUBLIC_BASE_URL}/job/${data?.slug}`}
                     title={data?.title || ""}>
                     <Box
                        sx={{
                           p: 1,
                           borderRadius: 50,
                           borderColor: (theme) => theme.palette.divider,
                           borderWidth: 1,
                           borderStyle: "solid",
                           "&:hover": {
                              bgcolor: (theme) => theme.palette.divider
                           }
                        }}>
                        <CIcon
                           icon={"mingcute:telegram-fill"}
                           size={20}
                           sx={{
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.disabled
                                    : theme.palette.text.disabled
                           }}
                        />
                     </Box>
                  </TelegramShareButton>

                  {/* reddit share link  */}
                  <RedditShareButton
                     url={`${process.env.NEXT_PUBLIC_BASE_URL}/job/${data?.slug}`}
                     title={data?.title || ""}>
                     <Box
                        sx={{
                           p: 1,
                           borderRadius: 50,
                           borderColor: (theme) => theme.palette.divider,
                           borderWidth: 1,
                           borderStyle: "solid",
                           "&:hover": {
                              bgcolor: (theme) => theme.palette.divider
                           }
                        }}>
                        <CIcon
                           icon={"bi:reddit"}
                           size={20}
                           sx={{
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.disabled
                                    : theme.palette.text.disabled
                           }}
                        />
                     </Box>
                  </RedditShareButton>
                  {/* email share link  */}
                  <EmailShareButton
                     url={`${process.env.NEXT_PUBLIC_BASE_URL}/job/${data?.slug}`}
                     subject={`Job: ${data?.title}` || ""}
                     body={
                        `Job Title: ${data?.title}, Job link: ${process.env.NEXT_PUBLIC_BASE_URL}/job/${data?.slug}` ||
                        ""
                     }>
                     <Box
                        sx={{
                           p: 1,
                           borderRadius: 50,
                           borderColor: (theme) => theme.palette.divider,
                           borderWidth: 1,
                           borderStyle: "solid",
                           "&:hover": {
                              bgcolor: (theme) => theme.palette.divider
                           }
                        }}>
                        <CIcon
                           icon={"mdi:email"}
                           size={20}
                           sx={{
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.disabled
                                    : theme.palette.text.disabled
                           }}
                        />
                     </Box>
                  </EmailShareButton>
               </Stack>
            </Box>
         </Box>
      </Modal>
   )
}

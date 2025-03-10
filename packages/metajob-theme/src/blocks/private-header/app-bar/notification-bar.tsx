"use client"
import React from "react"
import _ from "lodash"
import moment from "moment"
import {
   Box,
   IconButton,
   Menu,
   MenuItem,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableRow,
   Typography,
   useTheme
} from "@mui/material"
import CIcon from "../../../components/common/icon"

type Props = {
   emailHistoryData: {
      createdAt: string
      title: string
   }[]
}
const NotificationBar = ({ emailHistoryData }: Props) => {
   const theme = useTheme()

   // *** notification Menu ***
   const [anchorNotifyEl, setAnchorNotifyEl] = React.useState<null | HTMLElement>(null)
   const openNotify = Boolean(anchorNotifyEl)
   const handleNotifyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorNotifyEl(event.currentTarget)
   }
   const handleNotifyClose = () => {
      setAnchorNotifyEl(null)
   }

   return (
      <Box>
         <IconButton
            id='notify-button'
            aria-controls={openNotify ? "notify-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={openNotify ? "true" : undefined}
            // variant='text'
            onClick={handleNotifyClick}
            size='large'
            color='inherit'>
            <CIcon icon='tabler:bell' />
         </IconButton>
         <Menu
            id='notify-menu'
            anchorEl={anchorNotifyEl}
            open={openNotify}
            onClose={handleNotifyClose}
            MenuListProps={{
               "aria-labelledby": "notify-button"
            }}
            anchorOrigin={{
               vertical: "top",
               horizontal: "center"
            }}
            sx={{
               mt: "54px",
               "& .MuiPaper-root": {
                  minWidth: "180px",
                  maxHeight: { xs: "500px", md: "400px" },
                  maxWidth: { xs: "100%", md: "500px" },
                  overflowY: "auto",
                  border: "1px solid",
                  borderColor: theme.palette.divider,
                  borderRadius: "12px",
                  background: theme.palette.background.default,
                  boxShadow: "0px 8px 28px -4px rgba(20, 28, 46, 0.08)"
               }
            }}>
            {emailHistoryData &&
               emailHistoryData?.length > 0 &&
               _.map(emailHistoryData, (historyItem, index) => (
                  <MenuItem
                     onClick={() => {
                        handleNotifyClose()
                     }}
                     sx={{
                        maxWidth: "500px",
                        color: theme.palette.text.primary,
                        px: 2,
                        gap: 1.5,
                        textAlign: "left",
                        ":hover": {
                           background: theme.palette.background.default,
                           color: theme.palette.primary.main
                        }
                     }}
                     key={index}>
                     <Box>
                        <TableContainer component={Box}>
                           <Table sx={{ minWidth: 350 }} aria-label='simple table'>
                              <TableBody>
                                 <TableRow
                                    sx={{
                                       "& td, th": {
                                          borderBottom: "1px solid",
                                          borderColor: "divider",
                                          color: (theme) => theme.palette.text.secondary
                                       },
                                       "& td": {
                                          py: "10px"
                                       },
                                       "&:last-child td, &:last-child th": { border: 0 }
                                    }}>
                                    <TableCell>
                                       <Box
                                          sx={{
                                             display: "flex",
                                             alignItems: "center",
                                             gap: 2
                                          }}>
                                          <Box
                                             sx={{
                                                flex: "none"
                                             }}>
                                             <Box
                                                sx={{
                                                   width: {
                                                      xs: "38px",
                                                      sm: "48px"
                                                   },
                                                   height: {
                                                      xs: "38px",
                                                      sm: "48px"
                                                   },
                                                   borderRadius: "50%",
                                                   backgroundColor: (theme) => theme.palette.text.primary + "10",
                                                   display: "flex",
                                                   alignItems: "center",
                                                   justifyContent: "center"
                                                }}>
                                                <CIcon
                                                   icon='tabler:bell-filled'
                                                   sx={{
                                                      fontSize: {
                                                         xs: "1.5rem",
                                                         sm: "1.75rem"
                                                      },
                                                      color: theme.palette.text.primary + "80"
                                                   }}
                                                />
                                             </Box>
                                          </Box>
                                          <Box
                                             sx={{
                                                width: "100%"
                                             }}>
                                             <>
                                                <Typography
                                                   variant='subtitle2'
                                                   sx={{
                                                      color: (theme) => theme.palette.text.primary + "80"
                                                   }}>
                                                   {moment(historyItem?.createdAt).fromNow()}
                                                </Typography>
                                                <Typography
                                                   variant='body1'
                                                   sx={{
                                                      color: (theme) => theme.palette.text.primary,
                                                      mb: "5px",
                                                      lineClamp: 1,
                                                      display: "-webkit-box",
                                                      overflow: "hidden",
                                                      textOverflow: "ellipsis",
                                                      WebkitLineClamp: 1,
                                                      WebkitBoxOrient: "vertical"
                                                   }}>
                                                   {historyItem?.title}
                                                </Typography>
                                             </>
                                          </Box>
                                       </Box>
                                    </TableCell>
                                 </TableRow>
                              </TableBody>
                           </Table>
                        </TableContainer>
                     </Box>
                  </MenuItem>
               ))}
            {!emailHistoryData ||
               (emailHistoryData?.length === 0 && (
                  <MenuItem
                     onClick={() => {
                        handleNotifyClose()
                     }}
                     sx={{
                        maxWidth: "500px",
                        color: theme.palette.text.primary,
                        px: 2,
                        gap: 1.5,
                        textAlign: "left",
                        ":hover": {
                           background: theme.palette.background.default,
                           color: theme.palette.primary.main
                        }
                     }}>
                     <Box>
                        <TableContainer component={Box}>
                           <Table sx={{ minWidth: 350 }} aria-label='simple table'>
                              <TableBody>
                                 <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell colSpan={2} sx={{ py: 9.7 }}>
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
                                             {"No Activity"}
                                          </Typography>
                                          <Typography
                                             variant='body2'
                                             sx={{ color: (theme) => theme.palette.text.secondary }}>
                                             {"You haven't done anything yet."}
                                          </Typography>
                                       </Box>
                                    </TableCell>
                                 </TableRow>
                              </TableBody>
                           </Table>
                        </TableContainer>
                     </Box>
                  </MenuItem>
               ))}
         </Menu>
      </Box>
   )
}

export default NotificationBar

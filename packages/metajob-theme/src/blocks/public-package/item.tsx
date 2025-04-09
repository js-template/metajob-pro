"use client"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useSession } from "next-auth/react"
import {
   Box,
   Button,
   Card,
   CardContent,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Typography,
   useTheme as muiTheme
} from "@mui/material"
import CIcon from "../../components/common/icon"
import { IPackageData } from "./types"

type Props = {
   data?: IPackageData
   color?: string
}
export const PackageItem = ({ data, color }: Props) => {
   const theme = muiTheme()
   const { theme: mode } = useTheme()
   const router = useRouter()
   const { data: session } = useSession()

   const { title, description, price, frequency, feature, button } = data || {}

   const userRole = session?.user?.role?.type

   // *** package change handler
   const changePackageHandler = async () => {
      if (!session && userRole !== "employer") {
         toast.error("Please login as employer.")
      } else {
         router.push(button?.link || "/dashboard/packages")
      }
   }

   return (
      <Box>
         <Card
            sx={{
               maxWidth: { xs: "100%", md: "360px" },
               boxShadow: "none",
               borderRadius: "16px",
               border: "1px solid",
               borderColor: theme.palette.divider,
               "&:hover": {
                  borderColor: theme.palette.primary.main
               }
            }}>
            <CardContent sx={{ padding: 3 }}>
               {/* Price */}
               <Typography
                  variant='h2'
                  sx={{
                     mb: 3,
                     fontWeight: 700,
                     color: (theme) =>
                        mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary,
                     fontSize: {
                        xs: "32px",
                        sm: "48px"
                     }
                  }}>
                  ${price || 0}
                  <Typography component='span' variant='subtitle2' sx={{ pl: 0.75 }}>
                     /{frequency || "Monthly"}
                  </Typography>
               </Typography>

               {/* Title */}
               {title && (
                  <Typography
                     variant='body1'
                     sx={{
                        color: (theme) =>
                           mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary,
                        fontSize: {
                           xs: "20px",
                           sm: "24px"
                        },
                        fontWeight: 700
                     }}>
                     {title}
                  </Typography>
               )}

               {/* Description */}
               {description && (
                  <Typography
                     variant='body2'
                     sx={{
                        mt: 0.5,
                        mb: 2,
                        color: (theme) =>
                           mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary
                     }}>
                     {description}
                  </Typography>
               )}

               {/* Features */}
               {feature && feature?.length > 0 && (
                  <Box sx={{ mb: 3.5 }}>
                     <Typography
                        variant='subtitle2'
                        sx={{
                           mb: 1,
                           color: (theme) =>
                              mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary
                        }}>
                        Includes:
                     </Typography>
                     {/* Features List */}
                     {feature?.map((feature, index) => (
                        <List key={index} sx={{ py: 0.8, display: "flex", justifyContent: "space-between" }}>
                           <ListItem sx={{}} disableGutters>
                              <ListItemIcon sx={{ minWidth: "fit-content", mr: 1 }}>
                                 <CIcon
                                    icon='solar:check-circle-line-duotone'
                                    sx={{
                                       color: theme.palette.text.primary,
                                       "& circle": {
                                          opacity: 0
                                       },
                                       bgcolor: theme.palette.divider,
                                       borderRadius: "50px"
                                    }}
                                 />
                              </ListItemIcon>
                              <ListItemText
                                 primary={feature?.key}
                                 sx={{
                                    ".MuiTypography-root": {
                                       color: (theme) =>
                                          mode === "light"
                                             ? color || theme.palette.text.primary
                                             : theme.palette.text.primary,
                                       fontSize: "14px",
                                       fontWeight: 400
                                    }
                                 }}
                              />
                           </ListItem>
                           <ListItem sx={{}} disableGutters>
                              <ListItemText
                                 primary={feature?.value}
                                 sx={{
                                    ".MuiTypography-root": {
                                       color: (theme) =>
                                          mode === "light"
                                             ? color || theme.palette.text.primary
                                             : theme.palette.text.primary,
                                       textAlign: "center",
                                       fontSize: "14px",
                                       fontWeight: 400
                                    }
                                 }}
                              />
                           </ListItem>
                        </List>
                     ))}
                  </Box>
               )}

               {/* Button */}
               {
                  <Button
                     fullWidth
                     color='primary'
                     variant='contained'
                     onClick={changePackageHandler}
                     sx={{
                        height: "46px",
                        p: "12px auto",
                        borderRadius: "6px",
                        textTransform: "inherit",
                        boxShadow: "none",
                        fontSize: "16px",
                        "&:hover": {
                           backgroundColor: theme.palette.secondary.dark,
                           borderColor: theme.palette.secondary.dark,
                           color: theme.palette.primary.contrastText
                        },
                        ":disabled": {
                           backgroundColor: theme.palette.text.disabled + "50",
                           borderColor: "transparent",
                           color: theme.palette.text.disabled
                        }
                     }}>
                     {button?.label || "Purchase Now"}
                  </Button>
               }
            </CardContent>
         </Card>
      </Box>
   )
}

"use client"
import { useState } from "react"
import toast from "react-hot-toast"
import {
   Box,
   Card,
   CardContent,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Skeleton,
   Typography,
   useTheme
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import CIcon from "../../components/common/icon"
import { IMemberShip, IPackageData } from "./types"
import { createEntry, updateOne } from "../../lib/strapi"

type Props = {
   data?: IPackageData
   isLoader?: boolean
   membershipLoading?: boolean
   userId?: boolean
   handleMute?: () => void
   membershipData?: IMemberShip | null
}
export const PackageItem = ({ data, isLoader, membershipData, userId, handleMute, membershipLoading }: Props) => {
   const theme = useTheme()

   const [loading, setLoading] = useState(false)

   const { title, description, price, frequency, feature, button } = data || {}
   const { documentId: membershipDocId, user_plan } = membershipData || {}
   const { documentId: packageDocId } = user_plan || {}

   // *** package change handler
   const changePackageHandler = async (newPackageDocId: string) => {
      try {
         setLoading(true) // Start loading

         const packageInput = {
            data: {
               owner: [
                  {
                     id: userId || undefined
                  }
               ],
               user_plan: {
                  connect: [newPackageDocId]
               }
            }
         }
         if (membershipDocId) {
            const resumeResponse = await updateOne("metajob-backend/memberships", membershipDocId, packageInput)
            // Check if the response has any errors
            if (resumeResponse.error) {
               toast.error(resumeResponse?.error)
            } else {
               if (handleMute) {
                  handleMute()
               }
               toast.success("Package updated successfully")
            }
         } else {
            const resumeResponse = await createEntry("metajob-backend/memberships", packageInput)
            if (resumeResponse.error) {
               toast.error(resumeResponse?.error)
            } else {
               toast.success("Package created successfully")
            }
         }
      } catch (error: any) {
         toast.error(error?.message || "An unexpected error occurred. Please try again.")
      } finally {
         // Always stop loading
         setLoading(false)
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
               borderColor: theme.palette.divider
            }}>
            <CardContent sx={{ padding: 3 }}>
               {/* Price */}
               {isLoader ? (
                  <Skeleton variant='text' height='50px' sx={{ maxWidth: "180px", width: "100%", mb: 2 }} />
               ) : (
                  <Typography
                     variant='h2'
                     sx={{
                        mb: 3,
                        fontWeight: 700,
                        fontSize: {
                           xs: "32px",
                           sm: "48px"
                        }
                     }}>
                     ${price}
                     <Typography component='span' variant='subtitle2' sx={{ pl: 0.75 }}>
                        /{frequency}
                     </Typography>
                  </Typography>
               )}

               {/* Title */}
               {isLoader ? (
                  <Skeleton variant='text' width='100%' height='30px' />
               ) : (
                  <Typography
                     variant='body1'
                     sx={{
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
               {isLoader ? (
                  <Box sx={{ mt: 0.5, mb: 2 }}>
                     <Skeleton variant='text' width='100%' height='20px' />
                     <Skeleton variant='text' width='100%' height='20px' />
                  </Box>
               ) : (
                  <Typography variant='body2' sx={{ mt: 0.5, mb: 2 }}>
                     {description}
                  </Typography>
               )}

               {/* Features */}
               {isLoader ? (
                  <Box sx={{ mt: 4 }}>
                     <Skeleton variant='text' width='100%' height='30px' sx={{ mb: 1 }} />
                     {[1, 2, 3, 4, 5, 6].map((item, index) => (
                        <Skeleton
                           variant='text'
                           width='100%'
                           height='20px'
                           key={index}
                           sx={{
                              my: 3,
                              "&:last-of-type": {
                                 mb: 0
                              }
                           }}
                        />
                     ))}
                  </Box>
               ) : (
                  <Box sx={{ mb: 3.5 }}>
                     <Typography variant='subtitle2' sx={{ mb: 1 }}>
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
               {isLoader ? (
                  <Skeleton
                     variant='rectangular'
                     width='100%'
                     height='46px'
                     sx={{
                        borderRadius: "10px"
                     }}
                  />
               ) : (
                  <LoadingButton
                     disabled={membershipLoading || packageDocId === data?.documentId}
                     loading={membershipLoading || loading}
                     fullWidth
                     color='primary'
                     variant='contained'
                     onClick={() => {
                        if (data?.documentId) {
                           changePackageHandler(data?.documentId)
                        }
                     }}
                     sx={{
                        height: "46px",
                        p: "12px auto",
                        borderRadius: "6px",
                        textTransform: "inherit",
                        boxShadow: "none",
                        border: "1px solid",
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
                     }}
                     // loadingPosition='end'
                  >
                     {loading
                        ? "...."
                        : packageDocId === data?.documentId
                          ? "Current Plan"
                          : button?.label
                            ? button?.label
                            : "Change Plan"}
                  </LoadingButton>
               )}
            </CardContent>
         </Card>
      </Box>
   )
}

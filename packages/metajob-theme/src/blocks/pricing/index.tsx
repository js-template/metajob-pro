"use client"

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
import { subscriptionProps } from "./types"
import CIcon from "../../components/common/icon"
import { LoadingButton } from "@mui/lab"

// *** Price plan single item component
/**
 * Price plan single item component
 */
export const PricePlanWithFeatures = ({
   data,
   isLoader,
   currentPlan,
   formLoader,
   handleGetStarted
}: subscriptionProps) => {
   const theme = useTheme()

   // *** get started button click handler
   const clickHandler = (type: string) => {
      if (!handleGetStarted) console.log("Get started button clicked")

      if (handleGetStarted) handleGetStarted(type)
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
                     ${data?.price}
                     <Typography component='span' variant='subtitle2' sx={{ pl: 0.75 }}>
                        /per month
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
                     {data?.title}
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
                     {data?.description}
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
                     <List sx={{ p: 0 }}>
                        {data?.features?.map((feature, index) => (
                           <ListItem
                              key={index}
                              sx={{
                                 py: 0.8,
                                 "&:last-of-type": {
                                    pb: 0
                                 }
                              }}
                              disableGutters>
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
                                 primary={feature?.title}
                                 sx={{
                                    ".MuiTypography-root": {
                                       fontSize: "14px",
                                       fontWeight: 400
                                    }
                                 }}
                              />
                           </ListItem>
                        ))}
                     </List>
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
                     disabled={currentPlan === data?.id}
                     loading={formLoader && currentPlan !== data?.id}
                     fullWidth
                     color='primary'
                     variant='contained'
                     onClick={() => clickHandler("testing")}
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
                     loadingPosition='end'>
                     {currentPlan === data?.id ? "Current Plan" : formLoader ? "Pleas Wait..." : "Change Plan"}
                  </LoadingButton>
               )}
            </CardContent>
         </Card>
      </Box>
   )
}

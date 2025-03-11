import { Fragment } from "react"
import { Avatar, Box, Skeleton, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material"
import { ISingleResume } from "./types"
import CIcon from "../../components/common/icon"
import NextLink from "next/link"

type Props = {
   handleEdit: () => void
   data?: ISingleResume | null
   isLoading?: boolean
}

const PreviewHeader = ({ data, handleEdit, isLoading }: Props) => {
   const theme = useTheme()
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

   return (
      <Fragment>
         <Box
            sx={{
               width: "100%",
               p: 0
            }}>
            {/* top-portion  */}
            <Box
               sx={{
                  padding: { xs: 3, sm: 3 }
               }}>
               {/* User Details Portion */}
               <Box
                  sx={{
                     display: "flex",
                     gap: { xs: 3, sm: 4 }
                  }}>
                  {/* User Avatar */}
                  {isLoading ? (
                     <Skeleton
                        variant='circular'
                        sx={{
                           width: { xs: 60, sm: 100, md: 130 },
                           height: { xs: 60, sm: 100, md: 130 }
                        }}
                     />
                  ) : (
                     <Box
                        sx={{
                           position: "relative",
                           width: { xs: 60, sm: 100, md: 130 },
                           height: { xs: 80, sm: 100, md: 130 }
                        }}>
                        <Avatar
                           sx={{
                              width: { xs: 60, sm: 100, md: 130 },
                              height: { xs: 60, sm: 100, md: 130 },
                              color: theme.palette.text.primary,
                              fontWeight: 600,
                              fontSize: "30px"
                           }}
                           alt={"resume-avatar"}
                           src={data?.user?.avatar?.url ?? "https://avatar.iran.liara.run/public/13"}
                        />
                        <Box
                           component={NextLink}
                           href={"/dashboard/my-profile"}
                           sx={{
                              position: "absolute",
                              bottom: {
                                 xs: 0,
                                 sm: 3,
                                 md: 4
                              },
                              right: {
                                 xs: 0,
                                 sm: 3,
                                 md: 4
                              },
                              width: 30,
                              height: 30,
                              borderRadius: "50%",
                              backgroundColor: theme.palette.background.paper,
                              border: "1px solid",
                              borderColor: theme.palette.divider,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
                              cursor: "pointer"
                           }}>
                           <CIcon
                              icon='eva:edit-fill'
                              sx={{
                                 color: theme.palette.primary.main,
                                 fontSize: 20
                              }}
                              onClick={handleEdit}
                           />
                        </Box>
                     </Box>
                  )}

                  {/* basic-info */}
                  <Box sx={{ flexGrow: 1 }}>
                     {/* name */}
                     <Box
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           gap: 1
                        }}>
                        {isLoading ? (
                           <Skeleton
                              variant='text'
                              sx={{
                                 width: { xs: "100%", sm: 150, md: 200 },
                                 height: { xs: 30, sm: 35, md: 40 }
                              }}
                           />
                        ) : (
                           <Typography
                              variant='h6'
                              sx={{
                                 fontSize: { xs: "20px", md: "24px" },
                                 fontWeight: 600,
                                 color: (theme) => theme.palette.text.primary,
                                 alignItems: "center",
                                 lineHeight: "32px",
                                 gap: 1.5,
                                 display: "-webkit-box",
                                 WebkitBoxOrient: "vertical",
                                 overflow: "hidden",
                                 textOverflow: "ellipsis",
                                 WebkitLineClamp: 1
                              }}>
                              {data?.name}
                           </Typography>
                        )}
                        {/* {isLoading ? (
                           <Skeleton variant='circular' width={30} height={30} />
                        ) : (
                           <Tooltip title={"Offline"} placement='top'>
                              <CIcon
                                 icon='ri:verified-badge-fill'
                                 sx={{
                                    color: theme.palette.warning.light
                                 }}
                              />
                           </Tooltip>
                        )} */}
                     </Box>
                     {/* tagline */}
                     {isLoading ? (
                        <Skeleton
                           variant='text'
                           sx={{
                              width: { xs: "100%", sm: 200, md: 300 },
                              height: { xs: 20, sm: 30, md: 40 }
                           }}
                        />
                     ) : (
                        <Typography
                           variant='body1'
                           sx={{
                              color: (theme) => theme.palette.text.secondary
                           }}>
                           {data?.tagline}
                        </Typography>
                     )}
                     {/* status */}
                     {isLoading ? (
                        <Skeleton
                           variant='rounded'
                           width={110}
                           height={32}
                           sx={{
                              my: 1
                           }}
                        />
                     ) : (
                        <Box
                           sx={{
                              my: 1,
                              p: "5px 8px",
                              border: "1px solid ",
                              borderColor: (theme) => theme.palette.warning.light,
                              borderRadius: "20px",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 0.5
                           }}>
                           <CIcon
                              icon='mynaui:lightning'
                              sx={{
                                 fontSize: "16px",
                                 color: theme.palette.warning.light
                              }}
                           />
                           <Typography
                              variant='body2'
                              sx={{
                                 fontSize: "14px",
                                 fontWeight: 400,
                                 color: (theme) => theme.palette.warning.light
                              }}>
                              Unavailable
                           </Typography>
                        </Box>
                     )}

                     {/* Phone and Email */}
                     {isLoading ? (
                        <Skeleton variant='text' width={"100%"} height={32} />
                     ) : (
                        <Box
                           sx={{
                              display: "flex",
                              alignItems: { xs: "start", md: "center" },
                              flexDirection: { xs: "column", sm: "row" },
                              gap: 2
                           }}>
                           {/* phone  */}
                           {data?.user?.phone && (
                              <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 1.5 } }}>
                                 <Box
                                    sx={{
                                       bgcolor: (theme) => theme.palette.divider,
                                       border: "1px solid ",
                                       borderColor: (theme) => theme.palette.divider,
                                       color: (theme) => theme.palette.text.secondary,
                                       width: "32px",
                                       height: "32px",
                                       display: "flex",
                                       justifyContent: "center",
                                       alignItems: "center",
                                       borderRadius: "50px"
                                    }}>
                                    <CIcon
                                       sx={{
                                          fontSize: "18px"
                                       }}
                                       icon='solar:phone-outline'
                                    />
                                 </Box>
                                 <Typography
                                    variant='body2'
                                    sx={{
                                       fontSize: { xs: "14px", md: "18px" },
                                       color: (theme) => theme.palette.text.secondary
                                    }}>
                                    {data?.user?.phone ?? "N/A"}
                                 </Typography>
                              </Box>
                           )}
                           {/* email  */}
                           {data?.user?.email && (
                              <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 1.5 } }}>
                                 <Box
                                    sx={{
                                       bgcolor: (theme) => theme.palette.divider,
                                       border: "1px solid ",
                                       borderColor: (theme) => theme.palette.divider,
                                       color: (theme) => theme.palette.text.secondary,
                                       width: "32px",
                                       height: "32px",
                                       display: "flex",
                                       justifyContent: "center",
                                       alignItems: "center",
                                       borderRadius: "50px"
                                    }}>
                                    <CIcon
                                       sx={{
                                          fontSize: "18px"
                                       }}
                                       icon='ic:outline-email'
                                    />
                                 </Box>
                                 <Typography
                                    variant='body2'
                                    sx={{
                                       fontSize: { xs: "14px", md: "18px" },
                                       color: (theme) => theme.palette.text.secondary
                                    }}>
                                    {data?.user?.email ?? "N/A"}
                                 </Typography>
                              </Box>
                           )}
                        </Box>
                     )}
                  </Box>
               </Box>
            </Box>
         </Box>

         {/* Mobile Edit */}
         {isMobile && (
            <Box
               sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: theme.palette.background.paper,
                  border: "1px solid",
                  borderColor: theme.palette.divider,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
                  cursor: "pointer"
               }}>
               <CIcon
                  icon='eva:edit-fill'
                  sx={{
                     color: theme.palette.primary.main,
                     fontSize: 20
                  }}
                  onClick={handleEdit}
               />
            </Box>
         )}
      </Fragment>
   )
}

export default PreviewHeader

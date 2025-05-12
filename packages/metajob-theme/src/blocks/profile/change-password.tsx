"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { Paper, Stack, Typography, Box, Grid, TextField, InputAdornment, IconButton } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { createEntry } from "../../lib/strapi"
import CIcon from "../../components/common/icon"

export const ChangePassword = () => {
   const [loading, setLoading] = useState(false)
   const [showCurrentPass, setShowCurrentPass] = useState(false)
   const [showNewPass, setShowNewPass] = useState(false)
   const [showRePass, setShowRePass] = useState(false)

   const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors, isValid }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         currentPassword: "",
         password: "",
         passwordConfirmation: ""
      }
   })

   // form submit handler
   const handleUpdatePassword = async (formData: any) => {
      try {
         setLoading(true)

         const userInput = {
            password: formData?.currentPassword,
            passwordConfirmation: formData?.password
         }

         const userResponse = await createEntry("auth/change-password", formData, "/dashboard/my-profile/", "page")

         // Check if the response has any errors
         if (userResponse.error) {
            toast.error(userResponse?.error)
         } else {
            // Success case
            toast.success("Password updated successfully")
            reset()
         }
      } catch (error: any) {
         toast.error(error?.message || "Failed.")
      } finally {
         // Always stop loading
         setLoading(false)
      }
   }
   return (
      <Paper elevation={0} sx={{ borderRadius: 3 }} component={"form"} onSubmit={handleSubmit(handleUpdatePassword)}>
         <Stack spacing={3}>
            <Typography
               fontSize={{
                  xs: 18,
                  md: 24
               }}
               fontWeight={700}
               sx={{
                  color: (theme) => theme.palette.text.primary,
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  py: 2,
                  px: 4
               }}>
               Change Password
            </Typography>
            <Box
               sx={{
                  pt: 0,
                  pb: 3,
                  px: { xs: 2, md: 4 }
               }}>
               <Grid container spacing={4}>
                  {/* Old Password */}
                  <Grid item xs={12} md={12}>
                     <Box
                        component={"label"}
                        htmlFor='user-old-password'
                        sx={{
                           display: "inline-flex",
                           gap: 0.5,
                           fontSize: "0.875rem",
                           fontWeight: 500,
                           color: "text.primary",
                           mb: 1
                        }}>
                        Old Password
                        <Box
                           component={"span"}
                           sx={{
                              color: "error.main"
                           }}>
                           *
                        </Box>
                     </Box>
                     <TextField
                        id='user-old-password'
                        fullWidth
                        variant='outlined'
                        size='small'
                        type={showCurrentPass ? "text" : "password"}
                        placeholder='Enter your old password'
                        {...register("currentPassword", {
                           required: "Old password is required"
                        })}
                        error={Boolean(errors.currentPassword)}
                        sx={{
                           color: (theme) => theme.palette.text.primary,
                           "& .MuiOutlinedInput-root": {
                              px: 1
                           }
                        }}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment
                                 position={"end"}
                                 sx={{
                                    color: (theme) => theme.palette.text.secondary
                                 }}>
                                 {showCurrentPass ? (
                                    <IconButton
                                       sx={{
                                          p: 0,
                                          m: 0
                                       }}
                                       onClick={() => {
                                          setShowCurrentPass(false)
                                       }}>
                                       <CIcon
                                          icon='ri:eye-close-line'
                                          sx={{
                                             color: (theme) => theme.palette.text.secondary
                                          }}
                                       />
                                    </IconButton>
                                 ) : (
                                    <IconButton
                                       sx={{
                                          color: (theme) => theme.palette.text.secondary,
                                          p: 0,
                                          m: 0
                                       }}
                                       onClick={() => {
                                          setShowCurrentPass(true)
                                       }}>
                                       <CIcon
                                          icon='ph:eye-light'
                                          sx={{
                                             color: (theme) => theme.palette.text.secondary
                                          }}
                                       />
                                    </IconButton>
                                 )}
                              </InputAdornment>
                           )
                        }}
                     />
                  </Grid>
                  {/* New Password */}
                  <Grid item xs={12} md={6}>
                     <Box
                        component={"label"}
                        htmlFor='user-new-password'
                        sx={{
                           display: "inline-flex",
                           gap: 0.5,
                           fontSize: "0.875rem",
                           fontWeight: 500,
                           color: "text.primary",
                           mb: 1
                        }}>
                        New Password
                        <Box
                           component={"span"}
                           sx={{
                              color: "error.main"
                           }}>
                           *
                        </Box>
                     </Box>
                     <TextField
                        id='user-new-password'
                        fullWidth
                        variant='outlined'
                        size='small'
                        type={showNewPass ? "text" : "password"}
                        placeholder='Enter your new password'
                        {...register("password", {
                           required: "New password is required"
                        })}
                        error={Boolean(errors.password)}
                        sx={{
                           color: (theme) => theme.palette.text.primary,
                           "& .MuiOutlinedInput-root": {
                              px: 1
                           }
                        }}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment
                                 position={"end"}
                                 sx={{
                                    color: (theme) => theme.palette.text.secondary
                                 }}>
                                 {showNewPass ? (
                                    <IconButton
                                       sx={{
                                          p: 0,
                                          m: 0
                                       }}
                                       onClick={() => {
                                          setShowNewPass(false)
                                       }}>
                                       <CIcon
                                          icon='ri:eye-close-line'
                                          sx={{
                                             color: (theme) => theme.palette.text.secondary
                                          }}
                                       />
                                    </IconButton>
                                 ) : (
                                    <IconButton
                                       sx={{
                                          color: (theme) => theme.palette.text.secondary,
                                          p: 0,
                                          m: 0
                                       }}
                                       onClick={() => {
                                          setShowNewPass(true)
                                       }}>
                                       <CIcon
                                          icon='ph:eye-light'
                                          sx={{
                                             color: (theme) => theme.palette.text.secondary
                                          }}
                                       />
                                    </IconButton>
                                 )}
                              </InputAdornment>
                           )
                        }}
                     />
                     <Typography
                        fontSize={14}
                        fontWeight={400}
                        pt={1}
                        sx={{
                           color: (theme) => theme.palette.text.disabled
                        }}>
                        6 characters or longer. Combine letters and numbers.
                     </Typography>
                  </Grid>
                  {/* Confirm Password */}
                  <Grid item xs={12} md={6}>
                     <Box
                        component={"label"}
                        htmlFor='user-confirm-password'
                        sx={{
                           display: "inline-flex",
                           gap: 0.5,
                           fontSize: "0.875rem",
                           fontWeight: 500,
                           color: "text.primary",
                           mb: 1
                        }}>
                        Confirm Password
                        <Box
                           component={"span"}
                           sx={{
                              color: "error.main"
                           }}>
                           *
                        </Box>
                     </Box>
                     <TextField
                        id='user-confirm-password'
                        fullWidth
                        variant='outlined'
                        size='small'
                        type={showRePass ? "text" : "password"}
                        placeholder='Enter your new password'
                        {...register("passwordConfirmation", {
                           required: "Re-Type New password is required",
                           validate: (val: string) => {
                              if (watch("password") != val) {
                                 return "Make sure to type the same password as above"
                              }
                           }
                        })}
                        helperText={errors.passwordConfirmation?.message}
                        error={Boolean(errors.passwordConfirmation)}
                        sx={{
                           color: (theme) => theme.palette.text.primary,
                           "& .MuiOutlinedInput-root": {
                              px: 1
                           }
                        }}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment
                                 position={"end"}
                                 sx={{
                                    color: (theme) => theme.palette.text.secondary
                                 }}>
                                 {showRePass ? (
                                    <IconButton
                                       sx={{
                                          p: 0,
                                          m: 0
                                       }}
                                       onClick={() => {
                                          setShowRePass(false)
                                       }}>
                                       <CIcon
                                          icon='ri:eye-close-line'
                                          sx={{
                                             color: (theme) => theme.palette.text.secondary
                                          }}
                                       />
                                    </IconButton>
                                 ) : (
                                    <IconButton
                                       sx={{
                                          color: (theme) => theme.palette.text.secondary,
                                          p: 0,
                                          m: 0
                                       }}
                                       onClick={() => {
                                          setShowRePass(true)
                                       }}>
                                       <CIcon
                                          icon='ph:eye-light'
                                          sx={{
                                             color: (theme) => theme.palette.text.secondary
                                          }}
                                       />
                                    </IconButton>
                                 )}
                              </InputAdornment>
                           )
                        }}
                     />
                  </Grid>
               </Grid>
               <Box sx={{ pt: 4 }}>
                  <LoadingButton loading={loading} type='submit' variant='contained' color='primary'>
                     Save Changes
                  </LoadingButton>
               </Box>
            </Box>
         </Stack>
      </Paper>
   )
}

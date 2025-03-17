"use client"
import React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import LoadingButton from "@mui/lab/LoadingButton"
import { Box, Button, Divider, Grid, IconButton, Paper, TextField, Typography } from "@mui/material"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import CIcon from "../common/icon"

type Props = {
   loginHandler?: (data: { username: string; password: string }) => void
   googleLoginHandler?: () => void
   facebookLoginHandler?: () => void
   linkedinLoginHandler?: () => void
   loading?: boolean
   block: {
      title?: string
      email_placeholder?: string
      password_placeholder?: string
      required_placeholder?: string
      button_placeholder?: string
      or_placeholder?: string
      signup_link_placeholder?: string
      provider_option?: boolean
      signup_helper_placeholder?: string
   } | null
}

export const LoginCard = ({
   loginHandler,
   loading,
   googleLoginHandler,
   facebookLoginHandler,
   linkedinLoginHandler,
   block
}: Props) => {
   // destructured login block data
   const {
      title: loginTitle,
      email_placeholder,
      password_placeholder,
      required_placeholder,
      button_placeholder,
      or_placeholder,
      provider_option,
      signup_helper_placeholder,
      signup_link_placeholder
   } = block || {}

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         username: "",
         password: ""
      }
   })

   //    submit handler
   const onSubmit = async (data: { username: string; password: string }) => {
      if (loginHandler) {
         loginHandler(data)
      }
   }

   //    provider present validator
   // const noProvider = !googleLoginHandler && !facebookLoginHandler && !linkedinLoginHandler

   return (
      <Grid container direction='column' justifyContent='flex-end' sx={{ minHeight: "85vh" }}>
         <Grid item xs={12}>
            <Grid container justifyContent='center' alignItems='center' sx={{ minHeight: "calc(100vh - 68px)" }}>
               <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                  <Grid container spacing={2} alignItems='center' justifyContent='center'>
                     <Grid item xs={12}>
                        <Paper
                           sx={{
                              borderRadius: "16px",
                              maxWidth: "400px",
                              width: "100%",
                              p: 4,
                              mx: "auto", // 'auto' is not working, so I used 'center'
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              boxShadow: "0px 6px 24px 0px rgba(6, 129, 121, 0.08)"
                           }}>
                           <Grid container direction='column' justifyContent='center' spacing={2}>
                              {/* main form  area */}
                              <Grid item xs={12} container alignItems='center' justifyContent='center'>
                                 <Box sx={{ mb: 2 }}>
                                    <Typography
                                       fontSize={24}
                                       fontWeight={400}
                                       color={(theme) => theme.palette.text.primary}>
                                       {loginTitle || "Sign in with Email address"}
                                    </Typography>
                                 </Box>

                                 <Box
                                    component='form'
                                    sx={{
                                       display: "flex",
                                       flexDirection: "column",
                                       gap: 2,
                                       width: "100%",
                                       "& .MuiTextField-root": { width: "100%" }
                                    }}
                                    noValidate
                                    autoComplete='off'
                                    onSubmit={handleSubmit(onSubmit)}>
                                    <TextField
                                       hiddenLabel
                                       id='username'
                                       defaultValue=''
                                       placeholder={email_placeholder || "Username or Email"}
                                       variant='outlined'
                                       size='medium'
                                       fullWidth
                                       {...register("username", {
                                          required: required_placeholder || "This field is required"
                                       })}
                                       helperText={errors.username?.message}
                                       error={!!errors.username}
                                    />
                                    <TextField
                                       hiddenLabel
                                       id='password'
                                       placeholder={password_placeholder || "Password"}
                                       defaultValue=''
                                       variant='outlined'
                                       size='medium'
                                       type='password'
                                       fullWidth
                                       {...register("password", {
                                          required: required_placeholder || "This field is required"
                                       })}
                                       helperText={errors.password?.message}
                                       error={!!errors.password}
                                    />
                                    <LoadingButton
                                       type='submit'
                                       variant='contained'
                                       loading={loading ? loading : false}
                                       loadingPosition='start'
                                       size='large'
                                       fullWidth
                                       sx={{ mt: 2 }}>
                                       {button_placeholder || "Sign in"}
                                    </LoadingButton>
                                 </Box>
                              </Grid>
                              {/* providers title  */}
                              {provider_option && (
                                 <Grid item xs={12}>
                                    <Box
                                       sx={{
                                          alignItems: "center",
                                          display: "flex"
                                       }}>
                                       <Divider
                                          sx={{
                                             flexGrow: 1,
                                             borderColor: (theme) => hexToRGBA(theme.palette.text.disabled, 0.4)
                                          }}
                                          orientation='horizontal'
                                       />

                                       <Button
                                          variant='outlined'
                                          sx={{
                                             cursor: "unset",
                                             m: 2,
                                             py: 0.5,
                                             px: 7,
                                             fontWeight: 500,
                                             borderRadius: "10px",
                                             // disable color
                                             "&.Mui-disabled": {
                                                borderColor: (theme) =>
                                                   hexToRGBA(theme.palette.text.disabled, 0.4) + "!important",
                                                color: (theme) =>
                                                   hexToRGBA(theme.palette.text.disabled, 0.4) + "!important"
                                             }
                                          }}
                                          disableRipple
                                          disabled>
                                          {or_placeholder || "OR"}
                                       </Button>

                                       <Divider
                                          sx={{
                                             flexGrow: 1,
                                             borderColor: (theme) => hexToRGBA(theme.palette.text.disabled, 0.4)
                                          }}
                                          orientation='horizontal'
                                       />
                                    </Box>
                                 </Grid>
                              )}
                              {/* login providers  */}
                              {provider_option && (
                                 <Box
                                    sx={{
                                       display: "flex",
                                       justifyContent: "center",
                                       alignItems: "center",
                                       gap: 2,
                                       marginTop: "15px !important"
                                    }}>
                                    {/* google login  */}
                                    {googleLoginHandler && (
                                       <IconButton
                                          size='large'
                                          color='secondary'
                                          sx={{
                                             p: 1,
                                             borderRadius: 2,
                                             border: "1px solid",
                                             // google color
                                             borderColor: "#DB4437"
                                          }}
                                          onClick={() => {
                                             if (googleLoginHandler) {
                                                googleLoginHandler()
                                             }
                                          }}>
                                          <CIcon icon='flat-color-icons:google' />
                                       </IconButton>
                                    )}
                                    {/* facebook login*/}
                                    {facebookLoginHandler && (
                                       <IconButton
                                          size='large'
                                          color='secondary'
                                          sx={{
                                             p: 1,
                                             borderRadius: 2,
                                             border: "1px solid",
                                             // facebook color
                                             borderColor: "#3B5998"
                                          }}
                                          onClick={() => {
                                             if (facebookLoginHandler) {
                                                facebookLoginHandler()
                                             }
                                          }}>
                                          <CIcon icon='logos:facebook' />
                                       </IconButton>
                                    )}
                                    {/* linkedIn login */}
                                    {linkedinLoginHandler && (
                                       <IconButton
                                          size='large'
                                          color='secondary'
                                          sx={{
                                             p: 1,
                                             borderRadius: 2,
                                             border: "1px solid",
                                             // linkedin color
                                             borderColor: "#0077B5"
                                          }}
                                          onClick={() => {
                                             if (linkedinLoginHandler) {
                                                linkedinLoginHandler()
                                             }
                                          }}>
                                          <CIcon
                                             icon='entypo-social:linkedin-with-circle'
                                             sx={{
                                                // linkedin color
                                                color: "#0077B5"
                                             }}
                                          />
                                       </IconButton>
                                    )}
                                 </Box>
                              )}
                              <Typography
                                 variant='body2'
                                 color={(theme) => theme.palette.text.secondary}
                                 fontSize={14}
                                 fontWeight={400}
                                 sx={{
                                    mt: 2,
                                    textAlign: "center"
                                 }}>
                                 {signup_helper_placeholder || "Not a Member ?"}{" "}
                                 <Typography
                                    component={Link}
                                    href='/register'
                                    color={(theme) => theme.palette.primary.main}
                                    fontSize={14}
                                    fontWeight={400}
                                    sx={{
                                       textDecoration: "none",
                                       cursor: "pointer"
                                    }}>
                                    {signup_link_placeholder || "Create Account"}
                                 </Typography>
                              </Typography>
                           </Grid>
                        </Paper>
                     </Grid>
                  </Grid>
               </Grid>
            </Grid>
         </Grid>
      </Grid>
   )
}

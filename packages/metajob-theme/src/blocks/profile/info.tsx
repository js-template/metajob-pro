"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Paper, Stack, Typography, Box, Grid, Avatar, Button, TextField, useTheme, Skeleton } from "@mui/material"
import styled from "@emotion/styled"
import { LoadingButton } from "@mui/lab"
import { updateOne, uploadImage } from "../../lib/strapi"
import CIcon from "../../components/common/icon"
import previewImage from "../../utils/previewImage"
import { useSession } from "next-auth/react"

const VisuallyHiddenInput = styled("input")({
   clip: "rect(0 0 0 0)",
   clipPath: "inset(50%)",
   height: 1,
   overflow: "hidden",
   position: "absolute",
   bottom: 0,
   left: 0,
   whiteSpace: "nowrap",
   width: 1
})

type Props = {
   userData?: {
      documentId: string
      first_name: string
      last_name: string
      email: string
      phone: string
      avatar?: {
         url: string
      }
   }
}

export const ProfileInfo = ({ userData: data }: Props) => {
   const theme = useTheme()

   const { data: session } = useSession()
   const { user } = session || {}
   const { id: userId } = user || {}

   const [isEditMode, setIsEditMode] = useState(false)
   const [loading, setLoading] = useState(false)
   const [selectedImage, setSelectedImage] = useState<(any | MediaSource | Blob) | null>(null)
   const [avatarUrl, setAvatarUrl] = useState(data?.avatar?.url || "")

   const {
      register,
      handleSubmit,
      setValue,
      reset,
      watch,
      formState: { errors, isDirty }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         first_name: data?.first_name || "",
         last_name: data?.last_name || "",
         email: data?.email || "",
         phone: data?.phone || ""
      }
   })

   // Load data when fetched
   useEffect(() => {
      if (data) {
         setValue("first_name", data.first_name || "")
         setValue("last_name", data.last_name || "")
         setValue("email", data.email || "")
         setValue("phone", data.phone || "")
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data])

   // form submit handler
   const handleUpdateUser = async (formData: any) => {
      try {
         setLoading(true)
         if (!formData.email) {
            setLoading(false)
            return toast.error("Email field can not be empty")
         }

         // *** user image upload ***
         let avatarId: {
            id: number
         } | null = null
         if (selectedImage) {
            const formData = new FormData()
            formData.append("files", selectedImage)
            const { data: uploadData, error: uploadError } = await uploadImage(formData)

            if (uploadData?.length > 0) {
               avatarId = uploadData[0]
            } else {
               return toast.error("Image Upload Failed")
            }
         }
         const userInput = {
            ...(avatarId && { avatar: avatarId?.id }),
            ...formData
         }

         const userResponse = await updateOne("users", Number(userId), userInput)
         // Check if the response has any errors
         if (userResponse.error) {
            toast.error(userResponse?.error)
         } else {
            if (avatarId) {
               setAvatarUrl(URL.createObjectURL(selectedImage))
            }
            // Success case
            toast.success("User updated successfully")
            setIsEditMode(false)
         }
      } catch (error: any) {
         toast.error(error?.message || "Failed.")
      } finally {
         // Always stop loading
         setLoading(false)
      }
   }

   const handleToggleEdit = () => {
      setIsEditMode(!isEditMode)
   }

   return (
      <Paper component={"form"} onSubmit={handleSubmit(handleUpdateUser)} elevation={0} sx={{ borderRadius: 3 }}>
         <Stack spacing={4} pb={2}>
            <Typography
               fontSize={{ xs: 18, md: 24 }}
               fontWeight={700}
               sx={{
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                  py: 2,
                  px: 4,
                  color: (theme) => theme.palette.text.primary
               }}>
               My Profile
            </Typography>
            {/* preview-mode  */}
            {!isEditMode ? (
               <Paper elevation={0} sx={{ borderRadius: 3 }}>
                  <Box
                     sx={{
                        width: "100%",
                        p: 0
                     }}>
                     {/* top-portion  */}
                     <Box
                        sx={{
                           p: { xs: 2, md: 3 }
                        }}>
                        {/* User Details Portion */}
                        <Box
                           sx={{
                              display: "flex",
                              width: {
                                 xs: "100%",
                                 sm: "auto"
                              },
                              alignItems: "center",
                              gap: { xs: 3, sm: 4 }
                           }}>
                           {/* User Avatar */}
                           <Avatar
                              variant='rounded'
                              sx={{
                                 width: { xs: 80, sm: 100, md: 130 },
                                 height: { xs: 80, sm: 100, md: 130 },
                                 color: theme.palette.text.primary,
                                 fontWeight: 600,
                                 fontSize: "30px"
                              }}
                              alt={"user-avatar"}
                              src={avatarUrl}
                           />
                           {/* basic-info */}
                           <Box>
                              {/* name */}
                              <Typography
                                 variant='h6'
                                 sx={{
                                    fontSize: { xs: "24px", md: "24px" },
                                    fontWeight: 500,
                                    color: (theme) => theme.palette.text.primary,
                                    lineHeight: "32px"
                                 }}>
                                 {watch("first_name")} {watch("last_name")}
                              </Typography>
                              {/* Phone and Email */}
                              <Box
                                 sx={{
                                    display: "flex",
                                    alignItems: { xs: "start", md: "center" },
                                    flexDirection: { xs: "column", sm: "row" },
                                    gap: 2,
                                    mt: 2
                                 }}>
                                 {/* phone  */}
                                 {watch("phone") && (
                                    <Box
                                       sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1
                                       }}>
                                       <Box
                                          sx={{
                                             bgcolor: (theme) => theme.palette.background.default,
                                             color: (theme) => theme.palette.primary.main,
                                             border: "1px solid ",
                                             borderColor: (theme) => theme.palette.divider,
                                             width: "32px",
                                             height: "32px",
                                             display: "flex",
                                             justifyContent: "center",
                                             alignItems: "center",
                                             borderRadius: "50px"
                                          }}>
                                          <CIcon icon={"solar:phone-outline"} size={16} color='primary.main' />
                                       </Box>
                                       <Typography
                                          sx={{
                                             fontSize: { xs: "14px", md: "18px" },
                                             fontWeight: 500,
                                             color: (theme) => theme.palette.text.secondary
                                          }}>
                                          {watch("phone")}
                                       </Typography>
                                    </Box>
                                 )}
                                 {/* email  */}
                                 <Box
                                    sx={{
                                       display: "flex",
                                       alignItems: "center",
                                       gap: 1
                                    }}>
                                    <Box
                                       sx={{
                                          bgcolor: (theme) => theme.palette.background.default,
                                          color: (theme) => theme.palette.primary.main,
                                          border: "1px solid ",
                                          borderColor: (theme) => theme.palette.divider,
                                          width: "32px",
                                          height: "32px",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          borderRadius: "50px"
                                       }}>
                                       <CIcon icon={"ic:outline-email"} size={16} color='primary.main' />
                                    </Box>
                                    <Typography
                                       sx={{
                                          fontSize: { xs: "14px", md: "18px" },
                                          fontWeight: 500,
                                          color: (theme) => theme.palette.text.secondary
                                       }}>
                                       {watch("email")}
                                    </Typography>
                                 </Box>
                              </Box>
                           </Box>
                        </Box>
                     </Box>
                  </Box>
               </Paper>
            ) : (
               //edit-mode
               <Stack spacing={4} px={{ xs: 2, md: 4 }}>
                  <Box>
                     <Grid container spacing={4}>
                        {/* avatar  */}
                        <Grid item xs={12} md={3}>
                           <Stack>
                              <Box
                                 component='label'
                                 sx={{
                                    p: "4px",
                                    borderRadius: "50%",
                                    borderWidth: 1,
                                    borderStyle: "solid",
                                    borderColor: (theme) => theme.palette.divider,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "fit-content",
                                    position: "relative",
                                    cursor: "pointer"
                                 }}>
                                 <Avatar
                                    src={selectedImage ? URL.createObjectURL(selectedImage) : data?.avatar?.url}
                                    alt={"user-avatar"}
                                    sx={{ width: 200, height: 200 }}
                                 />
                                 <Box
                                    // component='label'
                                    sx={{
                                       position: "absolute",
                                       right: 0,
                                       bottom: 20,
                                       p: 1,
                                       borderRadius: "50%",
                                       bgcolor: (theme) => hexToRGBA(theme.palette.divider, 0.9)
                                    }}>
                                    <CIcon icon='mdi:camera' />
                                    <VisuallyHiddenInput
                                       accept='image/*'
                                       id='icon-button-file'
                                       type='file'
                                       onChange={(e) => previewImage(e, setSelectedImage)}
                                    />
                                 </Box>
                              </Box>
                           </Stack>
                        </Grid>

                        <Grid item xs={12} md={9}>
                           <Grid container spacing={4}>
                              {/* first-name */}
                              <Grid item xs={12} md={6}>
                                 <Box
                                    component={"label"}
                                    htmlFor='user-first-name'
                                    sx={{
                                       display: "block",
                                       fontSize: "0.875rem",
                                       fontWeight: 500,
                                       color: "text.primary",
                                       mb: 1
                                    }}>
                                    First Name
                                    <Box
                                       component={"span"}
                                       sx={{
                                          color: "error.main",
                                          ml: 0.5
                                       }}>
                                       *
                                    </Box>
                                 </Box>
                                 <TextField
                                    id='user-first-name'
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    type='text'
                                    placeholder='Enter your First name'
                                    {...register("first_name", {
                                       required: "First Name is required"
                                    })}
                                    error={Boolean(errors.first_name)}
                                 />
                              </Grid>
                              {/* last-name */}
                              <Grid item xs={12} md={6}>
                                 <Box
                                    component={"label"}
                                    htmlFor='user-last-name'
                                    sx={{
                                       display: "block",
                                       fontSize: "0.875rem",
                                       fontWeight: 500,
                                       color: "text.primary",
                                       mb: 1
                                    }}>
                                    Last Name
                                    <Box
                                       component={"span"}
                                       sx={{
                                          color: "error.main",
                                          ml: 0.5
                                       }}>
                                       *
                                    </Box>
                                 </Box>
                                 <TextField
                                    id='user-last-name'
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    type='text'
                                    placeholder='Enter your last name'
                                    {...register("last_name", {
                                       required: "Last Name is required"
                                    })}
                                    error={Boolean(errors.last_name)}
                                 />
                              </Grid>
                              {/* email */}
                              <Grid item xs={12} md={6}>
                                 <Box
                                    component={"label"}
                                    htmlFor='user-email'
                                    sx={{
                                       display: "block",
                                       fontSize: "0.875rem",
                                       fontWeight: 500,
                                       color: "text.primary",
                                       mb: 1
                                    }}>
                                    Email
                                    <Box
                                       component={"span"}
                                       sx={{
                                          color: "error.main",
                                          ml: 0.5
                                       }}>
                                       *
                                    </Box>
                                 </Box>
                                 <TextField
                                    id='user-email'
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    type='email'
                                    placeholder='Enter your email'
                                    {...register("email", {
                                       required: "Email is required"
                                    })}
                                    error={Boolean(errors.email)}
                                 />
                              </Grid>
                              {/* phone */}
                              <Grid item xs={12} md={6}>
                                 <Box
                                    component={"label"}
                                    htmlFor='user-phone'
                                    sx={{
                                       display: "block",
                                       fontSize: "0.875rem",
                                       fontWeight: 500,
                                       color: "text.primary",
                                       mb: 1
                                    }}>
                                    Phone Number
                                 </Box>
                                 <TextField
                                    id='user-phone'
                                    fullWidth
                                    variant='outlined'
                                    size='small'
                                    type='text'
                                    placeholder='Enter your phone number'
                                    {...register("phone")}
                                    error={Boolean(errors.phone)}
                                 />
                              </Grid>
                           </Grid>
                        </Grid>
                     </Grid>
                  </Box>
               </Stack>
            )}
            {/* buttons  */}
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  px: { xs: 2, md: 4 }
               }}>
               {!isEditMode ? (
                  <Button onClick={handleToggleEdit} variant='contained'>
                     Edit
                  </Button>
               ) : (
                  <LoadingButton
                     // disabled={!isDirty}
                     loading={loading}
                     type='submit'
                     variant='contained'
                     color='primary'>
                     Save Changes
                  </LoadingButton>
               )}

               {isEditMode && (
                  <Button
                     onClick={handleToggleEdit}
                     variant='contained'
                     color='inherit'
                     sx={{
                        color: (theme) => hexToRGBA(theme.palette.text.primary, 0.7)
                     }}>
                     Cancel
                  </Button>
               )}
            </Box>
         </Stack>
      </Paper>
   )
}

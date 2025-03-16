"use client"
import React from "react"
import toast from "react-hot-toast"
import _ from "lodash"
import { Controller, useForm } from "react-hook-form"
import { createEntry, find, updateOne, uploadImage } from "../../lib/strapi"
import {
   Avatar,
   Box,
   CircularProgress,
   FormControl,
   Grid,
   IconButton,
   MenuItem,
   Paper,
   Select,
   TextField,
   Typography,
   useTheme
} from "@mui/material"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import CIcon from "../../components/common/icon"
import { ICompanyAttribute, IJobCategory } from "./types"
import MDEditor from "@uiw/react-md-editor"
import { LoadingButton } from "@mui/lab"

type addCompanyProps = {
   handleClose: () => void
   userId?: number
   handleMute: () => void
   companyAttributes?: ICompanyAttribute
   language?: string
}

const AddCompany = ({ handleClose, userId, handleMute, companyAttributes, language }: addCompanyProps) => {
   const theme = useTheme()

   // attributes data destructuring
   const { categoryData, companySizesData, revenuesData, avgSalaryData } = companyAttributes || {}

   const [loading, setLoading] = React.useState(false)

   const {
      control,
      handleSubmit,
      register,
      formState: { errors },
      reset,
      setValue,
      setFocus,
      watch,
      setError: setFieldError
   } = useForm({
      defaultValues: {
         name: "",
         tagline: "",
         email: "",
         phone: "",
         slug: "",
         website: "",
         industry: "",
         company_size: "",
         revenue: "",
         avg_salary: "",
         about: "",
         facebook_url: "",
         linkedin_url: "",
         twitter_url: "",
         instagram_url: "",
         logo: null
      }
   })

   // *** handle form submit
   const handleFromSubmit = async (data: { [key: string]: any }) => {
      try {
         setLoading(true)
         // ?? check if slug is already exist
         const { data: slugData } = await find(
            "api/metajob-backend/companies",
            {
               fields: ["slug"],
               filters: {
                  slug: data.slug
               },
               locale: language ?? ["en"]
            },
            "no-store"
         )
         if (slugData?.data?.length > 0) {
            setLoading(false)
            toast.error("Slug already exist")
            return false
         }

         // ?? social links array
         const socialLinks = [
            data.facebook_url && {
               type: "facebook",
               link: data.facebook_url
            },
            data.twitter_url && {
               type: "twitter",
               link: data.twitter_url
            },
            data.linkedin_url && {
               type: "linkedin",
               link: data.linkedin_url
            },
            data.instagram_url && {
               type: "linkedin",
               link: data.instagram_url
            }
         ]
         // ?? remove empty values from socialLinks
         const filteredSocialLinks = socialLinks.filter((link) => link)

         const createInput = {
            data: {
               name: data.name,
               slug: data.slug,
               tagline: data.tagline,
               email: data.email,
               phone: data.phone,
               website: data.website,
               about: data.about,
               social_links: filteredSocialLinks,
               owner: [
                  {
                     id: Number(userId) || undefined
                  }
               ],
               industry: {
                  connect: [data?.industry]
               },
               company_size: {
                  connect: [data?.company_size]
               },
               avg_salary: {
                  connect: [data?.avg_salary]
               },
               //check if revenue is exist then connect
               ...(data?.revenue && {
                  revenue: { connect: [data?.revenue] }
               })
            }
         }

         // ?? create company function
         const {
            data: companyData,
            error: companyError,
            message
         } = await createEntry(`metajob-backend/companies?locale=${language ?? "en"}`, createInput)

         if (companyError) {
            return toast.error(message || "Something went wrong")
         } else {
            // ?? if company created successfully and data?.logo is exist then upload logo
            if (companyData && data?.logo) {
               const formData = new FormData()
               formData.append("files", data.logo[0])
               const { data: uploadData, error: uploadError } = await uploadImage(formData)
               if (uploadError) {
                  handleMute()
                  handleClose()
                  return toast.error("Failed to upload image")
               }

               // ?? update company with logo
               const { data: updatedCompanyData, error: updateError } = await updateOne(
                  "metajob-backend/companies",
                  companyData?.documentId,
                  {
                     data: {
                        logo: uploadData[0].id
                     }
                  },
                  language
               )

               if (updateError) {
                  toast.error("Image uploaded successfully but failed to update company", {
                     icon: "⚠️"
                  })
                  return toast.error(updateError, {
                     icon: "❌"
                  })
               }
               handleMute()
               toast.success("Company created successfully")
               handleClose()
            } else {
               handleMute()
               toast.success("Company created successfully")
               handleClose()
            }
         }
      } catch (error: any) {
         toast.error(error?.message || "An unexpected error occurred. Please try again.")
      } finally {
         setLoading(false)
      }
   }

   return (
      <Box
         sx={{
            position: "relative"
         }}>
         {/* Full form loader */}
         {loading && (
            <Box
               sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backdropFilter: "blur(5px)",
                  zIndex: 9999,
                  backgroundColor: (theme) => hexToRGBA(theme.palette.background.default, 0.2)
               }}>
               <CircularProgress />
            </Box>
         )}

         {/* Form Header */}
         <Box
            sx={{
               px: 3,
               py: 2.5,
               borderBottom: "1px solid",
               borderColor: "divider",
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               gap: 3
            }}>
            <Typography
               variant='body1'
               fontWeight={700}
               fontSize={{
                  xs: "1.25rem",
                  sm: "1.5rem"
               }}
               lineHeight={"24px"}>
               Company Details
            </Typography>
         </Box>
         <Box sx={{ width: "100%", pt: 3, pb: 4, px: 2 }}>
            {/* Cancel icon */}
            <Box
               sx={{
                  position: "absolute",
                  top: 0,
                  right: 0
               }}>
               <IconButton
                  color='error'
                  onClick={() => {
                     handleClose()
                  }}>
                  <CIcon
                     icon='cil-x'
                     sx={{
                        color: (theme) => theme.palette.error.main
                     }}
                  />
               </IconButton>
            </Box>
            {/* Form area  */}
            <Box component={"form"} onSubmit={handleSubmit(handleFromSubmit)}>
               <Grid container spacing={3} rowSpacing={2.5} px={3} pb={1} sx={{ display: "flex" }}>
                  {/* Name  */}
                  <Grid
                     item
                     xs={12}
                     md={6}
                     sx={{
                        "& .MuiFormControl-root": {
                           width: "100%"
                        }
                     }}>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                           gap: 1
                        }}>
                        <Typography
                           variant='body1'
                           sx={{
                              color: (theme) => theme.palette.text.primary,
                              fontSize: 16
                           }}
                           pb={0.5}>
                           Company Name
                           <Typography component='span' color='error'>
                              *
                           </Typography>
                        </Typography>
                     </Box>
                     <TextField
                        sx={{
                           "& .MuiFormHelperText-root": {
                              color: (theme) => theme.palette.error.main,
                              textTransform: "capitalize",
                              mx: 0.5
                           },
                           "& input": {
                              py: "10px"
                           }
                        }}
                        type='text'
                        size='small'
                        placeholder='Company Name'
                        {...register("name", {
                           required: "Company Name is required"
                        })}
                        error={Boolean(errors.name)}
                     />
                  </Grid>
                  {/* Tagline */}
                  <Grid
                     item
                     xs={12}
                     md={6}
                     sx={{
                        "& .MuiFormControl-root": {
                           width: "100%"
                        }
                     }}>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                           gap: 1
                        }}>
                        <Typography
                           variant='body1'
                           sx={{
                              color: (theme) => theme.palette.text.primary,
                              fontSize: 16,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5
                           }}
                           pb={0.5}>
                           Company Tagline
                           <Typography
                              component='span'
                              sx={{
                                 fontSize: 14,
                                 color: (theme) => theme.palette.text.secondary
                              }}>
                              (optional)
                           </Typography>
                        </Typography>
                     </Box>
                     <TextField
                        sx={{
                           "& .MuiFormHelperText-root": {
                              color: (theme) => theme.palette.error.main,
                              textTransform: "capitalize",
                              mx: 0.5
                           },
                           "& input": {
                              py: "10px"
                           }
                        }}
                        type='text'
                        size='small'
                        placeholder='Company Tagline'
                        {...register("tagline")}
                        error={Boolean(errors.tagline)}
                     />
                  </Grid>
                  {/* Email */}
                  <Grid
                     item
                     xs={12}
                     md={6}
                     sx={{
                        "& .MuiFormControl-root": {
                           width: "100%"
                        }
                     }}>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                           gap: 1
                        }}>
                        <Typography
                           variant='body1'
                           sx={{
                              color: (theme) => theme.palette.text.primary,
                              fontSize: 16,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5
                           }}
                           pb={0.5}>
                           Company Email
                           <Typography
                              component='span'
                              sx={{
                                 fontSize: 14,
                                 color: (theme) => theme.palette.text.secondary
                              }}>
                              (optional)
                           </Typography>
                        </Typography>
                     </Box>
                     <TextField
                        sx={{
                           "& .MuiFormHelperText-root": {
                              color: (theme) => theme.palette.error.main,
                              textTransform: "capitalize",
                              mx: 0.5
                           },
                           "& input": {
                              py: "10px"
                           }
                        }}
                        type='email'
                        size='small'
                        placeholder='Company Email'
                        {...register("email")}
                        error={Boolean(errors.email)}
                     />
                  </Grid>
                  {/* Phone */}
                  <Grid
                     item
                     xs={12}
                     md={6}
                     sx={{
                        "& .MuiFormControl-root": {
                           width: "100%"
                        }
                     }}>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                           gap: 1
                        }}>
                        <Typography
                           variant='body1'
                           sx={{
                              color: (theme) => theme.palette.text.primary,
                              fontSize: 16,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5
                           }}
                           pb={0.5}>
                           Company Phone
                           <Typography
                              component='span'
                              sx={{
                                 fontSize: 14,
                                 color: (theme) => theme.palette.text.secondary
                              }}>
                              (optional)
                           </Typography>
                        </Typography>
                     </Box>
                     <TextField
                        sx={{
                           "& .MuiFormHelperText-root": {
                              color: (theme) => theme.palette.error.main,
                              textTransform: "capitalize",
                              mx: 0.5
                           },
                           "& input": {
                              py: "10px"
                           }
                        }}
                        type='text'
                        size='small'
                        placeholder='Company Phone'
                        {...register("phone")}
                        error={Boolean(errors.phone)}
                     />
                  </Grid>
                  {/* Slug */}
                  <Grid
                     item
                     xs={12}
                     md={6}
                     sx={{
                        "& .MuiFormControl-root": {
                           width: "100%"
                        }
                     }}>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                           gap: 1
                        }}>
                        <Typography
                           variant='body1'
                           sx={{
                              color: (theme) => theme.palette.text.primary,
                              fontSize: 16,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5
                           }}
                           pb={0.5}>
                           Company Slug
                           <Typography component='span' color='error'>
                              *
                           </Typography>
                        </Typography>
                     </Box>
                     <TextField
                        sx={{
                           "& .MuiFormHelperText-root": {
                              color: (theme) => theme.palette.error.main,
                              textTransform: "capitalize",
                              mx: 0.5
                           },
                           "& input": {
                              py: "10px"
                           }
                        }}
                        type='text'
                        size='small'
                        placeholder='Company Slug'
                        {...register("slug", {
                           required: "Company Slug is required"
                        })}
                        error={Boolean(errors.slug)}
                     />
                  </Grid>
                  {/* Logo */}
                  <Grid
                     item
                     xs={12}
                     md={6}
                     sx={{
                        "& .MuiFormControl-root": {
                           width: "100%"
                        }
                     }}>
                     <Controller
                        name='logo'
                        control={control}
                        // rules={rules}
                        render={({ field, fieldState: { error } }) => (
                           <FormControl fullWidth={true}>
                              <Box
                                 sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: 1
                                 }}>
                                 <Typography
                                    variant='body1'
                                    sx={{
                                       color: (theme) => theme.palette.text.primary,
                                       fontSize: 16,
                                       display: "flex",
                                       alignItems: "center",
                                       gap: 0.5
                                    }}
                                    pb={0.5}>
                                    Company Logo
                                    <Typography
                                       component='span'
                                       sx={{
                                          fontSize: 14,
                                          color: (theme) => theme.palette.text.secondary
                                       }}>
                                       (optional)
                                    </Typography>
                                 </Typography>
                              </Box>
                              <TextField
                                 {...field}
                                 sx={{
                                    "& .MuiFormHelperText-root": {
                                       color: (theme) => theme.palette.error.main,
                                       textTransform: "capitalize",
                                       mx: 0.5
                                    },
                                    "& input": {
                                       py: "10px"
                                    }
                                    // ...textFieldSx
                                 }}
                                 type={"file"}
                                 value={undefined}
                                 onChange={(e: any) => {
                                    field.onChange(e.target.files)
                                 }}
                                 error={!!error}
                                 helperText={error ? "Helper Text" : ""}
                                 // {...textFieldProps}
                                 size={"small"}
                                 inputProps={
                                    {
                                       // accept: accept?.join(","),
                                       // multiple: multiple,
                                       // ...inputProps
                                    }
                                 }
                              />

                              {/* files preview */}
                              {field.value && (
                                 <Box
                                    sx={{
                                       display: "flex",
                                       flexWrap: "wrap",
                                       gap: 1.5,
                                       mt: 1.5
                                    }}>
                                    {_.map(field.value, (file: any, index: number) => {
                                       return (
                                          <Paper
                                             key={index}
                                             sx={{
                                                position: "relative",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                border: "1px solid",
                                                borderColor: (theme) => theme.palette.divider,
                                                borderRadius: 1,
                                                boxShadow: 2.5
                                             }}>
                                             {/* Show Avatar or icon base on the type */}
                                             {file?.type === "image/png" ||
                                             file?.type === "image/jpeg" ||
                                             file?.type === "image/jpg" ||
                                             file?.type === "image/gif" ||
                                             file?.type === "image/svg+xml" ||
                                             file?.type === "image/webp" ? (
                                                <Avatar
                                                   variant='rounded'
                                                   sx={{
                                                      width: {
                                                         xs: 40,
                                                         sm: 50,
                                                         md: 60,
                                                         lg: 70,
                                                         xl: 80
                                                      },
                                                      height: {
                                                         xs: 40,
                                                         sm: 50,
                                                         md: 60,
                                                         lg: 70,
                                                         xl: 80
                                                      }
                                                   }}
                                                   src={URL.createObjectURL(file)}
                                                />
                                             ) : (
                                                <CIcon
                                                   icon='tabler:file-text'
                                                   size={40}
                                                   sx={{
                                                      width: {
                                                         xs: 40,
                                                         sm: 50,
                                                         md: 60,
                                                         lg: 70,
                                                         xl: 80
                                                      },
                                                      height: {
                                                         xs: 40,
                                                         sm: 50,
                                                         md: 60,
                                                         lg: 70,
                                                         xl: 80
                                                      }
                                                   }}
                                                />
                                             )}
                                             <IconButton
                                                sx={{
                                                   position: "absolute",
                                                   top: -15,
                                                   right: -15
                                                }}
                                                color='error'
                                                onClick={() => {
                                                   field.onChange(() => {
                                                      const files = _.filter(
                                                         field.value,
                                                         (_: any, i: number) => i !== index
                                                      )

                                                      return files.length ? files : undefined
                                                   })
                                                }}>
                                                <CIcon icon='tabler:x' color={"error"} size={20} />
                                             </IconButton>
                                          </Paper>
                                       )
                                    })}
                                 </Box>
                              )}
                           </FormControl>
                        )}
                     />
                     {/* <TextField
                        sx={{
                           "& .MuiFormHelperText-root": {
                              color: (theme) => theme.palette.error.main,
                              textTransform: "capitalize",
                              mx: 0.5
                           },
                           "& input": {
                              py: "10px"
                           }
                        }}
                        type='text'
                        size='small'
                        placeholder='Company Logo'
                        {...register("logo")}
                        error={Boolean(errors.logo)}
                     /> */}
                  </Grid>
                  {/* Industry */}
                  <Grid item xs={12} sm={6}>
                     <Box
                        component={"label"}
                        htmlFor='resume-resume-category'
                        sx={{
                           display: "block",
                           fontSize: "0.875rem",
                           fontWeight: 500,
                           color: "text.primary",
                           mb: 1
                        }}>
                        Industry
                        <Box
                           component={"span"}
                           sx={{
                              color: "error.main",
                              ml: 0.5
                           }}>
                           *
                        </Box>
                     </Box>
                     <Select
                        displayEmpty
                        fullWidth
                        variant='outlined'
                        id='company-industry'
                        size='small'
                        {...register("industry", {
                           required: "Company Industry is required"
                        })}
                        defaultValue={watch("industry") || ""}
                        error={Boolean(errors.industry)}>
                        <MenuItem disabled value=''>
                           Select Industry
                        </MenuItem>
                        {categoryData &&
                           categoryData?.map((categoryItem: IJobCategory, index: number) => {
                              return (
                                 <MenuItem key={index} value={categoryItem?.documentId}>
                                    {categoryItem?.title}
                                 </MenuItem>
                              )
                           })}
                     </Select>
                  </Grid>
                  {/* Company Sizes */}
                  <Grid item xs={12} sm={6}>
                     <Box
                        component={"label"}
                        htmlFor='company-size'
                        sx={{
                           display: "block",
                           fontSize: "0.875rem",
                           fontWeight: 500,
                           color: "text.primary",
                           mb: 1
                        }}>
                        Company Size
                        <Box
                           component={"span"}
                           sx={{
                              color: "error.main",
                              ml: 0.5
                           }}>
                           *
                        </Box>
                     </Box>
                     <Select
                        displayEmpty
                        fullWidth
                        variant='outlined'
                        id='company-size'
                        size='small'
                        {...register("company_size", {
                           required: "Company Size is required"
                        })}
                        defaultValue={watch("company_size") || ""}
                        error={Boolean(errors.company_size)}>
                        <MenuItem disabled value=''>
                           Select Company Size
                        </MenuItem>
                        {companySizesData &&
                           companySizesData?.map((sizeItem: IJobCategory, index: number) => {
                              return (
                                 <MenuItem key={index} value={sizeItem?.documentId}>
                                    {sizeItem?.title}
                                 </MenuItem>
                              )
                           })}
                     </Select>
                  </Grid>
                  {/* Revenues */}
                  <Grid item xs={12} sm={6}>
                     <Box
                        component={"label"}
                        htmlFor='revenues'
                        sx={{
                           display: "block",
                           fontSize: "0.875rem",
                           fontWeight: 500,
                           color: "text.primary",
                           mb: 1
                        }}>
                        Company Revenue
                        <Typography
                           component='span'
                           sx={{
                              fontSize: 14,
                              color: (theme) => theme.palette.text.secondary,
                              ml: 0.5
                           }}>
                           (optional)
                        </Typography>
                     </Box>
                     <Select
                        displayEmpty
                        fullWidth
                        variant='outlined'
                        id='revenues'
                        size='small'
                        {...register("revenue")}
                        defaultValue={watch("revenue") || ""}
                        error={Boolean(errors.revenue)}>
                        <MenuItem disabled value=''>
                           Select Company Revenue
                        </MenuItem>
                        {revenuesData &&
                           revenuesData?.map((revenueItem: IJobCategory, index: number) => {
                              return (
                                 <MenuItem key={index} value={revenueItem?.documentId}>
                                    {revenueItem?.title}
                                 </MenuItem>
                              )
                           })}
                     </Select>
                  </Grid>
                  {/* Salary Amount */}
                  <Grid item xs={12} sm={6}>
                     <Box
                        component={"label"}
                        htmlFor='resume-salary'
                        sx={{
                           display: "block",
                           fontSize: "0.875rem",
                           fontWeight: 500,
                           color: "text.primary",
                           mb: 1
                        }}>
                        Average Salary
                        <Box
                           component={"span"}
                           sx={{
                              color: "error.main",
                              ml: 0.5
                           }}>
                           *
                        </Box>
                     </Box>
                     <Select
                        fullWidth
                        variant='outlined'
                        id='resume-salary'
                        displayEmpty
                        size='small'
                        {...register("avg_salary", {
                           required: "Salary is required"
                        })}
                        error={Boolean(errors.avg_salary)}
                        defaultValue={watch("avg_salary") || ""}
                        value={watch("avg_salary") || ""}>
                        <MenuItem disabled value=''>
                           Select Average Salary
                        </MenuItem>
                        {avgSalaryData &&
                           avgSalaryData?.length > 0 &&
                           avgSalaryData?.map((expItem: IJobCategory, index: number) => (
                              <MenuItem key={index} value={expItem?.documentId}>
                                 {expItem?.title}
                              </MenuItem>
                           ))}
                     </Select>
                  </Grid>
                  {/* Website */}
                  <Grid
                     item
                     xs={12}
                     md={6}
                     sx={{
                        "& .MuiFormControl-root": {
                           width: "100%"
                        }
                     }}>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                           gap: 1
                        }}>
                        <Typography
                           variant='body1'
                           sx={{
                              color: (theme) => theme.palette.text.primary,
                              fontSize: 16,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5
                           }}
                           pb={0.5}>
                           Website
                           <Typography
                              component='span'
                              sx={{
                                 fontSize: 14,
                                 color: (theme) => theme.palette.text.secondary
                              }}>
                              (optional)
                           </Typography>
                        </Typography>
                     </Box>
                     <TextField
                        sx={{
                           "& .MuiFormHelperText-root": {
                              color: (theme) => theme.palette.error.main,
                              textTransform: "capitalize",
                              mx: 0.5
                           },
                           "& input": {
                              py: "10px"
                           }
                        }}
                        type='text'
                        size='small'
                        placeholder='Company Website'
                        {...register("website")}
                        error={Boolean(errors.website)}
                     />
                  </Grid>
                  {/* Facebook Url */}
                  <Grid
                     item
                     xs={12}
                     md={6}
                     sx={{
                        "& .MuiFormControl-root": {
                           width: "100%"
                        }
                     }}>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                           gap: 1
                        }}>
                        <Typography
                           variant='body1'
                           sx={{
                              color: (theme) => theme.palette.text.primary,
                              fontSize: 16,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5
                           }}
                           pb={0.5}>
                           Facebook URL
                           <Typography
                              component='span'
                              sx={{
                                 fontSize: 14,
                                 color: (theme) => theme.palette.text.secondary
                              }}>
                              (optional)
                           </Typography>
                        </Typography>
                     </Box>
                     <TextField
                        sx={{
                           "& .MuiFormHelperText-root": {
                              color: (theme) => theme.palette.error.main,
                              textTransform: "capitalize",
                              mx: 0.5
                           },
                           "& input": {
                              py: "10px"
                           }
                        }}
                        type='text'
                        size='small'
                        placeholder='https://facebook.com/yourprofile'
                        {...register("facebook_url")}
                        error={Boolean(errors.facebook_url)}
                     />
                  </Grid>
                  {/* Twitter URL */}
                  <Grid
                     item
                     xs={12}
                     md={6}
                     sx={{
                        "& .MuiFormControl-root": {
                           width: "100%"
                        }
                     }}>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                           gap: 1
                        }}>
                        <Typography
                           variant='body1'
                           sx={{
                              color: (theme) => theme.palette.text.primary,
                              fontSize: 16,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5
                           }}
                           pb={0.5}>
                           Twitter URL
                           <Typography
                              component='span'
                              sx={{
                                 fontSize: 14,
                                 color: (theme) => theme.palette.text.secondary
                              }}>
                              (optional)
                           </Typography>
                        </Typography>
                     </Box>
                     <TextField
                        sx={{
                           "& .MuiFormHelperText-root": {
                              color: (theme) => theme.palette.error.main,
                              textTransform: "capitalize",
                              mx: 0.5
                           },
                           "& input": {
                              py: "10px"
                           }
                        }}
                        type='text'
                        size='small'
                        placeholder='https://twitter.com/yourprofile'
                        {...register("twitter_url")}
                        error={Boolean(errors.twitter_url)}
                     />
                  </Grid>
                  {/* Linkedin  Url */}
                  <Grid
                     item
                     xs={12}
                     md={6}
                     sx={{
                        "& .MuiFormControl-root": {
                           width: "100%"
                        }
                     }}>
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                           gap: 1
                        }}>
                        <Typography
                           variant='body1'
                           sx={{
                              color: (theme) => theme.palette.text.primary,
                              fontSize: 16,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5
                           }}
                           pb={0.5}>
                           Linkedin URL
                           <Typography
                              component='span'
                              sx={{
                                 fontSize: 14,
                                 color: (theme) => theme.palette.text.secondary
                              }}>
                              (optional)
                           </Typography>
                        </Typography>
                     </Box>
                     <TextField
                        sx={{
                           "& .MuiFormHelperText-root": {
                              color: (theme) => theme.palette.error.main,
                              textTransform: "capitalize",
                              mx: 0.5
                           },
                           "& input": {
                              py: "10px"
                           }
                        }}
                        type='text'
                        size='small'
                        placeholder='https://linkedin.com/yourprofile'
                        {...register("linkedin_url")}
                        error={Boolean(errors.linkedin_url)}
                     />
                  </Grid>
                  {/* Company Description */}
                  <Grid item xs={12}>
                     <Box
                        component={"label"}
                        htmlFor='resume-cover-letter'
                        sx={{
                           display: "block",
                           fontSize: "0.875rem",
                           fontWeight: 500,
                           color: "text.primary",
                           mb: 1
                        }}>
                        Company Description
                     </Box>
                     <MDEditor
                        // value={aboutText}
                        value={watch("about") || ""}
                        onChange={(value) => {
                           const inputValue = value || ""
                           setValue("about", inputValue)
                        }}
                        preview='edit'
                        data-color-mode={theme.palette.mode}
                     />
                  </Grid>
               </Grid>
               <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <LoadingButton variant='contained' color='primary' loading={loading} type='submit'>
                     Submit Company
                  </LoadingButton>
               </Box>
            </Box>
         </Box>
      </Box>
   )
}

export default AddCompany

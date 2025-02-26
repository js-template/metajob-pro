"use client"
import * as React from "react"
import _ from "lodash"
import useSWR, { KeyedMutator } from "swr"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
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
import Dialog from "@mui/material/Dialog"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import { findOne, updateOne, uploadImage } from "../../lib/strapi"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import CIcon from "../../components/common/icon"
import MDEditor from "@uiw/react-md-editor"
import { LoadingButton } from "@mui/lab"
import { fetcher, getSocialLik } from "./hook"
import { ICompanyFillData, IJobCategory } from "./types"

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement<any, any>
   },
   ref: React.Ref<unknown>
) {
   return <Slide direction='up' ref={ref} {...props} />
})

type EditCompanyProps = {
   open: boolean
   handleClose: () => void
   companyDocID: string
   mutate: KeyedMutator<any>
}

export default function EditCompany({ open, handleClose, companyDocID, mutate }: EditCompanyProps) {
   const theme = useTheme()
   const [loading, setLoading] = React.useState(false)
   const [isLogoRemove, setIsLogoRemove] = React.useState(false)
   const [companyData, setCompanyData] = React.useState<ICompanyFillData | null>(null)

   const {
      control,
      handleSubmit,
      register,
      formState: { errors },
      setValue,
      watch
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
         twitter_url: "",
         linkedin_url: "",
         instagram_url: "",
         logo: null
      }
   })

   // *** handle form submit
   const handleFromSubmit = async (data: { [key: string]: any }) => {
      try {
         if (!companyData) return false

         setLoading(true)
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

         const updateInput = {
            data: {
               name: data.name,
               tagline: data.tagline,
               email: data.email,
               phone: data.phone,
               website: data.website,
               about: data.about,
               social_links: filteredSocialLinks,
               industry: {
                  connect: [data?.industry]
               },
               company_size: {
                  connect: [data?.company_size]
               },
               avg_salary: {
                  connect: [data?.avg_salary]
               },
               ...(isLogoRemove &&
                  !data?.logo && {
                     logo: null
                  }),
               //check if revenue is exist then connect
               ...(data?.revenue && {
                  revenue: { connect: [data?.revenue] }
               })
            }
         }

         // ?? update company function
         const {
            data: updateCompany,
            error,
            message
         } = await updateOne("metajob-backend/companies", companyData?.documentId, updateInput)

         if (error) {
            toast.error(message || "Something went wrong")
            return false
         }

         // ?? if company created successfully and data?.logo is exist then upload logo
         if (updateCompany && data?.logo) {
            const formData = new FormData()
            formData.append("files", data.logo[0])
            const { data: uploadLogoData, error: uploadLogoError } = await uploadImage(formData)

            if (uploadLogoError) {
               mutate()
               handleClose()
               return toast.error("Failed to upload image")
            }

            // ?? update company with logo
            const { data: updatedCompanyData, error: updateError } = await updateOne(
               "metajob-backend/companies",
               companyData.id,
               {
                  data: {
                     logo: uploadLogoData[0].id
                  }
               }
            )

            if (updateError) {
               setLoading(false)
               toast.error("Image uploaded successfully but failed to update company", {
                  icon: "⚠️"
               })
               return toast.error(updateError, {
                  icon: "❌"
               })
            }

            mutate()
            toast.success("Company Updated Successfully")
            handleClose()
         } else {
            mutate()
            toast.success("Company Updated Successfully")
            handleClose()
         }
      } catch (error: any) {
         toast.error(error?.message || "An unexpected error occurred. Please try again.")
      } finally {
         setLoading(false)
      }
   }

   // fill form data from db
   React.useEffect(() => {
      if (companyData) {
         setValue("name", companyData?.name || "")
         setValue("tagline", companyData?.tagline || "")
         setValue("about", companyData?.about || "")
         setValue("email", companyData?.email || "")
         setValue("phone", companyData?.phone || "")
         setValue("slug", companyData?.slug || "")
         setValue("website", companyData?.website || "")
         setValue("industry", companyData?.industry?.documentId || "")
         setValue("company_size", companyData?.company_size?.documentId || "")
         setValue("revenue", companyData?.revenue?.documentId || "")
         setValue("avg_salary", companyData?.avg_salary?.documentId || "")
         setValue("facebook_url", getSocialLik("facebook", companyData?.social_links)?.link || "")
         setValue("linkedin_url", getSocialLik("linkedin", companyData?.social_links)?.link || "")
         setValue("twitter_url", getSocialLik("twitter", companyData?.social_links)?.link || "")
         setValue("instagram_url", getSocialLik("instagram", companyData?.social_links)?.link || "")
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [companyData])

   // *** get the company data by the companyDocID
   React.useEffect(() => {
      const getCompany = async () => {
         setLoading(true)
         const { data, error } = await findOne(
            "api/metajob-backend/companies",
            companyDocID,
            {
               populate: "*"
            },
            "no-store"
         )

         if (error) {
            handleClose()
            setLoading(false)
            return toast.error(error ?? "Failed to fetch company data")
         }

         let filteredData = _.get(data, "data", {})
         const logo = _.get(filteredData, "logo", {})

         setCompanyData({
            id: data?.data.id,
            ...filteredData,
            logo: logo?.url
         })
         setLoading(false)
      }
      if (open) {
         if (!companyDocID) return
         getCompany()
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [open])

   // fetch job-category data
   const categoryQueryParams = {
      fields: ["title"]
   }
   const categoryQueryString = encodeURIComponent(JSON.stringify(categoryQueryParams))
   const categoryAPiUrl = `/api/find?model=api/metajob-backend/job-categories&query=${categoryQueryString}`
   const { data: categoryData, isLoading: categoryIsLoading } = useSWR(categoryAPiUrl, fetcher, {
      fallbackData: []
   })

   // fetch company-size data
   const companySizesQueryParams = {
      fields: ["title"]
   }
   const companySizesQueryString = encodeURIComponent(JSON.stringify(companySizesQueryParams))
   const companySizesAPiUrl = `/api/find?model=api/metajob-backend/company-sizes&query=${companySizesQueryString}`
   const { data: companySizesData, isLoading: companySizesIsLoading } = useSWR(companySizesAPiUrl, fetcher, {
      fallbackData: []
   })

   // fetch revenues data
   const revenuesQueryParams = {
      fields: ["title"]
   }
   const revenuesQueryString = encodeURIComponent(JSON.stringify(revenuesQueryParams))
   const revenuesAPiUrl = `/api/find?model=api/metajob-backend/revenues&query=${revenuesQueryString}`
   const { data: revenuesData, isLoading: revenuesIsLoading } = useSWR(revenuesAPiUrl, fetcher, {
      fallbackData: []
   })

   // fetch avg-salary data
   const avgSalaryString = encodeURIComponent(JSON.stringify({}))
   const avgSalaryAPiUrl = `/api/find?model=api/metajob-backend/avg-salaries&query=${avgSalaryString}`
   const { data: avgSalaryData, isLoading: avgSalaryIsLoading } = useSWR(avgSalaryAPiUrl, fetcher, {
      fallbackData: []
   })

   return (
      <Dialog
         open={open}
         TransitionComponent={Transition}
         keepMounted
         aria-describedby='edit-company'
         sx={{
            "& .MuiDialog-paper": {
               backgroundColor: (theme) => theme.palette.background.default,
               maxWidth: "1440px",
               width: "100%"
            }
         }}>
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
                           error={Boolean(errors.name)}
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
                                 {/* data logo preview */}
                                 {companyData?.logo && !isLogoRemove && !field.value && (
                                    <Box
                                       sx={{
                                          display: "flex",
                                          flexWrap: "wrap",
                                          gap: 1.5,
                                          mt: 1.5
                                       }}>
                                       <Paper
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
                                             src={companyData?.logo}
                                          />
                                          <IconButton
                                             sx={{
                                                position: "absolute",
                                                top: -15,
                                                right: -15
                                             }}
                                             color='error'
                                             onClick={() => {
                                                setIsLogoRemove(true)
                                             }}>
                                             <CIcon icon='tabler:x' color={"error"} size={20} />
                                          </IconButton>
                                       </Paper>
                                    </Box>
                                 )}
                              </FormControl>
                           )}
                        />
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
                           placeholder='Select Category'
                           {...register("industry", {
                              required: "Company Industry is required"
                           })}
                           defaultValue={watch("industry") || ""}
                           value={watch("industry") || ""}
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
                           placeholder='Select Company Size'
                           {...register("company_size", {
                              required: "Company Size is required"
                           })}
                           defaultValue={watch("company_size") || ""}
                           value={watch("company_size") || ""}
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
                           placeholder='Select Revenue'
                           {...register("revenue")}
                           defaultValue={watch("revenue") || ""}
                           value={watch("revenue") || ""}
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
                           placeholder='Average Salary'
                           {...register("avg_salary", {
                              required: "Salary is required"
                           })}
                           error={Boolean(errors.avg_salary)}
                           defaultValue={watch("avg_salary") || ""}
                           value={watch("avg_salary") || ""}>
                           <MenuItem disabled value=''>
                              Select Average Salary
                           </MenuItem>
                           {avgSalaryData?.length > 0 &&
                              avgSalaryData?.map(
                                 (expItem: { documentId: string; title: string; value: string }, index: number) => (
                                    <MenuItem key={index} value={expItem?.documentId}>
                                       {expItem?.title}
                                    </MenuItem>
                                 )
                              )}
                        </Select>
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
      </Dialog>
   )
}

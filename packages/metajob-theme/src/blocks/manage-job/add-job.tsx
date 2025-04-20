"use client"
import React, { useEffect, useState } from "react"
import _ from "lodash"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import MDEditor from "@uiw/react-md-editor"
import {
   Box,
   Checkbox,
   CircularProgress,
   Grid,
   IconButton,
   ListItemText,
   MenuItem,
   Select,
   TextField,
   Typography,
   useTheme
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { IJobAttribute, IJobCategory } from "./types"
import { createEntry, find } from "../../lib/strapi"
import CIcon from "../../components/common/icon"
import { formatDate, getSlugFromTitle } from "./hook"

type addListProps = {
   handleClose: () => void
   language?: string
   userId?: number
   handleMute: () => void
   jobAttributes?: IJobAttribute
   jobCount?: {
      total: number
      featured: number
   }
}

const AddJob = ({ handleClose, userId, handleMute, jobAttributes, jobCount, language }: addListProps) => {
   const theme = useTheme()
   //  destructure job Attributes data
   const { companyData, categoryData, skillsData, jobTypesData, jobExperienceData, userPackage } = jobAttributes || {}
   const create_ads_limit = userPackage?.[0]?.user_plan?.create_ads_limit || 0

   // get the current date and next month date
   const today = new Date()
   const nextMonth = new Date()
   nextMonth.setMonth(today.getMonth() + 1)

   const [isSlugEdited, setIsSlugEdited] = useState(false)
   const [loading, setLoading] = React.useState(false)
   const {
      handleSubmit,
      register,
      formState: { errors },
      setValue,
      watch
   } = useForm({
      defaultValues: {
         title: "",
         slug: "",
         description: "",
         vacancy: 1,
         startDate: formatDate(today),
         endDate: formatDate(nextMonth),
         price: 0,
         type: "",
         skills: [] as string[],
         experience: "",
         category: "",
         company: ""
      }
   })

   const isCompanySelected = watch("company")
   // auto-update-slug
   const title = watch("title")

   useEffect(() => {
      if (title && !isSlugEdited) {
         const generatedSlug = getSlugFromTitle(title)
         setValue("slug", generatedSlug)
      }
   }, [title, isSlugEdited, setValue])

   // *** handle form submit
   const handleFromSubmit = async (data: { [key: string]: any }) => {
      try {
         if (!userPackage?.[0]?.user_plan) {
            return toast.error("Please get a User package.")
         }
         if (jobCount?.total && jobCount?.total >= create_ads_limit) {
            return toast.error("Limit filled, please update package.")
         }

         setLoading(true)
         // ?? check if slug is already exist
         const { data: slugData } = await find(
            "api/metajob-backend/jobs",
            {
               fields: ["slug"],
               filters: {
                  slug: data.slug
               },
               locale: language ?? "en"
            },
            "no-store"
         )
         if (slugData?.data?.length > 0) {
            return toast.error("Slug already exist, please change the slug")
         }

         const createInput = {
            data: {
               title: data.title,
               slug: data.slug,
               description: data.description,
               startDate: data.startDate,
               endDate: data.endDate,
               price: data.price,
               vacancy: data.vacancy,
               job_status: "open",
               owner: [
                  {
                     id: Number(userId) || undefined
                  }
               ],
               category: {
                  connect: [data?.category]
               },
               company: {
                  connect: [data?.company]
               },
               //check if skills is exist then connect
               ...(data?.skills && {
                  skills: { connect: [data?.skills] }
               }),
               //check if experience is exist then connect
               ...(data?.experience && {
                  experience: { connect: [data?.experience] }
               }),
               //check if job-type is exist then connect
               ...(data?.type && {
                  type: { connect: [data?.type] }
               })
            }
         }
         // *** create new list entry
         const {
            data: newJob,
            error,
            message
         } = await createEntry(`metajob-backend/jobs?locale=${language ?? "en"}`, createInput)

         if (error) {
            return toast.error(message || "Failed to create list")
         } else {
            handleMute()
            toast.success("Successfully created!")
            handleClose()
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
            position: "relative",
            bgcolor: "background.default"
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

         <Box component={"form"} onSubmit={handleSubmit(handleFromSubmit)}>
            {/* Company Selection */}
            <Box
               sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "12px",
                  bgcolor: "background.paper",
                  mb: 2
               }}>
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
                     Select Company
                  </Typography>
               </Box>
               <Box sx={{ width: "100%", pt: 3, mb: 4, px: 2 }}>
                  <Grid container spacing={3} rowSpacing={2.5} px={3} pb={1} sx={{ display: "flex" }}>
                     {/* Company */}
                     <Grid item xs={12} sm={12}>
                        <Box
                           component={"label"}
                           htmlFor='company'
                           sx={{
                              display: "block",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              color: "text.primary",
                              mb: 1
                           }}>
                           Add Company
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
                           id='company'
                           size='small'
                           {...register("company", {
                              required: "Job Company is required"
                           })}
                           value={watch("company") || ""}
                           error={Boolean(errors.company)}>
                           <MenuItem disabled value=''>
                              Select Company
                           </MenuItem>
                           {companyData &&
                              companyData?.map((companyItem: { name: string; documentId: string }, index: number) => {
                                 return (
                                    <MenuItem key={index} value={companyItem?.documentId}>
                                       {companyItem?.name}
                                    </MenuItem>
                                 )
                              })}
                        </Select>
                     </Grid>
                  </Grid>
               </Box>
            </Box>

            {/* Job Form */}
            <Box
               sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "12px",
                  bgcolor: "background.paper"
               }}>
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
                     Job Details
                  </Typography>
               </Box>
               <Box sx={{ width: "100%", pt: 3, pb: 4, px: 2 }}>
                  {/* Form area  */}
                  <Grid container spacing={3} rowSpacing={2.5} px={3} pb={1} sx={{ display: "flex" }}>
                     {/* Title  */}
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
                              Job Title
                              <Typography component='span' color='error'>
                                 *
                              </Typography>
                           </Typography>
                        </Box>
                        <TextField
                           inputProps={{ readOnly: !isCompanySelected }}
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
                           placeholder='Job Title'
                           {...register("title", {
                              required: "Job Title is required"
                           })}
                           error={Boolean(errors.title)}
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
                              Job Slug
                              <Typography component='span' color='error'>
                                 *
                              </Typography>
                           </Typography>
                        </Box>
                        <TextField
                           inputProps={{ readOnly: !isCompanySelected }}
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
                           placeholder='Job Slug'
                           {...register("slug", {
                              required: "Job Slug is required",
                              onChange: () => setIsSlugEdited(true) // Set the flag to true when the slug is edited
                           })}
                           error={Boolean(errors.slug)}
                        />
                     </Grid>
                     {/* Start Date */}
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
                              Start Date
                              <Typography component='span' color='error'>
                                 *
                              </Typography>
                           </Typography>
                        </Box>
                        <TextField
                           inputProps={{ readOnly: !isCompanySelected }}
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
                           type='date'
                           size='small'
                           placeholder='Start Date'
                           {...register("startDate", {
                              required: "Start Date is required"
                           })}
                           error={Boolean(errors.startDate)}
                        />
                     </Grid>
                     {/* End Date */}
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
                              End Date
                              <Typography component='span' color='error'>
                                 *
                              </Typography>
                           </Typography>
                        </Box>
                        <TextField
                           inputProps={{ readOnly: !isCompanySelected }}
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
                           type='date'
                           size='small'
                           placeholder='End Date'
                           {...register("endDate", {
                              required: "End Date is required"
                           })}
                           error={Boolean(errors.endDate)}
                        />
                     </Grid>
                     {/* Price */}
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
                              Price
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
                           inputProps={{ readOnly: !isCompanySelected }}
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
                           type='number'
                           size='small'
                           placeholder='Price'
                           {...register("price", {
                              valueAsNumber: true,
                              min: 0, // Ensures values cannot be negative
                              validate: (value) => value >= 0 || "Value must be 0 or greater"
                           })}
                           error={Boolean(errors.price)}
                           helperText={errors.price ? "Value must be 0 or greater" : ""}
                        />
                     </Grid>
                     {/* Vacancy */}
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
                              Vacancy
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
                           inputProps={{ readOnly: !isCompanySelected }}
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
                           type='number'
                           size='small'
                           placeholder='Vacancy'
                           {...register("vacancy", {
                              valueAsNumber: true,
                              min: 1, // Ensures values cannot be negative
                              validate: (value) => value >= 0 || "Value must be 1 or greater"
                           })}
                           error={Boolean(errors.vacancy)}
                           helperText={errors.vacancy ? "Value must be 1 or greater" : ""}
                        />
                     </Grid>
                     {/* Category */}
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
                           Category
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
                           inputProps={{ readOnly: !isCompanySelected }}
                           displayEmpty
                           fullWidth
                           variant='outlined'
                           id='company-industry'
                           size='small'
                           {...register("category", {
                              required: "Job Category is required"
                           })}
                           value={watch("category") || ""}
                           error={Boolean(errors.category)}>
                           <MenuItem disabled value=''>
                              Select Category
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
                     {/* Job Type  */}
                     <Grid item xs={12} sm={6}>
                        <Box
                           component={"label"}
                           htmlFor='type'
                           sx={{
                              display: "block",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              color: "text.primary",
                              mb: 1
                           }}>
                           Job Type
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
                           inputProps={{ readOnly: !isCompanySelected }}
                           displayEmpty
                           fullWidth
                           variant='outlined'
                           id='revenues'
                           size='small'
                           {...register("type")}
                           value={watch("type") || ""}
                           error={Boolean(errors.type)}>
                           <MenuItem disabled value=''>
                              Select Job Type
                           </MenuItem>
                           {jobTypesData &&
                              jobTypesData?.map((revenueItem: IJobCategory, index: number) => {
                                 return (
                                    <MenuItem key={index} value={revenueItem?.documentId}>
                                       {revenueItem?.title}
                                    </MenuItem>
                                 )
                              })}
                        </Select>
                     </Grid>
                     {/* Skill */}
                     <Grid item xs={12} sm={6}>
                        <Box
                           component={"label"}
                           htmlFor='skills'
                           sx={{
                              display: "block",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              color: "text.primary",
                              mb: 1
                           }}>
                           Job Skill
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
                           multiple
                           inputProps={{ readOnly: !isCompanySelected }}
                           displayEmpty
                           fullWidth
                           variant='outlined'
                           id='skills'
                           size='small'
                           {...register("skills")}
                           value={watch("skills") || []}
                           error={Boolean(errors.skills)}
                           renderValue={(selected) => {
                              if ((selected as string[]).length === 0) {
                                 return "Select Job Skills"
                              }
                              const selectedTitles = skillsData
                                 ? skillsData
                                      ?.filter((skill) => (selected as string[]).includes(skill.documentId))
                                      ?.map((skill) => skill.title)
                                 : []
                              return selectedTitles.join(", ")
                           }}>
                           <MenuItem disabled value=''>
                              Select Job Skill
                           </MenuItem>
                           {skillsData &&
                              skillsData?.map((skill: IJobCategory, index: number) => (
                                 <MenuItem key={index} value={skill?.documentId}>
                                    <Checkbox checked={(watch("skills") || [])?.includes(skill?.documentId)} />
                                    <ListItemText primary={skill.title} />
                                 </MenuItem>
                              ))}
                        </Select>
                     </Grid>
                     {/* Experience */}
                     <Grid item xs={12} sm={6}>
                        <Box
                           component={"label"}
                           htmlFor='experience'
                           sx={{
                              display: "block",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              color: "text.primary",
                              mb: 1
                           }}>
                           Job Experience
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
                           inputProps={{ readOnly: !isCompanySelected }}
                           displayEmpty
                           fullWidth
                           variant='outlined'
                           id='experience'
                           size='small'
                           {...register("experience")}
                           value={watch("experience") || ""}
                           error={Boolean(errors.experience)}>
                           <MenuItem disabled value=''>
                              Select Job Experience
                           </MenuItem>
                           {jobExperienceData &&
                              jobExperienceData?.map((expItem: IJobCategory, index: number) => {
                                 return (
                                    <MenuItem key={index} value={expItem?.documentId}>
                                       {expItem?.title}
                                    </MenuItem>
                                 )
                              })}
                        </Select>
                     </Grid>

                     {/* Description */}
                     <Grid item xs={12}>
                        <Box
                           component={"label"}
                           htmlFor='description'
                           sx={{
                              display: "block",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              color: "text.primary",
                              mb: 1
                           }}>
                           Job Description
                        </Box>
                        <MDEditor
                           // value={aboutText}
                           value={watch("description") || ""}
                           onChange={(value) => {
                              const inputValue = value || ""
                              setValue("description", inputValue)
                           }}
                           preview='edit'
                           data-color-mode={theme.palette.mode}
                        />
                     </Grid>
                  </Grid>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                     <LoadingButton
                        disabled={!isCompanySelected}
                        variant='contained'
                        color='primary'
                        loading={loading}
                        type='submit'>
                        Submit Job
                     </LoadingButton>
                  </Box>
               </Box>
            </Box>
         </Box>
      </Box>
   )
}

export default AddJob

"use client"
import * as React from "react"
import Dialog from "@mui/material/Dialog"
import _ from "lodash"
import toast from "react-hot-toast"
import Slide from "@mui/material/Slide"
import { useForm } from "react-hook-form"
import MDEditor from "@uiw/react-md-editor"
import {
   Box,
   Checkbox,
   CircularProgress,
   Grid,
   IconButton,
   MenuItem,
   Select,
   TextField,
   Typography,
   useTheme
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { TransitionProps } from "@mui/material/transitions"
import { findOne, updateOne } from "../../lib/strapi"
import { IEditJobData, IJobAttribute, IJobCategory } from "./types"
import CIcon from "../../components/common/icon"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { disconnect } from "process"
import { formatDate } from "./hook"

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement<any, any>
   },
   ref: React.Ref<unknown>
) {
   return <Slide direction='up' ref={ref} {...props} />
})

type EditListProps = {
   open: boolean
   language?: string
   handleClose: () => void
   handleMute: () => void
   jobDocID: string
   jobAttributes?: IJobAttribute
}

const EditJob = ({ open, language, handleClose, handleMute, jobDocID, jobAttributes }: EditListProps) => {
   const theme = useTheme()
   //  destructure job Attributes data
   const { categoryData, skillsData, jobTypesData, jobExperienceData } = jobAttributes || {}

   const [loading, setLoading] = React.useState(false)
   const [jobData, setJobData] = React.useState<IEditJobData | null>(null)

   // get the current date and next month date
   const today = new Date()
   const nextMonth = new Date()
   nextMonth.setMonth(today.getMonth() + 1)

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

   // *** handle form submit
   const handleFromSubmit = async (data: { [key: string]: any }) => {
      try {
         if (!jobData) return false
         setLoading(true)
         // ?? create list function
         const updateInput = {
            data: {
               title: data.title,
               description: data.description,
               startDate: data.startDate,
               endDate: data.endDate,
               price: data.price,
               vacancy: data.vacancy,
               category: {
                  connect: [data?.category]
               },
               //check if skills is exist then connect
               ...(data?.skills && {
                  skills: {
                     connect: [data?.skills],
                     disconnect: jobData?.skills?.map((skill: { documentId: string }) => skill?.documentId)
                  }
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
         const {
            data: updateList,
            error,
            message
         } = await updateOne(`metajob-backend/jobs`, jobData?.documentId, updateInput, language)

         if (error) {
            return toast.error(message || "Something went wrong")
         }

         if (updateList) {
            handleMute()
            toast.success("Job Updated Successfully")
            handleClose()
         }
      } catch (error: any) {
         toast.error(error?.message || "Error updating job")
      } finally {
         setLoading(false)
      }
   }
   // *** get the list data by the jobDocID
   React.useEffect(() => {
      const getList = async () => {
         setLoading(true)
         const { data, error } = await findOne(
            "api/metajob-backend/jobs",
            jobDocID,
            {
               populate: "*",
               locale: language ?? "en"
            },
            "no-store"
         )

         if (error) {
            handleClose()
            setLoading(false)
            return toast.error(error ?? "Failed to fetch list data")
         }

         setJobData(data?.data)
         setLoading(false)
      }

      if (open) {
         if (!jobDocID) return
         getList()
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [open])

   // fill form data from db
   React.useEffect(() => {
      if (jobData) {
         if (jobData?.skills?.length) {
            const skillIds = jobData?.skills?.map((skillItem: { documentId: string }) => skillItem?.documentId)
            setValue("skills", skillIds)
         }

         setValue("title", jobData?.title || "")
         setValue("description", jobData?.description || "")
         setValue("vacancy", jobData?.vacancy || 0)
         setValue("startDate", jobData?.startDate || "")
         setValue("endDate", jobData?.endDate || "")
         setValue("price", jobData?.price || 0)
         setValue("type", jobData?.type?.documentId || "")
         // setValue("skills", jobData?.skills?.[0]?.documentId || "")
         setValue("experience", jobData?.experience?.documentId || "")
         setValue("category", jobData?.category?.documentId || "")
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [jobData])

   return (
      <Dialog
         open={open}
         TransitionComponent={Transition}
         keepMounted
         aria-describedby='edit-list'
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
                  Job Details
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
                           displayEmpty
                           fullWidth
                           variant='outlined'
                           id='company-industry'
                           size='small'
                           {...register("category", {
                              required: "Job Category is required"
                           })}
                           defaultValue={watch("category") || ""}
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
                              min: 0, // Ensures values cannot be negative
                              validate: (value) => value >= 0 || "Value must be 0 or greater"
                           })}
                           error={Boolean(errors.vacancy)}
                           helperText={errors.vacancy ? "Value must be 0 or greater" : ""}
                        />
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
                           displayEmpty
                           fullWidth
                           variant='outlined'
                           id='revenues'
                           size='small'
                           {...register("type")}
                           defaultValue={watch("type") || ""}
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
                           displayEmpty
                           fullWidth
                           variant='outlined'
                           id='skills'
                           size='small'
                           {...register("skills")}
                           value={watch("skills") || []}
                           error={Boolean(errors.skills)}
                           // renderValue={(selected) =>
                           //    (selected as string[]).length === 0
                           //       ? "Select Job Skill"
                           //       : (selected as string[]).join(", ")
                           // }
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
                              skillsData?.map((revenueItem: IJobCategory, index: number) => (
                                 <MenuItem key={index} value={revenueItem?.documentId}>
                                    <Checkbox checked={watch("skills")?.includes(revenueItem?.documentId)} />
                                    {revenueItem?.title}
                                 </MenuItem>
                              ))}
                           {/* {skillsData &&
                              skillsData?.map((revenueItem: IJobCategory, index: number) => {
                                 return (
                                    <MenuItem key={index} value={revenueItem?.documentId}>
                                       {revenueItem?.title}
                                    </MenuItem>
                                 )
                              })} */}
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
                     <LoadingButton variant='contained' color='primary' loading={loading} type='submit'>
                        Submit Job
                     </LoadingButton>
                  </Box>
               </Box>
            </Box>
         </Box>
      </Dialog>
   )
}

export default EditJob

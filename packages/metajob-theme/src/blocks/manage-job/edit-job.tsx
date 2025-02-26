"use client"
import * as React from "react"
import Dialog from "@mui/material/Dialog"
import _ from "lodash"
import toast from "react-hot-toast"
import Slide from "@mui/material/Slide"
import useSWR, { KeyedMutator } from "swr"
import { useForm } from "react-hook-form"
import MDEditor from "@uiw/react-md-editor"
import {
   Box,
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
import { IEditJobData, IJobCategory } from "./types"
import CIcon from "../../components/common/icon"
import { fetcher } from "./hook"
import { hexToRGBA } from "../../lib/hex-to-rgba"

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
   handleClose: () => void
   mutate: KeyedMutator<any>
   jobDocID: string
}

const EditJob = ({ open, handleClose, mutate, jobDocID }: EditListProps) => {
   const theme = useTheme()
   const [loading, setLoading] = React.useState(false)
   const [jobData, setJobData] = React.useState<IEditJobData | null>(null)

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
         vacancy: 0,
         startDate: "",
         endDate: "",
         price: 0,
         type: "",
         skills: "",
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
                  skills: { connect: [data?.skills] }
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
         } = await updateOne("metajob-backend/jobs", jobData?.documentId, updateInput)

         if (error) {
            return toast.error(message || "Something went wrong")
         }

         if (updateList) {
            mutate()
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
               populate: "*"
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
         setValue("title", jobData?.title || "")
         setValue("description", jobData?.description || "")
         setValue("vacancy", jobData?.vacancy || 0)
         setValue("startDate", jobData?.startDate || "")
         setValue("endDate", jobData?.endDate || "")
         setValue("price", jobData?.price || 0)
         setValue("type", jobData?.type?.documentId || "")
         setValue("skills", jobData?.skills?.[0]?.documentId || "")
         setValue("category", jobData?.category?.documentId || "")
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [jobData])

   // fetch job-category data
   const categoryQueryParams = {
      fields: ["title"]
   }
   const categoryQueryString = encodeURIComponent(JSON.stringify(categoryQueryParams))
   const categoryAPiUrl = `/api/find?model=api/metajob-backend/job-categories&query=${categoryQueryString}`
   const { data: categoryData, isLoading: categoryIsLoading } = useSWR(categoryAPiUrl, fetcher, {
      fallbackData: []
   })

   // fetch job-skills data
   const skillsQueryParams = {
      fields: ["title"]
   }
   const skillsQueryString = encodeURIComponent(JSON.stringify(skillsQueryParams))
   const skillsAPiUrl = `/api/find?model=api/metajob-backend/skills&query=${skillsQueryString}`
   const { data: skillsData, isLoading: skillsIsLoading } = useSWR(skillsAPiUrl, fetcher, {
      fallbackData: []
   })

   // fetch job-type data
   const jobTypesQueryParams = {
      fields: ["title"]
   }
   const jobTypesQueryString = encodeURIComponent(JSON.stringify(jobTypesQueryParams))
   const jobTypesAPiUrl = `/api/find?model=api/metajob-backend/job-types&query=${jobTypesQueryString}`
   const { data: jobTypesData, isLoading: jobTypesIsLoading } = useSWR(jobTypesAPiUrl, fetcher, {
      fallbackData: []
   })

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
                           {...register("price")}
                           error={Boolean(errors.price)}
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
                           {...register("vacancy")}
                           error={Boolean(errors.vacancy)}
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
                           displayEmpty
                           fullWidth
                           variant='outlined'
                           id='skills'
                           size='small'
                           {...register("skills")}
                           defaultValue={watch("skills") || ""}
                           value={watch("skills") || ""}
                           error={Boolean(errors.skills)}>
                           <MenuItem disabled value=''>
                              Select Job Skill
                           </MenuItem>
                           {skillsData &&
                              skillsData?.map((revenueItem: IJobCategory, index: number) => {
                                 return (
                                    <MenuItem key={index} value={revenueItem?.documentId}>
                                       {revenueItem?.title}
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

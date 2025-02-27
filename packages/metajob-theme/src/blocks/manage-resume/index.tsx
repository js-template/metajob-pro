"use client"
import { Fragment, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import useSWR from "swr"
import { useForm, FormProvider, useFieldArray } from "react-hook-form"
import { Box, Button, Grid, Step, StepButton, Stepper, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import ExperienceForm from "./experince"
import { IManageResumeBlock, ResumeFormProps } from "./types"
import EducationForm from "./education"
import { ProfileForm } from "./profile"
import { createEntry, find, updateOne } from "../../lib/strapi"
import { ContactForm } from "./contact"
import { fetcher } from "../../utils/swr-fetcher"
import PortfolioForm from "./portfolio"
import ResumeLoader from "./resumeLoader"
import ResumePreviewBox from "./resumePreview"
import { steps } from "./data"
import { removeIdFromObjects } from "./hook"
import { mutate } from "swr"
import { AccessError } from "../../shared/error-table"

type Props = {
   block: IManageResumeBlock
   language?: string
}

export const ManageResume = ({ block, language }: Props) => {
   // session data destructuring
   const { data: session } = useSession()
   const { user } = session || {}
   const { id: userId, role: userRole } = user || {}
   const role = userRole?.type || ""

   const [loading, setLoading] = useState(false)
   const [activeStep, setActiveStep] = useState(0)
   const [completed, setCompleted] = useState<{ [k: number]: boolean }>({})

   const methods = useForm<ResumeFormProps>({
      defaultValues: {
         name: "",
         slug: "",
         tagline: "",
         // qualification: "",
         experience_time: "",
         language: "",
         salary_type: "",
         salary: "",
         // category: "",
         about: "",
         education: [],
         experience: [],
         portfolio: [],
         contact: {
            friendlyAddress: "",
            location: ""
         }
      }
   })

   const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      reset,
      setValue,
      watch
   } = methods

   const {
      fields: experience,
      append: appendExperience,
      remove: removeExperience
   } = useFieldArray({
      control,
      name: "experience"
   })

   const {
      fields: education,
      append: appendEducation,
      remove: removeEducation
   } = useFieldArray({
      control,
      name: "education"
   })

   const {
      fields: portfolio,
      append: appendPortfolio,
      remove: removePortfolio
   } = useFieldArray({
      control,
      name: "portfolio"
   })

   const totalSteps = () => steps.length
   const completedSteps = () => Object.keys(completed).length
   const isLastStep = () => activeStep === totalSteps() - 1
   const allStepsCompleted = () => completedSteps() === totalSteps()
   const [isPreview, setIsPreview] = useState<boolean>(true)

   const handleNext = () => {
      const newActiveStep =
         isLastStep() && !allStepsCompleted() ? steps.findIndex((_, i) => !(i in completed)) : activeStep + 1
      setActiveStep(newActiveStep)
   }

   const handleBack = () => {
      setActiveStep((prev) => prev - 1)
   }

   const handleStep = (step: number) => () => {
      setActiveStep(step)
   }

   const handleComplete = () => {
      setCompleted({ ...completed, [activeStep]: true })
      handleNext()
   }

   // fetch resume-data from db
   const queryParams = {
      filters: {
         user: {
            id: userId
         }
      },
      //   populate: "*",
      populate: [
         "experience",
         "education",
         "contact",
         "category",
         "salary",
         "salary_type",
         "experience_time",
         "portfolio",
         "portfolio.link",
         "user",
         "user.avatar"
      ]
   }
   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))
   // Construct the API URL
   const apiUrl = userId ? `/api/find?model=api/metajob-backend/resumes&query=${queryString}&cache=no-store` : null
   const { data: myResumeDataAll, error: myResumeError, isLoading } = useSWR(apiUrl, fetcher)
   // const myResumeData = myResumeDataAll?.data?.[0]
   const myResumeData = myResumeDataAll?.data?.[0]

   const handleReset = () => {
      setActiveStep(0)
      setCompleted({})
      reset()
   }

   // submit resume handler
   const onSubmit = async (data: ResumeFormProps) => {
      try {
         if (activeStep !== 4) {
            handleComplete()
            return
         }

         setLoading(true) // Start loading

         if (myResumeData) {
            const updateInput = {
               data: {
                  ...data,
                  show_profile: "Show",
                  user: [
                     {
                        id: userId || undefined
                     }
                  ],
                  category: {
                     connect: [data?.category]
                  },
                  salary: {
                     connect: [data?.salary]
                  },
                  salary_type: {
                     connect: [data?.salary_type]
                  },

                  experience_time: {
                     connect: [data?.experience_time]
                  },
                  education: removeIdFromObjects(data?.education),
                  experience: removeIdFromObjects(data?.experience),
                  portfolio: removeIdFromObjects(data?.portfolio)
               }
            }
            const resumeResponse = await updateOne(
               "metajob-backend/resumes",
               myResumeData?.documentId,
               updateInput,
               "/dashboard/my-resume/",
               "page"
            )

            // Check if the response has any errors
            if (resumeResponse.error) {
               toast.error(resumeResponse?.error)
            } else {
               mutate(apiUrl)
               // Success case
               toast.success("Resume updated successfully")
               setIsPreview(true)
               handleReset()
            }
         } else {
            // ?? check if slug is already exist
            const { data: slugData } = await find(
               "api/metajob-backend/resumes",
               {
                  fields: ["slug"],
                  filters: {
                     slug: data.slug
                  }
               },
               "no-store"
            )
            if (slugData?.data?.length > 0) {
               return toast.error("Slug already exist, please change the slug")
            }

            const createInput = {
               data: {
                  ...data,
                  show_profile: "Show",
                  user: [
                     {
                        id: userId || undefined
                     }
                  ],
                  category: {
                     connect: [data?.category]
                  },
                  salary: {
                     connect: [data?.salary]
                  },
                  salary_type: {
                     connect: [data?.salary_type]
                  },

                  experience_time: {
                     connect: [data?.experience_time]
                  }
               }
            }
            const resumeResponse = await createEntry(
               "metajob-backend/resumes",
               createInput,
               "/dashboard/my-resume/",
               "page"
            )
            // Check if the response has any errors
            if (resumeResponse.error) {
               toast.error(resumeResponse?.error)
            } else {
               mutate(apiUrl)
               // Success case
               toast.success("Resume created successfully")
               setIsPreview(true)
               handleReset()
            }
         }
      } catch (error: any) {
         toast.error(error?.message || "An unexpected error occurred. Please try again.")
      } finally {
         // Always stop loading
         setLoading(false)
      }
   }

   // fill data from db
   useEffect(() => {
      if (myResumeData && !myResumeError) {
         const resumeDataValue = myResumeData

         setValue("name", resumeDataValue?.name || "")
         setValue("slug", resumeDataValue?.slug || "")
         setValue("tagline", resumeDataValue?.tagline || "")
         setValue("language", resumeDataValue?.language || "")
         setValue("about", resumeDataValue?.about || "")
         setValue("education", resumeDataValue?.education || [])
         setValue("experience", resumeDataValue?.experience || [])
         setValue("portfolio", resumeDataValue?.portfolio || [])
         setValue("contact.friendlyAddress", resumeDataValue?.contact?.friendlyAddress || "")
         setValue("contact.location", resumeDataValue?.contact?.location || "")
         setValue("experience_time", resumeDataValue?.experience_time?.documentId || "")
         setValue("salary_type", resumeDataValue?.salary_type?.documentId || "")
         setValue("salary", resumeDataValue?.salary?.documentId || "")
         setValue("category", resumeDataValue?.category?.documentId || "")
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [myResumeData])

   if (myResumeError) return <div>Error loading data.</div>

   const handleEdit = () => {
      setIsPreview(false)
   }

   return role === "candidate" ? (
      <Grid item xs={12}>
         <Box>
            {isPreview ? (
               // resume preview
               <ResumePreviewBox handleEdit={handleEdit} data={myResumeData} isLoading={isLoading} />
            ) : (
               // resume submit
               <Box
                  sx={{
                     border: "1px solid",
                     borderColor: "divider",
                     borderRadius: "12px",
                     backgroundColor: (theme) => theme.palette.background.paper
                  }}>
                  <Box
                     sx={{
                        p: 3,
                        borderBottom: "1px solid",
                        borderColor: "divider"
                     }}>
                     <Typography
                        variant='body1'
                        fontWeight={700}
                        fontSize={{
                           xs: "1.25rem",
                           sm: "1.5rem"
                        }}
                        lineHeight={"24px"}>
                        Submit Resume
                     </Typography>
                  </Box>
                  <Box sx={{ py: 2.5, px: 4 }}>
                     <Stepper nonLinear activeStep={activeStep} sx={{ mb: 3 }}>
                        {steps.map((label, index) => (
                           <Step key={label} completed={completed[index]}>
                              <StepButton disabled={isLoading} onClick={handleStep(index)}>
                                 {label}
                              </StepButton>
                           </Step>
                        ))}
                     </Stepper>
                     <FormProvider {...methods}>
                        {isLoading ? (
                           <ResumeLoader />
                        ) : (
                           <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                              <Grid container spacing={3} rowSpacing={2}>
                                 {activeStep === 0 && (
                                    <ProfileForm
                                       errors={errors}
                                       register={register}
                                       setValue={setValue}
                                       watch={watch}
                                    />
                                 )}

                                 {activeStep === 1 && (
                                    <Fragment>
                                       <Grid item xs={12}>
                                          <Box
                                             sx={{
                                                border: "1px solid",
                                                borderColor: "divider",
                                                borderRadius: "6px",
                                                px: 2,
                                                py: 1
                                             }}>
                                             {education.map((edu: any, index) => (
                                                <EducationForm
                                                   key={edu.id}
                                                   index={index}
                                                   edu={edu}
                                                   errors={errors}
                                                   removeHandler={removeEducation}
                                                   register={register}
                                                />
                                             ))}
                                             <LoadingButton
                                                variant='outlined'
                                                onClick={() =>
                                                   appendEducation({
                                                      title: "",
                                                      description: "",
                                                      startDate: "",
                                                      endDate: "",
                                                      institution: ""
                                                   })
                                                }>
                                                Add Education
                                             </LoadingButton>
                                          </Box>
                                       </Grid>
                                    </Fragment>
                                 )}
                                 {activeStep === 2 && (
                                    <Fragment>
                                       <Grid item xs={12}>
                                          <Box
                                             sx={{
                                                border: "1px solid",
                                                borderColor: "divider",
                                                borderRadius: "6px",
                                                px: 2,
                                                py: 1
                                             }}>
                                             {experience.map((exp: any, index) => (
                                                <ExperienceForm
                                                   key={exp?.id}
                                                   index={index}
                                                   exp={exp}
                                                   errors={errors}
                                                   removeHandler={removeExperience}
                                                   register={register}
                                                />
                                             ))}
                                             <LoadingButton
                                                variant='outlined'
                                                onClick={() =>
                                                   appendExperience({
                                                      title: "",
                                                      institution: "",
                                                      startDate: "",
                                                      endDate: "",
                                                      description: ""
                                                   })
                                                }>
                                                Add Experience
                                             </LoadingButton>
                                          </Box>
                                       </Grid>
                                    </Fragment>
                                 )}
                                 {activeStep === 3 && (
                                    <Fragment>
                                       <Grid item xs={12}>
                                          <Box
                                             sx={{
                                                border: "1px solid",
                                                borderColor: "divider",
                                                borderRadius: "6px",
                                                px: 2,
                                                py: 1
                                             }}>
                                             {portfolio.map((port: any, index) => (
                                                <PortfolioForm
                                                   key={port?.id}
                                                   index={index}
                                                   errors={errors}
                                                   removeHandler={removePortfolio}
                                                   register={register}
                                                   setValue={setValue}
                                                   watch={watch}
                                                />
                                             ))}
                                             <LoadingButton
                                                variant='outlined'
                                                onClick={() =>
                                                   appendPortfolio({
                                                      title: "",
                                                      description: "",
                                                      link: {
                                                         link: "",
                                                         label: "",
                                                         target: "",
                                                         type: ""
                                                      }
                                                      // image: "",
                                                   })
                                                }>
                                                Add Portfolio
                                             </LoadingButton>
                                          </Box>
                                       </Grid>
                                    </Fragment>
                                 )}
                                 {activeStep === 4 && <ContactForm errors={errors} register={register} />}
                              </Grid>

                              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                 <Button
                                    color='inherit'
                                    // disabled={activeStep === 0}
                                    // onClick={handleBack}
                                    onClick={() => {
                                       if (activeStep === 0) {
                                          setIsPreview(true)
                                       } else {
                                          handleBack()
                                       }
                                    }}>
                                    {activeStep === 0 ? "Cancel" : "Back"}
                                 </Button>
                                 <Box sx={{ flex: "1 1 auto" }} />
                                 <LoadingButton variant='contained' color='primary' loading={loading} type='submit'>
                                    {isLastStep() ? "Finish" : "Next"}
                                 </LoadingButton>
                              </Box>
                           </Box>
                        )}
                     </FormProvider>
                  </Box>
               </Box>
            )}
         </Box>
      </Grid>
   ) : (
      <AccessError roleValue={"Candidate"} />
   )
}

"use client"
import {
   Alert,
   AlertTitle,
   Box,
   Button,
   CircularProgress,
   Grid,
   IconButton,
   Slide,
   SlideProps,
   Snackbar,
   Step,
   StepLabel,
   Stepper,
   Typography
} from "@mui/material"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import CIcon from "../components/common/icon"
import { formProps } from "../types/forms"
import _ from "lodash"
import InputField from "./input"
import GoogleMap from "./googleMap"
import Markdown from "./markdown"
import SelectField from "./select"
import { TransitionProps } from "@mui/material/transitions"
import { LoadingButton } from "@mui/lab"
import FileInputField from "./fileInput"
import toast from "react-hot-toast"
import { hexToRGBA } from "../lib/hex-to-rgba"

// *** export all form components
export * from "./input"
export * from "./markdown"
export * from "./select"
export * from "./googleMap"

function SlideTransition(props: SlideProps) {
   return <Slide {...props} direction='up' />
}

/**
 * Dynamic Form Component to render form fields dynamically
 * @param {boolean} open - open form dialog
 * @param {function} handleClose - close form dialog
 * @param {formProps["fields"]} fields - form fields
 * @param {string} title - form title
 * @param {formProps["buttonsText"]} buttonsText - form buttons text
 * @param {formProps["stepLabels"]} stepLabels - form step labels
 * @param {function} handleFromSubmit - form submit function it should return a promise true/false based on the success
 * @param {boolean} loading - form loading state
 * @param {function} setLoading - set form loading state
 * @example
 * <DynamicForm
 *   title={title}
 *   buttonsText={buttonsText}
 *   fields={fields}
 *   handleFromSubmit={handleFromSubmit}
 *   open={open}
 *   handleClose={handleClose}
 *   loading={loading}
 *   setLoading={setLoading}
 *   stepLabels={stepLabels}
 * />
 */
const DynamicForm = ({
   open,
   handleClose,
   fields,
   title,
   buttonsText,
   stepLabels,
   handleFromSubmit,
   loading,
   setLoading,
   dataLoading = false,
   defaultData = {}
}: {
   open: boolean
   handleClose: () => void
   fields: formProps["fields"]
   title: string
   buttonsText: formProps["buttonsText"]
   stepLabels: formProps["stepLabels"]
   handleFromSubmit: (data: any) => Promise<boolean>
   loading: boolean
   setLoading: (value: boolean) => void
   dataLoading?: boolean
   defaultData?: {
      [key: string]: any
   }
}) => {
   const [activeStep, setActiveStep] = React.useState(1)
   const [error, setError] = React.useState<{
      open: boolean
      Transition: React.ComponentType<
         TransitionProps & {
            children: React.ReactElement<any, any>
         }
      >
   }>({
      open: false,
      Transition: SlideTransition
   })

   // *** steps array from fields
   const steps = Array.from(new Set(fields?.map((field) => field.inputStep)))

   // *** Group fields by step
   const groupedByStep = fields?.reduce((acc: { [key: number]: any[] }, field) => {
      const step = Number(field.inputStep)

      // Initialize the array for this step if not exists
      if (!acc[step]) {
         acc[step] = []
      }

      // Add the field to the corresponding step array
      acc[step].push(field)

      return acc
   }, {})

   // *** form validation default values
   const defaultValues = React.useMemo(() => {
      const values: any = {}
      fields?.forEach((field) => {
         values[field.name] = field?.defaultValue || ""
      })
      return values
   }, [fields])

   const {
      control,
      handleSubmit,
      reset,
      setValue,
      setFocus,
      watch,
      setError: setFieldError
   } = useForm({
      defaultValues
   })

   // *** if steps length and stepLabels length is not equal then return an error
   useEffect(() => {
      if (steps.length !== stepLabels?.length && open) {
         setError({
            open: true,
            Transition: SlideTransition
         })
      } else if (!open) {
         setError({
            open: false,
            Transition: SlideTransition
         })
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [open])

   // *** set default data to form fields if defaultData is not empty
   useEffect(() => {
      if (Object.keys(defaultData).length > 0 && !dataLoading) {
         Object.keys(defaultData).forEach((key) => {
            // field name should be exist in the form fields and multiple should be false
            if (fields.find((field: any) => field.name === key && !field?.multiple)) {
               setValue(key, defaultData[key])
            } else if (fields.find((field: any) => field.name === key && field?.multiple)) {
               // field name should be exist in the form fields and multiple should be true
               setValue(key, defaultData[key].join(","))
            }
         })
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dataLoading])

   const handleNext = async () => {
      setLoading(true)

      // ?? Check active step group fields have any error set error or move to the next step
      const activeStepFields = await groupedByStep[activeStep]
      let hasError = false
      await activeStepFields.forEach((field: any) => {
         if (
            (field.required && (watch(field.name) === "" || watch(field.name) === undefined)) ||
            watch(field.name) === null
         ) {
            setFocus(field.name)
            setFieldError(field.name, {
               type: "manual",
               message: field.errorText || "This field is required"
            })
            hasError = true
            toast.error(`Please fill the ${field.label} field`, {
               duration: 4000,
               position: "bottom-right",
               icon: "⚠️"
            })
         }
      })

      if (hasError) {
         setLoading(false)
         return
      }

      setActiveStep(activeStep + 1)
      setLoading(false)
   }

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
   }

   const handleReset = () => {
      setActiveStep(1)
   }

   // *** handle form submit
   const handleFormSubmit = async (data: any) => {
      // ?? Check if it's the last step and submit or move to the next step
      const isSuccess = await handleFromSubmit(data)

      if (isSuccess) {
         setActiveStep(activeStep + 1)
         setLoading(false)
         handleClose()
         handleReset()
      } else {
         setLoading(false)
      }
   }

   return (
      <Box
         sx={{
            position: "relative"
         }}>
         {/* Full form loader */}
         {dataLoading && (
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
               {title}
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
                     handleReset()
                     reset()
                  }}>
                  <CIcon
                     icon='cil-x'
                     sx={{
                        color: (theme) => theme.palette.error.main
                     }}
                  />
               </IconButton>
            </Box>
            {/* Steps */}
            {steps.length > 1 && (
               <Stepper
                  activeStep={activeStep - 1}
                  sx={{
                     pb: 2
                  }}>
                  {_.map(steps, (step, index) => {
                     const labelProps: { optional?: React.ReactNode } = {}
                     const stepProps: { completed?: boolean } = {}

                     return (
                        <Step key={index} {...stepProps}>
                           <StepLabel {...labelProps}>{stepLabels[index]?.title}</StepLabel>
                        </Step>
                     )
                  })}
               </Stepper>
            )}
            {activeStep === steps.length + 1 ? (
               <React.Fragment>
                  <Typography textAlign={"center"} my={4}>
                     Submitted Successfully
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                     <Box sx={{ flex: "1 1 auto" }} />
                     <Button onClick={handleReset}>Reset</Button>
                  </Box>
               </React.Fragment>
            ) : (
               <Box component={"form"} onSubmit={handleSubmit(handleFormSubmit)}>
                  {/* Group form map and activeStep should be view only */}
                  {_.map(groupedByStep, (fields: any, step: number) => {
                     return (
                        <Grid
                           container
                           spacing={3}
                           rowSpacing={2.5}
                           px={3}
                           pb={1}
                           key={step}
                           sx={{ display: activeStep === Number(step) ? "flex" : "none" }}>
                           {fields.map((field: any, index: number) => {
                              return (
                                 <Grid
                                    item
                                    xs={field?.mobileGrid || 12}
                                    sm={field?.tabGrid || 12}
                                    md={field?.desktopGrid || 12}
                                    key={index}
                                    sx={{
                                       "& .MuiFormControl-root": {
                                          width: "100%"
                                       }
                                    }}>
                                    {field?.__component === "forms.google-map" ? (
                                       <GoogleMap
                                          {...field}
                                          control={control}
                                          helperText={field?.errorText}
                                          key={index}
                                          setValue={setValue}
                                          watch={watch}
                                          rules={{
                                             required: field?.required
                                          }}
                                       />
                                    ) : field?.__component === "forms.markdown" ? (
                                       <Markdown
                                          {...field}
                                          control={control}
                                          setValue={setValue}
                                          rules={{
                                             required: field?.required
                                          }}
                                          key={index}
                                       />
                                    ) : field?.__component === "forms.select" ? (
                                       <SelectField
                                          {...field}
                                          helperText={field?.errorText}
                                          control={control}
                                          setValue={setValue}
                                          watch={watch}
                                          rules={{
                                             required: field?.required
                                          }}
                                          key={index}
                                          activeStep={activeStep}
                                          defaultData={defaultData}
                                       />
                                    ) : field?.__component === "forms.file-input" ? (
                                       <FileInputField
                                          {...field}
                                          helperText={field?.errorText}
                                          control={control}
                                          setValue={setValue}
                                          watch={watch}
                                          rules={{
                                             required: field?.required
                                          }}
                                          key={index}
                                       />
                                    ) : (
                                       <InputField
                                          {...field}
                                          helperText={field?.errorText}
                                          control={control}
                                          setValue={setValue}
                                          rules={{
                                             required: field?.required
                                          }}
                                          key={index}
                                       />
                                    )}
                                 </Grid>
                              )
                           })}
                        </Grid>
                     )
                  })}

                  {/* Action Buttons */}
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2, px: 3 }}>
                     <Button
                        onClick={() => {
                           if (activeStep === 1) {
                              handleClose()
                              handleReset()
                              reset()
                           } else {
                              handleBack()
                           }
                        }}
                        sx={{
                           bgcolor: (theme) => theme.palette.background.default,
                           color: (theme) => theme.palette.text.disabled,
                           "&:hover": {
                              color: (theme) =>
                                 activeStep === 1
                                    ? theme.palette.error.contrastText
                                    : theme.palette.primary.contrastText,
                              bgcolor: (theme) =>
                                 activeStep === 1 ? theme.palette.error.main : theme.palette.primary.main
                           }
                        }}>
                        {activeStep === 1 ? buttonsText?.cancel : buttonsText?.back}
                     </Button>
                     <Box sx={{ flex: "1 1 auto" }} />
                     {activeStep === steps.length ? (
                        <LoadingButton type='submit' variant='contained' color='primary' loading={loading}>
                           {activeStep === steps.length ? buttonsText?.submit : buttonsText?.next}
                        </LoadingButton>
                     ) : (
                        <Button type='button' variant='contained' color='primary' onClick={handleNext}>
                           {buttonsText?.next}
                        </Button>
                     )}
                  </Box>
               </Box>
            )}
         </Box>

         {/* Error Snackbar */}
         <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={error.open}
            autoHideDuration={6000}
            onClose={() => setError({ ...error, open: false })}
            TransitionComponent={error.Transition}
            sx={{
               maxWidth: 600
            }}>
            <Alert
               // onClose={() => setAccountStatue({ ...accountStatue, open: false })}
               severity='warning'
               sx={{
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)"
               }}>
               <AlertTitle>
                  <Typography
                     variant='h3'
                     sx={{
                        fontSize: {
                           xs: "1.25rem",
                           sm: "1.5rem"
                        }
                     }}>
                     Warning
                  </Typography>
               </AlertTitle>
               <Typography variant='body1' fontWeight={400}>
                  Steps and Step Labels length should be equal. There is a mismatch in the steps and step labels. steps:{" "}
                  {steps.length} and stepLabels: {stepLabels?.length} are not equal.
               </Typography>
            </Alert>
         </Snackbar>
      </Box>
   )
}

export default DynamicForm

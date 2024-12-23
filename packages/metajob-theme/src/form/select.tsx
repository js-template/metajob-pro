"use client"
import CIcon from "../components/common/icon"
import { find } from "../lib/strapi"
import { selectProps } from "../types/forms"
import {
   Autocomplete,
   Box,
   CircularProgress,
   ClickAwayListener,
   FormControl,
   IconButton,
   Skeleton,
   TextField,
   TextFieldProps,
   Tooltip,
   Typography,
   TypographyProps
} from "@mui/material"
import _ from "lodash"
import { useEffect, useState } from "react"
import { Control, Controller, UseFormSetValue, UseFormWatch } from "react-hook-form"

const SelectField = ({
   control,
   name,
   label,
   required,
   helperText,
   rules,
   fullWidth,
   model,
   errorText,
   options,
   placeholder,
   noteText,
   defaultValue,
   inputProps,
   labelProps,
   multiple,
   activeStep,
   inputStep,
   watch,
   setValue,
   defaultData
}: {
   helperText?: string
   control: Control<any>
   rules: any
   setValue: UseFormSetValue<{
      [key: string]: any
   }>
   watch: UseFormWatch<{
      [key: string]: any
   }>
   inputProps?: TextFieldProps["inputProps"]
   labelProps?: TypographyProps
   activeStep: number
   defaultData: {
      [key: string]: any
   }
} & selectProps) => {
   const [loading, setLoading] = useState(true)
   // ?? options state for select field
   const [Options, setOptions] = useState<Array<{
      id: number
      value: string
      label: string
   }> | null>(null)
   // ?? tooltip open/close
   const [open, setOpen] = useState(false)

   // ?? handle tooltip close
   const handleTooltipClose = () => {
      setOpen(false)
   }

   // ?? handle tooltip open
   const handleTooltipOpen = () => {
      setOpen(true)
   }

   // *** if get model from props then fetch data from api and set to options
   useEffect(() => {
      const fetchData = async (model: string) => {
         const { data: OptionsData } = await find(
            model,
            {
               _limit: 1000
            },
            "no-store"
         )

         // ?? format the data
         if (OptionsData) {
            const formate = _.map(OptionsData?.data, (item) => {
               return {
                  id: item?.id,
                  value: item?.attributes?.slug ?? item?.attributes?.value ?? item?.id ?? Math.random(),
                  label: item?.attributes?.title ?? item?.attributes?.name ?? item?.attributes?.label ?? "N/A"
               }
            })

            setOptions(formate)
         }
      }

      if (model && activeStep === inputStep) {
         fetchData(model)
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [model, activeStep, setValue])

   // *** set the default value to the form
   useEffect(() => {
      if (
         Options &&
         Options?.length > 0 &&
         activeStep === inputStep &&
         model &&
         typeof watch(name) === "string" &&
         Object.keys(defaultData).length > 0
      ) {
         if (multiple) {
            // ?? expend the watch value
            const watchValue = watch(name)
               ?.split(",")
               .map((item: string) => {
                  return Options.find((option) => option.value === item)
               })
               .filter((item: any) => item)

            // ?? set the value to the form
            setValue(name, watchValue)
            setLoading(false)
         } else {
            // ?? get the watch value from the options value
            const watchValue = Options?.find((item) => item.value === watch(name))

            // ?? set the value to the form
            setValue(name, watchValue)
            setLoading(false)
         }
      } else if (
         options &&
         activeStep === inputStep &&
         !model &&
         typeof watch(name) === "string" &&
         Object.keys(defaultData).length > 0
      ) {
         if (multiple) {
            // ?? expend the watch value
            const watchValue = watch(name)
               ?.split(",")
               .map((item: string) => {
                  return options.find((option) => option.value === item)
               })
               .filter((item: any) => item)

            // ?? set the value to the form
            setValue(name, watchValue)
            setLoading(false)
         } else {
            // ?? get the watch value from the options value
            const watchValue = options?.find((item) => item.value === watch(name))

            // ?? set the value to the form
            setValue(name, watchValue)
            setLoading(false)
         }
      }

      if (activeStep === inputStep && (Object.keys(defaultData).length === 0 || !defaultData)) {
         setLoading(false)
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [watch(name), activeStep, options, Options, defaultData])

   return loading ? (
      <Box>
         <Typography
            variant='body1'
            sx={{
               color: (theme) => theme.palette.text.primary,
               fontSize: 16
            }}
            pb={0.5}
            {...labelProps}>
            {label}{" "}
            {required ? (
               <Typography component='span' color='error'>
                  *
               </Typography>
            ) : (
               <Typography
                  component='span'
                  sx={{
                     fontSize: 14,
                     color: (theme) => theme.palette.text.secondary
                  }}>
                  (optional)
               </Typography>
            )}
         </Typography>
         <Skeleton variant='rectangular' height={56} />
      </Box>
   ) : (
      <Controller
         name={name}
         control={control}
         rules={rules}
         render={({ field: { onChange, ...field } }) => {
            return (
               <FormControl fullWidth={fullWidth}>
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
                        pb={0.5}
                        {...labelProps}>
                        {label}{" "}
                        {required ? (
                           <Typography component='span' color='error'>
                              *
                           </Typography>
                        ) : (
                           <Typography
                              component='span'
                              sx={{
                                 fontSize: 14,
                                 color: (theme) => theme.palette.text.secondary
                              }}>
                              (optional)
                           </Typography>
                        )}
                     </Typography>
                     {/* Note Text with tooltip */}
                     {noteText && (
                        <ClickAwayListener onClickAway={handleTooltipClose}>
                           <div>
                              <Tooltip
                                 PopperProps={{
                                    disablePortal: true
                                 }}
                                 onClose={handleTooltipClose}
                                 open={open}
                                 disableFocusListener
                                 disableHoverListener
                                 disableTouchListener
                                 title={noteText}
                                 placement='top'
                                 arrow>
                                 <IconButton size='small' onClick={handleTooltipOpen}>
                                    <CIcon icon='tabler:info-hexagon' size={20} />
                                 </IconButton>
                              </Tooltip>
                           </div>
                        </ClickAwayListener>
                     )}
                  </Box>

                  <Autocomplete
                     {...field}
                     options={
                        model
                           ? typeof field?.value === "object"
                              ? Options?.filter((item) => {
                                   if (multiple) {
                                      return !field?.value?.find((selected: any) => selected.value === item.value)
                                   } else {
                                      return item
                                   }
                                }) || []
                              : Options || []
                           : typeof field?.value === "object"
                             ? options?.filter((item) => {
                                  if (multiple) {
                                     return !field?.value?.find((selected: any) => selected.value === item.value)
                                  } else {
                                     return item
                                  }
                               }) || []
                             : options || []
                     }
                     onChange={(event, newValue) => onChange(newValue)} // Register onChange for react-hook-form
                     {...(multiple && {
                        multiple: true,
                        getOptionLabel: (option: { label: string }) => option.label
                     })}
                     loading={model && !Options ? true : false}
                     value={multiple ? field.value || [] : field.value || null}
                     sx={{
                        "& input": {
                           py: "3px !important"
                        }
                     }}
                     renderInput={(params) => (
                        <TextField
                           {...params}
                           placeholder={placeholder}
                           variant='outlined'
                           fullWidth
                           InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                 <>
                                    {model && !Options ? <CircularProgress color='inherit' size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                 </>
                              )
                           }}
                        />
                     )}
                  />
               </FormControl>
            )
         }}
      />
   )
}

export default SelectField

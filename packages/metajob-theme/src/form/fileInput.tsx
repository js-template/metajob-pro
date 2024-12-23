"use client"
import {
   Avatar,
   Box,
   ClickAwayListener,
   FormControl,
   IconButton,
   Paper,
   TextField,
   Tooltip,
   Typography
} from "@mui/material"
import { Controller } from "react-hook-form"
import { fileInputFieldProps } from "./type"
import CIcon from "../components/common/icon"
import { useState } from "react"
import _ from "lodash"

export default function FileInputField({
   label,
   accept,
   multiple,
   size = "medium",
   labelProps,
   fullWidth,
   helperText,
   textFieldProps,
   textFieldSx,
   required = false,
   inputProps,
   name,
   control,
   rules,
   noteText,
   watch,
   setValue
}: fileInputFieldProps) {
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

   return (
      <>
         <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
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
                        },
                        ...textFieldSx
                     }}
                     type={"file"}
                     value={undefined}
                     onChange={(e: any) => {
                        field.onChange(e.target.files)
                     }}
                     error={!!error}
                     helperText={error ? helperText : ""}
                     {...textFieldProps}
                     size={size}
                     inputProps={{
                        accept: accept?.join(","),
                        multiple: multiple,
                        ...inputProps
                     }}
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
                                          const files = _.filter(field.value, (_: any, i: number) => i !== index)

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
      </>
   )
}

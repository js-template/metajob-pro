"use client"
import { Box, ClickAwayListener, FormControl, IconButton, TextField, Tooltip, Typography } from "@mui/material"
import { Controller } from "react-hook-form"
import { InputFieldProps } from "./type"
import CIcon from "../components/common/icon"
import { useState } from "react"

export default function InputField({
   label,
   placeholder,
   type = "text",
   labelProps,
   fullWidth,
   helperText,
   textFieldProps,
   textFieldSx,
   required = false,
   size = "medium",
   inputProps,
   name,
   control,
   rules,
   noteText
}: InputFieldProps) {
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
                  placeholder={placeholder}
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
                  type={type}
                  error={!!error}
                  helperText={error ? helperText : ""}
                  {...textFieldProps}
                  size={size}
                  inputProps={inputProps}
               />
            </FormControl>
         )}
      />
   )
}

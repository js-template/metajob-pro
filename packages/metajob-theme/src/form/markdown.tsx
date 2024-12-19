"use client"
import { Box, ClickAwayListener, FormControl, IconButton, Tooltip, Typography, useTheme } from "@mui/material"
import MDEditor from "@uiw/react-md-editor"
import { Controller } from "react-hook-form"
import { InputFieldProps } from "./type"
import CIcon from "../components/common/icon"
import { useState } from "react"

const Markdown = ({
   name,
   control,
   label,
   required = false,
   fullWidth = true,
   noteText,
   labelProps
}: InputFieldProps) => {
   const theme = useTheme()
   const { mode } = theme.palette
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
         render={({ field }) => (
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
               <MDEditor
                  value={field.value}
                  onChange={(value) => {
                     field.onChange(value)
                  }} // Register onChange handler
                  onBlur={field.onBlur} // Register onBlur handler
                  preview='edit'
                  data-color-mode={mode}
               />
            </FormControl>
         )}
      />
   )
}

export default Markdown

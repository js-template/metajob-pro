import { TextFieldProps, TypographyProps } from "@mui/material"
import { JSX } from "react"
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form"

export type InputFieldProps = {
   label: string | JSX.Element
   placeholder?: string
   labelProps?: TypographyProps
   fullWidth?: boolean
   textFieldProps?: TextFieldProps
   textFieldSx?: TextFieldProps["sx"]
   type?: "text" | "email" | "password" | "number" | "tel" | "url" | "date" | "textarea"
   id?: string
   helperText?: string | JSX.Element
   size?: "small" | "medium"
   required?: boolean
   inputProps?: TextFieldProps["inputProps"]
   noteText?: string
   // react hook from register
   name: string
   control: Control<any>
   rules?: any
}

export type fileInputFieldProps = {
   id?: string
   label: string
   name: string
   labelProps?: TypographyProps
   fullWidth?: boolean
   size?: "small" | "medium"
   textFieldProps?: TextFieldProps
   textFieldSx?: TextFieldProps["sx"]
   accept?: string[]
   multiple?: boolean
   helperText?: string
   required?: boolean
   inputProps?: TextFieldProps["inputProps"]
   noteText?: string
   setValue: UseFormSetValue<{
      [key: string]: any
   }>
   watch: UseFormWatch<{
      [key: string]: any
   }>
   // react hook from register
   control: Control<any>
   rules?: any
}

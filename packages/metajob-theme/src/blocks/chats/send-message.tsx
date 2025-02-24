"use client"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { LoadingButton } from "@mui/lab"
import { CircularProgress, Stack, TextField, useTheme } from "@mui/material"
import CIcon from "../../components/common/icon"

const SendMessage = ({
   handleSendMessage,
   loading,
   setLoading,
   sendPlaceholder
}: {
   handleSendMessage?: (data: any) => Promise<void>
   loading: boolean
   setLoading: (loading: boolean) => void
   sendPlaceholder: string
}) => {
   const theme = useTheme()
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         message: ""
      }
   })

   // *** message send function handler ***
   const onSubmit = async (data: any) => {
      if (handleSendMessage) {
         setLoading(true)
         handleSendMessage(data).finally(() => {
            reset()
            setLoading(false)
         })
         return
      } else {
         toast.error("This featured is under development")
         return
      }
   }

   return (
      <Stack
         direction={"row"}
         justifyContent={"center"}
         alignItems={"center"}
         spacing={2}
         padding={2}
         component={"form"}
         onSubmit={handleSubmit(onSubmit)}>
         {/* Message input */}
         <TextField
            fullWidth
            id='outlined-basic'
            placeholder={sendPlaceholder}
            variant='outlined'
            multiline
            maxRows={4}
            onKeyDown={(event) => {
               if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  handleSubmit(onSubmit)()
               }
            }}
            {...register("message", {
               required: true
            })}
            error={errors?.message ? true : false}
            sx={{
               "& .MuiInputBase-root": {
                  minHeight: "40px !important",
                  p: 0,
                  "& textarea": {
                     ...(theme.direction === "rtl" ? { marginLeft: "50px" } : { marginRight: "50px" })
                  }
               }
            }}
         />
         {/* Image upload button */}
         {/* <IconButton
            component='label'
            sx={{
               p: 1,
               width: "52px",
               height: "52px",
               background: (theme) => hexToRGBA(theme.palette.text.primary, 0.05),
               border: "1px solid",
               borderColor: (theme) => hexToRGBA(theme.palette.text.primary, 0.1),
               color: (theme) => theme.palette.text.secondary
            }}
            color='inherit'>
            <CIcon icon='mage:image' width={24} height={24} />
            <VisuallyHiddenInput type='file' />
         </IconButton> */}
         <LoadingButton
            loading={loading}
            variant='contained'
            color='primary'
            type='submit'
            sx={{
               position: "absolute",
               ...(theme.direction === "rtl" ? { left: "25px" } : { right: "25px" }),
               boxShadow: "none",
               margin: 0 + " !important",
               width: "40px",
               p: 0,
               minWidth: "40px",
               height: "40px",
               borderRadius: "100px",
               "& svg": {
                  ...(!loading && {
                     color: (theme) => theme.palette.primary.contrastText
                  })
               }
            }}
            // loading icon
            loadingIndicator={
               <CircularProgress
                  size={20}
                  sx={{
                     color: (theme) => theme.palette.primary.main
                  }}
               />
            }>
            {/* Send message button */}
            {loading ? null : (
               <CIcon
                  icon={"tabler:arrow-big-up-lines-filled"}
                  sx={{
                     fontSize: {
                        xs: "1rem",
                        sm: "1.25rem"
                     }
                  }}
               />
            )}
         </LoadingButton>
      </Stack>
   )
}

export default SendMessage

"use client"

import { FieldErrors, UseFormRegister } from "react-hook-form"
import { Box, Grid, TextField } from "@mui/material"
import { ResumeFormProps } from "./types"

type Props = {
   register: UseFormRegister<ResumeFormProps>
   errors: FieldErrors<ResumeFormProps>
}

export const ContactForm = ({ register, errors }: Props) => {
   return (
      <>
         {/* address */}
         <Grid item xs={12} sm={6}>
            <Box
               component={"label"}
               htmlFor='profile-full-name'
               sx={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "text.primary",
                  mb: 1
               }}>
               Friendly Address
               <Box
                  component={"span"}
                  sx={{
                     color: "error.main",
                     ml: 0.5
                  }}>
                  *
               </Box>
            </Box>
            <TextField
               id='contact-address'
               fullWidth
               variant='outlined'
               size='small'
               type='text'
               placeholder='Friendly Addresse'
               {...register("contact.friendlyAddress", {
                  required: "Full Name is required"
               })}
               error={Boolean(errors.contact?.friendlyAddress)}
            />
         </Grid>

         {/* Professional Title */}
         <Grid item xs={12} sm={6}>
            <Box
               component={"label"}
               htmlFor='profile-professional-title'
               sx={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "text.primary",
                  mb: 1
               }}>
               Location
               <Box
                  component={"span"}
                  sx={{
                     color: "error.main",
                     ml: 0.5
                  }}>
                  *
               </Box>
            </Box>
            <TextField
               id='location'
               fullWidth
               variant='outlined'
               size='small'
               type='text'
               placeholder='Location'
               {...register("contact.location", {
                  required: "Location is required"
               })}
               error={Boolean(errors.contact?.location)}
            />
         </Grid>
      </>
   )
}

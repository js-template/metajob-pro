"use client"

import { FieldErrors, UseFormRegister } from "react-hook-form"
import { Box, Grid, Paper, TextField } from "@mui/material"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import CIcon from "../../components/common/icon"
import { ResumeFormProps } from "./types"

type Props = {
   index: number
   removeHandler: (index: number) => void
   edu?: {
      title: string
      description: string
      startDate: string
      endDate: string
      institution: string
   }
   register: UseFormRegister<ResumeFormProps>
   errors: FieldErrors<ResumeFormProps>
}

const EducationForm = ({ index, edu, removeHandler, register, errors }: Props) => {
   return (
      <Paper
         sx={{
            p: 2,
            my: 1.5,
            position: "relative",
            backgroundColor: (theme) => hexToRGBA(theme.palette.primary.main, 0.01),
            //-=== border: "1px solid",
            // borderColor: (theme) => hexToRGBA(theme.palette.primary.main, 0.5),
            borderRadius: "5px",
            color: (theme) => theme.palette.primary.main
         }}>
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Box
                  component={"label"}
                  htmlFor={`education.${index}.title`}
                  sx={{
                     fontSize: 14,
                     fontWeight: 500,
                     mb: 0.5,
                     display: "block",
                     color: (theme) => theme.palette.text.primary
                  }}>
                  Title
                  <Box
                     component='span'
                     sx={{
                        color: (theme) => theme.palette.error.main,
                        ml: 0.5
                     }}>
                     *
                  </Box>
               </Box>
               <TextField
                  fullWidth
                  variant='outlined'
                  size='small'
                  type='text'
                  placeholder='Title'
                  {...register(`education.${index}.title`, {
                     required: "Title is required"
                  })}
                  error={Boolean(errors.education?.[index]?.title)}
                  sx={{
                     backgroundColor: (theme) => theme.palette.background.paper
                  }}
               />
            </Grid>
            <Grid item xs={12}>
               <Box
                  component={"label"}
                  htmlFor={`education.${index}.description`}
                  sx={{
                     fontSize: 14,
                     fontWeight: 500,
                     mb: 0.5,
                     display: "block",
                     color: (theme) => theme.palette.text.primary
                  }}>
                  description
                  <Box
                     component='span'
                     sx={{
                        color: (theme) => theme.palette.error.main,
                        ml: 0.5
                     }}>
                     *
                  </Box>
               </Box>
               <TextField
                  fullWidth
                  variant='outlined'
                  size='small'
                  type='text'
                  placeholder='description'
                  {...register(`education.${index}.description`, {
                     required: "description is required"
                  })}
                  error={Boolean(errors.education?.[index]?.description)}
                  sx={{
                     backgroundColor: (theme) => theme.palette.background.paper
                  }}
               />
            </Grid>
            <Grid item xs={6}>
               <Box
                  component={"label"}
                  htmlFor={`education.${index}.startDate`}
                  sx={{
                     fontSize: 14,
                     fontWeight: 500,
                     mb: 0.5,
                     display: "block",
                     color: (theme) => theme.palette.text.primary
                  }}>
                  Start Date
                  <Box
                     component='span'
                     sx={{
                        color: (theme) => theme.palette.error.main,
                        ml: 0.5
                     }}>
                     *
                  </Box>
               </Box>
               <TextField
                  fullWidth
                  variant='outlined'
                  size='small'
                  type='date'
                  placeholder='Start Date'
                  {...register(`education.${index}.startDate`, {
                     required: "Start Date is required"
                  })}
                  error={Boolean(errors.education?.[index]?.startDate)}
                  sx={{
                     backgroundColor: (theme) => theme.palette.background.paper
                  }}
               />
            </Grid>
            <Grid item xs={6}>
               <Box
                  component={"label"}
                  htmlFor={`education.${index}.endDate`}
                  sx={{
                     fontSize: 14,
                     fontWeight: 500,
                     mb: 0.5,
                     display: "block",
                     color: (theme) => theme.palette.text.primary
                  }}>
                  End Date
                  <Box
                     component='span'
                     sx={{
                        color: (theme) => theme.palette.error.main,
                        ml: 0.5
                     }}>
                     *
                  </Box>
               </Box>
               <TextField
                  fullWidth
                  variant='outlined'
                  size='small'
                  type='date'
                  placeholder='End Date'
                  {...register(`education.${index}.endDate`, {
                     required: "End Date is required"
                  })}
                  error={Boolean(errors.education?.[index]?.endDate)}
                  sx={{
                     backgroundColor: (theme) => theme.palette.background.paper
                  }}
               />
            </Grid>
            <Grid item xs={12}>
               <Box
                  component={"label"}
                  htmlFor={`education.${index}.institution`}
                  sx={{
                     fontSize: 14,
                     fontWeight: 500,
                     mb: 0.5,
                     display: "block",
                     color: (theme) => theme.palette.text.primary
                  }}>
                  institution (optional)
               </Box>
               <TextField
                  fullWidth
                  variant='outlined'
                  size='small'
                  id={`education.${index}.institution`}
                  type='text'
                  placeholder='institution'
                  {...register(`education.${index}.institution`)}
                  sx={{
                     backgroundColor: (theme) => theme.palette.background.paper
                  }}
               />
            </Grid>
         </Grid>
         <Box
            sx={{
               cursor: "pointer",
               position: "absolute",
               top: 0,
               right: 0,
               width: "30px",
               height: "30px",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               borderRadius: "6px",
               backgroundColor: (theme) => theme.palette.error.main + "40",
               color: (theme) => theme.palette.error.main,
               transition: "all 0.3s ease-in-out",
               "& svg": {
                  color: (theme) => theme.palette.error.main
               },
               "&:hover": {
                  backgroundColor: (theme) => theme.palette.error.main,
                  color: (theme) => theme.palette.error.contrastText,
                  "& svg": {
                     color: (theme) => theme.palette.error.contrastText
                  }
               }
            }}
            onClick={() => removeHandler(index)}>
            <CIcon icon='tabler:x' />
         </Box>
      </Paper>
   )
}

export default EducationForm

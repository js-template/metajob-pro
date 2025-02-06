"use client"

import { Box, Grid, Paper, TextField } from "@mui/material"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import CIcon from "../../components/common/icon"
import { ResumeFormProps } from "./types"

type Props = {
   index: number
   removeHandler: (index: number) => void
   exp?: {
      company: string
      position: string
      startDate: string
      endDate: string
      notes: string
   }
   register: UseFormRegister<ResumeFormProps>
   errors: FieldErrors<ResumeFormProps>
}

const ExperienceForm = ({ index, exp, removeHandler, register, errors }: Props) => {
   return (
      <Paper
         sx={{
            p: 2,
            my: 1.5,
            position: "relative",
            backgroundColor: (theme) => hexToRGBA(theme.palette.primary.main, 0.01),
            // border: "1px solid",
            // borderColor: (theme) => hexToRGBA(theme.palette.primary.main, 0.5),
            borderRadius: "8px",
            color: (theme) => theme.palette.primary.main
         }}>
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Box
                  component={"label"}
                  htmlFor={`experience.${index}.title`}
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
                  placeholder='Company'
                  {...register(`experience.${index}.title`, {
                     required: "Company is required"
                  })}
                  error={Boolean(errors.experience?.[index]?.title)}
                  sx={{
                     backgroundColor: (theme) => theme.palette.background.paper
                  }}
               />
            </Grid>
            <Grid item xs={12}>
               <Box
                  component={"label"}
                  htmlFor={`experience.${index}.institution`}
                  sx={{
                     fontSize: 14,
                     fontWeight: 500,
                     mb: 0.5,
                     display: "block",
                     color: (theme) => theme.palette.text.primary
                  }}>
                  Institution
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
                  placeholder='Position'
                  {...register(`experience.${index}.institution`, {
                     required: "Position is required"
                  })}
                  error={Boolean(errors.experience?.[index]?.institution)}
                  sx={{
                     backgroundColor: (theme) => theme.palette.background.paper
                  }}
               />
            </Grid>
            <Grid item xs={6}>
               <Box
                  component={"label"}
                  htmlFor={`experience.${index}.startDate`}
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
                  {...register(`experience.${index}.startDate`, {
                     required: "Start Date is required"
                  })}
                  error={Boolean(errors.experience?.[index]?.startDate)}
                  sx={{
                     backgroundColor: (theme) => theme.palette.background.paper
                  }}
               />
            </Grid>
            <Grid item xs={6}>
               <Box
                  component={"label"}
                  htmlFor={`experience.${index}.endDate`}
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
                  {...register(`experience.${index}.endDate`, {
                     required: "End Date is required"
                  })}
                  error={Boolean(errors.experience?.[index]?.endDate)}
                  sx={{
                     backgroundColor: (theme) => theme.palette.background.paper
                  }}
               />
            </Grid>
            <Grid item xs={12}>
               <Box
                  component={"label"}
                  htmlFor={`experience.${index}.description`}
                  sx={{
                     fontSize: 14,
                     fontWeight: 500,
                     mb: 0.5,
                     display: "block",
                     color: (theme) => theme.palette.text.primary
                  }}>
                  Notes (optional)
               </Box>
               <TextField
                  fullWidth
                  variant='outlined'
                  size='small'
                  id={`experience.${index}.description`}
                  type='text'
                  placeholder='Notes'
                  {...register(`experience.${index}.description`)}
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
            <CIcon icon='tabler:plus' />
         </Box>
      </Paper>
   )
}

export default ExperienceForm

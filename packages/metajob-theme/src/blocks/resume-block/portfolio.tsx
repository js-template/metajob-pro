"use client"

import { FieldErrors, UseFormRegister, UseFormSetValue, WatchInternal } from "react-hook-form"
import { Box, Grid, Paper, TextField } from "@mui/material"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import CIcon from "../../components/common/icon"
import { ResumeFormProps } from "./types"

type Props = {
   index: number
   removeHandler: (index: number) => void
   register: UseFormRegister<ResumeFormProps>
   errors: FieldErrors<ResumeFormProps>
   setValue: UseFormSetValue<ResumeFormProps>
   watch: WatchInternal<ResumeFormProps>
}

const PortfolioForm = ({ index, removeHandler, register, errors, setValue, watch }: Props) => {
   return (
      <Paper
         sx={{
            p: 2,
            my: 1.5,
            position: "relative",
            backgroundColor: (theme) => hexToRGBA(theme.palette.primary.main, 0.01),
            borderRadius: "8px",
            color: (theme) => theme.palette.primary.main
         }}>
         <Grid container spacing={2}>
            {/* Title  */}
            <Grid item xs={12}>
               <Box
                  component={"label"}
                  htmlFor={`portfolio.${index}.title`}
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
                  {...register(`portfolio.${index}.title`, {
                     required: "title is required"
                  })}
                  error={Boolean(errors.portfolio?.[index]?.title)}
                  sx={{
                     backgroundColor: (theme) => theme.palette.background.paper
                  }}
               />
            </Grid>
            {/* Description  */}
            <Grid item xs={12}>
               <Box
                  component={"label"}
                  htmlFor={`portfolio.${index}.description`}
                  sx={{
                     fontSize: 14,
                     fontWeight: 500,
                     mb: 0.5,
                     display: "block",
                     color: (theme) => theme.palette.text.primary
                  }}>
                  Description
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
                  placeholder='Description'
                  {...register(`portfolio.${index}.description`, {
                     required: "Description is required"
                  })}
                  error={Boolean(errors.portfolio?.[index]?.description)}
                  sx={{
                     backgroundColor: (theme) => theme.palette.background.paper
                  }}
               />
            </Grid>
            {/* Lik */}
            <Grid item xs={6}>
               <Box
                  component={"label"}
                  htmlFor={`portfolio.${index}.link?.link`}
                  sx={{
                     fontSize: 14,
                     fontWeight: 500,
                     mb: 0.5,
                     display: "block",
                     color: (theme) => theme.palette.text.primary
                  }}>
                  URL
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
                  id={`urls.${index}.url`}
                  type='url'
                  placeholder='https://www.example.com'
                  {...register(`portfolio.${index}.link.link`, {
                     required: "URL is required"
                  })}
                  error={Boolean(errors.portfolio?.[index]?.link?.link)}
                  onChange={(e) => {
                     setValue(
                        `portfolio.${index}.link.label`,
                        watch(`portfolio.${index}.title`) || `Portfolio Link-${index + 1}`
                     )
                     setValue(`portfolio.${index}.link.target`, "_blank")
                     setValue(`portfolio.${index}.link.type`, "External")
                  }}
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

export default PortfolioForm

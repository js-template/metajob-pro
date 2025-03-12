"use client"
import { Fragment } from "react/jsx-runtime"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Box, Chip, Grid, LinearProgress, Skeleton, Typography, useTheme } from "@mui/material"
import { IResumeDetailsBlock } from "./types"

type Props = {
   experienceData: {
      id: number
      title: string
      description: string
      startDate: Date
      endDate: Date
      institution: string
   }[]
   isLoading?: boolean
   block: IResumeDetailsBlock
}

const ExperienceSection = ({ experienceData, isLoading, block }: Props) => {
   const theme = useTheme()
   const { experience_placeholder, empty } = block || {}
   return isLoading ? (
      <Box>
         <Skeleton
            variant='text'
            width={150}
            height={40}
            sx={{
               mb: 1.5
            }}
         />
         <LinearProgress color='inherit' />
      </Box>
   ) : (
      <Box>
         {experienceData?.length === 0 && (
            <Typography
               fontSize={16}
               fontWeight={400}
               sx={{
                  color: (theme) => theme.palette.text.disabled
               }}>
               {empty?.title || "No experience data added"}
            </Typography>
         )}

         {experienceData?.length > 0 && (
            <Fragment>
               <Typography
                  fontSize={20}
                  fontWeight={700}
                  mb={1.5}
                  sx={{
                     color: (theme) => theme.palette.text.primary
                  }}
                  textAlign={"left"}>
                  {experience_placeholder || "Experience"}
               </Typography>

               {experienceData?.map((item, index) => (
                  <Grid
                     container
                     spacing={2}
                     key={index}
                     sx={{
                        borderColor: (theme) => theme.palette.divider,
                        borderBottom: 1,
                        "&:last-child": {
                           borderBottom: 0
                        }
                     }}>
                     <Grid item xs={12} md={3}>
                        <Typography
                           fontSize={20}
                           fontWeight={500}
                           sx={{
                              color: (theme) => theme.palette.text.primary
                           }}>
                           {experienceData?.length > 1 && index + 1 + "."} {item?.title}
                        </Typography>
                        <Chip
                           label={`${item?.startDate} - ${item?.endDate}`}
                           size='small'
                           sx={{
                              backgroundColor: hexToRGBA(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                              borderColor: theme.palette.primary.main,
                              borderRadius: "6px",
                              fontWeight: 500
                           }}
                        />
                     </Grid>
                     <Grid item xs={12} md={9}>
                        <Typography fontWeight={600}>{item?.institution}</Typography>
                        <Typography fontWeight={400}>{item?.description}</Typography>
                     </Grid>
                  </Grid>
               ))}
            </Fragment>
         )}
      </Box>
   )
}

export default ExperienceSection

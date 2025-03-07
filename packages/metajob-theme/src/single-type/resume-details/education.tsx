"use client"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Box, Chip, Grid, LinearProgress, Skeleton, Typography, useTheme } from "@mui/material"
import { Fragment } from "react/jsx-runtime"

type Props = {
   educationData: {
      id: number
      title: string
      description: string
      startDate: Date
      endDate: Date
      institution: string
   }[]
   isLoading?: boolean
}

const EducationSection = ({ educationData, isLoading }: Props) => {
   const theme = useTheme()
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
         {educationData?.length === 0 && (
            <Typography
               fontSize={16}
               fontWeight={400}
               sx={{
                  color: (theme) => theme.palette.text.disabled
               }}>
               No education data added
            </Typography>
         )}

         {educationData?.length > 0 && (
            <Fragment>
               <Typography
                  fontSize={20}
                  fontWeight={700}
                  mb={1.5}
                  sx={{
                     color: (theme) => theme.palette.text.primary
                  }}
                  textAlign={"left"}>
                  Education
               </Typography>
               {educationData?.map((item, index) => (
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
                           {educationData?.length > 1 && index + 1 + "."} {item?.title}
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
                        <Box>
                           <Box>
                              {item?.institution && <Typography fontWeight={600}>From {item?.institution}</Typography>}
                              <Typography fontWeight={400}>{item?.description}</Typography>
                           </Box>
                        </Box>
                     </Grid>
                  </Grid>
               ))}
            </Fragment>
         )}
      </Box>
   )
}

export default EducationSection

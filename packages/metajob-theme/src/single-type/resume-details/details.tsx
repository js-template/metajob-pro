"use client"

import React from "react"
import { Fragment } from "react/jsx-runtime"
import { Box, CardContent, Grid, Skeleton, Typography, useTheme } from "@mui/material"
import { ISingleResume } from "./types"
import CustomPreview from "../../components/markdown-preview"
import EducationSection from "./education"
import ExperienceSection from "./experience"
import PortfolioSection from "./portfolio"

type Props = {
   data: ISingleResume
   isLoading?: boolean
}

const DetailsSection = ({ data, isLoading }: Props) => {
   const theme = useTheme()

   return (
      <CardContent
         sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 4
         }}>
         <Grid container>
            <Grid item sm={12} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
               <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
                     {isLoading ? (
                        <Skeleton variant='text' width={200} height={40} />
                     ) : (
                        <Typography
                           fontSize={20}
                           fontWeight={700}
                           color={(theme) => theme.palette.text.primary}
                           textAlign={"center"}>
                           About Me
                        </Typography>
                     )}
                  </Box>
                  <Box>
                     {isLoading ? (
                        <Fragment>
                           <Skeleton variant='text' width={"100%"} height={20} />
                           <Skeleton variant='text' width={"100%"} height={20} />
                           <Skeleton variant='text' width={"100%"} height={20} />
                           <Skeleton variant='text' width={"100%"} height={20} />
                           <Skeleton variant='text' width={"100%"} height={20} />
                        </Fragment>
                     ) : (
                        <CustomPreview
                           source={data?.about}
                           wrapperElement={{
                              "data-color-mode": theme.palette.mode
                           }}
                        />
                     )}
                  </Box>
               </Box>
            </Grid>
         </Grid>

         {/* education */}
         <EducationSection educationData={data?.education} isLoading={isLoading} />
         {/* experience */}
         <ExperienceSection experienceData={data?.experience} isLoading={isLoading} />
         {/* portfolio-section  */}
         <PortfolioSection portfolioData={data?.portfolio} isLoading={isLoading} />
      </CardContent>
   )
}

export default DetailsSection

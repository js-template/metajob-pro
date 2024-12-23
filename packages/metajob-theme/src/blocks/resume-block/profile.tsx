"use client"

import { useState } from "react"
import useSWR from "swr"
import dynamic from "next/dynamic"
import MDEditor from "@uiw/react-md-editor"
import { FieldErrors, UseFormRegister, UseFormSetValue, WatchInternal } from "react-hook-form"
import { Box, Grid, MenuItem, Select, TextField, useTheme } from "@mui/material"
import { IJobCategory, ResumeFormProps } from "./types"
import { fetcher } from "./hook"

const EditorComp = dynamic(() => import("./editor"), { ssr: false })

type Props = {
   register: UseFormRegister<ResumeFormProps>
   setValue: UseFormSetValue<ResumeFormProps>
   errors: FieldErrors<ResumeFormProps>
   watch: WatchInternal<ResumeFormProps>
}

export const ProfileForm = ({ register, errors, setValue, watch }: Props) => {
   const theme = useTheme()
   const [aboutText, setAboutText] = useState("")
   const handleEditorChange = (value?: string) => {
      setAboutText(value || "")
      setValue("about", value || "")
   }

   // fetch job-category data
   const categoryQueryParams = {
      fields: ["title"]
   }
   const categoryQueryString = encodeURIComponent(JSON.stringify(categoryQueryParams))
   const categoryAPiUrl = `/api/find?model=api/metajob-strapi/job-categories&query=${categoryQueryString}`

   const {
      data: categoryData,
      error: categoryError,
      isLoading: categoryIsLoading
   } = useSWR(categoryAPiUrl, fetcher, {
      fallbackData: []
   })

   return (
      <>
         {/* Full Name */}
         <Grid item xs={12} sm={6}>
            <Box
               component={"label"}
               htmlFor='resume-full-name'
               sx={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "text.primary",
                  mb: 1
               }}>
               Full Name
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
               id='resume-full-name'
               fullWidth
               variant='outlined'
               size='small'
               type='text'
               placeholder='Full Name'
               {...register("name", {
                  required: "Full Name is required"
               })}
               error={Boolean(errors.name)}
            />
         </Grid>

         {/* Professional Title / tagline */}
         <Grid item xs={12} sm={6}>
            <Box
               component={"label"}
               htmlFor='resume-professional-title'
               sx={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "text.primary",
                  mb: 1
               }}>
               Professional Title
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
               id='resume-professional-title'
               fullWidth
               variant='outlined'
               size='small'
               type='text'
               placeholder='Frontend Developer'
               {...register("tagline", {
                  required: "Professional Title is required"
               })}
               error={Boolean(errors.tagline)}
            />
         </Grid>

         {/* Resume Category */}
         <Grid item xs={12} sm={6}>
            <Box
               component={"label"}
               htmlFor='resume-resume-category'
               sx={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "text.primary",
                  mb: 1
               }}>
               Resume Category
               <Box
                  component={"span"}
                  sx={{
                     color: "error.main",
                     ml: 0.5
                  }}>
                  *
               </Box>
            </Box>
            <Select
               displayEmpty
               fullWidth
               variant='outlined'
               id='resume-resume-category'
               size='small'
               placeholder='Select Category'
               {...register("category", {
                  required: "Resume Category is required"
               })}
               defaultValue={watch("category") || ""}
               error={Boolean(errors.category)}>
               <MenuItem disabled value=''>
                  Select Category
               </MenuItem>
               {categoryData &&
                  categoryData?.map((categoryItem: IJobCategory, index: number) => {
                     const { attributes, id } = categoryItem || {}
                     const { title } = attributes || {}
                     return (
                        <MenuItem key={index} value={id}>
                           {title}
                        </MenuItem>
                     )
                  })}
            </Select>
         </Grid>

         {/* Experience Time */}
         <Grid item xs={12} sm={6}>
            <Box
               component={"label"}
               htmlFor='resume-experience-time'
               sx={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "text.primary",
                  mb: 1
               }}>
               Experience Time
               <Box
                  component={"span"}
                  sx={{
                     color: "error.main",
                     ml: 0.5
                  }}>
                  *
               </Box>
            </Box>
            <Select
               fullWidth
               variant='outlined'
               id='resume-experience-time'
               displayEmpty
               size='small'
               placeholder='Select Time'
               {...register("experienceTime", {
                  required: "Experience Time is required"
               })}
               error={Boolean(errors.experienceTime)}
               defaultValue={watch("experienceTime") || ""}
               value={watch("experienceTime") || ""}
               // renderValue={(selected: any) => {
               //   if (!selected) {
               //     return (
               //       <Box
               //         component={"span"}
               //         sx={{
               //           color: "text.secondary",
               //         }}
               //       >
               //         Select Time
               //       </Box>
               //     );
               //   }
               //   return selected;
               // }}
            >
               <MenuItem disabled value=''>
                  Select Time
               </MenuItem>
               <MenuItem value='Freshers'>Freshers</MenuItem>
               <MenuItem value='Junior'>Junior</MenuItem>
               <MenuItem value='Mid-Level'>Mid-Level</MenuItem>
               <MenuItem value='Senior'>Senior</MenuItem>
               <MenuItem value='Lead'>Lead</MenuItem>
            </Select>
         </Grid>

         {/* Qualification */}
         <Grid item xs={12} sm={6}>
            <Box
               component={"label"}
               htmlFor='resume-qualification'
               sx={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "text.primary",
                  mb: 1
               }}>
               Qualification
               <Box
                  component={"span"}
                  sx={{
                     color: "error.main",
                     ml: 0.5
                  }}>
                  *
               </Box>
            </Box>
            <Select
               fullWidth
               variant='outlined'
               id='resume-qualification'
               displayEmpty
               size='small'
               placeholder='Select Qualification'
               {...register("qualification", {
                  required: "Qualification is required"
               })}
               error={Boolean(errors.qualification)}
               defaultValue={watch("qualification") || ""}
               value={watch("qualification") || ""}
               // renderValue={(selected: any) => {
               //   if (!selected) {
               //     return (
               //       <Box
               //         component={"span"}
               //         sx={{
               //           color: "text.secondary",
               //         }}
               //       >
               //         Select Qualification
               //       </Box>
               //     );
               //   }
               //   return selected;
               // }}
            >
               <MenuItem disabled value=''>
                  Select Qualification
               </MenuItem>
               <MenuItem value='Bachelor’s Degree'>Bachelor’s Degree</MenuItem>
               <MenuItem value='Master’s Degree'>Master’s Degree</MenuItem>
               <MenuItem value='Doctoral Degree (Ph.D.)'>Doctoral Degree (Ph.D.)</MenuItem>
               <MenuItem value='Associate Degree'>Associate Degree</MenuItem>
               <MenuItem value='Diploma'>Diploma</MenuItem>
               <MenuItem value='Certificate'>Certificate</MenuItem>
            </Select>
         </Grid>

         {/* Languages */}
         <Grid item xs={12} sm={6}>
            <Box
               component={"label"}
               htmlFor='resume-languages'
               sx={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "text.primary",
                  mb: 1
               }}>
               Languages
               <Box
                  component={"span"}
                  sx={{
                     color: "error.main",
                     ml: 0.5
                  }}>
                  *
               </Box>
            </Box>
            <Select
               fullWidth
               variant='outlined'
               id='resume-languages'
               displayEmpty
               size='small'
               placeholder='Select Languages'
               {...register("language", {
                  required: "Languages are required"
               })}
               error={Boolean(errors.language)}
               defaultValue={watch("language") || ""}
               value={watch("language") || ""}
               // renderValue={(selected: any) => {
               //   if (!selected) {
               //     return (
               //       <Box
               //         component={"span"}
               //         sx={{
               //           color: "text.secondary",
               //         }}
               //       >
               //         Select Languages
               //       </Box>
               //     );
               //   }
               //   return selected;
               // }}
            >
               <MenuItem disabled value=''>
                  Select Languages
               </MenuItem>
               <MenuItem value='Arabic'>Arabic</MenuItem>
               <MenuItem value='Bengali'>Bengali</MenuItem>
               <MenuItem value='Bulgarian'>Bulgarian</MenuItem>
               <MenuItem value='Chinese (Simplified)'>Chinese (Simplified)</MenuItem>
               <MenuItem value='Chinese (Traditional)'>Chinese (Traditional)</MenuItem>
               <MenuItem value='Dutch'>Dutch</MenuItem>
               <MenuItem value='English'>English</MenuItem>
               <MenuItem value='French'>French</MenuItem>
               <MenuItem value='German'>German</MenuItem>
               <MenuItem value='Greek'>Greek</MenuItem>
               <MenuItem value='Hindi'>Hindi</MenuItem>
               <MenuItem value='Italian'>Italian</MenuItem>
               <MenuItem value='Japanese'>Japanese</MenuItem>
               <MenuItem value='Portuguese'>Portuguese</MenuItem>
               <MenuItem value='Russian'>Russian</MenuItem>
               <MenuItem value='Spanish'>Spanish</MenuItem>
               <MenuItem value='Swedish'>Swedish</MenuItem>
               <MenuItem value='Tamil'>Tamil</MenuItem>
            </Select>
         </Grid>

         {/* Salary Type */}
         <Grid item xs={12} sm={6}>
            <Box
               component={"label"}
               htmlFor='resume-salary-type'
               sx={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "text.primary",
                  mb: 1
               }}>
               Salary Type
               <Box
                  component={"span"}
                  sx={{
                     color: "error.main",
                     ml: 0.5
                  }}>
                  *
               </Box>
            </Box>
            <Select
               fullWidth
               variant='outlined'
               id='resume-salary-type'
               displayEmpty
               size='small'
               placeholder='Select Salary Type'
               {...register("salaryType", {
                  required: "Salary Type is required"
               })}
               error={Boolean(errors.salaryType)}
               defaultValue={watch("salaryType") || ""}
               value={watch("salaryType") || ""}
               // renderValue={(selected: any) => {
               //   if (!selected) {
               //     return (
               //       <Box
               //         component={"span"}
               //         sx={{
               //           color: "text.secondary",
               //         }}
               //       >
               //         Select Salary Type
               //       </Box>
               //     );
               //   }
               //   return selected;
               // }}
            >
               <MenuItem disabled value=''>
                  Select Salary Type
               </MenuItem>
               <MenuItem value='Monthly'>Monthly</MenuItem>
               <MenuItem value='Weekly'>Weekly</MenuItem>
               <MenuItem value='Hourly'>Hourly</MenuItem>
               <MenuItem value='Daily'>Daily</MenuItem>
               <MenuItem value='Annually'>Annually</MenuItem>
               <MenuItem value='Per Project'>Per Project</MenuItem>
               <MenuItem value='Commission-based'>Commission-based</MenuItem>
            </Select>
         </Grid>

         {/* Salary Amount */}
         <Grid item xs={12} sm={6}>
            <Box
               component={"label"}
               htmlFor='resume-salary-type'
               sx={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "text.primary",
                  mb: 1
               }}>
               Salary
               <Box
                  component={"span"}
                  sx={{
                     color: "error.main",
                     ml: 0.5
                  }}>
                  *
               </Box>
            </Box>
            {/* use number salary field */}
            <TextField
               id='resume-salary'
               fullWidth
               variant='outlined'
               size='small'
               type='number'
               placeholder='Salary'
               {...register("salary", {
                  required: "Salary is required"
               })}
               error={Boolean(errors.salary)}
            />
         </Grid>

         {/* About me */}
         <Grid item xs={12}>
            <Box
               component={"label"}
               htmlFor='resume-cover-letter'
               sx={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "text.primary",
                  mb: 1
               }}>
               Cover Letter
               {/* <Box
            component={"span"}
            sx={{
              color: "error.main",
              ml: 0.5,
            }}
          >
            *
          </Box> */}
            </Box>
            <MDEditor
               // value={aboutText}
               value={watch("about") || ""}
               onChange={handleEditorChange}
               preview='edit'
               data-color-mode={theme.palette.mode}
            />
         </Grid>
      </>
   )
}

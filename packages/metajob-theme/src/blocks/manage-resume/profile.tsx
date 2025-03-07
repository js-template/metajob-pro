"use client"
import { useState } from "react"
import MDEditor from "@uiw/react-md-editor"
import { FieldErrors, UseFormRegister, UseFormSetValue, WatchInternal } from "react-hook-form"
import { Box, Grid, MenuItem, Select, TextField, useTheme } from "@mui/material"
import { IJobCategory, IResumeAttribute, ResumeFormProps } from "./types"

type Props = {
   register: UseFormRegister<ResumeFormProps>
   setValue: UseFormSetValue<ResumeFormProps>
   errors: FieldErrors<ResumeFormProps>
   watch: WatchInternal<ResumeFormProps>
   resumeAttributes?: IResumeAttribute
}

export const ProfileForm = ({ register, errors, setValue, watch, resumeAttributes }: Props) => {
   const theme = useTheme()
   const [aboutText, setAboutText] = useState("")
   const handleEditorChange = (value?: string) => {
      setAboutText(value || "")
      setValue("about", value || "")
   }

   const categoryData = resumeAttributes?.categoryData
   const experienceData = resumeAttributes?.experienceData
   const avgSalaryData = resumeAttributes?.avgSalaryData
   const salaryTypesData = resumeAttributes?.salaryTypesData

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

         {/* Slug */}
         <Grid item xs={12} sm={6}>
            <Box
               component={"label"}
               htmlFor='resume-slug'
               sx={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "text.primary",
                  mb: 1
               }}>
               Slug
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
               id='resume-slug'
               fullWidth
               variant='outlined'
               size='small'
               type='text'
               placeholder='Resume Slug'
               {...register("slug", {
                  required: "Slug is required"
               })}
               error={Boolean(errors.slug)}
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
                     return (
                        // <MenuItem key={index} value={index}>
                        <MenuItem key={index} value={categoryItem?.documentId}>
                           {categoryItem?.title}
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
               {...register("experience_time", {
                  required: "Experience Time is required"
               })}
               error={Boolean(errors.experience_time)}
               defaultValue={watch("experience_time") || ""}
               value={watch("experience_time") || ""}>
               <MenuItem disabled value=''>
                  Select Time
               </MenuItem>
               {experienceData &&
                  experienceData?.length > 0 &&
                  experienceData?.map((expItem: IJobCategory, index: number) => (
                     <MenuItem key={index} value={expItem?.documentId}>
                        {expItem?.title}
                     </MenuItem>
                  ))}
               {/* <MenuItem value='Freshers'>Freshers</MenuItem>
               <MenuItem value='Junior'>Junior</MenuItem>
               <MenuItem value='Mid-Level'>Mid-Level</MenuItem>
               <MenuItem value='Senior'>Senior</MenuItem>
               <MenuItem value='Lead'>Lead</MenuItem> */}
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

         {/* Salary Amount */}
         <Grid item xs={12} sm={6}>
            <Box
               component={"label"}
               htmlFor='resume-salary'
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
            <Select
               fullWidth
               variant='outlined'
               id='resume-salary'
               displayEmpty
               size='small'
               {...register("salary", {
                  required: "Salary is required"
               })}
               error={Boolean(errors.salary)}
               defaultValue={watch("salary") || ""}
               value={watch("salary") || ""}>
               <MenuItem disabled value=''>
                  Select Average Salary
               </MenuItem>
               {avgSalaryData &&
                  avgSalaryData?.length > 0 &&
                  avgSalaryData?.map((expItem: IJobCategory, index: number) => (
                     <MenuItem key={index} value={expItem?.documentId}>
                        {expItem?.title}
                     </MenuItem>
                  ))}
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
               {...register("salary_type", {
                  required: "Salary Type is required"
               })}
               error={Boolean(errors.salary_type)}
               defaultValue={watch("salary_type") || ""}
               value={watch("salary_type") || ""}>
               <MenuItem disabled value=''>
                  Select Salary Type
               </MenuItem>
               {salaryTypesData &&
                  salaryTypesData?.length > 0 &&
                  salaryTypesData?.map((expItem: IJobCategory, index: number) => (
                     <MenuItem key={index} value={expItem?.documentId}>
                        {expItem?.title}
                     </MenuItem>
                  ))}
               {/* <MenuItem value='Monthly'>Monthly</MenuItem>
               <MenuItem value='Weekly'>Weekly</MenuItem>
               <MenuItem value='Hourly'>Hourly</MenuItem>
               <MenuItem value='Daily'>Daily</MenuItem>
               <MenuItem value='Annually'>Annually</MenuItem>
               <MenuItem value='Per Project'>Per Project</MenuItem>
               <MenuItem value='Commission-based'>Commission-based</MenuItem> */}
            </Select>
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

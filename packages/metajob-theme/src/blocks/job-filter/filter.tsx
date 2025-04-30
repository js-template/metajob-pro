"use client"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"
import _ from "lodash"
import {
   Stack,
   Card,
   Typography,
   Divider,
   TextField,
   FormControl,
   Select,
   MenuItem,
   FormControlLabel,
   Checkbox as MuiCheckbox,
   Box
} from "@mui/material"
import { IFilterAttributes, IJobType } from "./types"

type Props = {
   search: {
      id: number
      title: string
      search_placeholder: string
      location_placeholder: string
      category_placeholder: string
      experience_placeholder: string
      type_placeholder: string
      sort_placeholder: string
      skill_placeholder: string
      button_placeholder: string
   }
   searchOptions: {
      searchText?: string
      location?: string
      category?: string
      sort?: string
   }
   setSearchOptions: (options: any) => void
   setSelectedJobTypes: (options: string[]) => void
   setSelectedJobExperience: (options: string[]) => void
   setSelectedJobSkills: (options: string[]) => void
   color?: string
   secondary_color?: string

   selectedJobTypes: string[]
   selectedJobExperience: string[]
   selectedJobSkills: string[]

   //    isLoading?: boolean
   jobFilterAttributes?: IFilterAttributes
}

const JobFilterSection = ({
   search,
   searchOptions,
   color,
   secondary_color,
   selectedJobTypes,
   selectedJobExperience,
   selectedJobSkills,
   setSearchOptions,
   setSelectedJobTypes,
   setSelectedJobExperience,
   setSelectedJobSkills,
   jobFilterAttributes
}: Props) => {
   const { theme: mode } = useTheme()
   const searchParams = useSearchParams()
   const router = useRouter()

   const {
      title: searchTitle,
      search_placeholder,
      location_placeholder,
      category_placeholder,
      experience_placeholder,
      skill_placeholder,
      type_placeholder,
      sort_placeholder,
      button_placeholder
   } = search || {}
   const { categoryData, jobTypesData, jobExperienceData, jobSkillsData } = jobFilterAttributes || {}

   // Handle form submission
   const handleSubmit = (e: any) => {
      e.preventDefault()
      // At this point, the filters are already stored in `searchFilters` through handleChange
      // You can trigger any additional logic here, but the form data (filters) is ready
   }

   // get params data
   const {
      search: urlSearch,
      location: urlLocation,
      category: urlCategory,
      type: urType,
      experience: urlExperience,
      skills: urlSkill
   } = Object.fromEntries(searchParams.entries())

   useEffect(() => {
      setSearchOptions((prevOptions) => ({
         ...prevOptions,
         searchText: urlSearch || prevOptions.searchText,
         category: urlCategory || prevOptions.category,
         location: urlLocation || prevOptions.location
      }))

      setSelectedJobTypes(urType ? urType.split(",") : [])
      setSelectedJobExperience(urlExperience ? urlExperience.split(",") : [])
      setSelectedJobSkills(urlSkill ? urlSkill.split(",") : [])
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const handleSearchTextChange = (searchTextValue: string) => {
      const currentParams = new URLSearchParams(searchParams)
      if (!searchTextValue) {
         currentParams.delete("search")
      } else {
         currentParams.set("search", searchTextValue)
      }
      router.replace(`?${currentParams.toString()}`, { scroll: false })
      setSearchOptions({
         ...searchOptions,
         searchText: searchTextValue
      })
   }

   const handleJobCategoryChange = (selectValue: string) => {
      const currentParams = new URLSearchParams(searchParams)
      if (!selectValue) {
         currentParams.delete("category")
      } else {
         currentParams.set("category", selectValue)
      }
      router.replace(`?${currentParams.toString()}`, { scroll: false })
      setSearchOptions({
         ...searchOptions,
         category: selectValue
      })
   }

   const handleJobTypesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, name } = event.target
      const updatedTypes = checked ? [...selectedJobTypes, name] : selectedJobTypes.filter((type) => type !== name)
      setSelectedJobTypes(updatedTypes)
      const params = new URLSearchParams(searchParams)
      if (updatedTypes.length) {
         params.set("type", updatedTypes.join(","))
      } else {
         params.delete("type")
      }
      router.replace(`?${params.toString()}`, { scroll: false })
   }

   const handleJobExperienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, name } = event.target
      const updatedExperience = checked
         ? [...selectedJobExperience, name]
         : selectedJobExperience.filter((type) => type !== name)
      setSelectedJobExperience(updatedExperience)
      const params = new URLSearchParams(searchParams)
      if (updatedExperience.length) {
         params.set("experience", updatedExperience.join(","))
      } else {
         params.delete("experience")
      }
      router.replace(`?${params.toString()}`, { scroll: false })
   }

   const handleJobSkillsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, name } = event.target
      const updatedSkills = checked ? [...selectedJobSkills, name] : selectedJobSkills.filter((type) => type !== name)
      setSelectedJobSkills(updatedSkills)
      const params = new URLSearchParams(searchParams)
      if (updatedSkills.length) {
         params.set("skills", updatedSkills.join(","))
      } else {
         params.delete("skills")
      }
      router.replace(`?${params.toString()}`, { scroll: false })
   }

   return (
      <Card
         sx={{
            borderRadius: 2,
            p: 0,
            backgroundColor: "background.paper",
            boxShadow: 0
         }}>
         <Stack spacing={2} pb={3}>
            <Stack px={3} pt={2} direction={"row"} justifyItems={"center"} justifyContent={"space-between"}>
               <Typography
                  fontSize={16}
                  fontWeight={700}
                  sx={{
                     color: (theme) =>
                        mode === "light" ? color || theme.palette.text.secondary : theme.palette.text.secondary
                  }}>
                  {searchTitle}
               </Typography>
               <Typography
                  fontSize={16}
                  fontWeight={700}
                  sx={{
                     color: (theme) => theme.palette.error.main,
                     cursor: "pointer",
                     display:
                        searchOptions?.searchText ||
                        searchOptions?.location ||
                        searchOptions?.category ||
                        selectedJobTypes?.length > 0 ||
                        selectedJobExperience?.length > 0 ||
                        selectedJobSkills?.length > 0
                           ? "block"
                           : "none"
                  }}
                  onClick={(e) => {
                     router.replace("?", { scroll: false })
                     setSearchOptions({
                        ...searchOptions,
                        searchText: "",
                        location: "",
                        category: ""
                     })
                     setSelectedJobTypes([])
                     setSelectedJobExperience([])
                     setSelectedJobSkills([])
                  }}>
                  Clear
               </Typography>
            </Stack>
            <Divider />
            <Stack px={3} spacing={2} component={"form"} onSubmit={handleSubmit}>
               {search_placeholder && (
                  <TextField
                     sx={{
                        "& .MuiInputBase-root": {
                           border: "none",
                           py: "3px",
                           backgroundColor: (theme) => theme.palette.background.default
                        }
                     }}
                     placeholder={search_placeholder}
                     fullWidth
                     size='small'
                     value={searchOptions.searchText}
                     onChange={(e) => {
                        handleSearchTextChange(e.target.value)
                     }}
                  />
               )}
               {/* {location_placeholder && (
            <TextField
               sx={{
                  "& .MuiInputBase-root": {
                     border: "none",
                     py: "3px",
                     backgroundColor: (theme) => theme.palette.background.default
                  }
               }}
               placeholder={location_placeholder}
               fullWidth
               size='small'
               value={searchOptions?.location}
               onChange={(e) =>
                  setSearchOptions({
                     ...searchOptions,
                     location: e.target.value
                  })
               }
            />
         )} */}
               {/* category select  */}
               {category_placeholder && (
                  <FormControl fullWidth>
                     <Select
                        displayEmpty
                        sx={{
                           pl: 1.5,
                           //  textAlign: 'center',
                           color: (theme) =>
                              mode === "light"
                                 ? secondary_color || theme.palette.text.secondary
                                 : theme.palette.text.secondary,
                           fontWeight: 400,
                           fontSize: 16,
                           borderRadius: 2,
                           "& .MuiSelect-select": {
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.secondary
                                    : theme.palette.text.secondary
                           },
                           "&.MuiOutlinedInput-root": {
                              border: "none",
                              backgroundColor: (theme) => theme.palette.background.default
                           }
                        }}
                        variant='outlined'
                        size='small'
                        value={searchOptions?.category || ""}
                        onChange={(e) => {
                           handleJobCategoryChange(e.target.value)
                        }}>
                        <MenuItem
                           value={""}
                           sx={{
                              fontSize: "16px",
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.secondary
                                    : theme.palette.text.secondary
                           }}>
                           {category_placeholder}
                        </MenuItem>
                        {_.map(categoryData, (item) => (
                           <MenuItem
                              key={item?.id}
                              value={item?.title}
                              sx={{
                                 fontSize: "16px",
                                 color: (theme) =>
                                    mode === "light"
                                       ? secondary_color || theme.palette.text.secondary
                                       : theme.palette.text.secondary
                              }}>
                              {item?.title}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               )}
               {/* job-type check box  */}
               {type_placeholder && (
                  <Stack spacing={2}>
                     <Divider />
                     <Typography
                        fontSize={16}
                        fontWeight={700}
                        sx={{
                           color: (theme) =>
                              mode === "light" ? color || theme.palette.text.secondary : theme.palette.text.secondary
                        }}>
                        {type_placeholder || "Job Type"}
                     </Typography>
                     {_.map(jobTypesData, (typeItem: IJobType) => (
                        <FormControlLabel
                           key={typeItem?.id}
                           sx={{
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.secondary
                                    : theme.palette.text.secondary
                           }}
                           control={
                              <MuiCheckbox
                                 name={typeItem?.value}
                                 checked={selectedJobTypes.includes(typeItem?.value)}
                                 onChange={handleJobTypesChange}
                                 icon={
                                    <Box
                                       sx={{
                                          bgcolor: (theme) => theme.palette.divider,
                                          height: 24,
                                          width: 24,
                                          transform: "scale(0.8)",
                                          borderRadius: 1
                                       }}
                                    />
                                 }
                                 sx={{ py: 0 }}
                                 disableRipple
                              />
                           }
                           label={typeItem?.title}
                        />
                     ))}
                  </Stack>
               )}
               {/* job-experience check box  */}
               {experience_placeholder && (
                  <Stack spacing={2}>
                     <Divider />
                     <Typography
                        fontSize={16}
                        fontWeight={700}
                        sx={{
                           color: (theme) =>
                              mode === "light" ? color || theme.palette.text.secondary : theme.palette.text.secondary
                        }}>
                        {experience_placeholder || "Job Experience"}
                     </Typography>
                     {_.map(jobExperienceData, (expItem: IJobType) => (
                        <FormControlLabel
                           key={expItem?.id}
                           sx={{
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.secondary
                                    : theme.palette.text.secondary
                           }}
                           control={
                              <MuiCheckbox
                                 name={expItem?.value}
                                 checked={selectedJobExperience.includes(expItem?.value)}
                                 onChange={handleJobExperienceChange}
                                 icon={
                                    <Box
                                       sx={{
                                          bgcolor: (theme) => theme.palette.divider,
                                          height: 24,
                                          width: 24,
                                          transform: "scale(0.8)",
                                          borderRadius: 1
                                       }}
                                    />
                                 }
                                 sx={{ py: 0 }}
                                 disableRipple
                              />
                           }
                           label={expItem?.title}
                        />
                     ))}
                  </Stack>
               )}
               {/* job-skills check box  */}
               {skill_placeholder && (
                  <Stack spacing={2}>
                     <Divider />
                     <Typography
                        fontSize={16}
                        fontWeight={700}
                        sx={{
                           color: (theme) =>
                              mode === "light" ? color || theme.palette.text.secondary : theme.palette.text.secondary
                        }}>
                        {skill_placeholder || "Job Skills"}
                     </Typography>
                     {_.map(jobSkillsData, (skillItem: IJobType) => (
                        <FormControlLabel
                           key={skillItem?.id}
                           sx={{
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.secondary
                                    : theme.palette.text.secondary
                           }}
                           control={
                              <MuiCheckbox
                                 name={skillItem?.value}
                                 checked={selectedJobSkills.includes(skillItem?.value)}
                                 onChange={handleJobSkillsChange}
                                 icon={
                                    <Box
                                       sx={{
                                          bgcolor: (theme) => theme.palette.divider,
                                          height: 24,
                                          width: 24,
                                          transform: "scale(0.8)",
                                          borderRadius: 1
                                       }}
                                    />
                                 }
                                 sx={{ py: 0 }}
                                 disableRipple
                              />
                           }
                           label={skillItem?.title}
                        />
                     ))}
                  </Stack>
               )}
               {button_placeholder && <Divider />}
               {/* {button_placeholder && (
            <Button disabled={isLoading} variant='contained' type='submit'>
               {button_placeholder}
            </Button>
         )} */}
            </Stack>
         </Stack>
      </Card>
   )
}

export default JobFilterSection

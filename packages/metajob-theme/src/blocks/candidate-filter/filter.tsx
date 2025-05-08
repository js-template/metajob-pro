"use client"
import { useTheme } from "next-themes"
import {
   Button,
   Divider,
   FormControl,
   FormControlLabel,
   MenuItem,
   Select,
   Stack,
   TextField,
   Typography,
   Checkbox as MuiCheckbox,
   Box
} from "@mui/material"
import _ from "lodash"
import { Card } from "../../components/common/card"
import { ICandidateFilterProps, ISingleCategory } from "./types"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

type Props = {
   search: {
      title?: string
      search_placeholder?: string
      category_placeholder?: string
      button_placeholder?: string
      skill_placeholder?: string
   }
   filterFormData: ICandidateFilterProps
   setFilterFormData: (data: ICandidateFilterProps) => void
   //handleSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
   loading: boolean
   categoryData?: ISingleCategory[]
   skillsData?: ISingleCategory[]
   color?: string
   secondary_color?: string
}

export default function CandidateFilterSection({
   search,
   loading,
   filterFormData,
   setFilterFormData,
   categoryData,
   skillsData,
   color,
   secondary_color
}: Props) {
   const searchParams = useSearchParams()
   const router = useRouter()
   const { theme: mode } = useTheme()
   const {
      title: searchTitle,
      search_placeholder,
      category_placeholder,
      skill_placeholder,
      button_placeholder
   } = search || {}

   // get params data
   const { search: urlSearch, category: urlCategory, skills: urlSkill } = Object.fromEntries(searchParams.entries())

   // Update state based on URL search params
   useEffect(() => {
      setFilterFormData({
         ...filterFormData,
         search: urlSearch || "",
         categories: urlCategory || "",
         skills: urlSkill ? urlSkill.split(",") : []
      })
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
      setFilterFormData({ ...filterFormData, search: searchTextValue })
   }
   const handleJobCategoryChange = (selectValue: string) => {
      const currentParams = new URLSearchParams(searchParams)
      if (!selectValue) {
         currentParams.delete("category")
      } else {
         currentParams.set("category", selectValue)
      }
      router.replace(`?${currentParams.toString()}`, { scroll: false })
      setFilterFormData({
         ...filterFormData,
         categories: selectValue
      })
   }

   const handleJobSkillsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, name } = event.target
      const updatedSkills = checked
         ? [...(filterFormData?.skills || []), name]
         : filterFormData?.skills?.filter((skill) => skill !== name) || []
      setFilterFormData({
         ...filterFormData,
         skills: updatedSkills
      })
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
                        mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary
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
                        filterFormData?.search ||
                        filterFormData?.skills?.length > 0 ||
                        filterFormData?.categories ||
                        filterFormData?.rate
                           ? "block"
                           : "none"
                  }}
                  onClick={() => {
                     router.replace("?", { scroll: false })
                     setFilterFormData({
                        search: "",
                        skills: [],
                        categories: "",
                        rate: ""
                     })
                  }}>
                  Clear
               </Typography>
            </Stack>
            <Divider />
            <Stack
               px={3}
               spacing={2}
               component={"form"}
               //onSubmit={handleSubmitForm}
            >
               {search && (
                  <TextField
                     sx={{
                        "& .MuiInputBase-root": {
                           border: "none",
                           py: "3px",
                           backgroundColor: (theme) => theme.palette.background.default
                        }
                     }}
                     placeholder={search_placeholder || "Search"}
                     fullWidth
                     size='small'
                     value={filterFormData?.search}
                     onChange={(e) => {
                        handleSearchTextChange(e.target.value)
                     }}
                  />
               )}

               {/* category filter */}
               {category_placeholder && (
                  <FormControl fullWidth>
                     <Select
                        displayEmpty
                        sx={{
                           backgroundColor: (theme) => theme.palette.background.default,
                           pl: 1.5,
                           //  textAlign: 'center',
                           color: (theme) => theme.palette.text.secondary,
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
                        value={filterFormData?.categories || ""}
                        onChange={(e) => {
                           handleJobCategoryChange(e.target.value)
                        }}>
                        <MenuItem
                           value={""}
                           sx={{
                              fontSize: "16px",
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.disabled
                                    : theme.palette.text.disabled
                           }}>
                           {category_placeholder || "Select Category"}
                        </MenuItem>
                        {_.map(categoryData, (item, index) => (
                           <MenuItem
                              key={index}
                              value={item?.title}
                              sx={{
                                 fontSize: "16px",
                                 color: (theme) =>
                                    mode === "light"
                                       ? secondary_color || theme.palette.text.disabled
                                       : theme.palette.text.disabled
                              }}>
                              {item?.title}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               )}

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
                     {_.map(skillsData, (skillItem: ISingleCategory) => (
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
                                 checked={filterFormData?.skills?.includes(skillItem?.value)}
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

               {/* {rate && (
                  <FormControl fullWidth>
                     <Select
                        sx={{
                           backgroundColor: (theme) => theme.palette.background.default,
                           pl: 1.5,
                           //  textAlign: 'center',
                           color: (theme) => theme.palette.text.secondary,
                           fontWeight: 400,
                           fontSize: 16,
                           borderRadius: 2,
                           "& .MuiSelect-select": {
                              color: (theme) => theme.palette.text.secondary
                           },
                           "&.MuiOutlinedInput-root": {
                              border: "none",
                              backgroundColor: (theme) => theme.palette.background.default
                           }
                        }}
                        variant='outlined'
                        disableUnderline
                        size='small'
                        value={filterFormData?.rate || "Rate"}
                        onChange={(e) => setFilterFormData({ ...filterFormData, rate: e.target.value })}>
                        <MenuItem value={"Rate"}>Rate</MenuItem>
                        {_.map(rate, (item, index) => (
                           <MenuItem key={index} value={item}>
                              {item}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               )} */}
               {button_placeholder && (
                  <Button variant='contained' type='submit' disabled={loading}>
                     {button_placeholder}
                  </Button>
               )}
            </Stack>
         </Stack>
      </Card>
   )
}

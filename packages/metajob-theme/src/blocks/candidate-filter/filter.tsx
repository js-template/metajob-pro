"use client"
import { Button, Divider, FormControl, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import _ from "lodash"
import { Card } from "../../components/common/card"
import { ICandidateFilterProps, ISingleCategory } from "./types"

type Props = {
   search: {
      title?: string
      search_placeholder?: string
      category_placeholder?: string
      button_placeholder?: string
   }
   filterFormData: ICandidateFilterProps
   setFilterFormData: (data: ICandidateFilterProps) => void
   //handleSubmitForm: (e: React.FormEvent<HTMLFormElement>) => void;
   loading: boolean
   categoryData?: ISingleCategory[]
}

export default function CandidateFilterSection({
   search,
   loading,
   filterFormData,
   setFilterFormData,
   categoryData
}: Props) {
   const { title: searchTitle, search_placeholder, category_placeholder, button_placeholder } = search || {}

   return (
      <Card
         sx={{
            borderRadius: 2,
            p: 0
         }}>
         <Stack spacing={2} pb={3}>
            <Stack px={3} pt={2} direction={"row"} justifyItems={"center"} justifyContent={"space-between"}>
               <Typography
                  fontSize={16}
                  fontWeight={700}
                  sx={{
                     color: (theme) => theme.palette.text.primary
                  }}>
                  {searchTitle}
               </Typography>
               <Typography
                  fontSize={16}
                  fontWeight={700}
                  sx={{
                     color: (theme) => theme.palette.text.primary,
                     cursor: "pointer",
                     display:
                        filterFormData?.search ||
                        filterFormData?.skills ||
                        filterFormData?.categories ||
                        filterFormData?.rate
                           ? "block"
                           : "none"
                  }}
                  onClick={() =>
                     setFilterFormData({
                        search: "",
                        skills: "",
                        categories: "",
                        rate: ""
                     })
                  }>
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
                     placeholder={search_placeholder}
                     fullWidth
                     size='small'
                     value={filterFormData?.search}
                     onChange={(e) => setFilterFormData({ ...filterFormData, search: e.target.value })}
                  />
               )}
               {/* {skills && (
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
                        value={filterFormData?.skills || "Skills"}
                        onChange={(e) =>
                           setFilterFormData({
                              ...filterFormData,
                              skills: e.target.value
                           })
                        }>
                        <MenuItem value={"Skills"}>Skills</MenuItem>
                        {_.map(skills?.data, (item, index) => (
                           <MenuItem key={index} value={item?.id}>
                              {item?.attributes?.title}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               )} */}
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
                           color: (theme) => theme.palette.text.secondary
                        },
                        "&.MuiOutlinedInput-root": {
                           border: "none",
                           backgroundColor: (theme) => theme.palette.background.default
                        }
                     }}
                     variant='outlined'
                     size='small'
                     value={filterFormData?.categories || ""}
                     onChange={(e) =>
                        setFilterFormData({
                           ...filterFormData,
                           categories: e.target.value
                        })
                     }>
                     <MenuItem value={""} sx={{ fontSize: "16px" }}>
                        {category_placeholder || "Select Category"}
                     </MenuItem>
                     {_.map(categoryData, (item, index) => (
                        <MenuItem key={index} value={item?.id} sx={{ fontSize: "16px" }}>
                           {item?.title}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
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

"use client"
import { useTheme } from "next-themes"
import _ from "lodash"
import { Divider, FormControl, MenuItem, Select, Stack, TextField, Typography, Button } from "@mui/material"
import { Card } from "../../components/common/card"
import { ICompanyFilterProps, ISingleCategory } from "./types"

type Props = {
   search: {
      title?: string
      search_placeholder?: string
      category_placeholder?: string
      button_placeholder?: string
   }
   setFormData: (data: ICompanyFilterProps) => void
   formData: ICompanyFilterProps
   loading: boolean
   categoryData?: ISingleCategory[]
   color?: string
   secondary_color?: string
}

const CompanyFilterSection = ({
   search,
   formData,
   setFormData,
   loading,
   categoryData,
   color,
   secondary_color
}: Props) => {
   const { theme: mode } = useTheme()

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
                        formData?.companyName ||
                        formData?.selectedIndustry ||
                        formData?.selectedCompanySize ||
                        formData?.selectedAverageSalary ||
                        formData?.selectedRevenue
                           ? "block"
                           : "none"
                  }}
                  onClick={() =>
                     setFormData({
                        companyName: "",
                        selectedIndustry: "",
                        selectedCompanySize: "",
                        selectedAverageSalary: "",
                        selectedRevenue: ""
                     })
                  }>
                  Clear
               </Typography>
            </Stack>
            <Divider />
            {/* INFO: might be onSubmit={handleFilter} here */}
            <Stack px={3} spacing={2} component={"form"}>
               {/* company-name-filter  */}
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
                     value={formData?.companyName}
                     onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
               )}
               {/* industry-filter  */}
               {category_placeholder && (
                  <FormControl fullWidth>
                     <Select
                        displayEmpty
                        sx={{
                           backgroundColor: (theme) => theme.palette.background.default,
                           pl: 1.5,
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
                        value={formData.selectedIndustry || ""}
                        onChange={(e) => setFormData({ ...formData, selectedIndustry: e.target.value })}>
                        <MenuItem
                           value=''
                           sx={{
                              fontSize: "16px",
                              color: (theme) =>
                                 mode === "light"
                                    ? secondary_color || theme.palette.text.secondary
                                    : theme.palette.text.secondary
                           }}>
                           {category_placeholder}
                        </MenuItem>
                        {_.map(categoryData, (item, index) => (
                           <MenuItem
                              key={index}
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

               {/* {company_size && (
                  <FormControl fullWidth>
                     <Select
                        sx={{
                           backgroundColor: (theme) => theme.palette.background.default,
                           pl: 1.5,
                           //  textAlign: 'center',
                           // color: (theme) => theme.palette.text.secondary,
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
                        value={formData.selectedCompanySize || "Company Size"}
                        onChange={(e) =>
                           setFormData({
                              ...formData,
                              selectedCompanySize: e.target.value
                           })
                        }>
                        <MenuItem value={"Company Size"}>Company Size</MenuItem>
                        {_.map(company_size, (item, index) => (
                           <MenuItem key={index} value={item}>
                              {item}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               )} */}
               {/* {average_salary && (
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
                        value={formData.selectedAverageSalary || "AVG. Salary"}
                        onChange={(e) =>
                           setFormData({
                              ...formData,
                              selectedAverageSalary: e.target.value
                           })
                        }>
                        <MenuItem value={"AVG. Salary"}>AVG. Salary</MenuItem>
                        {_.map(average_salary, (item, index) => (
                           <MenuItem key={index} value={item}>
                              {item}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               )} */}
               {/* {revenue && (
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
                        value={formData.selectedRevenue || "Revenue"}
                        onChange={(e) => setFormData({ ...formData, selectedRevenue: e.target.value })}>
                        <MenuItem value={"Revenue"}>Revenue</MenuItem>
                        {_.map(revenue, (item, index) => (
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

export default CompanyFilterSection

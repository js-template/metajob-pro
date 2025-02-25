"use client"
import { Box, Grid, Paper } from "@mui/material"
import { Button, FormControl, MenuItem, Pagination, Select, TextField, useTheme } from "@mui/material"
import { useSession } from "next-auth/react"
import Typography from "@mui/material/Typography"
import _ from "lodash"
import { useState } from "react"
import ManageCompaniesTable from "./table"
import CIcon from "../../components/common/icon"
import { AccessError } from "../../shared/error-table"
import AddCompany from "./add-company"
import useSWR from "swr"
import { IManageCompanyBock } from "./types"
import toast from "react-hot-toast"

type Props = {
   block: IManageCompanyBock
   language?: string
}

export const ManageCompanies = ({ block }: Props) => {
   // session data destructuring
   const { data: session } = useSession()
   const { user } = session || {}
   const { id: userId, role: userRole } = user || {}
   const role = userRole?.type || ""

   // TODO: need to update table form
   const formData = {
      title: "a",
      slug: "s",
      formStep: 1,
      stepLabels: [{ id: 1, title: "a" }],
      buttonsText: "B",
      fields: [{ label: "L", name: "A" }]
   } as any
   const { title, style, empty, table_config, table_head: tableHeader, add_button_placeholder } = block || {}
   const {
      label: tableLabel,
      enable_search,
      search_placeholder,
      default_data_count,
      per_page_placeholder
   } = table_config || {}

   const [addCompany, setAddCompany] = useState(false)
   const theme = useTheme()
   const [search, setSearch] = useState("")
   const [selectAll, setSelectAll] = useState(false)
   const [pagination, setPagination] = useState<{
      page: number
      pageSize: number
      pageCount: number
      total: number
   }>({
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 0
   })

   // *** fetcher function for SWR
   const fetcher = async (url: string) => {
      const response = await fetch(url)
      if (!response.ok) {
         throw new Error("An error occurred while fetching the data.")
      }
      const result = await response.json()
      setPagination(result?.data?.meta?.pagination)
      return result.data // Return the nested data
   }

   // Fetcher function for SWR
   const queryParams = {
      populate: "*",
      pagination: {
         page: pagination.page,
         pageSize: pagination.pageSize,
         withCount: true
      },
      filters: {
         ...(search && {
            $or: [
               {
                  name: { $containsi: search }
               },
               {
                  email: { $containsi: search }
               },
               {
                  phone: { $containsi: search }
               },
               {
                  website: { $containsi: search }
               }
            ]
         })
      }
   }

   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = `/api/find?model=api/metajob-backend/companies&query=${queryString}&cache=no-store`

   const { data: companyData, error, isLoading, mutate } = useSWR(apiUrl, fetcher)

   // *** open add company popup
   const handleAddCompany = () => {
      // toast.error("This feature is under development")
      // return
      setAddCompany(true)
   }

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
   }

   return role === "employer" ? (
      <>
         <Grid item xs={12}>
            <Paper
               elevation={0}
               sx={{
                  position: "relative",
                  width: "100%",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "12px",
                  p: 0,
                  mb: 5
               }}>
               {addCompany ? (
                  <AddCompany
                     open={addCompany}
                     handleClose={() => setAddCompany(false)}
                     userId={userId}
                     data={formData}
                     mutate={mutate}
                  />
               ) : (
                  <>
                     <Box
                        sx={{
                           px: 3,
                           py: 2,
                           borderBottom: "1px solid",
                           borderColor: "divider",
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                           gap: 3
                        }}>
                        <Typography
                           variant='body1'
                           fontWeight={700}
                           fontSize={{
                              xs: "1.25rem",
                              sm: "1.5rem"
                           }}
                           lineHeight={"24px"}>
                           {title}
                        </Typography>
                        <Button
                           color='primary'
                           variant='contained'
                           onClick={handleAddCompany}
                           sx={{
                              display: "flex",
                              gap: 1,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "8px",
                              textTransform: "capitalize",
                              boxShadow: "none",
                              px: 1.5,
                              minWidth: "auto",
                              color: (theme) => theme.palette.primary.contrastText + "!important",
                              "& svg": {
                                 color: theme.palette.primary.contrastText + " !important"
                              }
                           }}>
                           <CIcon icon={"mdi:plus"} size={24} />
                           {add_button_placeholder || "Add Company"}
                        </Button>
                     </Box>
                     {/* table data filter actions input fields */}
                     {enable_search && (
                        <Box
                           sx={{
                              px: 3,
                              py: 2,
                              borderBottom: "1px solid",
                              borderColor: "divider",
                              display: "flex",
                              gap: 3,
                              alignItems: "center",
                              flexWrap: "wrap"
                           }}>
                           {/* Search input */}
                           <FormControl size='small'>
                              <TextField
                                 id='outlined-basic'
                                 placeholder={search_placeholder}
                                 variant='outlined'
                                 onChange={handleSearch}
                                 InputProps={{
                                    endAdornment: (
                                       <CIcon
                                          icon='iconoir:search'
                                          size={24}
                                          sx={{
                                             color: theme.palette.text.secondary
                                          }}
                                       />
                                    )
                                 }}
                                 sx={{
                                    "& .MuiInputBase-input": {
                                       py: 1.2
                                    },
                                    "& .MuiInputBase-root": {
                                       minHeight: "40px !important",
                                       pl: theme.direction === "rtl" ? "10px !important" : "0px !important"
                                    }
                                 }}
                              />
                           </FormControl>
                        </Box>
                     )}

                     {/* Table */}
                     <ManageCompaniesTable
                        headCells={tableHeader}
                        selectAll={selectAll}
                        setSelectAll={setSelectAll}
                        direction={theme.direction as "ltr" | "rtl"}
                        data={companyData}
                        mutate={mutate}
                        isLoading={isLoading}
                        empty={empty}
                        // formData={form?.data?.attributes}
                        formData={formData}
                        pageSize={pagination.pageSize}
                     />

                     {/* Box Footer */}
                     <Box
                        sx={{
                           py: 2.5,
                           px: 3,
                           borderTop: "1px solid",
                           borderColor: "divider",
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center"
                        }}>
                        <Box
                           sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center"
                           }}>
                           {per_page_placeholder && (
                              <Typography variant='body1' fontWeight={500} lineHeight={"24px"}>
                                 {per_page_placeholder}
                              </Typography>
                           )}
                           <FormControl size='small'>
                              <Select
                                 labelId='per_page'
                                 id='per_page'
                                 autoWidth
                                 defaultValue={pagination.pageSize}
                                 onChange={(e) => {
                                    setPagination({ ...pagination, pageSize: e.target.value as number })
                                 }}
                                 renderValue={(selected) => {
                                    const selectedValue = selected as number

                                    return (
                                       <Typography variant='body1' fontWeight={500} lineHeight={"24px"}>
                                          {selectedValue}
                                       </Typography>
                                    )
                                 }}
                                 IconComponent={() => (
                                    <CIcon
                                       icon='iconamoon:arrow-down-2-duotone'
                                       size={20}
                                       sx={{
                                          position: "absolute",
                                          right: "8px",
                                          top: "50%",
                                          transform: "translateY(-50%)",
                                          pointerEvents: "none"
                                       }}
                                    />
                                 )}
                                 sx={{
                                    backgroundColor: (theme) => theme.palette.text.primary + "10",
                                    borderRadius: "8px",
                                    borderColor: "divider",
                                    minWidth: "70px",
                                    "& .MuiSelect-select": {
                                       px: 1.8,
                                       py: 1
                                    }
                                 }}>
                                 {_.map([10, 20, 30, 40, 50], (option, index) => (
                                    <MenuItem key={index} value={option}>
                                       {option}
                                    </MenuItem>
                                 ))}
                              </Select>
                           </FormControl>
                        </Box>
                        <Box>
                           {pagination.pageCount > 1 && (
                              <Pagination
                                 count={pagination.pageCount}
                                 variant='text'
                                 shape='rounded'
                                 color='primary'
                                 size='large'
                                 siblingCount={0}
                                 onChange={(event, page) => {
                                    setPagination({ ...pagination, page })
                                 }}
                                 dir={theme.direction}
                                 sx={{
                                    "& li": {
                                       borderRadius: 0,
                                       height: "40px",
                                       margin: 0
                                    },
                                    "& .MuiButtonBase-root": {
                                       margin: 0,
                                       border: "none",
                                       borderLeft: "1px solid",
                                       borderTop: "1px solid",
                                       borderBottom: "1px solid",
                                       borderColor: "divider",
                                       borderRadius: 0,
                                       "&:hover": {
                                          backgroundColor: (theme) => theme.palette.action.hover
                                       }
                                    },
                                    "& li:last-child .MuiButtonBase-root": {
                                       borderRadius: theme.direction === "rtl" ? "6px 0px 0px 6px" : "0px 6px 6px 0px",
                                       borderRight: "1px solid",
                                       borderColor: "divider"
                                    },
                                    "& li:first-child .MuiButtonBase-root": {
                                       borderRadius: theme.direction === "rtl" ? "0px 6px 6px 0px" : "6px 0px 0px 6px",
                                       borderLeft: "1px solid",
                                       borderColor: "divider"
                                    },
                                    "& .MuiPaginationItem-ellipsis": {
                                       borderTop: "1px solid",
                                       borderBottom: "1px solid",
                                       borderLeft: "1px solid",
                                       borderColor: "divider",
                                       height: "100%",
                                       margin: 0,
                                       borderRadius: 0,
                                       display: "flex",
                                       justifyContent: "center",
                                       alignItems: "center"
                                    }
                                 }}
                              />
                           )}
                        </Box>
                     </Box>
                  </>
               )}
            </Paper>
         </Grid>
      </>
   ) : (
      <AccessError />
   )
}

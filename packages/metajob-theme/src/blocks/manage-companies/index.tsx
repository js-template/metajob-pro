"use client"
import { Box, Grid, Paper } from "@mui/material"
import { Button, FormControl, MenuItem, Pagination, Select, TextField, useTheme } from "@mui/material"

import Typography from "@mui/material/Typography"
import _ from "lodash"
import { useState } from "react"

import { boxHeaderData, rows } from "./data"
import ManageCompaniesTable from "./table"
import CIcon from "../../components/common/icon"
import { AccessError } from "../../shared/error-table"
import AddCompany from "./add-company"
import useSWR from "swr"
import { ManageCompaniesProps } from "./type"

export const ManageCompanies = ({ block, session }: ManageCompaniesProps) => {
   // session data destructuring
   const { user } = session || {}
   const { id: userId, role: userRole } = user || {}
   const role = userRole?.type || ""

   const { title, enableSearch, tableHead, empty, form, addButtonText, editButtonText, perPageText } = block || {}
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
      populate: "deep",
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
   const apiUrl = `/api/find?model=api/metajob-strapi/companies&query=${queryString}&cache=no-store`

   const { data: companyData, error, isLoading, mutate } = useSWR(apiUrl, fetcher)

   // *** open add company popup
   const handleAddCompany = () => {
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
                     data={form?.data?.attributes}
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
                        {form?.data && (
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
                              {addButtonText && addButtonText}
                           </Button>
                        )}
                     </Box>
                     {/* table data filter actions input fields */}
                     {enableSearch && (
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
                                 placeholder={boxHeaderData?.searchPlaceholder}
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
                        headCells={tableHead}
                        rows={rows}
                        selectAll={selectAll}
                        setSelectAll={setSelectAll}
                        direction={theme.direction as "ltr" | "rtl"}
                        data={companyData}
                        mutate={mutate}
                        isLoading={isLoading}
                        empty={empty}
                        userId={userId}
                        formData={form?.data?.attributes}
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
                           {perPageText && (
                              <Typography variant='body1' fontWeight={500} lineHeight={"24px"}>
                                 {perPageText}
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
                                 {_.map(boxHeaderData?.showingPerPage?.options, (option, index) => (
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

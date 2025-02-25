"use client"
import { useState } from "react"
import { useSession } from "next-auth/react"
import _ from "lodash"
import useSWR from "swr"
import { FormControl, Grid, MenuItem, Pagination, Paper, Select, TextField, useTheme } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { boxHeaderData } from "./data"
import CIcon from "../../components/common/icon"
import ListsTable from "./table"
import { AccessError } from "../../shared/error-table"
import { IAppliedJobsBlock } from "./type"

type Props = {
   block: IAppliedJobsBlock
   language?: string
}

export const AppliedJobs = ({ block, language }: Props) => {
   const theme = useTheme()

   // session data destructuring
   const { data: session } = useSession()
   const { user } = session || {}
   const { id: userId, role: userRole } = user || {}
   const role = userRole?.type || ""

   //const [search, setSearch] = useState("")
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

   const { title, style, empty, table_config, table_head: tableHeader } = block || {}
   const { label: tableLabel, enable_search: enableSearch, search_placeholder, default_data_count } = table_config || {}

   // *** fetcher function for SWR
   const fetcher = async (url: string) => {
      const response = await fetch(url)
      if (!response.ok) {
         throw new Error("An error occurred while fetching the data.")
      }
      const result = await response.json()
      setPagination(result?.data?.meta?.pagination)
      return result?.data // Return the nested data
   }

   // Fetcher function for SWR
   const queryParams = {
      // populate: "deep",
      populate: "*",
      pagination: {
         page: pagination.page,
         pageSize: pagination.pageSize,
         withCount: true
      },
      filters: {
         owner: {
            id: userId
         }
         // ...(search && {
         //    $or: [
         //       {
         //          title: { $containsi: search }
         //       },
         //       {
         //          slug: { $containsi: search }
         //       },
         //       {
         //          description: { $containsi: search }
         //       },
         //       {
         //          status: { $containsi: search }
         //       }
         //    ]
         // })
      }
   }

   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = `/api/find?model=api/metajob-backend/applied-jobs&query=${queryString}&cache=no-store`

   const { data: listsData, error, isLoading, mutate } = useSWR(apiUrl, fetcher)

   const applicationData = listsData?.data || []

   return role === "candidate" ? (
      <Grid item xs={12}>
         <Paper
            elevation={0}
            sx={{
               width: "100%",
               border: "1px solid",
               borderColor: "divider",
               borderRadius: "12px",
               p: 0,
               mb: 5
            }}>
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
                     {tableLabel}
                  </Typography>
               </Box>
               {/* table data filter actions input fields */}
               {/* {enableSearch && (
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
                  )} */}

               {/* Table */}
               <ListsTable
                  headCells={tableHeader}
                  data={applicationData}
                  isLoading={isLoading}
                  empty={empty}
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
                     {/* <Typography variant='body1' fontWeight={500} lineHeight={"24px"}>
                        Per page
                     </Typography> */}
                     <FormControl size='small'>
                        <Select
                           labelId='per_page'
                           id='per_page'
                           autoWidth
                           defaultValue={default_data_count || 10}
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
                  </Box>
               </Box>
            </>
         </Paper>
      </Grid>
   ) : (
      <AccessError roleValue={"Candidate"} />
   )
}

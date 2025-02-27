"use client"
import { useState } from "react"
import useSWR from "swr"
import _ from "lodash"
import { useSession } from "next-auth/react"
import AllBookmarkTable from "./table"
import {
   Box,
   Typography,
   FormControl,
   TextField,
   Select,
   MenuItem,
   Pagination,
   useTheme,
   Grid,
   Paper,
   Stack
} from "@mui/material"
import { TableLoader } from "./loader"
import CIcon from "../../components/common/icon"
import { IBookmarkTableBock } from "./types"

type Props = {
   block: IBookmarkTableBock
   language?: string
}

export const BookmarkTable = ({ block, language }: Props) => {
   // session data destructuring
   const { data: session } = useSession()
   const { user } = session || {}
   const { id: userId } = user || {}

   const theme = useTheme()
   const direction = theme?.direction

   const { title, style, empty, table_config, table_head: tableHeader } = block || {}
   const { label: tableLabel, enable_search: enableSearch, search_placeholder, default_data_count } = table_config || {}

   const [search, setSearch] = useState("")
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

   const fetcher = async (url: string) => {
      const response = await fetch(url)
      if (!response.ok) {
         throw new Error("An error occurred while fetching the data.")
      }
      const result = await response.json()
      setPagination(result?.data?.meta?.pagination)
      return result.data // Return the nested data
   }
   const queryParams = {
      pagination: {
         page: pagination?.page,
         pageSize: pagination?.pageSize,
         withCount: true
      },
      filters: {
         owner: {
            id: {
               $eq: userId
            }
         },
         ...(search && {
            $or: [
               {
                  job: { title: { $containsi: search } }
               },
               {
                  company: { name: { $containsi: search } }
               },
               {
                  resume: { name: { $containsi: search } }
               }
            ]
         })
      },
      populate: {
         job: {
            populate: "*"
         },
         resume: {
            populate: "*"
         },
         company: {
            populate: "*"
         }
      }
      // populate: {
      //    job: {
      //       fields: ["title", "price", "slug", "status"]
      //    },
      //    resume: {
      //       fields: ["name", "salary", "slug", "createdAt"]
      //    },
      //    company: {
      //       fields: ["name", "avg_price", "slug", "createdAt"]
      //    }
      // }
   }
   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = `/api/find?model=api/metajob-backend/bookmarks&query=${queryString}&cache=no-store`

   const { data: bookmarkDataAll, error: bookmarkError, isLoading } = useSWR(apiUrl, fetcher)

   const bookmarkData = bookmarkDataAll?.data || []

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
   }

   return (
      <Grid item xs={style?.mobile} sm={style?.tab} md={style?.desktop}>
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
                  component={"h3"}
                  variant='h3'
                  fontWeight={700}
                  fontSize={{
                     xs: "1.1rem",
                     sm: "1.25rem"
                  }}
                  lineHeight={"24px"}>
                  {tableLabel}
               </Typography>
            </Box>
            {/* table data filter actions input fields */}
            {enableSearch && bookmarkData?.length > 0 && (
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
                        onChange={handleSearch}
                        placeholder={search_placeholder || "Search"}
                        variant='outlined'
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
                              pl: direction === "rtl" ? "10px !important" : "0px !important"
                           }
                        }}
                     />
                  </FormControl>

                  {/* Select status input */}
                  {/* <FormControl size='small'>
                     <Select
                        labelId='select-status'
                        id='select-status'
                        IconComponent={() => (
                           <CIcon
                              icon='iconamoon:arrow-down-2-duotone'
                              sx={{
                                 color: theme.palette.text.secondary,
                                 mr: direction === "rtl" ? 0 : 1,
                                 ml: direction === "ltr" ? 0 : 1
                              }}
                           />
                        )}
                        defaultValue={0}
                        sx={{
                           minWidth: {
                              xs: "100%",
                              sm: "270px"
                           },
                           backgroundColor: (theme) => theme.palette.background.default
                        }}>
                        <MenuItem value={0}>Select Status</MenuItem>
                        {_.map(
                           [
                              {
                                 label: "All",
                                 value: 1
                              },
                              {
                                 label: "Applied",
                                 value: 2
                              },
                              {
                                 label: "Not Applied",
                                 value: 3
                              }
                           ],
                           (option, index) => (
                              <MenuItem key={index} value={option.value}>
                                 {option.label}
                              </MenuItem>
                           )
                        )}
                     </Select>
                  </FormControl> */}
                  {/* Package left limit job post */}
                  {/* <Box
              sx={{
                 display: "flex",
                 gap: 2,
                 alignItems: "center"
              }}>
              <Typography variant='body1' fontWeight={500} lineHeight={"24px"}>
                 You have 3 Alar listing left
              </Typography>
              <Button
                 color='primary'
                 variant='outlined'
                 sx={{
                    borderRadius: "8px",
                    textTransform: "capitalize",
                    boxShadow: "none"
                 }}>
               Upgrade
              </Button>
           </Box> */}
               </Box>
            )}
            {isLoading && <TableLoader direction={direction as "ltr" | "rtl"} />}

            {/* Table */}
            {!bookmarkError && !isLoading && bookmarkData && bookmarkData?.length > 0 && (
               <AllBookmarkTable
                  headCells={tableHeader}
                  data={bookmarkData}
                  direction={direction as "ltr" | "rtl"}
                  mutateUrl={apiUrl}
               />
            )}

            {/* empty data */}
            {!bookmarkError && !isLoading && bookmarkData?.length == 0 && (
               <Stack
                  sx={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     gap: 0.5,
                     py: 10
                  }}>
                  <Typography variant='body1' sx={{ color: theme.palette.text.secondary }}>
                     {empty?.title || "No data found"}
                  </Typography>
                  <Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>
                     {empty?.description || "Try to refresh the page or check back later"}
                  </Typography>
               </Stack>
            )}
            {/* Box Footer */}
            {bookmarkData?.length > 0 && (
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
                  Showing per page
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
                           IconComponent={() => <CIcon icon='iconamoon:arrow-down-2-duotone' size={36} />}
                           sx={{
                              backgroundColor: (theme) => theme.palette.background.default,
                              borderRadius: "8px",
                              borderColor: "divider",
                              pl: 2,
                              pr: 1.5,
                              "& .MuiSelect-select": {
                                 px: 0 + "!important",
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
                     <Pagination
                        count={pagination?.pageCount}
                        onChange={(event, page) => {
                           setPagination({ ...pagination, page })
                        }}
                        variant='text'
                        shape='rounded'
                        color='primary'
                        size='large'
                        siblingCount={0}
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
                              borderRadius: "0px 6px 6px 0px",
                              borderRight: "1px solid",
                              borderColor: "divider"
                           },
                           "& li:first-child .MuiButtonBase-root": {
                              borderRadius: "6px 0px 0px 6px"
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
            )}
         </Paper>
      </Grid>
   )
}

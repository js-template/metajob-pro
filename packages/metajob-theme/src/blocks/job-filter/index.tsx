"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import useSWR from "swr"
import _ from "lodash"
import { fetcher } from "./hook"
import {
   Stack,
   Container,
   Grid,
   Card,
   Typography,
   Divider,
   TextField,
   FormControl,
   Select,
   MenuItem,
   Button,
   Skeleton,
   Pagination,
   PaginationItem,
   Icon
} from "@mui/material"
import ListCardLoader from "./loader"
import { JobItem } from "../../components/cards/job-item"
import { IJobFilterData } from "./types"

type Props = {
   block: IJobFilterData
   language?: string
}

export const JobFilter = ({ block, language }: Props) => {
   const [page, setPage] = useState<number>(1)
   const [loading, setLoading] = useState<boolean>(false)
   const searchParams = useSearchParams()

   // get params data
   const {
      search: urlSearch,
      location: urlLocation,
      category: urlCategory
   } = Object.fromEntries(searchParams.entries())

   const [searchOptions, setSearchOptions] = useState({
      searchText: "",
      location: "",
      category: "",
      sort: ""
   })

   // Update state based on URL search params
   useEffect(() => {
      setSearchOptions((prevOptions) => ({
         ...prevOptions,
         searchText: urlSearch || prevOptions.searchText,
         category: urlCategory || prevOptions.category,
         location: urlLocation || prevOptions.location
      }))
   }, [urlSearch, urlLocation, urlCategory])

   //===================Starts job search============
   const queryParams = {
      // sort: sortParam ? [sortParam] : [],
      filters: {
         title: {
            $containsi: searchOptions.searchText || undefined
         },
         category: {
            title: {
               $eq: searchOptions?.category || undefined
            }
         }
         // location: {
         //    $containsi: searchOptions.location || undefined // Apply filter dynamically
         // },
      },
      populate: {
         company: {
            populate: {
               logo: {
                  fields: ["url"]
               }
            }
         },
         type: {
            fields: ["title"]
         },
         category: {
            fields: ["title"]
         }
      },
      pagination: {
         pageSize: 12,
         page: page
      },
      publicationState: "live",
      locale: language ? [language] : ["en"]
   }

   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = `/api/find?model=api/metajob-backend/jobs&query=${queryString}&cache=no-store`

   const { data: jobsData, error: jobsError, isLoading } = useSWR(apiUrl, fetcher)

   const totalPage = jobsData?.meta?.pagination?.pageCount || 0
   //===================Ends job search============

   //===================Starts fetching category data============
   const categoryQueryParams = {
      fields: ["title", "slug"]
   }
   const categoryQueryString = encodeURIComponent(JSON.stringify(categoryQueryParams))
   const categoryAPiUrl = `/api/find?model=api/metajob-backend/job-categories&query=${categoryQueryString}`
   const {
      data: categoryData,
      error: categoryError,
      isLoading: categoryIsLoading
   } = useSWR(categoryAPiUrl, fetcher, {
      fallbackData: []
   })
   //===================Ends fetching category data============

   // Handle form submission
   const handleSubmit = (e: any) => {
      e.preventDefault()
      // At this point, the filters are already stored in `searchFilters` through handleChange
      // You can trigger any additional logic here, but the form data (filters) is ready
   }

   // destructure  search data
   const { search } = block || {}
   const {
      title: searchTitle,
      search_placeholder,
      location_placeholder,
      category_placeholder,
      sort_placeholder,
      button_placeholder
   } = search || {}

   return (
      <Stack>
         <Container maxWidth='lg' sx={{ py: 6 }}>
            <Grid container spacing={4}>
               {search && (
                  <Grid item xs={12} md={3}>
                     <Card
                        sx={{
                           borderRadius: 2,
                           p: 0
                        }}>
                        <Stack spacing={2} pb={3}>
                           <Stack
                              px={3}
                              pt={2}
                              direction={"row"}
                              justifyItems={"center"}
                              justifyContent={"space-between"}>
                              <Typography fontSize={16} fontWeight={700} color={(theme) => theme.palette.text.primary}>
                                 {searchTitle}
                              </Typography>
                              <Typography
                                 fontSize={16}
                                 fontWeight={700}
                                 color={(theme) => theme.palette.error.main}
                                 sx={{
                                    cursor: "pointer",
                                    display:
                                       searchOptions?.searchText || searchOptions?.location || searchOptions?.category
                                          ? "block"
                                          : "none"
                                 }}
                                 onClick={(e) => {
                                    // searchParams.delete()
                                    setSearchOptions({
                                       ...searchOptions,
                                       searchText: "",
                                       location: "",
                                       category: ""
                                    })
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
                                    onChange={(e) =>
                                       setSearchOptions({
                                          ...searchOptions,
                                          searchText: e.target.value
                                       })
                                    }
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
                                       value={searchOptions?.category || ""}
                                       onChange={(e) => {
                                          setSearchOptions({
                                             ...searchOptions,
                                             category: e.target.value
                                          })
                                       }}>
                                       <MenuItem value={""} sx={{ fontSize: "16px" }}>
                                          {category_placeholder}
                                       </MenuItem>
                                       {_.map(categoryData?.data, (item) => (
                                          <MenuItem key={item?.id} value={item?.title} sx={{ fontSize: "16px" }}>
                                             {item?.title}
                                          </MenuItem>
                                       ))}
                                    </Select>
                                 </FormControl>
                              )}

                              {button_placeholder && <Divider />}
                              {button_placeholder && (
                                 <Button disabled={loading} variant='contained' type='submit'>
                                    {button_placeholder}
                                 </Button>
                              )}
                           </Stack>
                        </Stack>
                     </Card>
                  </Grid>
               )}

               <Grid item xs={12} md={search ? 9 : 12}>
                  <Stack spacing={2}>
                     <Card
                        sx={{
                           borderRadius: 2,
                           p: 1
                        }}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                           {isLoading ? (
                              <Skeleton component={"span"} variant='text' width={"40%"} />
                           ) : (
                              <Typography
                                 fontSize={16}
                                 fontWeight={600}
                                 color={(theme) => theme.palette.text.primary}
                                 component={"span"}
                                 variant='h4'
                                 pl={2}>
                                 We have found{" "}
                                 <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    component={"span"}
                                    color={(theme) => theme.palette.primary.main}>
                                    {jobsData?.data?.length}
                                 </Typography>{" "}
                                 jobs
                              </Typography>
                           )}

                           {/* {sort_placeholder && (
                              <FormControl>
                                 <Select
                                    displayEmpty
                                    sx={{
                                       "& .MuiSelect-select": {
                                          backgroundColor: (theme) => theme.palette.background.default,
                                          "&:focus": {
                                             backgroundColor: (theme) => theme.palette.background.default
                                          }
                                       },
                                       backgroundColor: (theme) => theme.palette.background.default,
                                       py: 0.5,
                                       pl: 2,
                                       color: "gray_2.main",
                                       fontWeight: 400,
                                       fontSize: 16,
                                       borderRadius: 2,
                                       width: 200,
                                       textTransform: "capitalize"
                                    }}
                                    variant='standard'
                                    disableUnderline
                                    value={searchOptions.sort || ""}
                                    onChange={(e) => {
                                       setSearchOptions({
                                          ...searchOptions,
                                          sort: e.target.value
                                       })
                                    }}>
                                    <MenuItem value=''>{sort_placeholder}</MenuItem>
                                    {_.map(sort_placeholder, (item) => (
                                       <MenuItem key={item} value={item} sx={{ textTransform: "capitalize" }}>
                                          {item}
                                       </MenuItem>
                                    ))}
                                 </Select>
                              </FormControl>
                           )} */}
                        </Stack>
                     </Card>
                     {jobsError && !isLoading && (
                        <Stack
                           sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              py: 4
                           }}>
                           <Typography fontSize={16} fontWeight={400} color={(theme) => theme.palette.error.main}>
                              {jobsError?.message}
                           </Typography>
                        </Stack>
                     )}

                     {/* loader */}
                     {isLoading && (
                        <Stack>
                           <Grid container spacing={2}>
                              {_.times(6, (index) => (
                                 <Grid key={index} item xs={12} sm={6} md={4}>
                                    <ListCardLoader />
                                 </Grid>
                              ))}
                           </Grid>
                        </Stack>
                     )}
                     {/* render jobs */}
                     {jobsData?.data?.length > 0 && (
                        <Stack>
                           <Grid container spacing={2}>
                              {_.map(jobsData?.data, (item: any, index: number) => (
                                 <Grid item xs={12} sm={6} md={4} key={index}>
                                    {/* <Item {...item} /> */}
                                    <JobItem data={item} />
                                 </Grid>
                              ))}
                           </Grid>
                        </Stack>
                     )}
                     {/* not data found */}
                     {!jobsError && jobsData?.data === 0 && (
                        <Stack
                           sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              py: 4
                           }}>
                           <Typography fontSize={16} fontWeight={400} color={(theme) => theme.palette.text.secondary}>
                              No Jobs Found
                           </Typography>
                        </Stack>
                     )}
                     {/* Pagination */}
                     {!isLoading && !jobsError && totalPage > 0 && (
                        <Stack
                           sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              py: 4
                           }}>
                           <Pagination
                              variant='outlined'
                              shape='rounded'
                              count={totalPage}
                              renderItem={(item) => (
                                 <PaginationItem
                                    {...item}
                                    components={{
                                       previous: (props) => <Icon {...props} className='icon-arrow-left-circle' />,
                                       next: (props) => <Icon {...props} className='icon-arrow-right-circle' />
                                    }}
                                    sx={{
                                       fontWeight: 400,
                                       fontSize: 16,
                                       color: (theme) => theme.palette.text.disabled,
                                       border: "none",
                                       height: 40,
                                       width: 40,

                                       "&.Mui-selected": {
                                          color: (theme) => theme.palette.primary.contrastText,
                                          backgroundColor: (theme) => theme.palette.primary.main,
                                          "&:hover": {
                                             backgroundColor: (theme) => theme.palette.secondary.main,
                                             color: (theme) => theme.palette.secondary.contrastText
                                          }
                                       },
                                       ...(item.type === "previous" || item.type === "next"
                                          ? {
                                               backgroundColor: (theme) => theme.palette.background.default
                                            }
                                          : {
                                               backgroundColor: (theme) => theme.palette.background.paper
                                            })
                                    }}
                                 />
                              )}
                              page={page}
                              onChange={(e, value) => {
                                 setPage(value)
                              }}
                           />
                        </Stack>
                     )}
                  </Stack>
               </Grid>
            </Grid>
         </Container>
      </Stack>
   )
}

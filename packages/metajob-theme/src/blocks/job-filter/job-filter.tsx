"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"
import _ from "lodash"
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
   Icon,
   FormControlLabel,
   Checkbox as MuiCheckbox,
   Box
} from "@mui/material"
import ListCardLoader from "./loader"
import { JobItem } from "../../components/cards/job-item"
import { IJobFilterData, IJobType, ISingleCategory, ISingleJob } from "./types"
import { find } from "../../lib/strapi"
import CIcon from "../../components/common/icon"
import { SortData } from "./data"
import { getSortParam } from "./utils"

type Props = {
   block: IJobFilterData
   language?: string
   categoryData?: ISingleCategory[]
   jobTypesData?: IJobType[]
   jobExperienceData?: IJobType[]
}

export const JobFilterClient = ({ block, language, categoryData, jobTypesData, jobExperienceData }: Props) => {
   const { theme: mode } = useTheme()

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
   const [page, setPage] = useState<number>(1)
   const [jobsData, setJobsData] = useState<ISingleJob[]>([])
   const [isLoading, setIsLoading] = useState(false)
   const [totalPage, setTotalPage] = useState(0)
   const [jobsError, setJobsError] = useState(null)
   const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([])
   const [selectedJobExperience, setSelectedJobExperience] = useState<string[]>([])

   // Update state based on URL search params
   useEffect(() => {
      setSearchOptions((prevOptions) => ({
         ...prevOptions,
         searchText: urlSearch || prevOptions.searchText,
         category: urlCategory || prevOptions.category,
         location: urlLocation || prevOptions.location
      }))
   }, [urlSearch, urlLocation, urlCategory])

   const handleJobTypesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, name } = event.target
      setSelectedJobTypes((prev) => {
         if (checked) {
            return [...prev, name] // Add to array if checked
         } else {
            return prev.filter((type) => type !== name) // Remove if unchecked
         }
      })
   }
   const handleJobExperienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, name } = event.target
      setSelectedJobExperience((prev) => {
         if (checked) {
            return [...prev, name] // Add to array if checked
         } else {
            return prev.filter((type) => type !== name) // Remove if unchecked
         }
      })
   }

   const sortParam = getSortParam(searchOptions?.sort)
   //  fetch jobs from db
   useEffect(() => {
      const getJobsData = async () => {
         setIsLoading(true)
         const { data: jobsDataAll, error: jobDataError } = await find(
            "api/metajob-backend/jobs",
            {
               sort: sortParam ? [sortParam] : [],
               filters: {
                  title: {
                     $containsi: searchOptions.searchText || undefined
                  },
                  category: {
                     title: {
                        $eq: searchOptions?.category || undefined
                     }
                  },
                  job_status: "open",
                  type: {
                     value: {
                        $in: selectedJobTypes
                     }
                  },
                  experience: {
                     value: {
                        $in: selectedJobExperience
                     }
                  }
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
               locale: language ?? "en"
            },
            "no-store"
         )
         if (!jobDataError) {
            setJobsError(null)
            setJobsData(jobsDataAll?.data)
            setTotalPage(jobsDataAll?.meta?.pagination?.pageCount || 0)
            setIsLoading(false)
         } else {
            setJobsError(jobDataError)
            setJobsData([])
            setIsLoading(false)
         }
      }

      getJobsData()

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page, searchOptions, selectedJobTypes, selectedJobExperience])

   // Handle form submission
   const handleSubmit = (e: any) => {
      e.preventDefault()
      // At this point, the filters are already stored in `searchFilters` through handleChange
      // You can trigger any additional logic here, but the form data (filters) is ready
   }

   // destructure  search data

   const { search, result_placeholder, card_button, style, sidebar } = block || {}
   const { backgroundColor, color } = style || {}
   const {
      title: searchTitle,
      search_placeholder,
      location_placeholder,
      category_placeholder,
      experience_placeholder,
      type_placeholder,
      sort_placeholder,
      button_placeholder
   } = search || {}

   const isRightSidebar = sidebar === "Right Sidebar"
   // const isLeftSidebar = !sidebar || sidebar === "Left Sidebar"
   const isNoSidebar = sidebar === "No Sidebar"

   return (
      <Stack
         sx={{
            bgcolor: (theme) =>
               mode === "light" ? backgroundColor || theme.palette.background.default : theme.palette.background.default
         }}>
         <Container maxWidth='lg' sx={{ py: 6 }}>
            <Grid container spacing={4} direction={isRightSidebar ? "row-reverse" : "row"}>
               {!isNoSidebar && search && (
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
                              <Typography
                                 fontSize={16}
                                 fontWeight={700}
                                 sx={{
                                    color: (theme) =>
                                       mode === "light"
                                          ? color || theme.palette.text.secondary
                                          : theme.palette.text.secondary
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
                                       {_.map(categoryData, (item) => (
                                          <MenuItem key={item?.id} value={item?.title} sx={{ fontSize: "16px" }}>
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
                                             mode === "light"
                                                ? color || theme.palette.text.secondary
                                                : theme.palette.text.secondary
                                       }}>
                                       {type_placeholder || "Job Type"}
                                    </Typography>
                                    {_.map(jobTypesData, (typeItem: IJobType) => (
                                       <FormControlLabel
                                          key={typeItem?.id}
                                          sx={{
                                             color: (theme) => theme.palette.text.secondary
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
                                             mode === "light"
                                                ? color || theme.palette.text.secondary
                                                : theme.palette.text.secondary
                                       }}>
                                       {experience_placeholder || "Job Experience"}
                                    </Typography>
                                    {_.map(jobExperienceData, (expItem: IJobType) => (
                                       <FormControlLabel
                                          key={expItem?.id}
                                          sx={{
                                             color: (theme) => theme.palette.text.secondary
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
                              {button_placeholder && <Divider />}
                              {button_placeholder && (
                                 <Button disabled={isLoading} variant='contained' type='submit'>
                                    {button_placeholder}
                                 </Button>
                              )}
                           </Stack>
                        </Stack>
                     </Card>
                  </Grid>
               )}

               <Grid item xs={12} md={!isNoSidebar && search ? 9 : 12}>
                  <Stack spacing={2}>
                     <Card
                        sx={{
                           p: 1,
                           borderRadius: 2,
                           boxShadow: 0
                        }}>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                           {isLoading ? (
                              <Skeleton component={"span"} variant='text' width={"40%"} />
                           ) : (
                              <Typography
                                 fontSize={16}
                                 fontWeight={600}
                                 sx={{
                                    color: (theme) =>
                                       mode === "light"
                                          ? color || theme.palette.text.primary
                                          : theme.palette.text.primary
                                 }}
                                 component={"span"}
                                 variant='h4'
                                 pl={2}>
                                 {result_placeholder || "Total jobs found"}{" "}
                                 <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    component={"span"}
                                    sx={{
                                       color: (theme) => theme.palette.primary.main
                                    }}>
                                    {jobsData?.length}
                                 </Typography>{" "}
                              </Typography>
                           )}

                           {sort_placeholder && (
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
                                          sort: e?.target?.value
                                       })
                                    }}>
                                    <MenuItem value=''>{sort_placeholder}</MenuItem>
                                    {_.map(SortData, (item, index) => (
                                       <MenuItem
                                          key={index}
                                          value={item?.value}
                                          sx={{ textTransform: "capitalize", fontSize: "16px", display: "flex" }}>
                                          {item?.title}
                                       </MenuItem>
                                    ))}
                                 </Select>
                              </FormControl>
                           )}
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
                           <Typography
                              fontSize={16}
                              fontWeight={400}
                              sx={{
                                 color: (theme) => theme.palette.error.main
                              }}>
                              {jobsError}
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
                     {jobsData?.length > 0 && (
                        <Stack>
                           <Grid container spacing={2}>
                              {_.map(jobsData, (item: any, index: number) => (
                                 <Grid item xs={12} sm={6} md={4} key={index}>
                                    <JobItem data={item} button_label={card_button?.label} color={color} />
                                 </Grid>
                              ))}
                           </Grid>
                        </Stack>
                     )}
                     {/* not data found */}
                     {!jobsError && jobsData?.length === 0 && (
                        <Stack
                           sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              py: 4
                           }}>
                           <Typography
                              fontSize={16}
                              fontWeight={400}
                              sx={{
                                 color: (theme) => theme.palette.text.secondary
                              }}>
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

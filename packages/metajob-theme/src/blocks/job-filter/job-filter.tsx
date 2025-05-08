"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import _ from "lodash"
import {
   Stack,
   Container,
   Grid,
   Card,
   Typography,
   FormControl,
   Select,
   MenuItem,
   Button,
   Skeleton,
   Pagination,
   PaginationItem,
   Icon,
   Box,
   Drawer,
   IconButton,
   useMediaQuery,
   useTheme as MuiTheme
} from "@mui/material"
import ListCardLoader from "./loader"
import { JobItem } from "../../components/cards/job-item"
import { IFilterAttributes, IJobFilterData, IJobType, ISingleCategory, ISingleJob } from "./types"
import { find } from "../../lib/strapi"
import CIcon from "../../components/common/icon"
import { SortData } from "./data"
import { getSortParam } from "./utils"
import JobFilterSection from "./filter"

type Props = {
   block: IJobFilterData
   language?: string
   categoryData?: ISingleCategory[]
   jobTypesData?: IJobType[]
   jobExperienceData?: IJobType[]
   jobSkillsData?: IJobType[]
   jobFilterAttributes?: IFilterAttributes
}

export const JobFilterClient = ({ block, language, jobFilterAttributes }: Props) => {
   const { theme: mode } = useTheme()
   const theme = MuiTheme()
   const isTablet = useMediaQuery(theme.breakpoints.down("md"))

   // destructure  search data
   const { search, result_placeholder, card_button, style } = block || {}
   const {
      backgroundColor,
      color,
      secondary_color,
      header_color,
      sub_header_color,
      section_padding,
      header_width,
      desktop,
      tab,
      mobile,
      sidebar
   } = style || {}
   const {
      title: searchTitle,
      search_placeholder,
      location_placeholder,
      category_placeholder,
      experience_placeholder,
      skill_placeholder,
      type_placeholder,
      sort_placeholder,
      button_placeholder,
      mobile_filter_placeholder
   } = search || {}

   const isRightSidebar = sidebar === "Right Sidebar"
   const isNoSidebar = sidebar === "No Sidebar"

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
   const [selectedJobSkills, setSelectedJobSkills] = useState<string[]>([])
   const [openFilter, setOpenFilter] = useState(false)

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
                  },
                  skills: {
                     value: {
                        $in: selectedJobSkills
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
   }, [page, searchOptions, selectedJobTypes, selectedJobExperience, selectedJobSkills])

   const toggleDrawer = (newOpen: boolean) => () => {
      setOpenFilter(newOpen)
   }

   return (
      <Stack
         sx={{
            bgcolor: (theme) =>
               mode === "light" ? backgroundColor || theme.palette.background.default : theme.palette.background.default
         }}>
         <Container maxWidth='lg' sx={{ py: { xs: section_padding || 3, sm: section_padding || 6 } }}>
            <Grid container spacing={4} direction={isRightSidebar ? "row-reverse" : "row"}>
               {/* search-filter  */}
               {!isTablet && !isNoSidebar && search && (
                  <Grid item xs={12} md={3}>
                     <JobFilterSection
                        search={search}
                        searchOptions={searchOptions}
                        color={color}
                        secondary_color={secondary_color}
                        selectedJobTypes={selectedJobTypes}
                        selectedJobExperience={selectedJobExperience}
                        selectedJobSkills={selectedJobSkills}
                        setSearchOptions={setSearchOptions}
                        setSelectedJobTypes={setSelectedJobTypes}
                        setSelectedJobExperience={setSelectedJobExperience}
                        setSelectedJobSkills={setSelectedJobSkills}
                        jobFilterAttributes={jobFilterAttributes}
                     />
                  </Grid>
               )}
               {/* product-section  */}
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
                                 fontWeight={600}
                                 sx={{
                                    color: (theme) =>
                                       mode === "light"
                                          ? color || theme.palette.text.primary
                                          : theme.palette.text.primary,
                                    fontSize: { xs: 14, sm: 16 }
                                 }}
                                 component={"span"}
                                 variant='h4'
                                 pl={2}>
                                 {result_placeholder || "Total jobs found"}{" "}
                                 <Typography
                                    fontWeight={600}
                                    component={"span"}
                                    sx={{
                                       color: (theme) => theme.palette.primary.main,
                                       fontSize: { xs: 14, sm: 16 }
                                    }}>
                                    {jobsData?.length}
                                 </Typography>{" "}
                              </Typography>
                           )}

                           {!isTablet && sort_placeholder && (
                              <FormControl>
                                 <Select
                                    displayEmpty
                                    sx={{
                                       "& .MuiSelect-select": {
                                          color: (theme) =>
                                             mode === "light"
                                                ? secondary_color || theme.palette.text.secondary
                                                : theme.palette.text.secondary,
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
                                       width: { xs: 100, sm: 200 },
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
                                    <MenuItem
                                       value=''
                                       sx={{
                                          color: (theme) =>
                                             mode === "light"
                                                ? secondary_color || theme.palette.text.secondary
                                                : theme.palette.text.secondary
                                       }}>
                                       {sort_placeholder}
                                    </MenuItem>
                                    {_.map(SortData, (item, index) => (
                                       <MenuItem
                                          key={index}
                                          value={item?.value}
                                          sx={{
                                             textTransform: "capitalize",
                                             fontSize: "16px",
                                             display: "flex",
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
                           {/* mobile-filter  */}
                           {isTablet && (
                              <Box>
                                 <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                    <Button
                                       variant='outlined'
                                       onClick={toggleDrawer(true)}
                                       sx={{
                                          px: 3,
                                          height: 40,
                                          borderRadius: "999px",
                                          textTransform: "none",
                                          border: "1px solid",
                                          borderColor: (theme) => theme.palette.text.secondary,
                                          color: (theme) => theme.palette.text.secondary
                                       }}
                                       endIcon={
                                          <CIcon
                                             icon='rivet-icons:filter'
                                             size={20}
                                             sx={{
                                                color: (theme) => theme.palette.text.secondary,
                                                cursor: "pointer"
                                             }}
                                          />
                                       }>
                                       {mobile_filter_placeholder || "Filter"}
                                    </Button>
                                 </Box>
                                 <Drawer
                                    anchor='right'
                                    open={openFilter}
                                    onClose={toggleDrawer(false)}
                                    slotProps={{
                                       paper: {
                                          sx: {
                                             width: "100%",
                                             backgroundColor: (theme) => theme.palette.background.default
                                          }
                                       }
                                    }}>
                                    <Box
                                       sx={{
                                          p: 2,
                                          display: "flex",
                                          justifyContent: "flex-end",
                                          alignItems: "center"
                                       }}>
                                       <IconButton onClick={toggleDrawer(false)}>
                                          <CIcon
                                             icon='tabler:x'
                                             size={24}
                                             sx={{
                                                color: theme.palette.error.main,
                                                cursor: "pointer"
                                             }}
                                          />
                                       </IconButton>
                                    </Box>
                                    <Box sx={{ px: 2 }}>
                                       {/* Your sorting/filtering content here */}
                                       <JobFilterSection
                                          search={search}
                                          searchOptions={searchOptions}
                                          color={color}
                                          secondary_color={secondary_color}
                                          selectedJobTypes={selectedJobTypes}
                                          selectedJobExperience={selectedJobExperience}
                                          selectedJobSkills={selectedJobSkills}
                                          setSearchOptions={setSearchOptions}
                                          setSelectedJobTypes={setSelectedJobTypes}
                                          setSelectedJobExperience={setSelectedJobExperience}
                                          setSelectedJobSkills={setSelectedJobSkills}
                                          jobFilterAttributes={jobFilterAttributes}
                                       />
                                    </Box>
                                 </Drawer>
                              </Box>
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
                                 <Grid key={index} item xs={mobile || 12} sm={tab || 6} md={desktop || 4}>
                                    <ListCardLoader />
                                 </Grid>
                              ))}
                           </Grid>
                        </Stack>
                     )}
                     {/* render jobs */}
                     {jobsData?.length > 0 && (
                        <Stack>
                           <Grid container spacing={{ xs: 1, sm: 2, md: 2 }}>
                              {_.map(jobsData, (item: ISingleJob, index: number) => (
                                 <Grid item xs={mobile || 12} sm={tab || 6} md={desktop || 4} key={index}>
                                    <JobItem
                                       data={item}
                                       button_label={card_button?.label}
                                       color={color}
                                       secondary_color={secondary_color}
                                    />
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

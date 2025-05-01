"use client"
import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import NextLink from "next/link"
import {
   Container,
   Grid,
   Icon,
   Pagination,
   PaginationItem,
   Stack,
   useMediaQuery,
   useTheme as MuiTheme,
   Card,
   Skeleton,
   Typography,
   Button,
   Box,
   Drawer,
   IconButton
} from "@mui/material"
import CompanyFilterSection from "./filter"
import { ICompanyFilterBlockData, ICompanyFilterProps, ISingleCategory, ISingleCompany } from "./types"
import CompanyList from "./company-list"
import { find } from "../../lib/strapi"
import CIcon from "../../components/common/icon"

type Props = {
   block: ICompanyFilterBlockData
   language?: string
   categoryData?: ISingleCategory[]
}

const CompanyFilterClient = ({ block, language, categoryData }: Props) => {
   const { theme: mode } = useTheme()
   const theme = MuiTheme()
   const isTablet = useMediaQuery(theme.breakpoints.down("md"))

   const { title, result_placeholder, add_company_button, description, search, empty, style } = block || {}
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
   const isRightSidebar = sidebar === "Right Sidebar"
   const isNoSidebar = sidebar === "No Sidebar"

   const [page, setPage] = React.useState<number>(1)
   const [formData, setFormData] = React.useState<ICompanyFilterProps>({
      selectedIndustry: "",
      selectedCompanySize: "",
      selectedAverageSalary: "",
      selectedRevenue: "",
      companyName: ""
   })
   const [companyData, setCompanyData] = useState<ISingleCompany[]>([])
   const [isLoading, setIsLoading] = useState(false)
   const [totalPage, setTotalPage] = useState(0)
   const [companyError, setCompanyError] = useState(null)
   const [openFilter, setOpenFilter] = useState(false)
   // filter toggle handler
   const toggleFilter = (newOpen: boolean) => () => {
      setOpenFilter(newOpen)
   }

   //  fetch company from db
   useEffect(() => {
      const getCompanyData = async () => {
         setIsLoading(true)
         const { data: companyDataAll, error: companyDataError } = await find(
            "api/metajob-backend/companies",
            {
               filters: {
                  name: {
                     $containsi: formData?.companyName || undefined
                  },
                  industry: {
                     title: {
                        $eq: formData?.selectedIndustry || undefined
                     }
                  }
                  // company_size: {
                  //    $containsi: formData.selectedCompanySize || undefined // Apply filter dynamically
                  // },
                  // avg_salary: {
                  //    $containsi: formData.selectedAverageSalary || undefined // Apply filter dynamically
                  // },
                  // revenue: {
                  //    $containsi: formData.selectedRevenue || undefined // Apply filter dynamically
                  // }
               },
               populate: "*",
               // fields: ["name", "tagline", "slug", "revenue", "company_size", "location"],
               pagination: {
                  pageSize: 12,
                  page: page
               },
               publicationState: "live",
               locale: language ?? "en"
            },
            "no-store"
         )
         if (!companyDataError) {
            setCompanyError(null)
            setCompanyData(companyDataAll?.data)
            setTotalPage(companyDataAll?.meta?.pagination?.pageCount || 0)
            setIsLoading(false)
         } else {
            setCompanyError(companyDataError)
            setCompanyData([])
            setIsLoading(false)
         }
      }

      getCompanyData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page, formData])

   return (
      <Stack
         sx={{
            bgcolor: (theme) =>
               mode === "light" ? backgroundColor || theme.palette.background.default : theme.palette.background.default
         }}>
         <Container maxWidth='lg' sx={{ py: { xs: section_padding || 3, sm: section_padding || 6 } }}>
            <Grid container spacing={4} direction={isRightSidebar ? "row-reverse" : "row"}>
               {!isTablet && !isNoSidebar && (
                  <Grid item xs={12} md={3}>
                     <CompanyFilterSection
                        search={search}
                        formData={formData}
                        setFormData={setFormData}
                        loading={isLoading}
                        categoryData={categoryData}
                        color={color}
                        secondary_color={secondary_color}
                     />
                  </Grid>
               )}
               {/* cards and pagination  */}
               <Grid item xs={12} md={!isNoSidebar ? 9 : 12}>
                  <Stack spacing={4}>
                     <Stack spacing={2}>
                        <Card
                           sx={{
                              borderRadius: 2,
                              p: 1,
                              boxShadow: 0
                           }}>
                           <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                              {isLoading ? (
                                 <Skeleton variant='text' width={"40%"} />
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
                                    {result_placeholder || "Total company found"}{" "}
                                    <Typography
                                       fontWeight={600}
                                       component={"span"}
                                       sx={{
                                          color: (theme) => theme.palette.primary.main,
                                          fontSize: { xs: 14, sm: 16 }
                                       }}>
                                       {companyData?.length}
                                    </Typography>
                                 </Typography>
                              )}
                              {/* mobile-filter  */}
                              {isTablet && (
                                 <Box>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                       <Button
                                          variant='outlined'
                                          onClick={toggleFilter(true)}
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
                                          {search?.mobile_filter_placeholder || "Filter"}
                                       </Button>
                                    </Box>
                                    <Drawer
                                       anchor='right'
                                       open={openFilter}
                                       onClose={toggleFilter(false)}
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
                                          <IconButton onClick={toggleFilter(false)}>
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
                                          <CompanyFilterSection
                                             search={search}
                                             formData={formData}
                                             setFormData={setFormData}
                                             loading={isLoading}
                                             categoryData={categoryData}
                                             color={color}
                                             secondary_color={secondary_color}
                                          />
                                       </Box>
                                    </Drawer>
                                 </Box>
                              )}

                              {!isTablet && add_company_button && (
                                 <Button
                                    component={NextLink}
                                    href={add_company_button?.link || "/dashboard/manage-jobs"}
                                    target={add_company_button?.target ?? "_self"}
                                    sx={{ fontSize: 14, fontWeight: 400 }}
                                    variant='contained'
                                    color='primary'>
                                    {add_company_button?.label || "Add Your Company"}
                                 </Button>
                              )}
                           </Stack>
                        </Card>
                        <CompanyList companies={companyData} loading={isLoading} error={companyError} block={block} />
                     </Stack>
                     {/* pagination  */}
                     {!companyError && totalPage > 0 && (
                        <Stack
                           sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center"
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

export default CompanyFilterClient

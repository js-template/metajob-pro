"use client"
import React from "react"
import useSWR from "swr"
import { Container, Grid, Icon, Pagination, PaginationItem, Stack } from "@mui/material"
import CompanyFilterSection from "./filter"
import { fetcher } from "../../utils/swr-fetcher"
import { ICompanyFilterBlockData, ICompanyFilterProps } from "./types"
import CompanyList from "./company-list"

type Props = {
   block: ICompanyFilterBlockData
   language?: string
}

const CompanyFilter = ({ block, language }: Props) => {
   const { title, description, show_filter, search, empty } = block || {}

   const [page, setPage] = React.useState<number>(1)
   const [formData, setFormData] = React.useState<ICompanyFilterProps>({
      selectedIndustry: "",
      selectedCompanySize: "",
      selectedAverageSalary: "",
      selectedRevenue: "",
      companyName: ""
   })

   //===================Starts fetching company data============
   const queryParams = {
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
      locale: language ?? ["en"]
   }

   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = `/api/find?model=api/metajob-backend/companies&query=${queryString}`

   const { data: companyData, error: companyError, isLoading } = useSWR(apiUrl, fetcher)

   const totalPage = companyData?.meta?.pagination?.pageCount || 0
   //===================Ends fetching company data============

   return (
      <Stack>
         <Container maxWidth='lg' sx={{ py: 6 }}>
            <Grid container spacing={4}>
               {show_filter && (
                  <Grid item xs={12} md={3}>
                     <CompanyFilterSection
                        search={search}
                        formData={formData}
                        setFormData={setFormData}
                        loading={isLoading}
                     />
                  </Grid>
               )}

               {/* cards and pagination  */}
               <Grid item xs={12} md={show_filter ? 9 : 12}>
                  <Stack spacing={4}>
                     <CompanyList
                        companies={companyData?.data}
                        loading={isLoading}
                        error={companyError}
                        empty={empty}
                     />
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

export default CompanyFilter

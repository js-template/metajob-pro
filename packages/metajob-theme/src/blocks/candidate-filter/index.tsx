"use client"

import useSWR from "swr"
import { Container, Grid, Icon, Pagination, PaginationItem, Stack } from "@mui/material"
import { useState } from "react"
import CandidateFilterSection from "./filter"
import { fetcher } from "../../utils/swr-fetcher"
import { ICandidateFilterBlock, ICandidateFilterProps } from "./types"
import CandidateLists from "./lists"

type Props = {
   block: ICandidateFilterBlock
   language?: string
}

export const CandidateFilter = ({ block, language }: Props) => {
   const { show_filter, search, empty } = block || {}

   const [page, setPage] = useState<number>(1)
   const [formData, setFilterFormData] = useState<ICandidateFilterProps>({
      search: "",
      skills: "",
      categories: "",
      rate: ""
   })

   //===================Starts fetching resume data============
   const queryParams = {
      //sort: "name:asc",
      filters: {
         name: {
            $containsi: formData?.search || undefined // Apply filter dynamically
         },
         category: {
            id: {
               $eq: formData?.categories || undefined
            }
         }
         //   skills: {
         //     $containsi: formData.skills || undefined, // Apply filter dynamically
         //   },
         //   company_size: {
         //     $containsi: formData.categories || undefined, // Apply filter dynamically
         //   },
         //   rate: {
         //     $containsi: formData.rate || undefined, // Apply filter dynamically
         //   },
      },
      populate: {
         user: {
            populate: {
               avatar: {
                  fields: ["url"]
               }
            }
         }
      },
      // populate: {
      //    user: {
      //       fields: ["avatar"],
      //       populate: {
      //          avatar: {
      //             field: ["url"]
      //          }
      //       }
      //    },
      //    contact: {
      //       fields: ["location"]
      //    }
      // },
      // fields: ["name", "tagline", "slug", "slug"], // Fields to include in the response
      pagination: {
         pageSize: 12,
         page: page
      },
      publicationState: "live",
      locale: language ?? ["en"]
   }
   const queryString = encodeURIComponent(JSON.stringify(queryParams))
   // Construct the API URL
   const apiUrl = `/api/find?model=api/metajob-backend/resumes&query=${queryString}`
   const { data: resumeData, error: resumeError, isLoading } = useSWR(apiUrl, fetcher)
   const totalPage = resumeData?.meta?.pagination?.pageCount || 0
   //===================Ends fetching resume data============

   //   const handleSubmitForm = (e: any) => {
   //     e.preventDefault();
   //     fetchCandidate();
   //     setPage(1);
   //   };

   return (
      <Stack>
         <Container maxWidth='lg' sx={{ py: 6 }}>
            <Grid container spacing={4}>
               {show_filter && (
                  <Grid item xs={12} md={3}>
                     <CandidateFilterSection
                        search={search}
                        filterFormData={formData}
                        setFilterFormData={setFilterFormData}
                        // handleSubmitForm={handleSubmitForm}
                        loading={isLoading}
                     />
                  </Grid>
               )}
               <Grid item xs={12} md={show_filter ? 9 : 12}>
                  <Stack spacing={4}>
                     <CandidateLists loading={isLoading} error={resumeError} data={resumeData?.data ?? []} />
                     {/* pagination */}
                     {!resumeError && !isLoading && totalPage > 0 && (
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

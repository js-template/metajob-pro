"use client"
import { Container, Grid, Icon, Pagination, PaginationItem, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import CandidateFilterSection from "./filter"
import { ICandidateFilterBlock, ICandidateFilterProps, ISingleCandidate, ISingleCategory } from "./types"
import CandidateLists from "./lists"
import { find } from "../../lib/strapi"

type Props = {
   block: ICandidateFilterBlock
   language?: string
   categoryData?: ISingleCategory[]
}

const CandidateFilterClient = ({ block, language, categoryData }: Props) => {
   const { show_filter, search, empty } = block || {}

   const [page, setPage] = useState<number>(1)
   const [formData, setFilterFormData] = useState<ICandidateFilterProps>({
      search: "",
      skills: "",
      categories: "",
      rate: ""
   })
   const [resumeData, setResumeData] = useState<ISingleCandidate[]>([])
   const [isLoading, setIsLoading] = useState(false)
   const [totalPage, setTotalPage] = useState(0)
   const [resumeError, setResumeError] = useState(null)

   //  fetch resume from db
   useEffect(() => {
      const getResumeData = async () => {
         setIsLoading(true)
         const { data: resumeDataAll, error: resumeDataError } = await find(
            "api/metajob-backend/resumes",
            {
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
               locale: language ?? "en"
            },
            "no-store"
         )
         if (!resumeDataError) {
            setResumeError(null)
            setResumeData(resumeDataAll?.data)
            setTotalPage(resumeDataAll?.meta?.pagination?.pageCount || 0)
            setIsLoading(false)
         } else {
            setResumeError(resumeDataError)
            setResumeData([])
            setIsLoading(false)
         }
      }

      getResumeData()

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page, formData])

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
                        categoryData={categoryData}
                     />
                  </Grid>
               )}
               <Grid item xs={12} md={show_filter ? 9 : 12}>
                  <Stack spacing={4}>
                     <CandidateLists loading={isLoading} error={resumeError} data={resumeData ?? []} block={block} />
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

export default CandidateFilterClient

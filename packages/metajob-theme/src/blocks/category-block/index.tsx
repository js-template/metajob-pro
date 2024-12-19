"use client"
import { ICategories } from "../../types/job-filter"
import { Container, Grid, Icon, Pagination, PaginationItem, Stack } from "@mui/material"
import Item from "./item"
import useSWR from "swr"
import { fetcher } from "./hook"
import { useState } from "react"
import ItemLoader from "./loader"

type IProps = {
   id: number
   __component: string
}
export const CategoryBlock = ({ block, language }: { block: IProps; language?: string }) => {
   const [page, setPage] = useState<number>(1)

   const queryParams = {
      populate: {
         image: {
            fields: ["url"]
         }
      },
      fields: ["title"], // Fields to include in the response
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
   const apiUrl = `/api/find?model=api/metajob-strapi/job-categories&query=${queryString}&cache=no-store`
   // fetch job  data
   const { data: CategoriesAll, isLoading, error: candidateError } = useSWR(apiUrl, fetcher)

   const totalPage = CategoriesAll?.meta?.pagination?.pageCount || 0
   const categoryData = CategoriesAll?.data

   return (
      <Stack>
         <Stack py={8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
            <Container maxWidth='lg'>
               {categoryData && categoryData?.length > 0 && (
                  <Grid container spacing={2}>
                     {categoryData?.map((item: any, index: number) => {
                        return (
                           <Grid item xs={12} sm={4} md={3} key={index}>
                              <Item {...item} />
                           </Grid>
                        )
                     })}
                  </Grid>
               )}
               {/* loader */}
               {isLoading && (
                  <Grid container spacing={2}>
                     {[...Array(12)].map((_, index) => (
                        <Grid item key={index} xs={12} sm={4} md={3}>
                           <ItemLoader />
                        </Grid>
                     ))}
                  </Grid>
               )}

               <Grid item xs={12} md={12} sx={{ pt: 5 }}>
                  <Stack spacing={4}>
                     {/* pagination */}
                     {!candidateError && !isLoading && totalPage > 0 && (
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
            </Container>
         </Stack>
      </Stack>
   )
}

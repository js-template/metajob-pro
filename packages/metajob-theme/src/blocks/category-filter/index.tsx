"use client"
import { useEffect, useState } from "react"
import { Container, Grid, Icon, Pagination, PaginationItem, Stack, Typography, useTheme } from "@mui/material"
import Item from "./item"
import ItemLoader from "./loader"
import { ICategoryFilterBlock, ISingleCategory } from "./types"
import { find } from "../../lib/strapi"
import { hexToRGBA } from "../../lib/hex-to-rgba"

type Props = {
   block: ICategoryFilterBlock
   data?: any
   language?: string
}

export const CategoryFilter = ({ block, language }: Props) => {
   const theme = useTheme()
   // destructure the block
   const { title, description, search_placeholder, card_button, empty, style } = block || {}
   const { desktop, tab, mobile, backgroundColor, color } = style || {}

   const [page, setPage] = useState<number>(1)
   const [categoryData, setCategoryData] = useState<ISingleCategory[]>([])
   const [isLoading, setIsLoading] = useState(true)
   const [totalPage, setTotalPage] = useState(0)
   const [categoryError, setCategoryError] = useState(null)

   //  fetch category from db
   useEffect(() => {
      const delaySearch = setTimeout(() => {
         const getCategoryData = async () => {
            setIsLoading(true)
            const { data: categoryDataAll, error: categoryDataError } = await find(
               "api/metajob-backend/job-categories",
               {
                  populate: {
                     image: {
                        fields: ["url"]
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
            if (!categoryDataError) {
               setCategoryError(null)
               setCategoryData(categoryDataAll?.data)
               setTotalPage(categoryDataAll?.meta?.pagination?.pageCount || 0)
            } else {
               setCategoryError(categoryDataError)
               setCategoryData([])
            }
            setIsLoading(false)
         }
         getCategoryData()
      }, 500) // Delay execution by 500ms
      return () => clearTimeout(delaySearch) // Clear timeout on new input
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page])

   return (
      <Stack
         bgcolor={backgroundColor ? backgroundColor : theme.palette.background.default}
         sx={{ minHeight: "calc(100vh - 300px)" }}>
         <Container maxWidth='lg'>
            <Stack py={8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* header  */}
               {(title || description) && (
                  <Stack spacing={1} direction={"column"}>
                     {title && (
                        <Typography
                           sx={{
                              color: color ?? theme.palette.text.primary,
                              fontWeight: 700,
                              fontSize: "32px",
                              textAlign: "center"
                           }}>
                           {title}
                        </Typography>
                     )}
                     {description && (
                        <Typography
                           sx={{
                              color: hexToRGBA(color ?? theme.palette.text.primary, 0.5),
                              fontSize: "16px",
                              textAlign: "center"
                           }}>
                           {description}
                        </Typography>
                     )}
                  </Stack>
               )}
               {/* category section  */}
               {categoryData && categoryData?.length > 0 && (
                  <Grid container spacing={2}>
                     {categoryData?.map((item: any, index: number) => {
                        return (
                           <Grid item xs={mobile || 12} sm={tab || 4} md={desktop || 3} key={index}>
                              <Item data={item} button_label={card_button} />
                           </Grid>
                        )
                     })}
                  </Grid>
               )}
               {/* loader */}
               {isLoading && (
                  <Grid container spacing={2}>
                     {[...Array(12)].map((_, index) => (
                        <Grid item key={index} xs={mobile || 12} sm={tab || 4} md={desktop || 3}>
                           <ItemLoader />
                        </Grid>
                     ))}
                  </Grid>
               )}
               {/* empty data */}
               {!isLoading && categoryData?.length == 0 && (
                  <Grid container justifyContent={"center"} spacing={2}>
                     <Stack
                        sx={{
                           display: "flex",
                           flexDirection: "column",
                           alignItems: "center",
                           gap: 0.5,
                           py: 4
                        }}>
                        <Typography variant='body1' sx={{ color: theme.palette.text.secondary }}>
                           {empty?.title || "No data found"}
                        </Typography>
                        <Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>
                           {empty?.description || "Try to refresh the page or check back later"}
                        </Typography>
                     </Stack>
                  </Grid>
               )}
               {/* pagination */}
               {!categoryError && !isLoading && totalPage > 0 && (
                  <Grid item xs={12} md={12} sx={{ pt: 5 }}>
                     <Stack spacing={4}>
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
                     </Stack>
                  </Grid>
               )}
            </Stack>
         </Container>
      </Stack>
   )
}

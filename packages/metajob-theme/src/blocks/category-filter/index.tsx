"use client"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import {
   Container,
   Grid,
   Icon,
   Pagination,
   PaginationItem,
   Stack,
   Typography,
   useTheme as muiTheme
} from "@mui/material"
import ItemLoader from "./loader"
import { ICategoryFilterBlock, ISingleCategory } from "./types"
import { find } from "../../lib/strapi"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { CategoryCardItem } from "../../components/cards/category-cards/category-card"

type Props = {
   block: ICategoryFilterBlock
   data?: any
   language?: string
}

export const CategoryFilter = ({ block, language }: Props) => {
   const theme = muiTheme()
   const { theme: mode } = useTheme()
   // destructure the block
   const { content, card_button, empty, style, show_description, icon_type } = block || {}
   const { title, sub_title, variation } = content || {}
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
         bgcolor={
            mode === "light" ? backgroundColor || theme.palette.background.default : theme.palette.background.default
         }
         sx={{ minHeight: "calc(100vh - 300px)" }}>
         <Container maxWidth='lg'>
            <Stack py={section_padding || 8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* header  */}
               {(title || sub_title) && (
                  <Stack spacing={1} direction={"column"}>
                     {title && (
                        <Typography
                           maxWidth={header_width === "Full" ? "100%" : 650}
                           sx={{
                              color:
                                 mode === "light"
                                    ? header_color || theme.palette.text.primary
                                    : theme.palette.text.primary,
                              fontWeight: 700,
                              fontSize: "32px",
                              textAlign: "center"
                           }}>
                           {title}
                        </Typography>
                     )}
                     {sub_title && (
                        <Typography
                           maxWidth={header_width === "Full" ? "100%" : 650}
                           sx={{
                              color:
                                 mode === "light"
                                    ? sub_header_color || hexToRGBA(theme.palette.text.primary, 0.5)
                                    : hexToRGBA(theme.palette.text.primary, 0.5),
                              fontSize: "16px",
                              textAlign: "center"
                           }}>
                           {sub_title}
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
                              <CategoryCardItem
                                 data={item}
                                 icon_type={icon_type}
                                 show_description={show_description}
                                 button_label={card_button}
                                 color={color}
                                 secondary_color={secondary_color}
                              />
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

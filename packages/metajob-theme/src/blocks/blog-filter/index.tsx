"use client"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import _ from "lodash"
import {
   Box,
   Button,
   Container,
   FormControl,
   Grid,
   Icon,
   MenuItem,
   Pagination,
   PaginationItem,
   Select,
   Stack,
   TextField,
   Typography,
   useTheme as muiTheme
} from "@mui/material"
import CardItem from "./item"
import { IBogFilterBlock, ISinglePost } from "./types"
import { find } from "../../lib/strapi"
import BlogItemLoader from "./loader"

type Props = {
   block: IBogFilterBlock
   data?: any
   language?: string
}

export const BlogFilter = ({ block, language }: Props) => {
   const theme = muiTheme()
   const { theme: mode } = useTheme()

   // destructure the block
   const { title, description, search_placeholder, empty, style } = block || {}
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

   const [searchOptions, setSearchOptions] = useState({
      searchText: "",
      category: ""
   })
   const [page, setPage] = useState<number>(1)
   const [recentBlogs, setRecentBlogs] = useState<ISinglePost[]>([])
   const [isLoading, setIsLoading] = useState(true)
   const [totalPage, setTotalPage] = useState(0)
   const [blogsError, setBlogsError] = useState(null)

   //  fetch blogs from db
   useEffect(() => {
      const delaySearch = setTimeout(() => {
         const getBlogsData = async () => {
            setIsLoading(true)
            const { data: blogsDataAll, error: blogsDataError } = await find(
               "api/padma-backend/posts",
               {
                  filters: {
                     title: {
                        $containsi: searchOptions.searchText || undefined
                     }
                  },
                  populate: {
                     featuredImage: {
                        fields: ["url"]
                     }
                  },
                  sort: ["createdAt:desc"], // sorting to the most recent data
                  pagination: {
                     pageSize: 12,
                     page: page
                  },
                  publicationState: "live",
                  locale: language ?? "en"
               },
               "no-store"
            )
            if (!blogsDataError) {
               setBlogsError(null)
               setRecentBlogs(blogsDataAll?.data)
               setTotalPage(blogsDataAll?.meta?.pagination?.pageCount || 0)
            } else {
               setBlogsError(blogsDataError)
               setRecentBlogs([])
            }
            setIsLoading(false)
         }
         getBlogsData()
      }, 500) // Delay execution by 500ms
      return () => clearTimeout(delaySearch) // Clear timeout on new input
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page, searchOptions])

   return (
      <Stack
         bgcolor={mode === "light" ? backgroundColor || theme.palette.background.paper : theme.palette.background.paper}
         sx={{ minHeight: "100vh" }}>
         <Container maxWidth='lg'>
            <Stack py={section_padding || 8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* search  */}
               {search_placeholder && (
                  <Box
                     sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-end" },
                        alignItems: "center"
                     }}>
                     <TextField
                        sx={{
                           maxWidth: 300,
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
                  </Box>
               )}

               {/* posts section  */}
               {!isLoading && recentBlogs?.length > 0 && (
                  <Grid container spacing={2}>
                     {_.map(recentBlogs, (item) => (
                        <Grid item xs={mobile || 12} sm={tab || 6} md={desktop || 4} key={item?.id}>
                           <CardItem
                              data={item}
                              button_label={block?.card_button}
                              color={color}
                              secondary_color={secondary_color}
                           />
                        </Grid>
                     ))}
                  </Grid>
               )}

               {/* loader  */}
               {isLoading && (
                  <Grid container spacing={2}>
                     {[...Array(3)]?.map((_, index) => (
                        <Grid item xs={mobile || 12} sm={tab || 6} md={desktop || 4} key={index}>
                           <BlogItemLoader />
                        </Grid>
                     ))}
                  </Grid>
               )}
               <Grid container justifyContent={"center"} spacing={2}>
                  {/* empty data */}
                  {!isLoading && recentBlogs?.length == 0 && (
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
                  )}
               </Grid>

               <Box>
                  {/* pagination */}
                  {!blogsError && !isLoading && totalPage > 0 && (
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
               </Box>
            </Stack>
         </Container>
      </Stack>
   )
}

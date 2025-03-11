"use client"
import { useEffect, useState } from "react"
import _ from "lodash"
import {
   Box,
   Button,
   Container,
   Grid,
   Icon,
   Pagination,
   PaginationItem,
   Stack,
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

   // destructure the block
   const { title, description, empty, style } = block || {}
   const { desktop, tab, mobile, backgroundColor, color } = style || {}

   const [page, setPage] = useState<number>(1)
   const [recentBlogs, setRecentBlogs] = useState<ISinglePost[]>([])
   const [isLoading, setIsLoading] = useState(false)
   const [totalPage, setTotalPage] = useState(0)
   const [blogsError, setBlogsError] = useState(null)

   //  fetch blogs from db
   useEffect(() => {
      const getBlogsData = async () => {
         setIsLoading(true)
         const { data: blogsDataAll, error: blogsDataError } = await find(
            "api/padma-backend/posts",
            {
               populate: {
                  featuredImage: {
                     fields: ["url"]
                  }
               },
               sort: ["createdAt:desc"], //sorting to the most recent data
               pagination: {
                  pageSize: 12,
                  page: page
               },
               publicationState: "live",
               locale: language ?? ["en"]
            },
            "no-store"
         )
         if (!blogsDataError) {
            setBlogsError(null)
            setRecentBlogs(blogsDataAll?.data)
            setTotalPage(blogsDataAll?.meta?.pagination?.pageCount || 0)
            setIsLoading(false)
         } else {
            setBlogsError(blogsDataError)
            setRecentBlogs([])
            setIsLoading(false)
         }
      }

      getBlogsData()

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page])

   return (
      <Stack bgcolor={backgroundColor ? backgroundColor : theme.palette.background.paper}>
         <Container maxWidth='lg'>
            <Stack py={8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* posts section  */}
               {recentBlogs?.length > 0 && (
                  <Grid container spacing={2}>
                     {_.map(recentBlogs, (item) => (
                        <Grid item xs={mobile || 12} sm={tab || 6} md={desktop || 4} key={item?.id}>
                           <CardItem data={item} />
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
                  {recentBlogs?.length == 0 && (
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

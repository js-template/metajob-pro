"use client"

import NextLink from "next/link"
import _ from "lodash"
import { Box, Container, Grid, Stack, Typography, Button, useTheme } from "@mui/material"
import { CardItem } from "./item"
import { ICategoryCardBlock, ISingleCategory, IUserSession } from "./types"
import { SectionTitle } from "../../components/section-title"
import useSWR from "swr"
import { fetcher } from "./hook"
import CardItemLoader from "./loader"

type Props = {
   block: ICategoryCardBlock
   data: any
   language?: string
   session?: IUserSession | null | any
}

export const JobCategory = ({ block, language }: Props) => {
   const theme = useTheme()

   // destructure the block
   const { content, empty, style, button } = block || {}
   const { desktop, tab, mobile, backgroundColor, color } = style || {}
   const { label, link } = button || {}

   //===================Starts fetching category data============
   const categoryQueryParams = {
      populate: {
         image: {
            fields: ["url"]
         }
      },
      fields: ["title"]
      // locale: language ? [language] : ["en"]
   }
   const categoryQueryString = encodeURIComponent(JSON.stringify(categoryQueryParams))
   const categoryAPiUrl = `/api/find?model=api/metajob-backend/job-categories&query=${categoryQueryString}`
   const { data: categories, isLoading: categoryIsLoading } = useSWR(categoryAPiUrl, fetcher, {
      fallbackData: []
   })
   const categoryData = categories?.data
   //===================Ends fetching category data============

   return (
      <Stack bgcolor={backgroundColor ? backgroundColor : theme.palette.background.default}>
         <Container maxWidth='lg'>
            <Stack py={8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* section-title  */}
               {content && <SectionTitle data={content} />}

               {/* category-items */}
               {categoryData && categoryData?.length > 0 && (
                  <Grid container spacing={2}>
                     {categoryData?.slice(0, 12)?.map((ctg: ISingleCategory) => (
                        <Grid item xs={mobile || 12} sm={4} md={tab || 3} lg={desktop || 2} key={ctg.id}>
                           <CardItem data={ctg} />
                        </Grid>
                     ))}
                  </Grid>
               )}

               {/* loader */}
               {!categories && categoryIsLoading && (
                  <Grid container spacing={2}>
                     {[...Array(12)]?.map((_, index) => (
                        <Grid item xs={mobile || 12} sm={4} md={tab || 3} lg={desktop || 2} key={index}>
                           <CardItemLoader />
                        </Grid>
                     ))}
                  </Grid>
               )}
               {/* empty data */}
               {categoryData && categoryData?.length == 0 && (
                  <Grid container justifyContent={"center"} spacing={2}>
                     <Stack
                        sx={{
                           display: "flex",
                           flexDirection: "column",
                           alignItems: "center",
                           gap: 0.5,
                           py: 4
                        }}>
                        <Typography variant='body1' sx={{ color: (theme) => theme.palette.text.secondary }}>
                           {empty?.title || "No data found"}
                        </Typography>
                        <Typography variant='body2' sx={{ color: (theme) => theme.palette.text.secondary }}>
                           {empty?.description || "Try to refresh the page or check back later"}
                        </Typography>
                     </Stack>
                  </Grid>
               )}

               <Box>
                  <Button
                     component={NextLink}
                     href={link || "/all-category"}
                     sx={{
                        bgcolor: "secondary.dark",
                        color: "white",
                        "&:hover": {
                           bgcolor: "primary.main"
                        }
                     }}>
                     {label || "Browse All Category"}
                  </Button>
               </Box>
            </Stack>
         </Container>
      </Stack>
   )
}

"use client"

import React from "react"
import _ from "lodash"
import { Box, Container, Icon, IconButton, Stack, Typography, useTheme } from "@mui/material"
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import CardItem from "./item"
import { IUserSession } from "../../types/user"
import { IReviewsBlock } from "./types"
import { SectionTitle } from "../../components/section-title"
import { fetcher } from "./hook"
import useSWR from "swr"

type Props = {
   block: IReviewsBlock
   data: any
   language?: string
   session?: IUserSession | null | any
}

export const ReviewCard = ({ block, language }: Props) => {
   const theme = useTheme()

   // destructure the block
   const { content, empty, style } = block || {}
   const { desktop, tab, mobile, backgroundColor, color } = style || {}

   const slider = React.useRef<Slider | null>(null)
   const settings = {
      className: "center",
      infinite: true,
      dots: false,
      slidesToShow: desktop || 3,
      slidesToScroll: 1,
      arrows: false,
      speed: 500,
      autoplay: true,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: tab || 2,
               slidesToScroll: 1,
               infinite: true
            }
         },

         {
            breakpoint: 750,
            settings: {
               slidesToShow: tab || 2,
               slidesToScroll: 1,
               infinite: true
               // dots: true
            }
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: mobile || 1,
               slidesToScroll: 1,
               initialSlide: 1
            }
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: mobile || 1,
               slidesToScroll: 1
            }
         }
      ]
   }

   //===================Starts fetching testimonial data============
   const testimonialQueryParams = {
      populate: "*"
      // locale: language ? [language] : ["en"]
   }
   const testimonialQueryString = encodeURIComponent(JSON.stringify(testimonialQueryParams))
   const testimonialAPiUrl = `/api/find?model=api/metajob-backend/testimonials&query=${testimonialQueryString}`
   const { data: testimonialsAll, isLoading } = useSWR(testimonialAPiUrl, fetcher, {
      fallbackData: []
   })
   const testimonialData = testimonialsAll?.data

   return (
      <Stack py={8} bgcolor={backgroundColor ? backgroundColor : theme.palette.background.default}>
         <Container maxWidth='lg' sx={{ py: 2 }}>
            <Stack spacing={8}>
               <Stack spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
                  {/* section-title  */}
                  {content && <SectionTitle data={content} />}
               </Stack>
               <Stack position={"relative"}>
                  {testimonialData && testimonialData?.length > 1 && (
                     <Slider {...settings} ref={slider}>
                        {_.map(testimonialData, (review, index) => (
                           <CardItem key={index} data={review} />
                        ))}
                     </Slider>
                  )}
                  {testimonialData && testimonialData?.length == 1 && (
                     <Box sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
                        <Box sx={{ maxWidth: 600 }}>
                           {_.map(testimonialData, (review, index) => (
                              <CardItem key={index} data={review} />
                           ))}
                        </Box>
                     </Box>
                  )}

                  {/* empty data */}
                  {testimonialData?.length == 0 && (
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
                  <Box
                     sx={{
                        position: "absolute",
                        left: {
                           lg: -50,
                           md: -30,
                           sm: -20,
                           xs: -10
                        },
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 1
                     }}>
                     <IconButton
                        sx={{
                           color: theme.palette.text.secondary,
                           bgcolor: theme.palette.divider,
                           "&:hover": {
                              bgcolor: theme.palette.primary.main,
                              color: theme.palette.background.default
                           }
                        }}
                        onClick={() => slider.current?.slickPrev()}>
                        <Icon className='icon-arrow-left' />
                     </IconButton>
                  </Box>
                  <Box
                     sx={{
                        position: "absolute",
                        right: {
                           lg: -50,
                           md: -30,
                           sm: -20,
                           xs: -10
                        },
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 1
                     }}>
                     <IconButton
                        sx={{
                           color: theme.palette.text.secondary,
                           bgcolor: theme.palette.divider,
                           "&:hover": {
                              bgcolor: theme.palette.primary.main,
                              color: theme.palette.background.default
                           }
                        }}
                        onClick={() => slider.current?.slickNext()}>
                        <Icon className='icon-arrow-right' />
                     </IconButton>
                  </Box>
               </Stack>
            </Stack>
         </Container>
      </Stack>
   )
}

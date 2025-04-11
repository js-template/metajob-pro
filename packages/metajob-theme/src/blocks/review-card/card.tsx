"use client"

import React from "react"
import _ from "lodash"
import { useTheme } from "next-themes"
import { Box, Container, Icon, IconButton, Stack, Typography, useTheme as muiTheme } from "@mui/material"
import Slider from "react-slick"
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import CardItem from "./item"
import { IReviewsBlock, ISingleReview } from "./types"
import { SectionTitle } from "../../components/section-title"

type Props = {
   block: IReviewsBlock
   language?: string
   testimonialData?: ISingleReview[]
}

export const ReviewCardClient = ({ block, testimonialData }: Props) => {
   const { theme: mode } = useTheme()
   const theme = muiTheme()

   // destructure the block
   const { content, empty, style } = block || {}
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
      mobile
   } = style || {}

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
   return (
      <Stack
         py={section_padding || 8}
         bgcolor={
            mode === "light" ? backgroundColor || theme.palette.background.default : theme.palette.background.default
         }>
         <Container maxWidth='lg' sx={{ py: 2 }}>
            <Stack spacing={8}>
               <Stack spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
                  {/* section-title  */}
                  {content && (
                     <SectionTitle data={content} color={{ header_color, sub_header_color }} width={header_width} />
                  )}
               </Stack>
               <Stack position={"relative"}>
                  {testimonialData && testimonialData?.length > 1 && (
                     <Slider {...settings} ref={slider}>
                        {_.map(testimonialData, (review, index) => (
                           <CardItem key={index} data={review} color={color} secondary_color={secondary_color} />
                        ))}
                     </Slider>
                  )}
                  {testimonialData && testimonialData?.length == 1 && (
                     <Box sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
                        <Box sx={{ maxWidth: 600 }}>
                           {_.map(testimonialData, (review, index) => (
                              <CardItem key={index} data={review} color={color} secondary_color={secondary_color} />
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

"use client"
import { Fragment } from "react/jsx-runtime"
import NextLink from "next/link"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Box, Chip, Grid, LinearProgress, Paper, Skeleton, Typography, useTheme } from "@mui/material"
import { IResumeDetailsBlock } from "./types"

type Props = {
   portfolioData: {
      title: string
      description: string
      link: {
         link: string
         label: string
         type: string
         target: string
      }
      image?: {
         url: string
      }
   }[]
   isLoading?: boolean
   block: IResumeDetailsBlock
}

const PortfolioSection = ({ portfolioData, isLoading, block }: Props) => {
   const theme = useTheme()
   const { portfolio_placeholder, empty } = block || {}
   return isLoading ? (
      <Box>
         <Skeleton
            variant='text'
            width={150}
            height={40}
            sx={{
               mb: 1.5
            }}
         />
         <LinearProgress color='inherit' />
      </Box>
   ) : (
      <Box>
         {portfolioData?.length === 0 && (
            <Typography
               fontSize={16}
               fontWeight={400}
               sx={{
                  color: (theme) => theme.palette.text.disabled
               }}>
               {empty?.title || "No portfolio data added"}
            </Typography>
         )}

         {portfolioData?.length > 0 && (
            <Fragment>
               <Typography
                  fontSize={20}
                  fontWeight={700}
                  mb={1.5}
                  sx={{
                     color: (theme) => theme.palette.text.primary
                  }}
                  textAlign={"left"}>
                  {portfolio_placeholder || "Portfolio"}
               </Typography>

               <Grid
                  container
                  spacing={2}
                  sx={{
                     borderColor: (theme) => theme.palette.divider,
                     borderBottom: 1,
                     "&:last-child": {
                        borderBottom: 0
                     }
                  }}>
                  {portfolioData?.map((item, index) => (
                     <Grid item xs={12} md={3} key={index}>
                        <Paper
                           sx={{
                              p: 2,
                              borderRadius: "12px",
                              borderColor: (theme) => theme.palette.divider,
                              borderWidth: 1,
                              borderStyle: "solid",
                              boxShadow: "none"
                           }}>
                           <Typography
                              fontSize={20}
                              fontWeight={500}
                              sx={{
                                 color: (theme) => theme.palette.text.primary
                              }}>
                              {portfolioData?.length > 1 && index + 1 + "."} {item?.title}
                           </Typography>
                           <Chip
                              clickable
                              component={NextLink}
                              href={item?.link?.link || "#"}
                              target={item?.link?.target}
                              label={"Live Link"}
                              size='small'
                              sx={{
                                 backgroundColor: hexToRGBA(theme.palette.primary.main, 0.1),
                                 color: theme.palette.primary.main,
                                 borderColor: theme.palette.primary.main,
                                 borderRadius: "6px",
                                 fontWeight: 500
                              }}
                           />
                           <Typography
                              fontSize={16}
                              fontWeight={400}
                              color={hexToRGBA(theme.palette.text.primary, 0.7)}>
                              {item?.description}
                           </Typography>
                        </Paper>
                     </Grid>
                  ))}
               </Grid>
            </Fragment>
         )}
      </Box>
   )
}

export default PortfolioSection

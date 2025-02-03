import { Fragment } from "react"
import NextLink from "next/link"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Box, Chip, Grid, LinearProgress, Paper, Skeleton, Typography, useTheme } from "@mui/material"

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
      image?: any
   }[]
   isLoading?: boolean
}

const PortfolioPreview = ({ portfolioData, isLoading }: Props) => {
   const theme = useTheme()
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
            <Typography fontSize={16} fontWeight={400} color={(theme) => theme.palette.text.disabled}>
               No portfolio data added
            </Typography>
         )}

         {portfolioData?.length > 0 && (
            <Fragment>
               <Typography
                  fontSize={20}
                  fontWeight={700}
                  mb={1.5}
                  color={(theme) => theme.palette.text.primary}
                  textAlign={"left"}>
                  Portfolio
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
                           <Typography fontSize={20} fontWeight={500} color={(theme) => theme.palette.text.primary}>
                              {portfolioData?.length > 1 && index + 1 + "."} {item?.title}
                           </Typography>
                           {item?.link && (
                              <Chip
                                 clickable
                                 component={NextLink}
                                 href={item?.link?.link || "#"}
                                 target={item?.link?.target}
                                 label={item?.link?.label || "Live Link"}
                                 size='small'
                                 sx={{
                                    backgroundColor: hexToRGBA(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main,
                                    borderColor: theme.palette.primary.main,
                                    borderRadius: "6px",
                                    fontWeight: 500
                                 }}
                              />
                           )}
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

export default PortfolioPreview

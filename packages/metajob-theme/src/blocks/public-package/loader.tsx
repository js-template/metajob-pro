"use client"
import _ from "lodash"
import { Box, Card, CardContent, Container, Grid, Skeleton, Stack, useTheme } from "@mui/material"

const PublicPackageLoader = () => {
   const theme = useTheme()
   return (
      <Stack bgcolor={theme.palette.background.paper}>
         <Container maxWidth='md'>
            <Stack pt={8} pb={12} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* header  */}
               <Stack spacing={1} sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                  <Skeleton variant='text' height='50px' sx={{ maxWidth: "200px", width: "100%" }} />
                  <Skeleton variant='text' height='25px' sx={{ maxWidth: "300px", width: "100%" }} />
               </Stack>

               <Grid container spacing={2}>
                  {_.map([1, 2, 3], (item, index) => (
                     <Grid key={index} item xs={12} sm={6} lg={4}>
                        {/* item  */}
                        <Box>
                           <Card
                              sx={{
                                 maxWidth: { xs: "100%", md: "360px" },
                                 boxShadow: "none",
                                 borderRadius: "16px",
                                 border: "1px solid",
                                 borderColor: theme.palette.divider
                              }}>
                              <CardContent sx={{ padding: 3 }}>
                                 {/* Price */}
                                 <Skeleton
                                    variant='text'
                                    height='50px'
                                    sx={{ maxWidth: "180px", width: "100%", mb: 2 }}
                                 />

                                 {/* Title */}
                                 <Skeleton variant='text' width='100%' height='30px' />
                                 {/* Description */}
                                 <Box sx={{ mt: 0.5, mb: 2 }}>
                                    <Skeleton variant='text' width='100%' height='20px' />
                                    <Skeleton variant='text' width='100%' height='20px' />
                                 </Box>

                                 {/* Features */}
                                 <Box sx={{ mt: 4 }}>
                                    <Skeleton variant='text' width='100%' height='30px' sx={{ mb: 1 }} />
                                    {[1, 2, 3, 4, 5, 6].map((item, index) => (
                                       <Skeleton
                                          variant='text'
                                          width='100%'
                                          height='20px'
                                          key={index}
                                          sx={{
                                             my: 3,
                                             "&:last-of-type": {
                                                mb: 0
                                             }
                                          }}
                                       />
                                    ))}
                                 </Box>

                                 {/* Button */}
                                 <Skeleton
                                    variant='rectangular'
                                    width='100%'
                                    height='46px'
                                    sx={{
                                       borderRadius: "10px",
                                       mt: 2
                                    }}
                                 />
                              </CardContent>
                           </Card>
                        </Box>
                     </Grid>
                  ))}
               </Grid>
            </Stack>
         </Container>
      </Stack>
   )
}

export default PublicPackageLoader

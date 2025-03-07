"use client"
import { Box, Container, Grid, Skeleton, Stack, useMediaQuery, useTheme } from "@mui/material"

export const ReviewCardLoader = () => {
   const theme = useTheme()

   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
   return (
      <Stack py={8} bgcolor={theme.palette.background.default}>
         <Container maxWidth='lg' sx={{ py: 2 }}>
            <Stack spacing={8}>
               <Stack spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
                  {/* section-title  */}
                  <Stack spacing={1} direction={"column"}>
                     <Skeleton variant='rectangular' width={330} height={24} />
                     <Skeleton variant='rectangular' width={330} height={48} />
                  </Stack>
               </Stack>
               <Stack position={"relative"}>
                  {/* card-items */}
                  <Grid container spacing={2}>
                     {[...Array(isMobile ? 2 : 3)]?.map((_, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                           <Stack
                              sx={{
                                 bgcolor: "background.paper",
                                 p: 2,
                                 borderRadius: 1.5,
                                 mx: 1.5
                              }}>
                              <Stack gap={2}>
                                 <Stack direction={"row"} spacing={2} alignItems={"center"}>
                                    <Skeleton variant='circular' width={64} height={64} />
                                    <Stack spacing={1}>
                                       <Skeleton variant='rounded' width={130} height={30} />
                                       <Skeleton variant='rounded' width={130} height={21} />
                                    </Stack>
                                 </Stack>
                                 <Stack>
                                    <Skeleton variant='rounded' width={"100%"} height={90} />
                                 </Stack>
                              </Stack>
                           </Stack>
                        </Grid>
                     ))}
                  </Grid>

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
                     <Skeleton variant='circular' width={40} height={40} />
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
                     <Skeleton variant='circular' width={40} height={40} />
                  </Box>
               </Stack>
            </Stack>
         </Container>
      </Stack>
   )
}

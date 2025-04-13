"use client"
import { Box, Container, Grid, Stack, useTheme, Card, Skeleton, useMediaQuery } from "@mui/material"
import { hexToRGBA } from "../../lib/hex-to-rgba"

const JobCategoryLoader = () => {
   const theme = useTheme()
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

   return (
      <Stack bgcolor={theme.palette.background.default}>
         <Container maxWidth='lg'>
            <Stack py={8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* section-title  */}
               <Stack spacing={1} direction={"column"}>
                  <Skeleton variant='rectangular' width={330} height={24} />
                  <Skeleton variant='rectangular' width={330} height={48} />
               </Stack>

               {/* card-items */}
               <Grid container spacing={2}>
                  {[...Array(isMobile ? 2 : 12)]?.map((_, index) => (
                     <Grid item xs={12} sm={4} md={3} lg={2} key={index}>
                        <Card
                           sx={{
                              p: 4,
                              display: "block",
                              textDecoration: "none",
                              cursor: "pointer",
                              "&:hover .iconBox": {
                                 transform: "scale(1.2)"
                              }
                           }}>
                           <Stack
                              spacing={2}
                              sx={{
                                 justifyContent: "center",
                                 alignItems: "center"
                              }}>
                              <Box
                                 className='iconBox'
                                 sx={{
                                    color: (theme) => theme.palette.primary.main,
                                    bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                                    borderRadius: "12px",
                                    width: "fit-content",
                                    p: 2,
                                    transition: "transform 0.3s ease-in-out"
                                 }}>
                                 <Skeleton variant='rectangular' width={20} height={20} />
                              </Box>

                              <Stack>
                                 <Skeleton variant='text' width={80} height={20} />
                              </Stack>
                           </Stack>
                        </Card>
                     </Grid>
                  ))}
               </Grid>
            </Stack>
         </Container>
      </Stack>
   )
}

export default JobCategoryLoader

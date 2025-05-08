"use client"
import { Box, Container, Grid, Stack, useTheme as muiTheme, Skeleton, useMediaQuery } from "@mui/material"

const JobCardLoader = () => {
   const theme = muiTheme()
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
   return (
      <Stack sx={{ bgcolor: theme.palette.background.paper }}>
         <Container maxWidth='lg'>
            <Stack py={8} gap={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* section-title  */}
               <Stack spacing={1} direction={"column"}>
                  <Skeleton variant='rectangular' width={330} height={24} />
                  <Skeleton variant='rectangular' width={330} height={48} />
               </Stack>
               {/* card-items */}
               <Grid container spacing={2}>
                  {[...Array(isMobile ? 2 : 4)]?.map((_, index) => (
                     <Grid key={index} item xs={12} sm={6} md={3}>
                        <Stack
                           sx={{
                              borderWidth: 1,
                              borderStyle: "solid",
                              borderColor: (theme) => theme.palette.divider,
                              p: 2,
                              borderRadius: 2,
                              bgcolor: (theme) => theme.palette.background.default
                           }}
                           spacing={2}>
                           <Stack
                              direction={"row"}
                              gap={1}
                              sx={{
                                 display: "flex",
                                 justifyContent: "flex-end",
                                 flexWrap: "wrap"
                              }}>
                              <Skeleton
                                 sx={{
                                    bgcolor: (theme) => theme.palette.background.paper
                                 }}
                                 variant='rounded'
                                 width={20}
                                 height={20}
                              />
                           </Stack>
                           <Stack
                              sx={{
                                 justifyContent: "center",
                                 alignItems: "center"
                              }}>
                              <Skeleton
                                 sx={{
                                    bgcolor: (theme) => theme.palette.background.paper
                                 }}
                                 variant='circular'
                                 width={100}
                                 height={100}
                              />
                           </Stack>
                           <Box>
                              <Skeleton
                                 variant='text'
                                 sx={{ fontSize: "1rem", bgcolor: (theme) => theme.palette.background.paper }}
                              />
                           </Box>
                           <Stack spacing={2}>
                              <Stack direction={"row"} gap={2} alignItems={"center"}>
                                 <Skeleton
                                    variant='rounded'
                                    sx={{ height: 20, width: 20, bgcolor: (theme) => theme.palette.background.paper }}
                                 />

                                 <Skeleton
                                    variant='text'
                                    sx={{
                                       width: 100,
                                       fontSize: "0.75rem",
                                       bgcolor: (theme) => theme.palette.background.paper
                                    }}
                                 />
                              </Stack>
                              <Stack direction={"row"} gap={2} alignItems={"center"}>
                                 <Skeleton
                                    variant='rounded'
                                    sx={{ height: 20, width: 20, bgcolor: (theme) => theme.palette.background.paper }}
                                 />

                                 <Skeleton
                                    variant='text'
                                    sx={{
                                       width: 100,
                                       fontSize: "0.75rem",
                                       bgcolor: (theme) => theme.palette.background.paper
                                    }}
                                 />
                              </Stack>
                              <Stack direction={"row"} gap={2} alignItems={"center"}>
                                 <Skeleton
                                    variant='rounded'
                                    sx={{ height: 20, width: 20, bgcolor: (theme) => theme.palette.background.paper }}
                                 />

                                 <Skeleton
                                    variant='text'
                                    sx={{
                                       width: 100,
                                       fontSize: "0.75rem",
                                       bgcolor: (theme) => theme.palette.background.paper
                                    }}
                                 />
                              </Stack>
                           </Stack>

                           <Skeleton
                              variant='rectangular'
                              sx={{ height: 45, borderRadius: 2, bgcolor: (theme) => theme.palette.background.paper }}
                           />
                        </Stack>
                     </Grid>
                  ))}
               </Grid>

               <Box>
                  <Skeleton variant='rounded' width={136} height={48} />
               </Box>
            </Stack>
         </Container>
      </Stack>
   )
}

export default JobCardLoader

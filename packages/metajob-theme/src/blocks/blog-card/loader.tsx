"use client"
import { Container, Grid, Skeleton, Stack, useTheme as muiTheme, useMediaQuery } from "@mui/material"

const BlogCardLoader = () => {
   const theme = muiTheme()
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

   return (
      <Stack bgcolor={theme.palette.background.paper}>
         <Container maxWidth='lg'>
            <Stack py={8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* section-title  */}
               <Stack spacing={1} direction={"column"}>
                  <Skeleton variant='rectangular' width={330} height={24} />
                  <Skeleton variant='rectangular' width={330} height={48} />
               </Stack>
               {/* posts section  */}
               <Grid container spacing={2}>
                  {[...Array(isMobile ? 1 : 3)]?.map((_, index) => (
                     <Grid item xs={12} sm={6} md={4} key={index}>
                        <Stack
                           sx={{
                              borderWidth: 1,
                              borderStyle: "solid",
                              borderColor: (theme) => theme.palette.divider,
                              p: 2,
                              borderRadius: 1.5,
                              "&:hover": {
                                 borderColor: (theme) => theme.palette.primary.main,
                                 transition: "all .3s ease-in-out"
                              },
                              "&:hover .image-scale": {
                                 transform: "scale(1.2)"
                              }
                           }}
                           spacing={2}>
                           <Skeleton variant='rounded' width={"100%"} height={250} />
                           <Stack spacing={1}>
                              <Skeleton variant='rounded' width={136} height={21} />
                              <Skeleton variant='rounded' width={"100%"} height={30} />
                           </Stack>
                           <Skeleton variant='rounded' width={"100%"} height={24} />
                           <Skeleton variant='rounded' width={"100%"} height={50} />
                        </Stack>
                     </Grid>
                  ))}
               </Grid>

               <Skeleton variant='rounded' width={136} height={48} />
            </Stack>
         </Container>
      </Stack>
   )
}

export default BlogCardLoader

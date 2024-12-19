"use client"

import React from "react"
import { Box, Button, Grid, Skeleton } from "@mui/material"

const ResumeLoader = () => {
   return (
      <Box>
         <Grid container spacing={3} rowSpacing={2}>
            <>
               <Grid item xs={12} sm={6}>
                  <Skeleton variant='text' width={100} height={40} />
                  <Skeleton variant='text' height={50} />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <Skeleton variant='text' width={100} height={30} />
                  <Skeleton variant='text' height={50} />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <Skeleton variant='text' width={100} height={30} />
                  <Skeleton variant='text' height={50} />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <Skeleton variant='text' width={100} height={30} />
                  <Skeleton variant='text' height={50} />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <Skeleton variant='text' width={100} height={30} />
                  <Skeleton variant='text' height={50} />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <Skeleton variant='text' width={100} height={30} />
                  <Skeleton variant='text' height={50} />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <Skeleton variant='text' width={100} height={30} />
                  <Skeleton variant='text' height={50} />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <Skeleton variant='text' width={100} height={30} />
                  <Skeleton variant='text' height={50} />
               </Grid>

               {/* About me */}
               <Grid item xs={12}>
                  <Skeleton variant='rectangular' height={190} />
               </Grid>
            </>
         </Grid>
         <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color='inherit' disabled>
               Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button variant='contained' color='primary' disabled>
               Next
            </Button>
         </Box>
      </Box>
   )
}

export default ResumeLoader

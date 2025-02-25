"use client"

import React from "react"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import _ from "lodash"
import { Box, Grid, Paper, Stack, Typography } from "@mui/material"
import { IManagePackageBock } from "./types"
import { AccessError } from "../../shared/error-table"
import { PackageItem } from "./item"
import { fetcher } from "./hook"

type Props = {
   block: IManagePackageBock
   language?: string
}

export const ManagePackage = ({ block, language }: Props) => {
   // session data destructuring
   const { data: session } = useSession()
   const { user } = session || {}
   const { id: userId, role: userRole } = user || {}
   const role = userRole?.type || ""

   const { title, description, empty, style } = block || {}
   const { desktop, tab, mobile, backgroundColor, color } = style || {}

   const queryParams = {
      populate: "*",
      publicationState: "live",
      locale: language ?? ["en"]
   }
   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))
   // Construct the API URL
   const apiUrl = `/api/find?model=api/metajob-backend/packages&query=${queryString}&cache=no-store`
   // fetch packages  data
   const { data: packageDataAll, isLoading } = useSWR(apiUrl, fetcher)
   const packageData = packageDataAll?.data

   const membershipQueryParams = {
      populate: "*",
      filters: {
         owner: {
            id: userId
         }
      },
      publicationState: "live",
      locale: language ?? ["en"]
   }
   // Convert queryParams to a string for the URL
   const membershipQueryString = encodeURIComponent(JSON.stringify(membershipQueryParams))
   // Construct the API URL
   const membershipApiUrl = `/api/find?model=api/metajob-backend/memberships&query=${membershipQueryString}&cache=no-store`
   // fetch packages  data
   const { data: membershipDataAll, isLoading: membershipIsLoading } = useSWR(membershipApiUrl, fetcher)
   const membershipData = membershipDataAll?.data?.[0]

   return role === "employer" ? (
      <Grid item xs={12}>
         <Paper
            elevation={0}
            sx={{
               width: "100%",
               border: "1px solid",
               borderColor: "divider",
               borderRadius: "12px",
               height: "100%",
               px: 3,
               py: 3
            }}>
            <Box
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: {
                     xs: 1,
                     md: 2
                  }
               }}>
               <Typography
                  variant='body1'
                  fontWeight={700}
                  fontSize={{
                     xs: "1.25rem",
                     sm: "1.5rem"
                  }}
                  lineHeight={"24px"}>
                  {title}
               </Typography>
               <Typography
                  variant='body2'
                  fontSize={{
                     sm: "1rem"
                  }}>
                  {description}
               </Typography>
            </Box>
            <Stack py={8} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {packageData && packageData?.length > 0 && (
                  <Grid container spacing={2}>
                     {_.map(packageData, (item, index) => (
                        <Grid key={index} item xs={mobile || 12} sm={tab || 6} md={desktop || 3}>
                           <PackageItem
                              data={item}
                              membershipData={membershipData}
                              userId={userId}
                              mutateUrl={membershipApiUrl}
                           />
                        </Grid>
                     ))}
                  </Grid>
               )}
               {/* loader */}
               {isLoading && (
                  <Grid container spacing={2}>
                     {_.map(packageData, (item, index) => (
                        <Grid key={index} item xs={mobile || 12} sm={tab || 6} md={desktop || 3}>
                           <PackageItem data={item} isLoader={isLoading} />
                        </Grid>
                     ))}
                  </Grid>
               )}

               {/* empty data */}
               {!packageData && !isLoading && packageData?.data?.length == 0 && (
                  <Grid container justifyContent={"center"} spacing={2}>
                     <Stack
                        sx={{
                           display: "flex",
                           flexDirection: "column",
                           alignItems: "center",
                           gap: 0.5,
                           py: 4
                        }}>
                        <Typography variant='body1' sx={{ color: (theme) => theme.palette.text.secondary }}>
                           {empty?.title || "No data found"}
                        </Typography>
                        <Typography variant='body2' sx={{ color: (theme) => theme.palette.text.secondary }}>
                           {empty?.description || "Try to refresh the page or check back later"}
                        </Typography>
                     </Stack>
                  </Grid>
               )}
            </Stack>
         </Paper>
      </Grid>
   ) : (
      <AccessError />
   )
}

"use client"

import { Grid, Skeleton, Stack, Typography } from "@mui/material"
import { Card } from "../../components/common/card"
import CompanyCardItem from "./item"
import CompanyCardLoader from "./loader"
import { ICompanyFilterBlockData, ISingleCompany } from "./types"

type Props = {
   companies: ISingleCompany[]
   loading: boolean
   error: string | null
   block: ICompanyFilterBlockData
}
const CompanyList = ({ companies, loading, error, block }: Props) => {
   const { empty, result_placeholder, card_button } = block || {}
   const { title: emptyTitle, description: emptyDescription } = empty || {}
   return (
      <Stack spacing={2}>
         <Card
            sx={{
               borderRadius: 2,
               p: 1
            }}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
               {loading ? (
                  <Skeleton variant='text' width={"40%"} />
               ) : (
                  <Typography
                     fontSize={16}
                     fontWeight={600}
                     sx={{
                        color: (theme) => theme.palette.text.primary
                     }}
                     component={"span"}
                     variant='h4'
                     pl={2}>
                     {result_placeholder || "Total company found"}{" "}
                     <Typography
                        fontSize={16}
                        fontWeight={600}
                        component={"span"}
                        sx={{
                           color: (theme) => theme.palette.primary.main
                        }}>
                        {companies?.length}
                     </Typography>
                  </Typography>
               )}

               {/* <Button sx={{ fontSize: 14, fontWeight: 400 }} variant='contained' color='primary'>
                  Add Your Company
               </Button> */}
            </Stack>
         </Card>
         <Stack>
            {loading && (
               <Grid container spacing={2}>
                  {[...Array(6)].map((_, index) => (
                     <Grid item xs={12} sm={6} md={4} key={index}>
                        <CompanyCardLoader />
                     </Grid>
                  ))}
               </Grid>
            )}
            {companies && companies?.length > 0 && (
               <Grid container spacing={2}>
                  {companies?.map((item: any) => (
                     <Grid item xs={12} sm={6} md={4} key={item?.id}>
                        <CompanyCardItem data={item} button_label={card_button?.label} />
                     </Grid>
                  ))}
               </Grid>
            )}
            {/* not data found */}
            {!error && companies?.length === 0 && (
               <Stack
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     py: 4
                  }}>
                  <Typography
                     fontSize={16}
                     fontWeight={400}
                     sx={{
                        color: (theme) => theme.palette.text.secondary
                     }}>
                     {emptyTitle}
                  </Typography>
               </Stack>
            )}

            {error && !loading && (
               <Stack
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     py: 4
                  }}>
                  <Typography
                     fontSize={16}
                     fontWeight={400}
                     sx={{
                        color: (theme) => theme.palette.error.main
                     }}>
                     {error}
                  </Typography>
               </Stack>
            )}
         </Stack>
      </Stack>
   )
}

export default CompanyList

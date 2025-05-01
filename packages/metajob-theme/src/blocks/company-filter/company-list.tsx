"use client"
import { Grid, Stack, Typography } from "@mui/material"
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
   const { empty, card_button, style } = block || {}
   const { title: emptyTitle, description: emptyDescription } = empty || {}
   const { color, secondary_color, desktop, tab, mobile } = style || {}
   return (
      <Stack>
         {loading && (
            <Grid container spacing={2}>
               {[...Array(6)].map((_, index) => (
                  <Grid item xs={mobile || 12} sm={tab || 6} md={desktop || 4} key={index}>
                     <CompanyCardLoader />
                  </Grid>
               ))}
            </Grid>
         )}
         {companies && companies?.length > 0 && (
            <Grid container spacing={{ xs: 1, md: 2 }}>
               {companies?.map((item: any) => (
                  <Grid item xs={mobile || 12} sm={tab || 6} md={desktop || 4} key={item?.id}>
                     <CompanyCardItem
                        data={item}
                        button_label={card_button?.label}
                        color={color}
                        secondary_color={secondary_color}
                     />
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
   )
}

export default CompanyList

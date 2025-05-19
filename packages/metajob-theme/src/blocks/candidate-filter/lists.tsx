"use client"
import { Grid, Stack, Typography } from "@mui/material"
import _ from "lodash"
import CandidateCardItem from "./item"
import CandidateCardLoader from "./loader"
import { ICandidateFilterBlock, ISingleCandidate, ISingleCategory } from "./types"

type CandidateRightSectionProps = {
   data: ISingleCandidate[]
   loading: boolean
   error: any
   block: ICandidateFilterBlock
   color?: string
   secondary_color?: string
   skillsData?: ISingleCategory[]
}

export default function CandidateLists({
   data,
   loading,
   error,
   block,
   color,
   secondary_color,
   skillsData
}: CandidateRightSectionProps) {
   const { card_button } = block || {}

   return (
      <Stack>
         {/* error handling */}
         {!loading && error && (
            <Stack
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
               }}>
               <Typography color='error'>{error || "Server Error"}</Typography>
            </Stack>
         )}
         {/* loading */}
         {loading && (
            <Stack>
               <Grid container spacing={2}>
                  {_.times(6, (index) => (
                     <Grid item xs={12} sm={6} md={4} key={index}>
                        <CandidateCardLoader />
                     </Grid>
                  ))}
               </Grid>
            </Stack>
         )}
         <Grid container spacing={3}>
            {_.map(data, (item) => (
               <Grid item xs={6} sm={4} md={4} key={item?.id}>
                  <CandidateCardItem
                     data={item}
                     button_label={card_button?.label}
                     color={color}
                     secondary_color={secondary_color}
                     skillsData={skillsData}
                  />
               </Grid>
            ))}
         </Grid>
         {/* no data found */}
         {!error && !loading && data?.length == 0 && (
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
                  No Candidate Found!
               </Typography>
            </Stack>
         )}
      </Stack>
   )
}

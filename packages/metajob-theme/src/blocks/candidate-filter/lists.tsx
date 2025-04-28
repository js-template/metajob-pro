"use client"
import NextLink from "next/link"
import { useTheme } from "next-themes"
import { Button, Grid, Skeleton, Stack, Typography } from "@mui/material"
import _ from "lodash"
import { Card } from "../../components/common/card"
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
   const { theme: mode } = useTheme()
   const { result_placeholder, card_button, upload_resume_button } = block || {}

   return (
      <Stack spacing={2}>
         <Card
            sx={{
               borderRadius: 2,
               p: 1
            }}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
               {!error && loading ? (
                  <Skeleton variant='text' width={"40%"} />
               ) : (
                  <Typography
                     fontSize={16}
                     fontWeight={600}
                     sx={{
                        color: (theme) =>
                           mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary
                     }}
                     component={"span"}
                     variant='h4'
                     pl={2}>
                     {result_placeholder || "Total candidate found"}{" "}
                     <Typography
                        fontSize={16}
                        fontWeight={600}
                        component={"span"}
                        sx={{
                           color: (theme) => theme.palette.primary.main
                        }}>
                        {data?.length}
                     </Typography>{" "}
                  </Typography>
               )}
               {upload_resume_button && (
                  <Button
                     component={NextLink}
                     href={upload_resume_button?.link || "/dashboard/manage-resume"}
                     target={upload_resume_button?.target ?? "_self"}
                     sx={{ fontSize: 14, fontWeight: 400 }}
                     variant='contained'
                     color='primary'>
                     {upload_resume_button?.label || "Upload Your Resume"}
                  </Button>
               )}
            </Stack>
         </Card>
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
                  <Grid item xs={12} sm={6} md={4} key={item?.id}>
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
      </Stack>
   )
}

"use client"
import { Container, Grid, Stack } from "@mui/material"
import ProfileSection from "./profile"
import DetailsSection from "./details"
import { Card } from "../../components/common/card"
import PageHeader from "../../components/common/public-page-header"
import { IResumeDetailsBlock, ISingleResume } from "./types"

type Props = {
   data: ISingleResume
   language?: string
   block: IResumeDetailsBlock
}

const ResumeDetailsClient = ({ data, block }: Props) => {
   const { title, empty } = block
   return (
      <Stack>
         <PageHeader title={title || "Candidate Profile"} />
         <Container maxWidth='lg' sx={{ py: 6 }}>
            <Grid container spacing={4}>
               <Grid item xs={12} md={4}>
                  <ProfileSection data={data} block={block} />
               </Grid>
               <Grid item xs={12} md={8}>
                  <Card
                     sx={{
                        p: 3,
                        borderRadius: 2
                     }}>
                     <DetailsSection data={data} isLoading={false} block={block} />
                  </Card>
               </Grid>
            </Grid>
         </Container>
      </Stack>
   )
}

export default ResumeDetailsClient

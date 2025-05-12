"use client"
import { Box, Card, CardContent, Divider, Grid, Skeleton, Typography, useTheme } from "@mui/material"
import { ISingleResume } from "./types"
import MarkdownCustomPreview from "../../components/markdown-preview"
import { Fragment } from "react/jsx-runtime"
import EducationPreview from "./educationPreview"
import ExperiencePreview from "./experiencePreview"
import PortfolioPreview from "./portfolioPreview"
import PreviewHeader from "./previewHeader"
import PreviewActions from "./previewActions"

type Props = {
   data?: ISingleResume | null
   handleEdit: () => void
   isLoading?: boolean
}

const ResumePreviewBox = ({ handleEdit, data, isLoading }: Props) => {
   const theme = useTheme()
   const noResume = isLoading === false && (!data || Object.keys(data).length === 0)

   return (
      <Box>
         <Grid container spacing={6} rowSpacing={3}>
            <Grid item xl={9} md={8} xs={12}>
               {!noResume ? (
                  <Card
                     sx={{
                        position: "relative",
                        backgroundImage: "none",
                        boxShadow: "none",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: "12px"
                     }}>
                     {/* header  */}
                     <PreviewHeader data={data} handleEdit={handleEdit} isLoading={isLoading} />
                     <Divider
                        sx={{
                           flexGrow: 1,
                           borderColor: (theme) => theme.palette.divider
                        }}
                     />
                     {/* about-section  */}
                     <CardContent
                        sx={{
                           p: { xs: 3, md: 4 },
                           display: "flex",
                           flexDirection: "column",
                           gap: 4
                        }}>
                        <Grid container>
                           <Grid item sm={12} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
                              <Box sx={{ display: "flex", flexDirection: "column" }}>
                                 <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
                                    {isLoading ? (
                                       <Skeleton variant='text' width={200} height={40} />
                                    ) : (
                                       <Typography
                                          fontSize={20}
                                          fontWeight={700}
                                          sx={{
                                             color: (theme) => theme.palette.text.primary
                                          }}
                                          textAlign={"center"}>
                                          About Me
                                       </Typography>
                                    )}
                                 </Box>
                                 <Box>
                                    {isLoading ? (
                                       <Fragment>
                                          <Skeleton variant='text' width={"100%"} height={20} />
                                          <Skeleton variant='text' width={"100%"} height={20} />
                                          <Skeleton variant='text' width={"100%"} height={20} />
                                          <Skeleton variant='text' width={"100%"} height={20} />
                                          <Skeleton variant='text' width={"100%"} height={20} />
                                       </Fragment>
                                    ) : (
                                       <MarkdownCustomPreview
                                          source={data?.about}
                                          wrapperElement={{
                                             "data-color-mode": theme.palette.mode
                                          }}
                                       />
                                    )}
                                 </Box>
                              </Box>
                           </Grid>
                        </Grid>

                        {/* education */}
                        <EducationPreview educationData={data?.education} isLoading={isLoading} />
                        {/* experience */}
                        <ExperiencePreview experienceData={data?.experience} isLoading={isLoading} />
                        {/* portfolio-section  */}
                        <PortfolioPreview portfolioData={data?.portfolio} isLoading={isLoading} />
                     </CardContent>
                  </Card>
               ) : (
                  <Card
                     sx={{
                        position: "relative",
                        backgroundImage: "none",
                        boxShadow: "none",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: "12px"
                     }}>
                     {/* about-section  */}
                     <CardContent
                        sx={{
                           px: 4,
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           height: "400px"
                        }}>
                        <Typography
                           fontSize={20}
                           fontWeight={700}
                           sx={{
                              color: (theme) => theme.palette.text.secondary
                           }}
                           textAlign={"center"}>
                           No Resume Added yet, Please add your resume
                        </Typography>
                     </CardContent>
                  </Card>
               )}
            </Grid>
            {/* action-card  */}
            <Grid item xl={3} md={4} xs={12}>
               <PreviewActions handleEdit={handleEdit} isLoading={isLoading} noResume={noResume} />
            </Grid>
         </Grid>
      </Box>
   )
}

export default ResumePreviewBox

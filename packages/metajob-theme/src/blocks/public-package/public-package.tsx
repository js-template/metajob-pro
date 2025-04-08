"use client"
import _ from "lodash"
import { Container, Grid, Stack, Typography, useTheme as muiTheme } from "@mui/material"
import { PackageItem } from "./item"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { IPackageData, IPublicPackageBlock } from "./types"

type Props = {
   block: IPublicPackageBlock
   data?: any
   language?: string
   packageData?: IPackageData[]
}

const PublicPackageClient = ({ block, packageData }: Props) => {
   const theme = muiTheme()

   // destructure the block
   const { title, description, empty, style } = block || {}
   const { desktop, tab, mobile, backgroundColor, color } = style || {}

   return (
      <Stack bgcolor={backgroundColor ? backgroundColor : theme.palette.background.paper}>
         <Container maxWidth='md'>
            <Stack pt={8} pb={12} spacing={5} sx={{ justifyContent: "center", alignItems: "center" }}>
               {/* header  */}
               <Stack spacing={1} direction={"column"}>
                  {title && (
                     <Typography
                        sx={{
                           color: color ?? theme.palette.text.primary,
                           fontWeight: 700,
                           fontSize: "32px",
                           textAlign: "center"
                        }}>
                        {title}
                     </Typography>
                  )}
                  {description && (
                     <Typography
                        sx={{
                           color: hexToRGBA(color ?? theme.palette.text.primary, 0.5),
                           fontSize: "16px",
                           textAlign: "center"
                        }}>
                        {description}
                     </Typography>
                  )}
               </Stack>

               {packageData && packageData?.length > 0 && (
                  <Grid container spacing={2}>
                     {_.map(packageData, (item, index) => (
                        <Grid key={index} item xs={mobile || 12} sm={tab || 6} lg={desktop || 4}>
                           <PackageItem data={item} />
                        </Grid>
                     ))}
                  </Grid>
               )}
               {/* empty data */}
               {packageData && packageData?.length == 0 && (
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
         </Container>
      </Stack>
   )
}

export default PublicPackageClient

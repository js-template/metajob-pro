"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Box, Grid, Paper, Stack, Typography } from "@mui/material"
import { IManagePackageBock, IMemberShip, IPackageData } from "./types"
import { AccessError } from "../../shared/error-table"
import { PackageItem } from "./item"
import { find } from "../../lib/strapi"
import PaymentOptionsModal from "./payment-options"

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

   const [packageData, setPackageData] = useState<IPackageData[]>([])
   const [packageIsLoading, setPackageIsLoading] = useState(false)
   const [isMute, setIsMute] = useState(false)
   const [membershipData, setMembershipData] = useState<IMemberShip | null>(null)
   const [membershipLoading, setMembershipLoading] = useState(false)

   const handleMute = () => {
      setIsMute(!isMute)
   }

   //  fetch package from db
   useEffect(() => {
      const getPackageData = async () => {
         setPackageIsLoading(true)
         const { data: packageDataAll, error: packageDataError } = await find(
            "api/metajob-backend/packages",
            {
               populate: "*",
               publicationState: "live",
               locale: language ?? "en"
            },
            "no-store"
         )
         if (!packageDataError) {
            setPackageData(packageDataAll?.data)
            setPackageIsLoading(false)
         } else {
            setPackageData([])
            setPackageIsLoading(false)
         }
      }
      if (userId) {
         if (!userId) return
         getPackageData()
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [userId])

   //  fetch membership from db
   useEffect(() => {
      const getMembership = async () => {
         setMembershipLoading(true)
         const { data: packageDataAll, error: packageDataError } = await find(
            "api/metajob-backend/memberships",
            {
               populate: "*",
               filters: {
                  owner: {
                     id: userId
                  }
               },
               publicationState: "live",
               locale: language ?? "en"
            },
            "no-store"
         )
         if (!packageDataError) {
            setMembershipData(packageDataAll?.data?.[0])
            setMembershipLoading(false)
         } else {
            setMembershipData(null)
            setMembershipLoading(false)
         }
      }
      if (userId) {
         if (!userId) return
         getMembership()
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [userId, isMute])

   const [selectedPackageData, setSelectedPackageData] = useState({
      packageId: "",
      packagePrice: 0
   })

   const [openPayment, setOpenPayment] = useState(false)
   // Payment popup handler
   const handleOpenPayment = () => setOpenPayment(true)
   const handleClosePayment = () => {
      setOpenPayment(false)
   }

   return role === "employer" ? (
      <Paper
         elevation={0}
         sx={{
            width: "100%",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "12px",
            height: "100%",
            px: { xs: 1, md: 3 },
            py: 3
         }}>
         <Box
            sx={{
               display: "flex",
               flexDirection: "column",
               px: { xs: 2, md: 0 },
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
         <Stack py={{ xs: 5, md: 8 }} gap={{ xs: 5, md: 8 }} sx={{ justifyContent: "center", alignItems: "center" }}>
            {packageData && packageData?.length > 0 && (
               <Grid container gap={{ xs: 2, md: 3 }}>
                  {packageData?.map((item, index) => (
                     <Grid key={index} item xs={mobile || 12} sm={tab || 6} lg={desktop || 3}>
                        <PackageItem
                           data={item}
                           membershipData={membershipData}
                           membershipLoading={membershipLoading}
                           handleOpenPayment={handleOpenPayment}
                           setSelectedPackageData={setSelectedPackageData}
                           userId={userId}
                           handleMute={handleMute}
                        />
                     </Grid>
                  ))}
               </Grid>
            )}
            {/* loader */}
            {packageIsLoading && (
               <Grid container spacing={2}>
                  {[1, 2, 3]?.map((item, index) => (
                     <Grid key={index} item xs={mobile || 12} sm={tab || 6} md={desktop || 3}>
                        <PackageItem isLoader={true} />
                     </Grid>
                  ))}
               </Grid>
            )}

            {/* empty data */}
            {!packageIsLoading && packageData?.length == 0 && (
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

         {/* Payment Option modal  */}
         <PaymentOptionsModal
            //   --data-props--
            selectedPackageData={selectedPackageData}
            membershipData={membershipData}
            handleMute={handleMute}
            //   --modal-props--
            open={openPayment}
            handleClose={handleClosePayment}
         />
      </Paper>
   ) : (
      <AccessError />
   )
}

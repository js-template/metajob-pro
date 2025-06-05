"use client"
import { useState } from "react"
import {
   Box,
   IconButton,
   Typography,
   useTheme,
   Modal,
   Container,
   Paper,
   Radio,
   RadioGroup,
   FormControlLabel,
   FormControl,
   CircularProgress
} from "@mui/material"
import CIcon from "../../components/common/icon"
import toast from "react-hot-toast"
import { createPaymentIntent } from "../../lib/stripe-payment"
import { useSession } from "next-auth/react"
import { Elements } from "@stripe/react-stripe-js"
import StripeForm from "./stripe-form"
import { loadStripe } from "@stripe/stripe-js"
import { IMemberShip } from "./types"

type Props = {
   //   --data-props--
   selectedPackageData: {
      packageId: string
      packagePrice?: number
   }
   membershipData?: IMemberShip | null
   handleMute?: () => void

   //   --modal-props--
   open: boolean
   isOnClose?: boolean
   handleClose: () => void
   title?: string
   plain?: boolean
   top?: boolean
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

const PaymentOptionsModal = ({
   //   --data-props--
   selectedPackageData,
   membershipData,
   handleMute,
   //   --modal-props--
   open,
   handleClose,
   title,
   isOnClose = true,
   plain,
   top
}: Props) => {
   const theme = useTheme()
   // session data destructuring
   const { data: session } = useSession()
   const { user } = session || {}
   const { id: userId, role: userRole } = user || {}

   const [paymentType, setPaymentType] = useState("") //stripeMethod, paypalMethod
   const [showPaymentInput, setShowPaymentInput] = useState(false)

   const [intentLoading, setIntentLoading] = useState(false)
   const [clientSecret, setClientSecret] = useState("")
   const [paymentIntentId, setPaymentIntentId] = useState("")

   const cancelStripePayment = () => {
      setPaymentType("")
      setShowPaymentInput(false)
      setClientSecret("")
      setPaymentIntentId("")
   }

   //? stripe create payment intent and get client secret
   const handlePaymentIntent = async () => {
      try {
         if (!user) {
            return toast.error("You session has expired, please login again.")
         }
         setIntentLoading(true)
         const userDetails = {
            name: user?.username,
            email: user?.email,
            phone: 0
         }
         const productPrice = selectedPackageData?.packagePrice || 0
         const { data, error } = await createPaymentIntent(productPrice, userDetails)

         if (data) {
            setClientSecret(data.clientSecret)
            setPaymentIntentId(data.paymentIntentID)
         } else {
            return toast.error(error || "Server Error")
         }
      } catch (error: any) {
         toast.error(error.message || "Server Error")
      } finally {
         setIntentLoading(false)
      }
   }

   const appearance = {
      theme: "stripe"
   }
   const options = {
      clientSecret,
      appearance
   } as any

   return (
      <Modal
         open={open}
         onClose={isOnClose ? handleClose : () => {}}
         sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: top ? 9999 : 9998
         }}>
         <Box
            sx={{
               bgcolor: theme.palette.background.default,
               width: { xs: "100%", md: "750px" },
               overflowY: "auto",
               mx: "auto",
               boxShadow: "none",
               position: "relative",
               minHeight: { xs: "100%", md: "700px" },
               ...(!plain && { borderRadius: "16px" })
            }}>
            {/* header  */}
            <Box
               sx={{
                  display: "flex",
                  justifyContent: title ? "space-between" : "flex-end",
                  alignItems: "center",
                  px: 3,
                  py: 2,
                  borderBottom: "1px solid",
                  borderColor: title ? theme.palette.divider : "transparent"
               }}>
               {title && <Typography variant='h6'>{title || "Action"}</Typography>}
               {isOnClose && (
                  <IconButton
                     color='inherit'
                     onClick={() => {
                        handleClose()
                        cancelStripePayment()
                     }}
                     edge='start'
                     sx={{
                        height: "42px",
                        width: "42px",
                        borderRadius: "8px"
                     }}>
                     <CIcon
                        icon='oui:cross'
                        sx={{
                           color: theme.palette.text.primary
                        }}
                     />
                  </IconButton>
               )}
            </Box>
            {/* content  */}
            <Box>
               {/* content  */}
               <Container maxWidth='lg' sx={{ py: 2, overflowY: "auto", maxHeight: "calc(100vh - 150px)" }}>
                  <Box
                     sx={{
                        p: 3
                     }}>
                     {/* button options  */}
                     <Box
                        display='flex'
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems='center'
                        justifyContent='space-between'
                        gap={4}>
                        <FormControl component='fieldset' sx={{ width: "100%" }}>
                           <RadioGroup
                              row
                              name='paymentMethod'
                              value={paymentType}
                              onChange={(e) => {
                                 setPaymentType(e.target.value)
                                 if (e.target.value === "stripeMethod") {
                                    handlePaymentIntent()
                                    setShowPaymentInput(true)
                                 } else if (e.target.value === "paypalMethod") {
                                    // Handle PayPal payment method selection
                                 }
                              }}
                              sx={{ gap: 2, justifyContent: "center" }}>
                              {/* Stripe Payment Option */}
                              <FormControlLabel
                                 value='stripeMethod'
                                 control={
                                    <Radio sx={{ color: "divider", "&.Mui-checked": { color: "primary.main" } }} />
                                 }
                                 label={
                                    <Paper
                                       elevation={paymentType === "stripeMethod" ? 3 : 1}
                                       sx={{
                                          px: 3,
                                          py: 0.5,
                                          borderRadius: 2,
                                          border: "1px solid",
                                          borderColor: paymentType === "stripeMethod" ? "primary.main" : "divider",
                                          cursor: "pointer",
                                          boxShadow: paymentType === "stripeMethod" ? 2 : 1
                                       }}>
                                       <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='120'
                                          height='50'
                                          fill-rule='evenodd'
                                          fill='#6772e5'>
                                          <path d='M101.547 30.94c0-5.885-2.85-10.53-8.3-10.53-5.47 0-8.782 4.644-8.782 10.483 0 6.92 3.908 10.414 9.517 10.414 2.736 0 4.805-.62 6.368-1.494v-4.598c-1.563.782-3.356 1.264-5.632 1.264-2.23 0-4.207-.782-4.46-3.494h11.24c0-.3.046-1.494.046-2.046zM90.2 28.757c0-2.598 1.586-3.678 3.035-3.678 1.402 0 2.897 1.08 2.897 3.678zm-14.597-8.345c-2.253 0-3.7 1.057-4.506 1.793l-.3-1.425H65.73v26.805l5.747-1.218.023-6.506c.828.598 2.046 1.448 4.07 1.448 4.115 0 7.862-3.3 7.862-10.598-.023-6.667-3.816-10.3-7.84-10.3zm-1.38 15.84c-1.356 0-2.16-.483-2.713-1.08l-.023-8.53c.598-.667 1.425-1.126 2.736-1.126 2.092 0 3.54 2.345 3.54 5.356 0 3.08-1.425 5.38-3.54 5.38zm-16.4-17.196l5.77-1.24V13.15l-5.77 1.218zm0 1.747h5.77v20.115h-5.77zm-6.185 1.7l-.368-1.7h-4.966V40.92h5.747V27.286c1.356-1.77 3.655-1.448 4.368-1.195v-5.287c-.736-.276-3.425-.782-4.782 1.7zm-11.494-6.7L34.535 17l-.023 18.414c0 3.402 2.552 5.908 5.954 5.908 1.885 0 3.264-.345 4.023-.76v-4.667c-.736.3-4.368 1.356-4.368-2.046V25.7h4.368v-4.897h-4.37zm-15.54 10.828c0-.897.736-1.24 1.954-1.24a12.85 12.85 0 0 1 5.7 1.47V21.47c-1.908-.76-3.793-1.057-5.7-1.057-4.667 0-7.77 2.437-7.77 6.506 0 6.345 8.736 5.333 8.736 8.07 0 1.057-.92 1.402-2.207 1.402-1.908 0-4.345-.782-6.276-1.84v5.47c2.138.92 4.3 1.3 6.276 1.3 4.782 0 8.07-2.368 8.07-6.483-.023-6.85-8.782-5.632-8.782-8.207z' />
                                       </svg>
                                    </Paper>
                                 }
                                 sx={{ m: 0 }}
                              />

                              {/* PayPal Payment Option */}
                              {/* <FormControlLabel
                                 value='paypalMethod'
                                 control={
                                    <Radio sx={{ color: "divider", "&.Mui-checked": { color: "primary.main" } }} />
                                 }
                                 label={
                                    <Paper
                                       elevation={paymentType === "paypalMethod" ? 3 : 1}
                                       sx={{
                                          px: 3,
                                          py: 0.5,
                                          borderRadius: 2,
                                          border: "1px solid",
                                          borderColor: paymentType === "paypalMethod" ? "primary.main" : "divider",
                                          cursor: "pointer",
                                          boxShadow: paymentType === "paypalMethod" ? 2 : 1
                                       }}>
                                       <svg xmlns='http://www.w3.org/2000/svg' width='120' height='50'>
                                          <path
                                             d='M58.505 27.333c0 1.64-.675 2.96-2.034 3.964S53.215 32.8 50.78 32.8h-1.35l-1.037 4.478H44.83l3.176-13.756h4.944c.9 0 1.68.064 2.348.185s1.246.338 1.73.635a3.08 3.08 0 0 1 1.101 1.174c.25.498.378 1.1.378 1.817zm-3.787.346c0-.54-.193-.933-.587-1.2s-.965-.386-1.73-.386h-1.43l-.95 4.116h1.28c1.077 0 1.92-.217 2.516-.66.603-.442.9-1.07.9-1.88zm10.34 8.506l-.756.5c-.297.193-.57.346-.82.458a6.17 6.17 0 0 1-.973.322c-.306.072-.724.113-1.254.113-.86 0-1.568-.24-2.114-.724s-.82-1.118-.82-1.9c0-.82.193-1.5.58-2.082s.965-1.03 1.73-1.367c.716-.322 1.568-.555 2.55-.7l3.208-.314.04-.177c.024-.08.032-.177.032-.28a.93.93 0 0 0-.6-.917c-.4-.177-1.013-.265-1.817-.265-.547 0-1.15.088-1.817.273l-1.487.458h-.306l.5-2.46c.386-.096 1-.2 1.8-.33s1.624-.185 2.428-.185c1.624 0 2.822.2 3.578.635.764.426 1.142 1.085 1.142 1.978a4.1 4.1 0 0 1-.032.482 3.62 3.62 0 0 1-.088.515l-1.624 7.06h-3.304zm.884-3.795l-1.672.177a6.27 6.27 0 0 0-1.327.297c-.378.137-.667.33-.86.57-.2.25-.297.57-.297.98 0 .354.13.6.394.756s.643.217 1.15.217c.33 0 .675-.072 1.053-.225a5.11 5.11 0 0 0 1.053-.58zm9.038 8.7h-3.66l2.645-4.012-1.704-10.162h3.4l.9 6.794 3.947-6.794h3.513z'
                                             fill='#123984'
                                          />
                                          <path
                                             d='M97.32 27.333c0 1.64-.675 2.96-2.034 3.964S92.03 32.8 89.595 32.8h-1.35l-1.037 4.478h-3.562l3.168-13.748h4.944c.9 0 1.68.064 2.348.185s1.246.338 1.73.635a3.08 3.08 0 0 1 1.101 1.174c.257.5.386 1.093.386 1.8zm-3.795.346c0-.54-.193-.933-.587-1.2s-.965-.386-1.73-.386h-1.43l-.95 4.116h1.278c1.077 0 1.92-.217 2.516-.66.603-.442.9-1.07.9-1.88zm10.348 8.506l-.756.5c-.297.193-.57.346-.82.458a6.17 6.17 0 0 1-.973.322c-.306.072-.724.113-1.254.113-.86 0-1.568-.24-2.114-.724s-.82-1.118-.82-1.9c0-.82.193-1.5.58-2.082s.965-1.03 1.73-1.367c.716-.322 1.568-.555 2.55-.7l3.208-.314.04-.177c.024-.08.032-.177.032-.28a.93.93 0 0 0-.6-.917c-.4-.177-1.013-.265-1.817-.265-.547 0-1.15.088-1.817.273l-1.487.458h-.306l.5-2.46c.386-.096 1-.2 1.8-.33s1.624-.185 2.428-.185c1.624 0 2.822.2 3.578.635.764.426 1.142 1.085 1.142 1.978a4.1 4.1 0 0 1-.032.482 3.62 3.62 0 0 1-.088.515l-1.624 7.06h-3.312zm.884-3.795l-1.672.177a6.27 6.27 0 0 0-1.327.297c-.378.137-.667.33-.86.57-.2.25-.297.57-.297.98 0 .354.13.6.394.756s.643.217 1.15.217c.33 0 .675-.072 1.053-.225a5.11 5.11 0 0 0 1.053-.58zm11.875-9.48l-3.32 14.375h-3.345l3.32-14.375z'
                                             fill='#009de2'
                                          />
                                          <g transform='matrix(.071673 0 0 .071673 -13.776444 3.122618)'>
                                             <path
                                                d='M754.6 298.1c0 54.6-22.7 98.7-68 132.2s-108.6 50.2-190 50.2h-45L417.1 630H298.2L408 171.2h161c30 0 56.1 2.1 78.5 6.2 22.3 4.1 41.6 11.2 57.8 21.3 16 10.1 28.3 23.2 36.7 39.3 8.4 16 12.6 36.1 12.6 60.1z'
                                                fill='#009cde'
                                             />
                                             <path
                                                d='M421.1 634.9H292l112.2-468.7H569c30.1 0 56.8 2.1 79.3 6.2 22.8 4.2 42.8 11.6 59.5 21.9 16.7 10.5 29.7 24.4 38.5 41.2s13.2 37.8 13.2 62.5c0 56-23.5 101.9-70 136.2-46 34-110.9 51.2-193 51.2h-41.1zm-116.6-9.8h108.7l34.5-149.5h48.9c79.9 0 142.9-16.6 187.1-49.3 21.9-16.2 38.6-35.2 49.5-56.4s16.4-45.4 16.4-71.8c0-23.1-4.1-42.6-12.1-58-8-15.3-19.7-27.8-34.9-37.4-15.6-9.7-34.5-16.6-56.1-20.6-21.9-4-48-6.1-77.6-6.1h-157z'
                                                fill='#fff'
                                             />
                                             <path
                                                d='M701.8 247c0 54.6-22.7 98.7-68 132.2s-108.6 50.2-190 50.2h-45l-34.5 149.5H245.4L351.3 120h164.9c30 0 56.1 2.1 78.5 6.2 22.3 4.1 41.6 11.2 57.8 21.3 16 10.1 28.3 23.2 36.7 39.3 8.4 16 12.6 36.1 12.6 60.2z'
                                                fill='#0f3572'
                                             />
                                             <path
                                                d='M368.2 583.8h-129l108.1-468.7h168.9c30.1 0 56.8 2.1 79.3 6.2 22.8 4.2 42.8 11.6 59.5 21.9 16.7 10.5 29.7 24.4 38.5 41.2s13.2 37.8 13.2 62.5c0 56-23.5 101.9-70 136.2-46 34-110.9 51.2-193 51.2h-41.1zm-116.6-9.9h108.8l34.5-149.5h48.9c79.9 0 142.9-16.6 187.1-49.3 21.9-16.2 38.6-35.2 49.5-56.4s16.4-45.4 16.4-71.8c0-23.1-4.1-42.6-12.1-58-8-15.3-19.7-27.8-34.9-37.4-15.6-9.7-34.5-16.6-56.1-20.6-21.9-4-48-6.1-77.6-6.1h-161zm328-310.6c-.9 14-3.7 24.3-12.3 36.2-8.5 11.9-18.5 19.6-31.9 26-8.1 3.8-16.5 6.3-25.3 7.5s-19.3 1.9-31.6 1.9h-59.1l33.1-118.6h53.7c13.7 0 24.7.2 33 2.1 8.3 1.8 15.1 4.3 20.2 7.4 7.1 4.2 12.8 9.3 16.1 15.8 4.1 7.6 4.6 12.5 4.1 21.7z'
                                                fill='#fff'
                                             />
                                          </g>
                                       </svg>
                                    </Paper>
                                 }
                                 sx={{ m: 0 }}
                              /> */}
                           </RadioGroup>
                        </FormControl>
                     </Box>
                     <Box>
                        {/* stripe payment element load  */}
                        <Box
                           sx={{
                              position: "relative",
                              mt: 5,
                              display: "flex",
                              justifyContent: "center",
                              minHeight: "300px"
                           }}>
                           {clientSecret && paymentType == "stripeMethod" && showPaymentInput && (
                              <Box
                                 sx={{
                                    maxWidth: "380px"
                                 }}>
                                 <Elements options={options} stripe={stripePromise}>
                                    <StripeForm
                                       userId={userId}
                                       newPackageDocId={selectedPackageData?.packageId}
                                       membershipData={membershipData}
                                       handleMute={handleMute}
                                       cancelStripePayment={cancelStripePayment}
                                    />
                                 </Elements>
                              </Box>
                           )}
                           {intentLoading && (
                              <Box
                                 sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    width: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    zIndex: 1000
                                 }}>
                                 <CircularProgress
                                    sx={{
                                       position: "relative",
                                       zIndex: 3
                                    }}
                                    disableShrink
                                 />
                                 <Box
                                    sx={{
                                       position: "absolute",
                                       top: 0,
                                       left: 0,
                                       height: "100%",
                                       width: "100%",
                                       display: "flex",
                                       alignItems: "center",
                                       justifyContent: "center",
                                       filter: "blur(2px)",
                                       backdropFilter: "blur(2px)",
                                       zIndex: 1
                                    }}
                                 />
                              </Box>
                           )}
                        </Box>
                     </Box>
                  </Box>
               </Container>
            </Box>
         </Box>
      </Modal>
   )
}

export default PaymentOptionsModal

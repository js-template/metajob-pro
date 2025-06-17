"use client"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { LoadingButton } from "@mui/lab"
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { IMemberShip } from "./types"
import { createEntry, updateOne } from "../../lib/strapi"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { paymentCookieRemover } from "../../lib/stripe-payment"

type Props = {
   userId?: boolean
   newPackageDocId: string
   membershipData?: IMemberShip | null
   handleMute?: () => void
   cancelStripePayment?: () => void
}

const StripeForm = ({ userId, newPackageDocId, membershipData, handleMute, cancelStripePayment }: Props) => {
   const theme = useTheme()
   const stripe = useStripe()
   const elements = useElements()

   useEffect(() => {
      if (!stripe) {
         return
      }

      const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret")

      if (!clientSecret) {
         return
      }

      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }: any) => {
         switch (paymentIntent.status) {
            case "succeeded":
               break
            case "processing":
               break
            case "requires_payment_method":
               break
            default:
               break
         }
      })
   }, [stripe])

   const { documentId: membershipDocId, user_plan } = membershipData || {}

   const [loading, setLoading] = useState(false)
   const [btnDisable, setBtnDisable] = useState(true)
   const [error, setError] = useState<any>(null)

   const handleChange = (e: any) => {
      if (e?.complete) {
         setBtnDisable(false)
      } else {
         setBtnDisable(true)
      }
   }

   // *** package change handler
   const changePackageHandler = async (e: any) => {
      try {
         e.preventDefault()
         if (!stripe || !elements) {
            return
         }
         setLoading(true) // Start loading

         const packageInput = {
            data: {
               owner: [
                  {
                     id: userId || undefined
                  }
               ],
               user_plan: {
                  connect: [newPackageDocId]
               }
            }
         }
         //membership exists, update it
         if (membershipDocId) {
            const resumeResponse = await updateOne("metajob-backend/memberships", membershipDocId, packageInput)
            // Check if the response has any errors
            if (resumeResponse.error) {
               toast.error(resumeResponse?.error)
            } else {
               if (handleMute) {
                  handleMute()
               }
               await paymentCookieRemover()

               const { error, paymentIntent } = (await stripe.confirmPayment({
                  elements,
                  confirmParams: {
                     return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/packages`
                  }
                  // redirect: "if_required",
               })) as any

               if (error) {
                  setLoading(false)
                  return toast.success("Sorry, Payment is not successful")
               } else if (paymentIntent && paymentIntent?.status === "succeeded") {
                  setLoading(false)
                  toast.success("Payment is successful")
                  return toast.success("Package updated successfully")
               } else {
                  setLoading(false)
                  return toast.success("Sorry, Payment is not successful")
               }
            }
         } else {
            //membership exists, create it
            const resumeResponse = await createEntry("metajob-backend/memberships", packageInput)
            if (resumeResponse.error) {
               toast.error(resumeResponse?.error)
            } else {
               if (handleMute) {
                  handleMute()
               }
               await paymentCookieRemover()
               const { error, paymentIntent } = (await stripe.confirmPayment({
                  elements,
                  confirmParams: {
                     return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/packages`
                  }
                  // redirect: "if_required",
               })) as any

               if (error) {
                  setLoading(false)
                  return toast.success("Sorry, Payment is not successful")
               } else if (paymentIntent && paymentIntent?.status === "succeeded") {
                  setLoading(false)
                  toast.success("Payment is successful")
                  return toast.success("Package updated successfully")
               } else {
                  setLoading(false)
                  return toast.success("Sorry, Payment is not successful")
               }
            }
         }
      } catch (error: any) {
         toast.error(error?.message || "An unexpected error occurred. Please try again.")
      } finally {
         // Always stop loading
         setLoading(false)
      }
   }

   return (
      <Box
         sx={{
            minHeight: "150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid",
            borderColor: theme.palette.divider,
            borderRadius: "8px",
            p: 3
         }}
         component='form'
         onSubmit={changePackageHandler}>
         <Box>
            <PaymentElement id='payment-element' onChange={handleChange} />
            {error && (
               <Typography variant='body2' sx={{ pt: 1, color: theme.palette.error.main }}>
                  {error}
               </Typography>
            )}
         </Box>
         <Box
            sx={{
               mt: 3,
               display: "flex",
               gap: 2
            }}>
            <LoadingButton
               type='submit'
               loading={loading}
               disabled={loading || !stripe || btnDisable}
               loadingIndicator={<CircularProgress color='secondary' size={18} />}
               sx={{
                  display: loading ? "none" : "",
                  height: "42px",
                  p: "12px 16px",
                  borderRadius: "8px",
                  textTransform: "inherit",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  "&:hover": {
                     backgroundColor: theme.palette.primary.dark,
                     borderColor: theme.palette.primary.dark
                  },
                  "&:disabled": {
                     backgroundColor: hexToRGBA(theme.palette.secondary.main, 0.6),
                     borderColor: hexToRGBA(theme.palette.secondary.main, 0.6),
                     color: theme.palette.primary.contrastText
                  }
               }}>
               Submit
            </LoadingButton>
            <Button
               disabled
               sx={{
                  display: loading ? "flex" : "none",
                  gap: 2,
                  height: "42px",
                  p: "12px 16px",
                  borderRadius: "8px",
                  textTransform: "inherit",
                  backgroundColor: theme.palette.text.disabled,
                  borderColor: "transparent",
                  color: theme.palette.text.secondary,
                  "&:hover": {
                     backgroundColor: theme.palette.text.disabled,
                     borderColor: "transparent"
                  },
                  "&:disabled": {
                     backgroundColor: theme.palette.text.disabled,
                     borderColor: "transparent",
                     color: theme.palette.text.secondary
                  }
               }}>
               Please Wait...
               <CircularProgress color='secondary' size={18} />
            </Button>
            <Button
               onClick={cancelStripePayment}
               variant='contained'
               color='error'
               sx={{
                  height: "42px",
                  p: "12px 16px",
                  borderRadius: "8px",
                  boxShadow: "none"
               }}>
               Cancel
            </Button>
         </Box>
      </Box>
   )
}

export default StripeForm

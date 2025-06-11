"use server"
import { cookies } from "next/headers"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

/**
 * Function to createPaymentIntent
 * @param price price in number
 * @param userDetails user details object
 * @returns {message,data, error}
 */
export const createPaymentIntent = async (
   price: number,
   userDetails: {
      name: string
      email: string
      phone?: number
   }
) => {
   try {
      const cookieStore = await cookies()

      const totalCartPriceCalc = price ? price * 100 : 0
      const totalCartPrice = Math.round((totalCartPriceCalc + Number.EPSILON) * 100) / 100

      // check if stripe is initialized
      const paymentIntentID_Old = cookieStore.get("paymentIntent_id")?.value || null

      if (paymentIntentID_Old) {
         // Create a PaymentIntent with the order amount and currency
         const paymentIntentUpdated = await stripe.paymentIntents.update(paymentIntentID_Old, {
            amount: totalCartPrice
         })

         return {
            message: "Payment Intent Updated Successfully",
            data: {
               clientSecret: paymentIntentUpdated.client_secret,
               paymentIntentID: paymentIntentUpdated.id
            },
            error: null
         }
      } else {
         // check if customer exists
         const customer = await stripe.customers.create({
            description: "Metajobs Customer",
            name: userDetails?.name,
            email: userDetails?.email,
            phone: userDetails?.phone
         })

         // Create a PaymentIntent with the order amount and currency
         const paymentIntent = await stripe.paymentIntents.create({
            amount: totalCartPrice,
            currency: "usd",
            customer: customer?.id,
            setup_future_usage: "off_session",
            automatic_payment_methods: {
               enabled: true
            }
         })

         // set paymentIntent id in cookie
         cookieStore.set("paymentIntent_id", paymentIntent?.id)

         return {
            message: "Payment Intent created Successfully",
            data: {
               clientSecret: paymentIntent.client_secret,
               paymentIntentID: paymentIntent.id
            },
            error: null
         }
      }
   } catch (error: any) {
      return {
         data: null,
         error: error?.message || "Server Error"
      }
   }
}

export const paymentCookieRemover = async () => {
   const cookieStore = await cookies()
   cookieStore.delete("paymentIntent_id")
}

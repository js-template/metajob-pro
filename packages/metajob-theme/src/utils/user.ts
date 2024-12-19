"use server"
import { cookies } from "next/headers"

/**
 * Signs out the user by deleting the JWT cookie and redirecting to the home page.
 * @returns {Promise<{message: string, isLoggedIn: boolean}>} - A promise that resolves to an object with a success message and the user's login status.
 */
export const SignOut = async () => {
   //  delete the cookie and redirect to the home page
   const cookieStore = await cookies()
   cookieStore.delete("jwt")
   return {
      message: "success",
      isLoggedIn: false
   }
}

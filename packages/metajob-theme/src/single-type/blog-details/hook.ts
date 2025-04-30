"use client"
export const fetcher = async (url: string) => {
   const response = await fetch(url)

   if (!response.ok) {
      throw new Error("An error occurred while fetching the data.")
   }
   const result = await response.json()

   // Return the nested data to match fallbackData structure
   const blocks = result?.data

   return blocks
}

/**
 * Extracts the first part of an email address and returns it as a name.
 * @param {string} email - The email address.
 * @returns {string} - The extracted name from the email address.
 */
export const getNameFromEmail = (email?: string) => {
   if (!email) {
      return ""
   }
   // Check if email contains '@' symbol
   if (!email.includes("@")) {
      return ""
   }
   // Extract the part before '@'
   const name = email.split("@")[0]

   // Return the extracted name
   return name
}

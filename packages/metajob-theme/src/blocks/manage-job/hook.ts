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

import { IJobData } from "./types"

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

/**
 * Get featured-job count.
 * @param {IJobData} data -
 * @returns {number} -
 */
export const getFeaturedCount = (data: IJobData[]) => {
   if (!data || data?.length === 0) {
      return 0
   }
   const featuredJobs = data.filter((item) => item?.is_featured)
   return featuredJobs?.length || 0
}

/**
 * Get the slug from the title.
 * @param {string} title - The title to be converted to a slug.
 * @returns {string} - The generated slug.
 */
export const getSlugFromTitle = (title?: string) => {
   if (!title) {
      return ""
   }
   const newSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // remove non-word chars
      .replace(/[\s_-]+/g, "-") // collapse whitespace and underscores
      .replace(/^-+|-+$/g, "") // trim leading/trailing -
   return newSlug
}

/**
 * Format a date to YYYY-MM-DD.
 * @param {Date} date - The date to be formatted.
 * @returns {string} - The formatted date string.
 * */
export const formatDate = (date: Date) => {
   return date.toISOString().split("T")[0] // Format to YYYY-MM-DD
}

/**
 * Function to get the link for a specific social media type from an array of social links.
 * @param {Array} socialLinks - Array of objects containing social media links.
 * @param {string} type - The social media type to find (e.g., "facebook", "twitter").
 * @returns {string} The link for the specified social media type or an empty string if not found.
 */
export const getSocialLink = (socialLinks: { type: string; link: string }[], type: string): string => {
   return socialLinks?.find((item) => item.type === type)?.link || ""
}

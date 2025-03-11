"use client"

interface SocialLink {
   type: string
   link: string
}

/**
 * Function to get the social link by type.
 *
 * @param socialLinks The array of social links.
 * @param linkType The type of social link you want to retrieve (e.g., "facebook").
 * @returns The link corresponding to the social type if found, otherwise an empty string.
 */
export const getSocialLink = (linkType: string, socialLinks?: SocialLink[]): string => {
   if (!socialLinks) {
      return ""
   }
   const social = socialLinks.find((link) => link.type.toLowerCase() === linkType.toLowerCase())
   return social ? social.link : ""
}

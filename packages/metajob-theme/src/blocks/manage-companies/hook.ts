import _ from "lodash"

export const fetcher = async (url: string) => {
   const response = await fetch(url)
   if (!response.ok) {
      throw new Error("An error occurred while fetching the data.")
   }
   const result = await response.json()

   const categoryData = result?.data?.data || []
   return categoryData
}

/**
 * get Value From Website.
 * @param websiteUrl as string value
 * @returns
 */
export const getValueFromWebsite = (websiteUrl: string) => {
   if (!websiteUrl) {
      return ""
   }
   return _.chain(websiteUrl)
      .replace(/^https?:\/\/(www\.)?/, "") // Remove http://, https://, and www.
      .trimEnd("/") // Remove trailing slash
      .value()
}

/**
 * get social link obj by type
 * @param type as string value  like facebook, twitter, linkedin
 * @param socialArr as array of object
 * @returns
 */
export const getSocialLik = (
   type: string,
   socialArr?: {
      type: string
      link: string
   }[]
) => {
   if (!socialArr || socialArr.length === 0) {
      return { link: "" }
   }
   return socialArr?.find((link) => link?.type === type)
}

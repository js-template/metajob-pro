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

import _ from "lodash"

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

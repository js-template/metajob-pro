"use client"
import _ from "lodash"

export const appliedListsFetcher = async (url: string) => {
   const response = await fetch(url)
   if (!response.ok) {
      throw new Error("An error occurred while fetching the data.")
   }
   const result = await response.json()

   // data formatted
   const formatted = await _.map(result.data.data, (item: any) => {
      // format data
      const formattedData = _.get(item, "attributes", {})

      // get the owner data
      const ownerData = _.get(formattedData, "owner.data.attributes", {})
      formattedData.owner = ownerData

      // get the list data
      const listData = _.get(formattedData, "job.data.attributes", {})
      formattedData.list = listData

      return formattedData
   })

   return formatted // Return the nested data
}

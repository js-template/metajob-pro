"use client"

import _ from "lodash"

export const bookmarksListsFetcher = async (url: string) => {
   const response = await fetch(url)
   if (!response.ok) {
      throw new Error("An error occurred while fetching the data.")
   }
   const result = await response.json()

   // data formatted
   const formatted = await _.map(result.data.data, (item: any) => {
      // format data
      const formattedData = _.get(item, "attributes", {})

      // get the list data
      const listData = _.get(formattedData, "job.data.attributes", {})

      // get the company data
      const companyData = _.get(formattedData, "company.data.attributes", {})

      // get the resume data
      const resumeData = _.get(formattedData, "resume.data.attributes", {})

      switch (formattedData.type) {
         case "job":
            return {
               id: item.id,
               title: listData.title || "No List Found",
               type: formattedData.type,
               note: formattedData.note,
               createdAt: formattedData.createdAt,
               updatedAt: formattedData.updatedAt
            }
         case "company":
            return {
               id: item.id,
               title: companyData.name || "No Company Found",
               type: formattedData.type,
               note: formattedData.note,
               createdAt: formattedData.createdAt,
               updatedAt: formattedData.updatedAt
            }
         case "resume":
            return {
               id: item.id,
               title: resumeData.name || "No Resume Found",
               type: formattedData.type,
               note: formattedData.note,
               createdAt: formattedData.createdAt,
               updatedAt: formattedData.updatedAt
            }
         case "default":
            return {
               id: item.id,
               title: "No Type Found",
               type: formattedData.type,
               note: formattedData.note,
               createdAt: formattedData.createdAt,
               updatedAt: formattedData.updatedAt
            }
      }
   })

   return formatted // Return the nested data
}

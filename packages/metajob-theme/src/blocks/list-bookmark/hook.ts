"use client"

import { IBookmarkAttribute } from "./types"

export const fetcher = async (url: string) => {
   const response = await fetch(url)
   if (!response.ok) {
      throw new Error("An error occurred while fetching the data.")
   }
   const result = await response.json()
   return result.data // Return the nested data
}

export const getItemValue = (data: IBookmarkAttribute) => {
   const { type, job, company, resume } = data || {}

   // job data for job bookmark
   const jobAttributes = job?.data?.attributes
   const { title: jobTitle, price: jobPrice, slug: jobSlug, status: jobStatus } = jobAttributes || {}

   // company data for company bookmark
   const companyAttributes = company?.data?.attributes
   const {
      name: companyTitle,
      avg_price: companyPrice,
      slug: companySlug,
      createdAt: companyCreate
   } = companyAttributes || {}

   // resume data for resume bookmark
   const resumeAttributes = resume?.data?.attributes
   const { name: resumeTitle, salary: resumePrice, slug: resumeSlug, createdAt: resumeCreate } = resumeAttributes || {}

   const jobType = type === "job"
   const companyType = type === "company"
   const resumeType = type === "resume"

   const itemTitle = jobType ? jobTitle : companyType ? companyTitle : resumeType ? resumeTitle : ""
   const itemPrice = jobType ? jobPrice : companyType ? companyPrice : resumeType ? resumePrice : "00"
   const itemUrl = jobType
      ? `/job/${jobSlug}`
      : companyType
        ? `/company/${companySlug}`
        : resumeType
          ? `/resume/${resumeSlug}`
          : "#"

   const itemStatus = jobType
      ? jobStatus
      : companyType && companyCreate
        ? "active"
        : resumeType && resumeCreate
          ? "active"
          : "inactive"
   return { itemTitle, itemPrice, itemUrl, itemStatus }
}

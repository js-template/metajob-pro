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
   // const jobAttributes = job?.data?.attributes
   const { title: jobTitle, price: jobPrice, slug: jobSlug, status: jobStatus } = job || {}

   // company data for company bookmark
   const { name: companyTitle, avg_salary: companyPrice, slug: companySlug, createdAt: companyCreate } = company || {}

   // resume data for resume bookmark
   const { name: resumeTitle, salary: resumePrice, slug: resumeSlug, createdAt: resumeCreate } = resume || {}

   const jobType = type === "job"
   const companyType = type === "company"
   const resumeType = type === "resume"

   const itemTitle = jobType ? jobTitle : companyType ? companyTitle : resumeType ? resumeTitle : ""
   const itemPrice = jobType ? jobPrice : companyType ? companyPrice?.title : resumeType ? resumePrice?.title : "00"
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

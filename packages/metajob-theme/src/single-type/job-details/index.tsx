"use server"
import { find } from "../../lib/strapi"
import JobDetailsClient from "./job-details"
import { IJobDetailsBlock, ISingleJob } from "./types"

type Props = {
   data: ISingleJob
   language?: string
   block: IJobDetailsBlock
}

export const JobDetails = async ({ data, block, language }: Props) => {
   const { company } = data || {}

   // fetch company data
   const { data: companyDataAll } = await find(
      "api/metajob-backend/companies",
      {
         populate: {
            logo: {
               fields: ["url"]
            },
            social_links: {
               populate: "*"
            }
         },
         filters: {
            documentId: {
               $eq: company?.documentId
            }
         },
         locale: language ?? "en"
      },
      "no-store"
   )

   // fetch related-job data
   const categoryId = data?.category?.id
   const { data: relatedJobsDataAll } = await find(
      "api/metajob-backend/jobs",
      {
         filters: {
            id: {
               $ne: data?.id
            },
            category: {
               id: {
                  $eq: categoryId
               }
            }
         },
         populate: {
            company: {
               populate: {
                  logo: {
                     fields: ["url"]
                  }
               }
            },
            type: {
               fields: ["title"]
            },
            category: {
               fields: ["title", "documentId"]
            }
         },
         pagination: {
            pageSize: 4,
            page: 1
         },
         publicationState: "live",
         locale: language ?? "en"
      },
      "no-store"
   )

   return (
      <JobDetailsClient
         block={block}
         data={data}
         language={language}
         companyData={companyDataAll?.data?.[0]}
         relatedJobsData={relatedJobsDataAll?.data}
      />
   )
}

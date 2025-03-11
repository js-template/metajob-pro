"use server"
import { find } from "../../lib/strapi"
import CompanyDetailsClient from "./company-details"
import { ICompanyDetailsBlock, ISingleCompany } from "./types"

type Props = {
   data: ISingleCompany
   language?: string
   block: ICompanyDetailsBlock
}

export const CompanyDetails = async ({ data, block, language }: Props) => {
   // fetch open-jobs data
   const companyId = data?.id
   const { data: openJobsDataAll } = await find(
      "api/metajob-backend/jobs",
      {
         filters: {
            company: {
               id: {
                  $eq: companyId || undefined
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
            pageSize: 5,
            page: 1
         },
         publicationState: "live",
         locale: language ?? ["en"]
      },
      "no-store"
   )

   return <CompanyDetailsClient block={block} data={data} language={language} openJobsData={openJobsDataAll?.data} />
}

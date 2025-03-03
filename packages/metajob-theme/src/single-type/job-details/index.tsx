"use server"
import { find } from "../../lib/strapi"
import JobDetailsClient from "./job-details"
import { IJobDetailsBlock, ISingleJob, IUserSession } from "./types"

type Props = {
   data: ISingleJob
   language?: string
   session?: IUserSession | null | any
   block: IJobDetailsBlock
}

export const JobDetails = async ({ data, session, block, language }: Props) => {
   const { company } = data || {}

   const { data: companyDataAll } = await find(
      "api/metajob-backend/companies",
      {
         populate: {
            logo: {
               fields: ["url"]
            }
         },
         filters: {
            documentId: {
               $eq: company?.documentId
            }
         }
      },
      "no-store"
   )

   return (
      <JobDetailsClient
         block={block}
         data={data}
         session={session}
         language={language}
         companyData={companyDataAll?.data?.[0]}
      />
   )
}

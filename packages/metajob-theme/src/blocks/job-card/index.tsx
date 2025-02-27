"use server"
import { IJobCardBlock, IUserSession } from "./types"
import { find } from "@/lib/strapi"
import { JobCardClient } from "./card"
//import { jobData } from "@/single-type/job-details/data"

type Props = {
   block: IJobCardBlock
   data?: any
   language?: string
   session?: IUserSession | null | any
}

export const JobCard = async ({ block, language }: Props) => {
   const { data: JobsData, error: JobsError } = await find(
      "api/metajob-backend/jobs",
      {
         // filters: {
         //    is_featured: {
         //       $eq: true
         //    }
         // },
         populate: {
            company: {
               populate: "*"
            }
         },
         //publicationState: "live",
         locale: language ?? ["en"]
      },
      "no-store"
   )

   return <JobCardClient block={block} JobsData={JobsData} />
}

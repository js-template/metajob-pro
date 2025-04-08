"use server"
import { IJobCardBlock } from "./types"
import { find } from "../../lib/strapi"
import { JobCardClient } from "./card"
import JobCardLoader from "./loader"
import { Suspense } from "react"

type Props = {
   block: IJobCardBlock
   data?: any
   language?: string
}

export const JobCard = async ({ block, language }: Props) => {
   const { data: JobsData } = await find(
      "api/metajob-backend/jobs",
      {
         populate: {
            company: {
               fields: ["name"],
               populate: {
                  logo: {
                     fields: ["url"]
                  }
               }
            },
            type: {
               fields: ["title"]
            }
         },
         pagination: {
            pageSize: block?.item_count || 6,
            page: 1
         },
         locale: language ?? "en"
      },
      "no-store"
   )

   return (
      <Suspense fallback={<JobCardLoader />}>
         <JobCardClient block={block} JobsData={JobsData?.data} />
      </Suspense>
   )
}

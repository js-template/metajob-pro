"use server"
import { IJobCardBlock, IUserSession } from "./types"
import { find } from "../../lib/strapi"
import { JobCardClient } from "./card"
import JobCardLoader from "./loader"
import { Suspense } from "react"

type Props = {
   block: IJobCardBlock
   data?: any
   language?: string
   session?: IUserSession | null | any
}

export const JobCard = async ({ block, language }: Props) => {
   const { data: JobsData } = await find(
      "api/metajob-backend/jobs",
      {
         populate: {
            company: {
               populate: "*"
            }
         },
         locale: language ?? ["en"]
      },
      "no-store"
   )

   return (
      <Suspense fallback={<JobCardLoader />}>
         <JobCardClient block={block} JobsData={JobsData} />
      </Suspense>
   )
}

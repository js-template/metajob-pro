"use server"
import { IJobCardBlock, IUserSession } from "./types"
import { find } from "../../lib/strapi"
import { JobCardClient } from "./card"

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
         //publicationState: "live",
         locale: language ?? ["en"]
      },
      "no-store"
   )

   return <JobCardClient block={block} JobsData={JobsData} />
}

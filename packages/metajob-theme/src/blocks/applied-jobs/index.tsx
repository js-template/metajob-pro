"use server"
import { auth } from "../../lib/auth"
import { find } from "../../lib/strapi"
import AppliedJobsClient from "./applied-jobs"
import { IAppliedJobsBlock } from "./type"

type Props = {
   block: IAppliedJobsBlock
   language?: string
}

export const AppliedJobs = async ({ block, language }: Props) => {
   // Get user session
   const session = await auth()

   // get user data
   const userId = session?.user?.id
   const { data: appliedJobsDataAll } = userId
      ? await find(
           "api/metajob-backend/applied-jobs",
           {
              populate: "*",
              pagination: {
                 page: 1,
                 pageSize: 10,
                 withCount: true
              },
              filters: {
                 owner: {
                    id: userId
                 }
              }
           },
           "no-store"
        )
      : {}

   return <AppliedJobsClient block={block} language={language} appliedJobsPre={appliedJobsDataAll?.data || []} />
}

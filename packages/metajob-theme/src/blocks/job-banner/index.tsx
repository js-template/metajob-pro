"use server"
import { find } from "../../lib/strapi"
import { IBannerBlock } from "./types"
import { Suspense } from "react"
import { JobBannerClient } from "./banner"
import JobBannerLoader from "./loader"

type Props = {
   block: IBannerBlock
   language?: string
}

export const JobBanner = async ({ block, language }: Props) => {
   const { data: categoryData } = await find(
      "api/metajob-backend/job-categories",
      {
         fields: ["title"],
         publicationState: "live",
         locale: language ?? ["en"]
      },
      "no-store"
   )

   return (
      <Suspense fallback={<JobBannerLoader />}>
         <JobBannerClient block={block} categoryData={categoryData?.data} language={language} />
      </Suspense>
   )
}

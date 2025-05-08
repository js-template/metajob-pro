"use server"
import { find } from "../../lib/strapi"
import { ICategoryOverlayCardBlock } from "./types"
import { Suspense } from "react"
import JobCategoryLoader from "./loader"
import { JobCategoryOverlayCard } from "./card"

type Props = {
   block: ICategoryOverlayCardBlock
   language?: string
}

export const JobCategoryOverlay = async ({ block, language }: Props) => {
   const show_icon = true
   const overlay = false
   const { data: categoryOverlayData } = await find("api/metajob-backend/job-categories", {
      populate: {
         image: {
            fields: ["url"]
         }
      },
      pagination: {
         pageSize: block?.item_count || 12,
         page: 1
      },
      fields: ["title", "description"],
      publicationState: "live",
      locale: language ?? "en"
   })

   return (
      <Suspense fallback={<JobCategoryLoader />}>
         <JobCategoryOverlayCard block={block} categoryOverlayData={categoryOverlayData?.data} />
      </Suspense>
   )
}

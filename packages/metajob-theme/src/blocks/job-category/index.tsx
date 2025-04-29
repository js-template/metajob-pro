"use server"
import { find } from "../../lib/strapi"
import { ICategoryCardBlock } from "./types"
import { CategoryCard } from "./card"
import { Suspense } from "react"
import JobCategoryLoader from "./loader"

type Props = {
   block: ICategoryCardBlock
   language?: string
}

export const JobCategory = async ({ block, language }: Props) => {
   const { data: categoryData } = await find("api/metajob-backend/job-categories", {
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
         <CategoryCard block={block} categoryData={categoryData?.data} />
      </Suspense>
   )
}

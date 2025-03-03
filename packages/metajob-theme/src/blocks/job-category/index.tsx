"use server"
import { find } from "../../lib/strapi"
import { ICategoryCardBlock, IUserSession } from "./types"
import { CategoryCard } from "./card"
import { Suspense } from "react"
import JobCategoryLoader from "./loader"

type Props = {
   block: ICategoryCardBlock
   data: any
   language?: string
   session?: IUserSession | null | any
}

export const JobCategory = async ({ block, language }: Props) => {
   const { data: categoryData, error: categoryError } = await find(
      "api/metajob-backend/job-categories",
      {
         populate: {
            image: {
               fields: ["url"]
            }
         },
         fields: ["title"],
         publicationState: "live",
         locale: language ?? ["en"]
      },
      "no-store"
   )

   return (
      <Suspense fallback={<JobCategoryLoader />}>
         <CategoryCard block={block} categoryData={categoryData?.data} />
      </Suspense>
   )
}

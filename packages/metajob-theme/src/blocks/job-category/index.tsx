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
   const { data: categoryData, error: categoryError } = await find(
      "api/metajob-backend/job-categories",
      {
         populate: {
            image: {
               fields: ["url"]
            }
         },
         pagination: {
            pageSize: block?.item_count || 12,
            page: 1
         },
         fields: ["title", "description", "icon"],
         locale: language ?? "en"
      },
      "no-store"
   )

   console.log("categoryData", categoryData, "categoryError", categoryError)

   if (categoryError) {
      return <div>Error loading categories: {categoryError.message}</div>
   }

   return (
      <Suspense fallback={<JobCategoryLoader />}>
         <CategoryCard block={block} categoryData={categoryData?.data} />
      </Suspense>
   )
}

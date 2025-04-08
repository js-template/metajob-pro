"use server"
import { IReviewsBlock } from "./types"
import { ReviewCardClient } from "./card"
import { find } from "../../lib/strapi"
import { ReviewCardLoader } from "./loadet"
import { Suspense } from "react"

type Props = {
   block: IReviewsBlock
   language?: string
}

export const ReviewCard = async ({ block, language }: Props) => {
   const { data: testimonialsAll } = await find(
      "api/metajob-backend/testimonials",
      {
         populate: "*",
         locale: language ?? "en"
      },
      "no-store"
   )
   const testimonialData = testimonialsAll?.data

   return (
      <Suspense fallback={<ReviewCardLoader />}>
         <ReviewCardClient block={block} language={language} testimonialData={testimonialData} />
      </Suspense>
   )
}

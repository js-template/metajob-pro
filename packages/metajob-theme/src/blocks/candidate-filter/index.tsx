"use server"
import { find } from "../../lib/strapi"
import CandidateFilterClient from "./candidate-filter"
import { ICandidateFilterBlock } from "./types"

type Props = {
   block: ICandidateFilterBlock
   language?: string
}

export const CandidateFilter = async ({ block, language }: Props) => {
   const { data: categoryDataAll } = await find(
      "api/metajob-backend/job-categories",
      {
         fields: ["title", "slug"],
         locale: language ?? "en"
      },
      "no-store"
   )

   // fetch job-skills data
   const { data: skillsDataAll } = await find(
      "api/metajob-backend/skills",
      {
         fields: ["title", "value"],
         locale: language ?? "en"
      },
      "no-store"
   )

   return (
      <CandidateFilterClient
         block={block}
         language={language}
         categoryData={categoryDataAll?.data}
         skillsData={skillsDataAll?.data}
      />
   )
}

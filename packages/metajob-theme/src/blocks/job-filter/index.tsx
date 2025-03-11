"use server"
import { find } from "../../lib/strapi"
import { JobFilterClient } from "./job-filter"
import { IJobFilterData } from "./types"

type Props = {
   block: IJobFilterData
   data?: any
   language?: string
}

export const JobFilter = async ({ block, language }: Props) => {
   const { data: categoryDataAll } = await find(
      "api/metajob-backend/job-categories",
      {
         fields: ["title", "slug"],
         locale: language ?? ["en"]
      },
      "no-store"
   )

   // fetch job-type data
   const { data: jobTypesDataAll } = await find(
      "api/metajob-backend/job-types",
      {
         fields: ["title", "value"],
         locale: language ?? ["en"]
      },
      "no-store"
   )

   // fetch experience-level data
   const { data: experienceDataAll } = await find(
      "api/metajob-backend/experience-levels",
      {
         fields: ["title", "value"],
         locale: language ?? ["en"]
      },
      "no-store"
   )

   return (
      <JobFilterClient
         block={block}
         categoryData={categoryDataAll?.data}
         jobTypesData={jobTypesDataAll?.data}
         jobExperienceData={experienceDataAll?.data}
         language={language}
      />
   )
}

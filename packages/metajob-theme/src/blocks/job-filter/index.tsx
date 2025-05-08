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
   const { data: categoryDataAll } = await find("api/metajob-backend/job-categories", {
      fields: ["title", "slug"],
      locale: language ?? "en"
   })

   // fetch job-type data
   const { data: jobTypesDataAll } = await find("api/metajob-backend/job-types", {
      fields: ["title", "value"],
      locale: language ?? "en"
   })

   // fetch experience-level data
   const { data: experienceDataAll } = await find("api/metajob-backend/experience-levels", {
      fields: ["title", "value"],
      locale: language ?? "en"
   })

   // fetch job-skills data
   const { data: skillsDataAll } = await find("api/metajob-backend/skills", {
      fields: ["title", "value"],
      locale: language ?? "en"
   })

   const jobFilterAttributes = {
      categoryData: categoryDataAll?.data,
      jobTypesData: jobTypesDataAll?.data,
      jobExperienceData: experienceDataAll?.data,
      jobSkillsData: skillsDataAll?.data
   }

   return (
      <JobFilterClient
         block={block}
         categoryData={categoryDataAll?.data}
         jobTypesData={jobTypesDataAll?.data}
         jobExperienceData={experienceDataAll?.data}
         jobSkillsData={skillsDataAll?.data}
         language={language}
         jobFilterAttributes={jobFilterAttributes}
      />
   )
}

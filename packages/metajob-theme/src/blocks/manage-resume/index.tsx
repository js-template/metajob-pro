"use server"
import { find } from "../../lib/strapi"
import ManageResumeClient from "./manage-resume"
import { IManageResumeBlock } from "./types"

type Props = {
   block: IManageResumeBlock
   language?: string
}

export const ManageResume = async ({ block, language }: Props) => {
   // fetch job-category data
   const { data: jobCategoryAll } = await find(
      "api/metajob-backend/job-categories",
      {
         fields: ["title"],
         locale: language ?? ["en"]
      },
      "no-store"
   )
   // fetch experience-level data
   const { data: experienceDataAll } = await find(
      "api/metajob-backend/experience-levels",
      {
         fields: ["title"],
         locale: language ?? ["en"]
      },
      "no-store"
   )
   // fetch avg-salary data
   const { data: avgSalaryDataAll } = await find(
      "api/metajob-backend/avg-salaries",
      {
         fields: ["title"],
         locale: language ?? ["en"]
      },
      "no-store"
   )
   // fetch salary-types data
   const { data: salaryTypesDataAll } = await find(
      "api/metajob-backend/salary-types",
      {
         fields: ["title"],
         locale: language ?? ["en"]
      },
      "no-store"
   )

   const resumeAttributes = {
      categoryData: jobCategoryAll?.data,
      experienceData: experienceDataAll?.data,
      avgSalaryData: avgSalaryDataAll?.data,
      salaryTypesData: salaryTypesDataAll?.data
   }

   return <ManageResumeClient block={block} language={language} resumeAttributes={resumeAttributes} />
}

"use server"
import { auth } from "../../lib/auth"
import { find } from "../../lib/strapi"
import ManageJobsClient from "./manage-job"
import { IManageJobBock } from "./types"

type Props = {
   block: IManageJobBock
   language?: string
}

export const ManageJobs = async ({ block, language }: Props) => {
   const session = await auth()
   // get user data
   const userId = session?.user?.id

   // fetch company data
   const { data: companyAll } = await find(
      "api/metajob-backend/companies",
      {
         filters: {
            owner: {
               id: userId
            }
         },
         fields: ["name"],
         locale: language ?? ["en"]
      },
      "no-store"
   )

   // fetch job-category data
   const { data: jobCategoryAll } = await find(
      "api/metajob-backend/job-categories",
      {
         fields: ["title"],
         locale: language ?? ["en"]
      },
      "no-store"
   )
   // fetch job-skills data
   const { data: skillsDataAll } = await find(
      "api/metajob-backend/skills",
      {
         fields: ["title"],
         locale: language ?? ["en"]
      },
      "no-store"
   )
   // fetch job-type data
   const { data: jobTypesDataAll } = await find(
      "api/metajob-backend/job-types",
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

   // fetch membership data
   const { data: packageDataAll } = await find(
      "api/metajob-backend/memberships",
      {
         populate: "*",
         filters: {
            owner: {
               id: userId
            }
         },
         publicationState: "live",
         locale: language ?? ["en"]
      },
      "no-store"
   )

   const jobAttributes = {
      companyData: companyAll?.data,
      categoryData: jobCategoryAll?.data,
      skillsData: skillsDataAll?.data,
      jobTypesData: jobTypesDataAll?.data,
      jobExperienceData: experienceDataAll?.data,
      userPackage: packageDataAll?.data
   }

   return <ManageJobsClient block={block} language={language} jobAttributes={jobAttributes} />
}

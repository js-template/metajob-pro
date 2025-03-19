"use server"
import { find } from "../../lib/strapi"
import ManageCompaniesClient from "./manage-companies"
import { IManageCompanyBock } from "./types"

type Props = {
   block: IManageCompanyBock
   language?: string
}

export const ManageCompanies = async ({ block, language }: Props) => {
   // fetch job-category data
   const { data: jobCategoryAll } = await find(
      "api/metajob-backend/job-categories",
      {
         fields: ["title"],
         locale: language ?? "en"
      },
      "no-store"
   )

   // fetch company-size data
   const { data: companySizesDataAll } = await find(
      "api/metajob-backend/company-sizes",
      {
         fields: ["title"],
         locale: language ?? "en"
      },
      "no-store"
   )
   // fetch revenues data
   const { data: revenuesDataAll } = await find(
      "api/metajob-backend/revenues",
      {
         fields: ["title"],
         locale: language ?? "en"
      },
      "no-store"
   )
   // fetch avg-salary data
   const { data: avgSalaryDataAll } = await find(
      "api/metajob-backend/avg-salaries",
      {
         fields: ["title"],
         locale: language ?? "en"
      },
      "no-store"
   )

   const companyAttributes = {
      categoryData: jobCategoryAll?.data,
      companySizesData: companySizesDataAll?.data,
      revenuesData: revenuesDataAll?.data,
      avgSalaryData: avgSalaryDataAll?.data
   }

   return <ManageCompaniesClient block={block} language={language} companyAttributes={companyAttributes} />
}

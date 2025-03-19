"use server"
import { find } from "../../lib/strapi"
import CompanyFilterClient from "./company-filter"
import { ICompanyFilterBlockData } from "./types"

type Props = {
   block: ICompanyFilterBlockData
   data?: any
   language?: string
}

export const CompanyFilter = async ({ block, language }: Props) => {
   const { data: categoryDataAll } = await find(
      "api/metajob-backend/job-categories",
      {
         fields: ["title", "slug"],
         locale: language ?? "en"
      },
      "no-store"
   )

   return <CompanyFilterClient block={block} categoryData={categoryDataAll?.data} language={language} />
}

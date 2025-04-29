"use server"
import { find } from "../../lib/strapi"
import { IBannerBlock } from "./types"
import { Suspense } from "react"
import { JobBannerClient } from "./banner"
import JobBannerLoader from "./loader"

type Props = {
   block: IBannerBlock
   language?: string
}

export const JobBanner = async ({ block, language }: Props) => {
   const { data: categoryData } = await find("api/metajob-backend/job-categories", {
      fields: ["title"],
      publicationState: "live",
      locale: language ?? "en"
   })

   const { data: jobData } = await find("api/metajob-backend/jobs", {
      fields: ["title"],
      publicationState: "live",
      count: true,
      locale: language ?? "en"
   })

   const { data: companyData } = await find("api/metajob-backend/companies", {
      fields: ["name"],
      publicationState: "live",
      locale: language ?? "en"
   })
   const { data: resumesData } = await find("api/metajob-backend/resumes", {
      fields: ["name"],
      publicationState: "live",
      locale: language ?? "en"
   })
   const countData = {
      job: jobData?.meta?.pagination?.total ?? 0,
      company: companyData?.meta?.pagination?.total ?? 0,
      resume: resumesData?.meta?.pagination?.total ?? 0
   }
   return (
      <Suspense fallback={<JobBannerLoader />}>
         <JobBannerClient block={block} categoryData={categoryData?.data} language={language} countData={countData} />
      </Suspense>
   )
}

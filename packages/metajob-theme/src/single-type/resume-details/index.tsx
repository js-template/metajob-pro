"use server"
import { findOne } from "../../lib/strapi"
import ResumeDetailsClient from "./resume-details"
import { IResumeDetailsBlock, ISingleResume } from "./types"

type Props = {
   data: ISingleResume
   language?: string
   block: IResumeDetailsBlock
}

export const ResumeDetails = async ({ data, block, language }: Props) => {
   // fetch resumes-data
   const resumeDocID = data?.documentId
   const { data: resumeDataAll } = await findOne(
      "api/metajob-backend/resumes",
      resumeDocID,
      {
         populate: {
            user: {
               populate: {
                  avatar: {
                     fields: ["url"]
                  }
               }
            },
            experience: {
               populate: "*"
            },
            education: {
               populate: "*"
            },
            portfolio: {
               populate: "*"
            },
            experience_time: {
               populate: "*"
            },
            category: {
               populate: "*"
            }
         },
         publicationState: "live",
         locale: language ?? ["en"]
      },
      "no-store"
   )

   return <ResumeDetailsClient block={block} data={resumeDataAll?.data} language={language} />
}

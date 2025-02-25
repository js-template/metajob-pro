"use server"
import { find } from "../../lib/strapi"
import { IPublicHeaderBlock } from "./types"
import { PublicHeaderComponent } from "./public-header"

type Props = {
   block: IPublicHeaderBlock
   language?: string
}

export const PublicHeader = async ({ block, language }: Props) => {
   const { data, error } = await find(
      // fetch public header data
      "api/padma-backend/layout",
      {
         populate: {
            header: {
               on: {
                  "header.main-menu": {
                     populate: {
                        light_logo: {
                           populate: "*"
                        },
                        dark_logo: {
                           populate: "*"
                        }
                     }
                  }
               }
            }
         },
         locale: language ?? ["en"]
      },
      "no-store"
   )

   // console.log("public header data", data?.data?.header?.[0], "public header error", error)
   const combineBlockData = {
      ...block,
      ...data?.data?.header?.[0]
   }
   return <PublicHeaderComponent block={combineBlockData} language={language} />
}

"use server"
import { find } from "../../lib/strapi"
import { PrivateHeaderComponent } from "./private-header"
import { IPrivateHeaderProps } from "./types"

type Props = {
   block: IPrivateHeaderProps
   language?: string
}

export const PrivateHeader = async ({ block, language }: Props) => {
   const { data } = await find(
      "api/padma-backend/private-layout",
      {
         populate: {
            header: {
               on: {
                  "header.private-header": {
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
         }
      },
      "no-store"
   )

   const combineBlockData = {
      ...block,
      ...data?.data?.header?.[0]
   }
   return <PrivateHeaderComponent block={combineBlockData} language={language} />
}

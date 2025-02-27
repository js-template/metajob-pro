"use server"
import { find, findOne } from "../../lib/strapi"
import { IPublicHeaderBlock } from "./types"
import { PublicHeaderComponent } from "./public-header"
import { auth } from "../../lib/auth"

type Props = {
   block: IPublicHeaderBlock
   language?: string
}

export const PublicHeader = async ({ block, language }: Props) => {
   // Get user session
   const session = await auth()

   const { data } = await find(
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

   const combineBlockData = {
      ...block,
      ...data?.data?.header?.[0]
   }

   // get user data
   const userId = session?.user?.id
   const { data: userData } = userId
      ? await findOne(
           "api/users",
           userId,
           {
              populate: {
                 avatar: {
                    fields: ["url"]
                 }
              },
              fields: ["id"],
              publicationState: "live",
              locale: language ?? ["en"]
           },
           "no-store"
        )
      : {}

   return <PublicHeaderComponent block={combineBlockData} language={language} userData={userData} />
}

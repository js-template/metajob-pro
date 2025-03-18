"use server"
import { auth } from "../../lib/auth"
import { find, findOne } from "../../lib/strapi"
import { PrivateHeaderComponent } from "./private-header"
import { IPrivateHeaderProps } from "./types"

type Props = {
   block: IPrivateHeaderProps
   language?: string
}

export const PrivateHeader = async ({ block, language }: Props) => {
   // Get user session
   const session = await auth()

   // fetch private header data
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

   // fetch locales data
   const { data: listLocalesData } = await find(
      "api/i18n/locales",
      {
         populate: "*"
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

   // fetch email-history data
   const { data: emailHistoryAll } = await find(
      "api/metajob-backend/email-histories",
      {
         filters: {
            owner: userId
         },
         sort: ["createdAt:desc"],
         fields: ["title", "createdAt"]
      },
      "no-store"
   )

   const emailHistoryData = emailHistoryAll?.data || []

   return (
      <PrivateHeaderComponent
         block={combineBlockData}
         language={language}
         userData={userData}
         emailHistoryData={emailHistoryData}
         listLocalesData={listLocalesData}
      />
   )
}

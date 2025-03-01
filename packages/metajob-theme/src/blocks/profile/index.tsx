"use server"
import { auth } from "../../lib/auth"
import { findOne } from "../../lib/strapi"
import { MyProfileClient } from "./profile"

type Props = {
   block: any
   language?: string
   data?: any
}

export const MyProfile = async ({ block, language }: Props) => {
   // Get user session
   const session = await auth()

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
              fields: ["id", "first_name", "last_name", "email", "phone"],
              locale: language ?? ["en"]
           },
           "no-store"
        )
      : {}

   return <MyProfileClient block={block} language={language} userData={userData} />
}

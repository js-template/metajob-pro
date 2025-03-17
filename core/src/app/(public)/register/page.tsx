import type { Metadata } from "next"
import RegisterBody from "./body"
import { getLanguageFromCookie } from "@/utils/language"
import { find } from "@/lib/strapi"
// FIXME: Replace with dynamic function
export const metadata: Metadata = {
   title: "Register - MetaJobs",
   description: "MetaJobs is a job board for developers, designers, and other tech professionals."
}

const Register = async () => {
   // fetch the language from cookies or session
   const language = await getLanguageFromCookie()

   // fetch register data
   const { data, error } = await find(
      "api/metajob-backend/auth-setting",
      {
         populate: {
            register: { populate: "*" }
         },
         locale: language ?? ["en"]
      },
      "no-store"
   )
   const block = data?.data?.register?.[0] || null

   return <RegisterBody block={block} />
}
export default Register

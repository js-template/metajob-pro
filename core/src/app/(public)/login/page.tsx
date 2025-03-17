import type { Metadata } from "next"
import LoginBody from "./body"
import { getLanguageFromCookie } from "@/utils/language"
import { find } from "@/lib/strapi"

// FIXME: Replace with dynamic function
export const metadata: Metadata = {
   title: "Login | MUI Next.js Boilerplate",
   description: "Login page for MUI Next.js Boilerplate"
}

type Props = {
   searchParams?: Record<"callbackUrl" | "error", string>
}

const LoginPage = async ({ searchParams }: Props) => {
   // fetch the language from cookies or session
   const language = await getLanguageFromCookie()

   // fetch login data
   const { data, error } = await find(
      "api/metajob-backend/auth-setting",
      {
         populate: {
            login: { populate: "*" }
         },
         locale: language ?? ["en"]
      },
      "no-store"
   )
   const block = data?.data?.login?.[0] || null

   return <LoginBody error={searchParams?.error} callbackUrl={searchParams?.callbackUrl} block={block} />
}

export default LoginPage

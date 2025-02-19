import { find } from "@/lib/strapi"
import Body from "./body"
import React, { Suspense } from "react"
import { auth } from "@/context/auth"
import { redirect } from "next/navigation"
import { loadActiveTheme } from "config/theme-loader"

export default async function DashboardPage({
   params
}: {
   params: { page: string }
   searchParams: { [key: string]: string | string[] | undefined }
}) {
   // Get user session
   const session = await auth()
   if (!session) {
      redirect("/login")
   }

   const userRole = session?.user?.role?.name?.toLowerCase()

   /// console.log("User role", userRole)

   if (!userRole) {
      return <div>You are not allowed to access this page.</div>
   }

   // Define which role components to fetch
   const roleComponentField =
      userRole === "candidate" ? "role1Components" : userRole === "employer" ? "role2Components" : null

   console.log("Role component field", roleComponentField)
   if (!roleComponentField) {
      return <div>You are not allowed to access this page.</div>
   }

   // Fetch only relevant role components
   const { data, error } = await find(
      "api/padma-backend/private-frontpage",
      {
         populate: {
            [roleComponentField]: {
               populate: "*"
            },
            style: {
               populate: "*"
            }
         }
      },
      "no-store"
   )

   if (error) {
      console.error("Error fetching dashboard data:", error?.message)
      return <div>Error loading dashboard. Please try again later.</div>
   }

   const roleComponents = data?.data?.[roleComponentField] || []

   if (roleComponents.length === 0) {
      console.warn(`No components found for role: ${userRole}`)
   }

   const activeTheme = await loadActiveTheme()
   const getPrivateComponents = activeTheme?.getPrivateComponents || {}

   return (
      <Suspense fallback={<div>Loading...</div>}>
         <Body
            blocks={roleComponents} // Pass the filtered role components
            session={session}
            currentThemeComponents={getPrivateComponents}
            style={data?.data?.style}
         />
      </Suspense>
   )
}

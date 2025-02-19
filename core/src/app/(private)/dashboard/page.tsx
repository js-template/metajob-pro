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
   const session = await auth()
   if (!session) {
      redirect("/login")
   }

   const { data, error } = await find("api/padma-backend/private-frontpage", { populate: "*" }, "no-store")

   // console.log("Private Page Data", data?.data)

   if (error) {
      console.error("Error fetching dashboard data:", error?.message)
      return <div>Error loading dashboard. Please try again later.</div>
   }

   const userRole = session?.user?.role?.name?.toLowerCase() // Normalize role name
   console.log("User Role:", userRole)

   // Find the correct role components
   let roleComponents = []

   if (data?.data?.role1?.name?.toLowerCase() === userRole) {
      roleComponents = data?.data?.role1Components || []
   } else if (data?.data?.role2?.name?.toLowerCase() === userRole) {
      roleComponents = data?.data?.role2Components || []
   }

   //console.log("Filtered Role Components:", roleComponents)

   if (roleComponents.length === 0) {
      console.warn(`No components found for role: ${userRole}`)
   }

   const activeTheme = await loadActiveTheme()
   const getPrivateComponents = activeTheme?.getPrivateComponents || {}

   //console.log("getPrivateComponents", getPrivateComponents)

   return (
      <Suspense fallback={<div>Loading...</div>}>
         <Body
            blocks={roleComponents} // Pass the role-specific components
            session={session}
            currentThemeComponents={getPrivateComponents}
            style={data?.data?.style}
         />
      </Suspense>
   )
}

"use client"
import { Stack } from "@mui/material"
import InfoSidebar from "./info-sidebar"
import { SidebarMap } from "../../widgets/sidebar-map"
import { ISingleCompany } from "./types"

export const Sidebar = ({ data }: { data: ISingleCompany }) => {
   const { location } = data || {}
   const { coordinates } = location || {}

   return (
      <Stack spacing={4}>
         <InfoSidebar data={data} />
         {/* google-map  */}
         {location && coordinates && <SidebarMap location={location} />}
      </Stack>
   )
}

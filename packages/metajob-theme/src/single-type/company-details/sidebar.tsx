"use client"
import { Stack } from "@mui/material"
import InfoSidebar from "./info-sidebar"
import { SidebarMap } from "../../widgets/sidebar-map"
import { ICompanyDetailsBlock, ISingleCompany } from "./types"

export const Sidebar = ({ data, block }: { data: ISingleCompany; block: ICompanyDetailsBlock }) => {
   const { location } = data || {}
   const { coordinates } = location || {}

   return (
      <Stack spacing={4}>
         <InfoSidebar data={data} block={block} />
         {/* google-map  */}
         {location && coordinates && <SidebarMap location={location} />}
      </Stack>
   )
}

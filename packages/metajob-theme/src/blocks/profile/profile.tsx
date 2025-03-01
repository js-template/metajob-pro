"use client"

import { useState } from "react"
import { Stack } from "@mui/material"
import ProfileHeader from "./header"
import { ProfileInfo } from "./info"
import { ChangePassword } from "./change-password"

type Props = {
   block: any
   language?: string
   userData?: {
      documentId: string
      first_name: string
      last_name: string
      email: string
      phone: string
   }
}

export const MyProfileClient = ({ block, language, userData }: Props) => {
   const [activeMenu, setActiveMenu] = useState("profile-info")

   return (
      <Stack spacing={4} mb={5}>
         <ProfileHeader activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
         {activeMenu === "profile-info" && <ProfileInfo userData={userData} />}
         {activeMenu === "security" && <ChangePassword />}
      </Stack>
   )
}

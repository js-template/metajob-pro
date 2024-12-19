"use client"

import { useState } from "react"
import { Stack } from "@mui/material"
import { IUserSession } from "../../types/user"
import ProfileHeader from "./header"
import { ProfileInfo } from "./info"
import { ChangePassword } from "./change-password"

type Props = {
   block: any
   session?: IUserSession | null | any
   language?: string
   data?: any
}

export const MyProfile = ({}: Props) => {
   const [activeMenu, setActiveMenu] = useState("profile-info")

   return (
      <Stack spacing={4} mb={5}>
         <ProfileHeader activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
         {activeMenu === "profile-info" && <ProfileInfo />}
         {activeMenu === "security" && <ChangePassword />}
      </Stack>
   )
}

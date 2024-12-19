"use client"

import { SyntheticEvent } from "react"
import { Box, Grid, Tab, Theme, useMediaQuery, useTheme } from "@mui/material"
import CIcon from "../../components/common/icon"
import { TabContext, TabList } from "@mui/lab"

const profileMenu = [
   {
      name: "Profile Info",
      value: "profile-info",
      icon: "tabler:users"
   },
   {
      name: "Security",
      value: "security",
      icon: "tabler:lock"
   }
]

type Props = {
   activeMenu: string
   setActiveMenu: (val: string) => void
}

const ProfileHeader = ({ activeMenu, setActiveMenu }: Props) => {
   const theme = useTheme()
   const hideText = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"))

   const handleTabChange = (event: SyntheticEvent, value: string) => {
      setActiveMenu(value)
   }

   return (
      <Box>
         <Box
            sx={{
               width: "100%",
               p: 0
            }}>
            <Grid container spacing={6}>
               <Grid item xs={12}>
                  <TabContext value={activeMenu}>
                     <Grid container spacing={6}>
                        <Grid item xs={12}>
                           <TabList
                              variant='scrollable'
                              scrollButtons='auto'
                              onChange={handleTabChange}
                              aria-label='customized tabs example'
                              sx={{
                                 "& .MuiTabs-flexContainer": {
                                    gap: "0.25rem"
                                 },
                                 "& .MuiTabs-indicator": {
                                    display: "none"
                                 }
                              }}>
                              {profileMenu?.map((item, index) => (
                                 <Tab
                                    key={index}
                                    value={item?.value}
                                    sx={{
                                       fontSize: "16px",
                                       fontWeight: 400,
                                       textTransform: "capitalize",
                                       borderRadius: "8px",
                                       "&.Mui-selected": {
                                          border: 0,
                                          color: theme.palette.primary.contrastText,
                                          backgroundColor: theme.palette.primary.main
                                       },
                                       "&:hover": {
                                          backgroundColor: (theme) => theme.palette.secondary.main,
                                          color: theme.palette.primary.contrastText
                                       },
                                       transitionDuration: ".3s"
                                    }}
                                    label={
                                       <Box
                                          sx={{
                                             display: "flex",
                                             alignItems: "center",
                                             ...(!hideText && { "& svg": { mr: 2 } })
                                          }}>
                                          <CIcon
                                             icon={item?.icon}
                                             size={20}
                                             sx={{
                                                color: "inherit"
                                             }}
                                          />
                                          {!hideText && item?.name}
                                       </Box>
                                    }
                                 />
                              ))}
                           </TabList>
                        </Grid>
                     </Grid>
                  </TabContext>
               </Grid>
            </Grid>
         </Box>
      </Box>
   )
}

export default ProfileHeader

"use client"
import { useState, MouseEvent } from "react"
import NextLink from "next/link"
import { useTheme as modeUseTheme } from "next-themes"
import _ from "lodash"
import { Menu, MenuItem, Typography, Box, Stack, useTheme, Theme } from "@mui/material"
import { MenuItemProps } from "./types"
import CIcon from "../../components/common/icon"

type Props = {
   main_menu: MenuItemProps[]
   color?: string
}
const DesktopNav = ({ main_menu, color }: Props) => {
   const theme = useTheme()
   const { theme: mode } = modeUseTheme()
   const [anchorElSub, setAnchorElSub] = useState<null | HTMLElement>(null)
   const [activeMenu, setActiveMenu] = useState<number | null>(null)

   // Handle opening the menu on hover
   const handleSubMenuOpen = (event: MouseEvent<HTMLElement>, index: number) => {
      setAnchorElSub(event.currentTarget)
      setActiveMenu(index)
   }
   // Close the menu when mouse leaves both parent and child
   const handleSubMenuClose = () => {
      setAnchorElSub(null)
      setActiveMenu(null)
   }

   return (
      <Box
         sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center"
         }}>
         <Stack direction={"row"} gap={3}>
            {main_menu &&
               main_menu?.map((item: MenuItemProps, index: number) => (
                  <Box key={index} sx={{ position: "relative" }} onMouseLeave={handleSubMenuClose}>
                     {/* Main Menu Item */}
                     <Typography
                        onMouseOver={(event: any) => item?.child?.length && handleSubMenuOpen(event, index)}
                        onClick={(event: any) => item?.child?.length && handleSubMenuOpen(event, index)}
                        component={item?.child && item?.child?.length > 0 ? "div" : NextLink}
                        href={item?.child && item?.child?.length > 0 ? undefined : (item?.link ?? "/")}
                        target={item?.child && item?.child?.length > 0 ? undefined : (item?.target ?? "_self")}
                        sx={{
                           textDecoration: "none",
                           fontSize: 16,
                           fontWeight: 500,
                           "&:hover": { color: "primary.main" },
                           color: (theme: Theme) =>
                              mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary,
                           display: "flex",
                           alignItems: "center",
                           cursor: "pointer"
                        }}>
                        {item?.label ?? "No title"}
                        {item?.child && item?.child?.length > 0 && (
                           <CIcon
                              icon='ri:arrow-down-s-line'
                              sx={{
                                 color: "inherit",
                                 transform: anchorElSub && activeMenu === index ? "rotate(180deg)" : "rotate(0deg)",
                                 transition: theme.transitions.create("transform", {
                                    duration: theme.transitions.duration.shortest
                                 })
                              }}
                           />
                        )}
                     </Typography>

                     {/* Submenu - Only show if there are child items */}
                     {item?.child && item?.child?.length > 0 && (
                        <Menu
                           id='dropdown-menu'
                           anchorEl={anchorElSub}
                           open={activeMenu === index}
                           onClose={handleSubMenuClose} // Close menu if focus lost
                           MenuListProps={{
                              onMouseLeave: handleSubMenuClose // Close when mouse leaves the menu
                           }}
                           sx={{
                              mt: "18px",
                              "& .MuiPaper-root": {
                                 minWidth: "200px",
                                 border: "1px solid",
                                 borderColor: theme.palette.divider,
                                 borderRadius: "6px",
                                 background: theme.palette.background.default,
                                 boxShadow: "0px 8px 28px -4px rgba(20, 28, 46, 0.08)"
                              }
                           }}
                           anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left"
                           }}
                           transformOrigin={{
                              vertical: "top",
                              horizontal: "left"
                           }}>
                           {_.map(item?.child, (childItem, childIndex) => (
                              <MenuItem
                                 key={childIndex}
                                 onClick={handleSubMenuClose}
                                 component={NextLink}
                                 href={childItem?.link}
                                 target={childItem?.target ?? "_self"}
                                 sx={{
                                    gap: 1,
                                    color: theme.palette.text.primary,
                                    ":hover": {
                                       background: theme.palette.background.default,
                                       color: theme.palette.primary.main
                                    }
                                 }}>
                                 {childItem?.label ?? "No title"}
                              </MenuItem>
                           ))}
                        </Menu>
                     )}
                  </Box>
               ))}
         </Stack>
      </Box>
   )
}

export default DesktopNav

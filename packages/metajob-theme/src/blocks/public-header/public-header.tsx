"use client"
import { Fragment, useState, MouseEvent } from "react"
import NextLink from "next/link"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import _ from "lodash"
import MenuIcon from "@mui/icons-material/Menu"
import { LoadingButton } from "@mui/lab"
import {
   Button,
   Menu,
   MenuItem,
   Toolbar,
   Typography,
   Container,
   IconButton,
   AppBar,
   Box,
   useTheme,
   styled
} from "@mui/material"
import { MenuItemProps, IPublicHeaderBlock, IListLocalesData } from "./types"
import { useTheme as modeUseTheme } from "next-themes"
import MobileNav from "./mobile-nav"
import { useChangeDirection, useChangeLang } from "./utils"
import DesktopNav from "./desktop-nav"
import SideItems from "./side-items"
import NavSearch from "./nav-search"

const Image = styled("img")({
   display: "block",
   maxWidth: "200px",
   height: "auto"
})

type Props = {
   block: IPublicHeaderBlock
   language?: string
   userData?: {
      id: number
      avatar?: {
         url: string
      }
   }
   listLocalesData: IListLocalesData[]
}

export const PublicHeaderComponent = ({ block, language, userData, listLocalesData }: Props) => {
   const theme = useTheme()
   const { theme: mode, setTheme } = modeUseTheme()

   const { changeLang } = useChangeLang()
   const { changeDirection } = useChangeDirection()

   const { main_menu, light_logo, dark_logo, style, hide_menu, show_search, logo_text } = block || {}
   const { backgroundColor, color, section_padding } = style || {}

   const logoData = mode === "light" ? light_logo : dark_logo || {}
   const logo = logoData?.logo?.url || ""

   // mobile-menu state
   const [show, setShow] = useState(false)

   const handleOpenNavMenu = () => {
      setShow(true)
   }

   return (
      <AppBar
         position='static'
         sx={{
            bgcolor:
               mode === "light" ? backgroundColor || theme.palette.background.paper : theme.palette.background.paper,
            py: section_padding || "6px",
            backgroundImage: "none"
         }}
         //elevation={4}
      >
         <Container maxWidth='lg' sx={{ width: "100%" }}>
            <Toolbar
               disableGutters
               sx={{
                  justifyContent: "space-between",
                  gap: 2
               }}>
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: 1
                  }}>
                  {!logo_text && logo && (
                     <Box
                        sx={{
                           display: { xs: "none", md: "flex" }
                        }}
                        // @ts-ignore
                        component={NextLink}
                        href='/'>
                        <Image
                           src={logo}
                           alt='logo'
                           sx={{
                              width: {
                                 xs: logoData?.xs_width ?? "auto",
                                 sm: logoData?.sm_width ?? "auto",
                                 md: logoData?.md_width ?? "auto"
                              }
                           }}
                        />
                     </Box>
                  )}
                  {logo_text && (
                     <Box
                        sx={{
                           display: { xs: "none", md: "flex" },
                           textDecoration: "none"
                        }}
                        // @ts-ignore
                        component={NextLink}
                        href='/'>
                        <Typography
                           variant='h3'
                           component={"p"}
                           sx={{
                              fontSize: 34,
                              textDecoration: "none",
                              color: theme.palette.primary.main
                           }}>
                           {logo_text}
                        </Typography>
                     </Box>
                  )}
                  {/* mobile menu  */}
                  <Box sx={{ flex: "none", display: { xs: "flex", md: "none" } }}>
                     <IconButton
                        size='large'
                        aria-label='account of current user'
                        aria-controls='menu-appbar'
                        aria-haspopup='true'
                        onClick={handleOpenNavMenu}
                        sx={{ color: (theme) => (show ? theme.palette.primary.main : theme.palette.text.primary) }}>
                        <MenuIcon />
                     </IconButton>
                     <MobileNav
                        changeDirection={changeDirection}
                        changeLang={changeLang}
                        lang={language}
                        open={show}
                        setOpen={setShow}
                        headerData={block}
                        listLocalesData={listLocalesData}
                     />
                  </Box>
                  {!logo_text && logo && (
                     <Box
                        component={NextLink}
                        href='/'
                        sx={{
                           display: { xs: "flex", md: "none" },
                           flexGrow: 1,
                           justifyContent: "center"
                        }}>
                        <Image
                           src={logo}
                           alt='logo'
                           sx={{
                              width: {
                                 xs: logoData?.xs_width ?? "auto",
                                 sm: logoData?.sm_width ?? "auto",
                                 md: logoData?.md_width ?? "auto"
                              }
                           }}
                        />
                     </Box>
                  )}
                  {logo_text && (
                     <Box
                        sx={{
                           display: { xs: "flex", md: "none" },
                           flexGrow: 1,
                           justifyContent: "center",
                           textDecoration: "none"
                        }}
                        // @ts-ignore
                        component={NextLink}
                        href='/'>
                        <Typography
                           variant='h3'
                           component={"p"}
                           sx={{
                              fontSize: { xs: 24, sm: 30, md: 34 },
                              textDecoration: "none",
                              color: theme.palette.primary.main
                           }}>
                           {logo_text}
                        </Typography>
                     </Box>
                  )}
               </Box>
               {/* desktop main-menu  */}
               {!hide_menu && <DesktopNav main_menu={main_menu} color={color} />}

               {show_search && <NavSearch language={language} />}

               {/* side-items (lang, theme-mode, login buttons)  */}
               <SideItems block={block} language={language} userData={userData} listLocalesData={listLocalesData} />
            </Toolbar>
         </Container>
      </AppBar>
   )
}

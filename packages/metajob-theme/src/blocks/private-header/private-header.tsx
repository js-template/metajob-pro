"use client"
import { Box, useMediaQuery } from "@mui/material"
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import MuiDrawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import { CSSObject, Theme, styled, useTheme } from "@mui/material/styles"
import React, { useEffect } from "react"
import NavItems from "./nav-items"
import toast from "react-hot-toast"
import { IPrivateHeaderProps } from "./types"
import CustomAppBar from "./app-bar"
import MobileNav from "./mobile-nav"
import { signOut, useSession } from "next-auth/react"
import { useChangeDirection, useChangeLang } from "./utils"

const drawerWidth = 260

const openedMixin = (theme: Theme): CSSObject => ({
   width: drawerWidth,
   marginTop: "73px",
   height: "calc(100% - 75px)",
   transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
   }),
   overflowX: "hidden"
})

const closedMixin = (theme: Theme): CSSObject => ({
   transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
   }),
   overflowX: "hidden",
   width: `0px`
})

const Drawer = styled(MuiDrawer, {
   shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
   flexShrink: 0,
   whiteSpace: "nowrap",
   boxSizing: "border-box",
   mt: 10,
   ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme)
   }),
   ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme)
   })
}))

export const DrawerHeader: React.FC = styled("div")(({ theme }) => ({
   display: "flex",
   alignItems: "center",
   justifyContent: "space-between",
   padding: theme.spacing(0, 5),
   // necessary for content to be below app bar
   ...theme.mixins.toolbar
}))

export const PrivateHeaderComponent = ({ block, language = "en" }: IPrivateHeaderProps) => {
   const { data: session } = useSession()
   const userRle = session?.user?.role?.type
   const theme = useTheme()
   const isTablet = useMediaQuery(theme.breakpoints.down("md"))

   const { changeLang } = useChangeLang()
   const { changeDirection } = useChangeDirection()

   const {
      main_menu,
      side_menu,
      profile_menu: user_menu,
      language: langMenu,
      light_logo,
      dark_logo,
      dark_mode,
      notification
   } = block || {}

   const [loading, setLoading] = React.useState(false)
   const [open, setOpen] = React.useState(true)
   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

   const candidateMenu = side_menu?.filter((menu) => menu?.identifier !== "employer")
   const employerMenu = side_menu?.filter((menu) => menu?.identifier !== "candidate")
   const sidebarMenu = userRle === "candidate" ? candidateMenu : userRle === "employer" ? employerMenu : side_menu

   useEffect(() => {
      if (isTablet) {
         setOpen(false)
      } else {
         setOpen(true)
      }
   }, [isTablet])

   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget)
   }

   const handleCloseUserMenu = () => {
      setAnchorElUser(null)
   }

   const handleDrawerOpen = () => {
      setOpen(true)
   }

   const LogOutHandler = async () => {
      setLoading(true)
      await signOut().then(() => {
         toast.success("Logout successfully", {
            duration: 5000
         })
         setLoading(false)
      })

      // await signOut().then(() => {
      //    SignOut().then(() => {
      //       toast.success("Logout successfully", {
      //          duration: 5000
      //       })
      //       setLoading(false)
      //    })
      // })
   }

   return (
      <Box sx={{ display: "flex" }}>
         {/* main nav */}
         <CustomAppBar
            open={open}
            handleDrawerOpen={handleDrawerOpen}
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
            anchorElUser={anchorElUser}
            headerData={block}
            lang={language}
         />
         {/* Mobile main nav  */}
         {isTablet && <MobileNav open={open} setOpen={setOpen} headerData={block} lang={language} />}
         {/* Desktop side nav */}
         {!isTablet && (
            <Drawer anchor={theme.direction === "rtl" ? "right" : "left"} variant='permanent' open={open}>
               <List sx={{ py: 2, px: 1.5 }}>{NavItems(sidebarMenu, open, theme.direction as any, signOut)}</List>
            </Drawer>
         )}
      </Box>
   )
}

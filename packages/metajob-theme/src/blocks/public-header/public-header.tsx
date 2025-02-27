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
   Avatar,
   Stack,
   Tooltip,
   useTheme,
   Theme,
   styled,
   useMediaQuery
} from "@mui/material"
import CIcon from "../../components/common/icon"
import { MenuItemProps, IPublicHeaderBlock } from "./types"
import { useTheme as modeUseTheme } from "next-themes"
import { getLanguageValue } from "../../utils"
import MobileNav from "./mobile-nav"
import { useChangeDirection, useChangeLang } from "./utils"

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
}

export const PublicHeaderComponent = ({ block, language, userData }: Props) => {
   const theme = useTheme()
   const router = useRouter()
   const { data: session, status } = useSession()
   const isTablet = useMediaQuery(theme.breakpoints.down("sm"))

   const { changeLang } = useChangeLang()
   const { changeDirection } = useChangeDirection()

   const {
      main_menu,
      profile_menu: user_menu,
      language: langMenu,
      light_logo,
      dark_logo,
      button: menuButton,
      dark_mode,
      notification
   } = block || {}
   const { theme: mode, setTheme } = modeUseTheme()
   const toggleTheme = () => {
      setTheme(mode === "dark" ? "light" : "dark")
   }
   const logoData = mode === "light" ? light_logo : dark_logo || {}
   const logo = logoData?.logo?.url || ""

   const [loading, setLoading] = useState(false)
   const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
   // language-menu state
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const openLang = Boolean(anchorEl)
   // mobile-menu state
   const [show, setShow] = useState(false)
   // submenu state
   const [anchorElSub, setAnchorElSub] = useState<null | HTMLElement>(null)
   const [activeMenu, setActiveMenu] = useState<number | null>(null)

   //===start submenu functions
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

   const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }

   const handleOpenNavMenu = () => {
      setShow(true)
   }
   const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
      if (user_menu && user_menu.length > 0) {
         setAnchorElUser(event.currentTarget)
      } else {
         router.push("/dashboard")
      }
   }

   const handleCloseUserMenu = () => {
      setAnchorElUser(null)
   }

   const LogOutHandler = async () => {
      setLoading(true)
      await signOut()
   }

   // get user avatar data
   const userAvatar = userData?.avatar?.url || ""
   const userName = session?.user?.name || ""

   const handleMouseLeaveMenu = (event: React.MouseEvent<HTMLElement>) => {
      const relatedTarget = event.relatedTarget as HTMLElement

      // Only close if the mouse isn't moving to the button
      if (!relatedTarget || !relatedTarget?.closest("button")) {
         setAnchorEl(null)
         setActiveMenu(null)
      }
   }

   return (
      <AppBar
         position='static'
         sx={{
            backgroundColor: "background.paper",
            py: "6px",
            backgroundImage: "none"
         }}
         //elevation={4}
      >
         <Container maxWidth='lg' sx={{ width: "100%" }}>
            <Toolbar
               disableGutters
               sx={{
                  justifyContent: "space-between"
               }}>
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: 1
                  }}>
                  {logo && (
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
                     />
                  </Box>
                  {logo && (
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
                                 xs: light_logo?.xs_width ?? "auto",
                                 sm: light_logo?.sm_width ?? "auto",
                                 md: light_logo?.md_width ?? "auto"
                              }
                           }}
                        />
                     </Box>
                  )}
               </Box>
               {/* desktop main-menu  */}
               <Box
                  sx={{
                     flexGrow: 1,
                     display: { xs: "none", md: "flex" },
                     justifyContent: "center"
                  }}>
                  <Stack direction={"row"} gap={3}>
                     {main_menu &&
                        main_menu?.map((item: MenuItemProps, index: number) => (
                           <Box key={index} sx={{ position: "relative" }}>
                              {/* Main Menu Item */}
                              <Typography
                                 // onMouseEnter={(event) => item?.child?.length && handleSubMenuOpen(event, index)}
                                 onClick={(event: any) => item?.child?.length && handleSubMenuOpen(event, index)}
                                 component={item?.child && item?.child?.length > 0 ? "div" : NextLink}
                                 href={item?.child && item?.child?.length > 0 ? undefined : (item?.link ?? "/")}
                                 target={item?.child && item?.child?.length > 0 ? undefined : (item?.target ?? "_self")}
                                 sx={{
                                    textDecoration: "none",
                                    fontSize: 16,
                                    fontWeight: 500,
                                    "&:hover": { color: "primary.main" },
                                    color: (theme: Theme) => theme.palette.text.primary,
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer"
                                 }}>
                                 {item?.label ?? "No title"}
                                 {item?.child && item?.child?.length > 0 && (
                                    <CIcon
                                       icon='ri:arrow-down-s-line'
                                       sx={{
                                          color: theme.palette.text.secondary,
                                          transform:
                                             anchorElSub && activeMenu === index ? "rotate(180deg)" : "rotate(0deg)",
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
                                    anchorEl={anchorEl}
                                    open={activeMenu === index}
                                    onClose={handleSubMenuClose} // Close menu if focus lost
                                    MenuListProps={{
                                       onMouseLeave: handleMouseLeaveMenu // Close when mouse leaves the menu
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
               <Box sx={{ flexGrow: 0 }}>
                  {/* loader  */}
                  {status === "loading" && <LoadingButton loading variant='text'></LoadingButton>}
                  {/* before login  */}
                  {status === "unauthenticated" && (
                     <Stack direction={"row"} gap={1.5}>
                        {/* language-theme buttons  */}
                        {!isTablet && (
                           <>
                              {/* language-button  */}
                              {langMenu && langMenu?.length > 1 && (
                                 <Box>
                                    <Button
                                       id='basic-button'
                                       aria-controls={openLang ? "basic-menu" : undefined}
                                       aria-haspopup='true'
                                       aria-expanded={openLang ? "true" : undefined}
                                       color='inherit'
                                       variant='text'
                                       onClick={handleClick}
                                       sx={{
                                          textTransform: "capitalize",
                                          px: 0,
                                          display: "flex",
                                          fontSize: "1rem",
                                          gap: 1,
                                          color: theme.palette.text.primary
                                       }}>
                                       <CIcon
                                          icon='tabler:language'
                                          sx={{
                                             fontSize: "1.25rem"
                                          }}
                                       />
                                       <CIcon
                                          icon='ri:arrow-down-s-line'
                                          sx={{
                                             color: theme.palette.text.primary,
                                             transform: openLang ? "rotate(180deg)" : "rotate(0deg)",
                                             transition: theme.transitions.create("transform", {
                                                duration: theme.transitions.duration.shortest
                                             })
                                          }}
                                       />
                                    </Button>
                                    <Menu
                                       id='basic-menu'
                                       anchorEl={anchorEl}
                                       open={openLang}
                                       onClose={handleClose}
                                       MenuListProps={{
                                          "aria-labelledby": "basic-button"
                                       }}>
                                       {_.map(langMenu, (lang: MenuItemProps, index: number) => (
                                          <MenuItem
                                             onClick={() => {
                                                if (lang?.link === "ar") {
                                                   if (changeDirection) {
                                                      changeDirection("rtl")
                                                   }
                                                   changeLang(lang?.link ?? "")
                                                   window.location.reload()
                                                } else if (lang?.link === "en" || lang?.link === "es") {
                                                   if (changeDirection) {
                                                      changeDirection("ltr")
                                                   }
                                                   changeLang(lang?.link ?? "")
                                                   window.location.reload()
                                                }
                                                handleClose()
                                             }}
                                             sx={{
                                                color: theme.palette.text.primary,
                                                px: 2,
                                                gap: 1.5,
                                                textAlign: "left",
                                                ":hover": {
                                                   background: theme.palette.background.default,
                                                   color: theme.palette.primary.main
                                                }
                                             }}
                                             key={index}>
                                             {lang?.link && (
                                                <CIcon
                                                   icon={lang?.link}
                                                   size={22}
                                                   sx={{ color: theme.palette.text.primary + "60" }}
                                                />
                                             )}
                                             {lang?.label ?? "English"}
                                          </MenuItem>
                                       ))}
                                    </Menu>
                                 </Box>
                              )}
                              {/* theme-button  */}
                              {dark_mode && (
                                 <IconButton
                                    sx={{ ml: 1, color: (theme) => theme.palette.text.primary }}
                                    onClick={toggleTheme}>
                                    <CIcon icon={mode === "light" ? "ri:moon-fill" : "ri:sun-fill"} />
                                 </IconButton>
                              )}
                           </>
                        )}
                        {/* button (Ex: login/register) */}
                        {menuButton &&
                           menuButton?.map((button: MenuItemProps, index: number) => (
                              <Button
                                 key={index}
                                 size='small'
                                 sx={{
                                    py: 1
                                 }}
                                 variant='contained'
                                 component={NextLink}
                                 href={button?.link}
                                 target={button?.target ?? "_self"}>
                                 {button?.label}
                              </Button>
                           ))}
                     </Stack>
                  )}
                  {/* after login  */}
                  {status === "authenticated" && session?.user && (
                     <Fragment>
                        <Stack direction='row' gap={1.5} alignItems={"center"}>
                           {/* <CIcon icon='iconamoon:search-light' color='text.disabled' />
                             <CIcon icon='carbon:notification-new' color='text.disabled' /> */}
                           {!isTablet && (
                              <>
                                 {/* language-button  */}
                                 {langMenu && langMenu.length > 1 && (
                                    <Box>
                                       <Button
                                          id='basic-button'
                                          aria-controls={openLang ? "basic-menu" : undefined}
                                          aria-haspopup='true'
                                          aria-expanded={openLang ? "true" : undefined}
                                          color='inherit'
                                          variant='text'
                                          onClick={handleClick}
                                          sx={{
                                             textTransform: "capitalize",
                                             display: "flex",
                                             fontSize: "1rem",
                                             gap: 1,
                                             color: theme.palette.text.primary
                                          }}>
                                          <CIcon
                                             icon='tabler:language'
                                             sx={{
                                                fontSize: "1.25rem"
                                             }}
                                          />
                                          {getLanguageValue(language as any) || "English"}
                                          <CIcon
                                             icon='ri:arrow-down-s-line'
                                             sx={{
                                                color: theme.palette.text.primary,
                                                transform: openLang ? "rotate(180deg)" : "rotate(0deg)",
                                                transition: theme.transitions.create("transform", {
                                                   duration: theme.transitions.duration.shortest
                                                })
                                             }}
                                          />
                                       </Button>
                                       <Menu
                                          id='basic-menu'
                                          anchorEl={anchorEl}
                                          open={openLang}
                                          onClose={handleClose}
                                          MenuListProps={{
                                             "aria-labelledby": "basic-button"
                                          }}>
                                          {_.map(langMenu, (lang, index) => (
                                             <MenuItem
                                                onClick={() => {
                                                   if (lang?.link === "ar") {
                                                      if (changeDirection) {
                                                         changeDirection("rtl")
                                                      }
                                                      changeLang(lang?.link)
                                                      window.location.reload()
                                                   } else if (lang?.link === "en" || lang?.link === "es") {
                                                      if (changeDirection) {
                                                         changeDirection("ltr")
                                                      }
                                                      changeLang(lang?.link)
                                                      window.location.reload()
                                                   }
                                                   handleClose()
                                                }}
                                                sx={{
                                                   color: theme.palette.text.primary,
                                                   px: 2,
                                                   gap: 1.5,
                                                   textAlign: "left",
                                                   ":hover": {
                                                      background: theme.palette.background.default,
                                                      color: theme.palette.primary.main
                                                   }
                                                }}
                                                key={index}>
                                                {lang?.link && (
                                                   <CIcon
                                                      icon={lang?.link}
                                                      size={22}
                                                      sx={{ color: theme.palette.text.primary + "60" }}
                                                   />
                                                )}
                                                {lang?.label ?? "English"}
                                             </MenuItem>
                                          ))}
                                       </Menu>
                                    </Box>
                                 )}

                                 {dark_mode && (
                                    <IconButton
                                       sx={{ ml: 1, color: (theme) => theme.palette.text.primary }}
                                       onClick={toggleTheme}>
                                       <CIcon icon={mode === "light" ? "ri:moon-fill" : "ri:sun-fill"} />
                                    </IconButton>
                                 )}
                              </>
                           )}
                           {/* notification-button  */}
                           {/* {notification && (
                              <IconButton size='large' color='inherit'>
                                 <CIcon icon='tabler:bell' />
                              </IconButton>
                           )} */}
                           {/* user-avatar  */}
                           <Stack direction='row' gap={1} alignItems={"center"}>
                              <Tooltip title='Open settings'>
                                 <Box
                                    {...(user_menu && user_menu.length > 0
                                       ? { onClick: handleOpenUserMenu }
                                       : {
                                            component: NextLink,
                                            href: "/dashboard",
                                            target: "_self"
                                         })}
                                    sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}>
                                    <IconButton sx={{ p: 0 }}>
                                       <Avatar
                                          src={userAvatar ?? "https://placehold.co/40"}
                                          alt={userName ?? "user-avatar"}
                                          sx={{
                                             width: 40,
                                             height: 40
                                          }}>
                                          {userName?.charAt(0) || ""}
                                       </Avatar>
                                    </IconButton>
                                    {/* drop-menu-indicator icon  */}
                                    {user_menu && user_menu.length > 0 && (
                                       <Box
                                          sx={{
                                             display: "flex",
                                             alignItems: "flex-start",
                                             flexDirection: "column",
                                             maxWidth: "164px"
                                          }}>
                                          <Box
                                             sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                width: "100%",
                                                justifyContent: "space-between"
                                             }}>
                                             {anchorElUser ? (
                                                <CIcon
                                                   icon={"solar:round-alt-arrow-up-outline"}
                                                   sx={{
                                                      color: theme.palette.text.primary
                                                   }}
                                                   fontSize={"24px"}
                                                />
                                             ) : (
                                                <CIcon
                                                   icon={"solar:round-alt-arrow-down-outline"}
                                                   sx={{
                                                      color: theme.palette.text.primary
                                                   }}
                                                   fontSize={"24px"}
                                                />
                                             )}
                                          </Box>
                                       </Box>
                                    )}
                                 </Box>
                              </Tooltip>
                           </Stack>
                        </Stack>
                        {/* dropdown-menu  */}
                        {user_menu && user_menu.length > 0 && (
                           <Menu
                              sx={{
                                 mt: "58px",
                                 "& .MuiPaper-root": {
                                    minWidth: "180px",
                                    border: "1px solid",
                                    borderColor: theme.palette.divider,
                                    borderRadius: "6px",
                                    background: theme.palette.background.default,
                                    boxShadow: "0px 8px 28px -4px rgba(20, 28, 46, 0.08)"
                                 }
                              }}
                              id='menu-appbar'
                              anchorEl={anchorElUser}
                              anchorOrigin={{
                                 vertical: "top",
                                 horizontal: "right"
                              }}
                              keepMounted
                              transformOrigin={{
                                 vertical: "top",
                                 horizontal: "right"
                              }}
                              open={Boolean(anchorElUser)}
                              onClose={handleCloseUserMenu}>
                              {_.map(user_menu, (setting: MenuItemProps, index) => (
                                 <MenuItem
                                    key={index}
                                    onClick={() => {
                                       if (setting?.label === "Logout") {
                                          LogOutHandler()
                                       } else {
                                          handleCloseUserMenu()
                                       }
                                    }}
                                    component={setting?.label === "Logout" ? "div" : NextLink}
                                    href={setting?.label === "Logout" ? undefined : setting?.link}
                                    target={setting?.label === "Logout" ? undefined : (setting?.target ?? "_self")}
                                    sx={{
                                       gap: 1,
                                       color: theme.palette.text.primary,
                                       ":hover": {
                                          background:
                                             setting?.label === "Logout"
                                                ? theme.palette.error.light
                                                : theme.palette.background.default,
                                          color:
                                             setting?.label === "Logout"
                                                ? theme.palette.text.primary
                                                : theme.palette.primary.main,
                                          "& .user-menu-icon": {
                                             color:
                                                setting?.label === "Logout"
                                                   ? theme.palette.text.primary
                                                   : theme.palette.primary.main
                                          }
                                       }
                                    }}>
                                    {setting?.icon && (
                                       <CIcon
                                          className='user-menu-icon'
                                          icon={setting?.icon}
                                          sx={{
                                             color: theme.palette.text.primary + "60"
                                          }}
                                       />
                                    )}
                                    <Typography variant='body1'>{setting?.label}</Typography>
                                 </MenuItem>
                              ))}
                           </Menu>
                        )}
                     </Fragment>
                  )}
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   )
}

"use client"
import { Fragment, useState, MouseEvent } from "react"
import NextLink from "next/link"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import _ from "lodash"
import { LoadingButton } from "@mui/lab"
import {
   Button,
   Menu,
   MenuItem,
   Typography,
   IconButton,
   Box,
   Avatar,
   Stack,
   Tooltip,
   useTheme,
   useMediaQuery
} from "@mui/material"
import CIcon from "../../components/common/icon"
import { MenuItemProps, IPublicHeaderBlock, IListLocalesData } from "./types"
import { useTheme as modeUseTheme } from "next-themes"
import { getLanguageValue } from "../../utils"
import { useChangeDirection, useChangeLang } from "./utils"

type Props = {
   block: IPublicHeaderBlock
   language?: string
   listLocalesData: IListLocalesData[]
   userData?: {
      id: number
      avatar?: {
         url: string
      }
   }
}

const SideItems = ({ block, language, userData, listLocalesData }: Props) => {
   const theme = useTheme()
   const { theme: mode, setTheme } = modeUseTheme()
   const router = useRouter()
   const { data: session, status } = useSession()
   const isTablet = useMediaQuery(theme.breakpoints.down("sm"))

   const { profile_menu: user_menu, language: langMenu, button: menuButton, dark_mode, style } = block || {}
   const {
      backgroundColor,
      color,
      secondary_color,
      header_color,
      sub_header_color,
      section_padding,
      header_width,
      desktop,
      tab,
      mobile
   } = style || {}

   const { changeLang } = useChangeLang()
   const { changeDirection } = useChangeDirection()

   const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
   const [loading, setLoading] = useState(false)
   // language-menu state
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const openLang = Boolean(anchorEl)

   const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }

   const toggleTheme = () => {
      setTheme(mode === "dark" ? "light" : "dark")
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

   return (
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
                              // color='inherit'
                              variant='text'
                              onClick={handleClick}
                              sx={{
                                 textTransform: "capitalize",
                                 px: 0,
                                 display: "flex",
                                 fontSize: "1rem",
                                 gap: 1,
                                 color:
                                    mode === "light" ? color || theme.palette.text.primary : theme.palette.text.primary
                              }}>
                              <CIcon
                                 icon='ion:globe-outline'
                                 sx={{
                                    color: "inherit",
                                    // mode === "light"
                                    //    ? color || theme.palette.text.primary
                                    //    : theme.palette.text.primary,
                                    fontSize: "1.25rem",
                                    px: 0.75
                                 }}
                              />
                              {getLanguageValue(language as any, listLocalesData) || "English"}
                              <CIcon
                                 icon='ri:arrow-down-s-line'
                                 sx={{
                                    color: "inherit",
                                    px: 0.25,
                                    // mode === "light"
                                    //    ? color || theme.palette.text.primary
                                    //    : theme.palette.text.primary,
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
                                       } else {
                                          if (changeDirection) {
                                             changeDirection("ltr")
                                          }
                                          changeLang(lang?.link ?? "")
                                          window.location.reload()
                                       }
                                       handleClose()
                                    }}
                                    sx={{
                                       color:
                                          mode === "light"
                                             ? color || theme.palette.text.primary
                                             : theme.palette.text.primary,
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
                                          sx={{
                                             color:
                                                mode === "light"
                                                   ? color || theme.palette.text.primary
                                                   : theme.palette.text.primary + "60"
                                          }}
                                       />
                                    )}
                                    {lang?.label ?? "English"}
                                 </MenuItem>
                              ))}
                           </Menu>
                        </Box>
                     )}
                  </>
               )}
               {/* theme-button  */}
               {dark_mode && (
                  <IconButton
                     sx={{
                        ml: 1,
                        width: 40,
                        height: 40,
                        padding: 1,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: mode === "light" ? color || theme.palette.text.secondary : theme.palette.text.secondary,
                        backgroundColor: "transparent",
                        "&:hover": {
                           backgroundColor: theme.palette.action.hover
                        }
                     }}
                     onClick={toggleTheme}>
                     <CIcon
                        icon={mode === "light" ? "ri:moon-fill" : "ri:sun-fill"}
                        sx={{
                           color:
                              mode === "light" ? color || theme.palette.text.secondary : theme.palette.text.secondary
                        }}
                     />
                  </IconButton>
               )}
               {/* button (Ex: login/register) */}
               {!isTablet &&
                  menuButton &&
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
               {isTablet &&
                  menuButton &&
                  menuButton?.slice(0, 1)?.map((button: MenuItemProps, index: number) => (
                     <Button
                        key={index}
                        size='small'
                        sx={{
                           py: 0.5,
                           px: 1.5,
                           fontSize: 15
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
                                    icon='ion:globe-outline'
                                    sx={{
                                       fontSize: "1.25rem"
                                    }}
                                 />
                                 {getLanguageValue(language as any, listLocalesData) || "English"}
                                 <CIcon
                                    icon='ri:arrow-down-s-line'
                                    sx={{
                                       color: "inherit",
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
                                          } else {
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
                     </>
                  )}
                  {dark_mode && (
                     <IconButton sx={{ ml: 1, color: (theme) => theme.palette.text.primary }} onClick={toggleTheme}>
                        <CIcon icon={mode === "light" ? "ri:moon-fill" : "ri:sun-fill"} />
                     </IconButton>
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
                              if (setting?.identifier === "logout") {
                                 LogOutHandler()
                              } else {
                                 handleCloseUserMenu()
                              }
                           }}
                           component={setting?.identifier === "logout" ? "div" : NextLink}
                           href={setting?.identifier === "logout" ? undefined : setting?.link}
                           target={setting?.identifier === "logout" ? undefined : (setting?.target ?? "_self")}
                           sx={{
                              gap: 1,
                              color: theme.palette.text.primary,
                              ":hover": {
                                 background:
                                    setting?.identifier === "logout"
                                       ? theme.palette.error.light
                                       : theme.palette.background.default,
                                 color:
                                    setting?.identifier === "logout"
                                       ? theme.palette.text.primary
                                       : theme.palette.primary.main,
                                 "& .user-menu-icon": {
                                    color:
                                       setting?.identifier === "logout"
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
   )
}

export default SideItems

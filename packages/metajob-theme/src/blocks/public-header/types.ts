export type IPublicHeaderBlock = {
   id: number
   __component: string
   dark_mode: boolean
   notification: boolean
   light_logo: {
      id: number
      link: string
      logo: {
         url: string
      }
      xs_width: number
      sm_width: number
      md_width: number
   }
   dark_logo: {
      id: number
      link: string
      logo: {
         url: string
      }
      xs_width: number
      sm_width: number
      md_width: number
   }
   main_menu: MenuItemProps[]
   language: MenuItemProps[]
   profile_menu: MenuItemProps[]
   button: ButtonItemProps[]
}

export type MenuItemProps = {
   id: number
   label: string
   link: string
   type: string | null
   target: string | null
   icon: string
   identifier?: string
   disabled: boolean
   child?: MenuItemProps[]
}

export type ButtonItemProps = {
   id: number
   label: string
   link: string
   type: string | null
   target: string | null
   icon: string
   disabled: boolean
}

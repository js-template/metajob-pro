export type IPrivateHeaderProps = {
   block: IPrivateHeaderBlock
   language?: string
}

export type IPrivateHeaderBlock = {
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
   side_menu: MenuItemProps[]
   profile_menu: MenuItemProps[]
   language: MenuItemProps[]
}

export type MenuItemProps = {
   id: number
   label: string
   link: string
   identifier?: string
   type: string | null
   target: string | null
   icon: string
   disabled: boolean
   child: MenuItemProps[]
}

export type IPublicHeaderBlock = {
   id: number
   __component: string
   dark_mode: boolean
   notification: boolean
   hide_menu: boolean
   show_search: boolean
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
   logo_text?: string
   main_menu: MenuItemProps[]
   language: MenuItemProps[]
   profile_menu: MenuItemProps[]
   button: ButtonItemProps[]
   style?: {
      color?: any
      secondary_color?: string
      backgroundColor?: any
      header_bg_color?: any
      mobile: number
      tab: number
      desktop: number
      bg_overlay?: number
      header_color?: string
      sub_header_color: string
      header_width: "Full" | "Small"
      section_padding?: number
      sidebar?: "Left Sidebar" | "Right Sidebar" | "No Sidebar"
   }
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

export type IListLocalesData = {
   id: number
   documentId: string
   name: string
   code: string | null
   isDefault: boolean
}

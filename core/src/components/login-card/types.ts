export type ILoginBLock = {
   title?: string
   email_placeholder?: string
   password_placeholder?: string
   required_placeholder?: string
   button_placeholder?: string
   or_placeholder?: string
   signup_link_placeholder?: string
   provider_option?: boolean
   signup_helper_placeholder?: string
   styles?: {
      color?: any
      secondary_color?: string
      backgroundColor?: any
      mobile: number
      tab: number
      desktop: number
      bg_overlay?: number
      header_color?: string
      sub_header_color: string
      header_width: "Full" | "Small"
      section_padding?: number
   }
} | null

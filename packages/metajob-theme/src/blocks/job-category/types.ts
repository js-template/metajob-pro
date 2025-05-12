export type ICategoryCardBlock = {
   id: number
   __component: string
   style?: {
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
   icon_type?: "Icon Bg" | "Simple"
   show_description?: boolean
   empty?: {
      id: number
      title: string
      description: string
   }
   button?: {
      label: string
      link: string
   }
   card_button?: {
      label: string
      link: string
   }
   content?: {
      sub_title: string
      title: string
      variation?: string
   }
   item_count?: number
}

export type ISingleCategory = {
   id: number
   documentId: string
   title: string
   slug: string
   description: any[]
   short_description: string
   excerpt: string
   createdAt: string
   updatedAt: string
   publishedAt: string
   icon?: string
   image: {
      url: string
   }
}

export type ICategories = ISingleCategory[]

type UserRole = {
   id: number
   name: string
   description: string
   type: string
   createdAt: Date
   updatedAt: Date
}

type User = {
   name: string
   email: string
   id: string
   role: UserRole
   username: string
   provider: string
   confirmed: boolean
   blocked: boolean
   createdAt: Date
   updatedAt: Date
   jwtToken: string
   membership: string | null
}

export type IUserSession = {
   user: User
   expires: Date
}

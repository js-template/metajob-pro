export type ICategoryOverlayCardBlock = {
   id: number
   __component: string
   style?: {
      id: 25
      color?: any
      backgroundColor?: any
      mobile: number
      tab: number
      desktop: number
   }
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
      title_color?: string
      sub_title_color?: string
      variation?: string
   }
   item_count?: number
   show_icon: boolean
   overlay: boolean
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
   image: {
      url: string
   }
   icon?: {
      url: string
   }
   totalCount?: number
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

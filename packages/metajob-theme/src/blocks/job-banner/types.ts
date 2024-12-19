export type IBannerBlock = {
   id: number
   __component: string
   content?: {
      sub_title: string
      title: string
      variation?: string
   }
   search: {
      search_placeholder: string
      location_placeholder: string
      category_placeholder: string
      button_placeholder: string
   }
   image?: {
      url: string
   }
}

export type ICategory = {
   title: string
}

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

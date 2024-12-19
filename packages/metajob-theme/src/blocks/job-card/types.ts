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

export type IJobCardBlock = {
   id: number
   __component: "block.job-card"
   content?: {
      sub_title: string
      title: string
      variation: string
   }
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
      target: string
      disabled: boolean
   }
}
export type ISingleJob = {
   id: number
   documentId: string
   title: string
   description: string
   endDate: Date
   price: number
   location: any //this filed will be update after location map adding
   publishedAt: string // Consider using Date
   type: { title: string }
   vacancy: number
   slug: string
   salary: string
   is_featured: boolean
   company: {
      name: string
      logo: {
         url?: string
      }
   }
}

export type IJobs = ISingleJob[]

export type ICompanyDetailsBlock = {
   title?: string
   open_jobs?: boolean
   empty?: {
      title: string
      description: string
   }
}

export type ISingleCompany = {
   id: number
   documentId: string
   name: string
   tagline: string
   email: string
   phone: string
   website: string
   slug: string
   about: string
   createdAt: Date
   updatedAt: Date
   publishedAt: Date
   industry: {
      id: number
      documentId: string
      title: string
      description: string
      slug: string
   }
   company_size: {
      title: string
      value: string
   }
   revenue: {
      title: string
      value: string
   }
   avg_salary: {
      title: string
      value: string
   }
   logo: {
      url: string
   }
   social_links: [
      {
         link: string
         type: string
      }
   ]
   owner: {
      id: number
      documentId: string
      username: string
      email: string
   }
   location?: any //this will be updated
   //    location: {
   //       lat: number | null
   //       lng: number | null
   //       place_id: string
   //       address: string
   //    }
}

export type ISingleJob = {
   id: number
   documentId: string
   title: string
   description: string
   status?: "open" | "closed" | "draft"
   type: {
      title: string
      value: string
   }
   slug: string
   skills?: {
      title: string
      value: string
   }[]
   price: number
   vacancy: number
   startDate: Date
   endDate: Date
   publishedAt: Date
   createdAt: Date
   updatedAt: Date
   location: {
      address: string
   }
   category: {
      id: 2
      documentId: string
      title: string
      description: string
      slug: string
   }
   company: {
      id: number
      documentId: string
      name: string
      tagline: string
      email: string
      phone: string
      website: string
      slug: string
      about: string
      logo: {
         url: string
      }
   }
   owner: {
      documentId: string
      email: string
      id: number
   }
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

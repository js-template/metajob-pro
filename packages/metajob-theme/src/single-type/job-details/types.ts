export type IJobDetailsBlock = {
   title?: string
   share_placeholder?: string
   skill_placeholder?: string
   apply_placeholder?: string
   overview_placeholder?: string
   posted_placeholder?: string
   deadline_placeholder?: string
   type_placeholder?: string
   salary_placeholder?: string
   related_jobs_title?: string
   related_jobs_subtitle?: string
   card_button?: {
      label?: string
   }
   related_lists?: boolean
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
   logo: {
      url: string
   }
   social_links: [
      {
         link: string
         type: string
      }
   ]
}

export type ISingleJob = {
   id: number
   documentId: string
   title: string
   description: string
   job_status?: "open" | "closed" | "draft"
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

export type ICandidateFilterBlock = {
   id: number
   __component: string
   title: string
   result_placeholder?: string
   card_button?: {
      label?: string
   }
   search: {
      title?: string
      search_placeholder?: string
      category_placeholder?: string
      button_placeholder?: string
   }
   empty?: {
      title: string
      description: string
   }
   style?: {
      color?: any
      backgroundColor?: any
      mobile: number
      tab: number
      desktop: number
   }
   sidebar?: "Left Sidebar" | "Right Sidebar" | "No Sidebar"
}

export type ISingleCandidate = {
   id: 2
   documentId: string
   name: string
   tagline: string
   about: string
   description: string
   showProfile: "Show" | "Hide"
   language: string
   slug: string
   createdAt: Date
   updatedAt: Date
   publishedAt: Date
   category: {
      id: number
      documentId: string
      title: string
      description: string
      slug: string
   }
   education: {
      id: number
      title: string
      description: string
      startDate: Date
      endDate: Date
      institution: string
   }[]
   experience: {
      id: number
      title: string
      description: string
      startDate: Date
      endDate: Date
      institution: string
   }[]
   portfolio: {
      id: number
      title: string
      description: string
   }[]
   salary: {
      title: string
      value: string
   }
   salary_type: {
      title: string
      value: string
   }
   experience_time: {
      title: string
      value: string
   }
   qualification: {
      title: string
      value: string
   }
   contact: {
      friendlyAddress: null //this field will be updated
      location: null
   }
   user: {
      id: number
      documentId: string
      username: string
      email: string
      avatar: {
         url: string
      }
   }
}

export type ICandidateFilterProps = {
   search: string
   skills: string
   categories: string
   rate: string
}

export type ISingleCategory = {
   id: number
   documentId: string
   title: string
}

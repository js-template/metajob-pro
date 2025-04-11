export type IResumeDetailsBlock = {
   title?: string
   open_placeholder?: string
   industry_placeholder?: string
   member_placeholder?: string
   about_placeholder?: string
   education_placeholder?: string
   experience_placeholder?: string
   portfolio_placeholder?: string
   show_header?: boolean
   empty?: {
      title: string
      description: string
   }
   styles?: {
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

export type ISingleResume = {
   id: number
   documentId: string
   description: string
   name: string
   tagline: string
   about: string
   show_profile: "Show" | "Hide"
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
      link: {
         link: string
         label: string
         type: string
         target: string
      }
      image?: {
         url: string
      }
   }[]
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

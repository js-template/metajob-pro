export type IBogFilterBlock = {
   id: number
   __component: string
   description?: string
   title?: string
   search_placeholder?: string
   card_button?: string
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
      sidebar?: "Left Sidebar" | "Right Sidebar" | "No Sidebar"
   }
   empty?: {
      id: number
      title: string
      description: string
   }
}

export type ISinglePost = {
   id: number
   documentId: string
   title: string
   slug: string
   excerpt: string
   description: any[]
   short_description: string
   createdAt: Date
   updatedAt: Date
   publishedAt: Date
   featuredImage: {
      url: string
   }
}

export type IPosts = ISinglePost[]

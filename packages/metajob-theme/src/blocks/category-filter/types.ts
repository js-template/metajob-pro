export type ICategoryFilterBlock = {
   id: number
   __component: string
   content?: {
      title?: string
      sub_title?: string
      variation: string
   }
   search_placeholder?: string
   card_button?: string
   icon_type?: "Icon Bg" | "Simple"
   show_description?: boolean
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
}

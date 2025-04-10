export type IPostBlock = {
   id: number
   __component: string
   content?: {
      sub_title: string
      title: string
      variation?: string
   }
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
      label?: string
   }
   description_color?: string
   item_count?: number
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

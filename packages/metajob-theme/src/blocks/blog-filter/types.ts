export type IBogFilterBlock = {
   id: number
   __component: string
   description?: string
   title?: string
   search_placeholder?: string
   card_button?: string
   description_color?: string
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

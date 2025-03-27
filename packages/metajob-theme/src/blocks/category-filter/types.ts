export type ICategoryFilterBlock = {
   id: number
   __component: string
   description?: string
   title?: string
   search_placeholder?: string
   card_button?: string
   style?: {
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

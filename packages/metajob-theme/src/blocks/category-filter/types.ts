export type ICategoryFilterBlock = {
   id: number
   __component: string
   content?: {
      title?: string
      sub_title?: string
      title_color?: string
      sub_title_color?: string
      variation: string
   }
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

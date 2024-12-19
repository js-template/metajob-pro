export type IPostBlock = {
   id: number
   __component: string
   content?: {
      sub_title: string
      title: string
      variation: string
   }
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
   button?: {
      label: string
      link: string
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

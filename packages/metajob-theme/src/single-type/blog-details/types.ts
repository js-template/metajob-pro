export type IBlogDetailsBlock = {
   title: string
   sidebar?: "Right Sidebar" | "Left Sidebar" | "Both Sidebar" | "No Sidebar"
}

export type ISinglePost = {
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
   featuredImage: {
      url: string
   }
   gallery: {
      data: null | any // Adjust this if the gallery structure changes
   }
   post_categories: {
      id?: number
      title: string
      slug: string
   }[]
   user: {
      id: number
      documentId: string
      email: string
      username: string
      avatar: {
         url: string
      }
   }
}

export type IBlogCategory = {
   id: number
   title: string
   slug: string
   image?: {
      data: any | null
   }
   posts: {
      count: number
   }
}

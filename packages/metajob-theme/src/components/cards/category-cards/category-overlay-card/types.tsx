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
   icon?: {
      url: string
   }
   total_count?: number
}

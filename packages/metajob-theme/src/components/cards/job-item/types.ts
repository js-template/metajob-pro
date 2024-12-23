export type ISingleJob = {
   id: number
   documentId: string
   title: string
   description: string
   endDate: Date
   price: number
   location: {
      address: string
   }
   publishedAt: Date
   type: { title: string }
   vacancy: number
   slug: string
   is_featured: boolean
   company: {
      name: string
      logo: {
         url: string
      }
   }
}

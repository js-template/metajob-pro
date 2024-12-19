export type IBookmarkItem = {
   id: number
   attributes: IBookmarkAttribute
}

export type IBookmarkAttribute = {
   job?: {
      data: {
         attributes: {
            title: string
            price: string
            slug: string
            status: string
         }
      }
   }
   company?: {
      data: {
         attributes: {
            name: string
            avg_price: string
            slug: string
            createdAt: string
         }
      }
   }
   resume?: {
      data: {
         attributes: {
            name: string
            salary: string
            slug: string
            createdAt: string
         }
      }
   }
   type: "job" | "company" | "resume"
}

export type IJobFilterData = {
   id: number
   __component: string
   title: string
   description: string
   result_placeholder?: string
   card_button?: {
      label?: string
   }
   search: {
      id: number
      title: string
      search_placeholder: string
      location_placeholder: string
      category_placeholder: string
      experience_placeholder: string
      type_placeholder: string
      sort_placeholder: string
      button_placeholder: string
   }
   style?: {
      color?: any
      backgroundColor?: any
      mobile: number
      tab: number
      desktop: number
   }
   sidebar?: "Left Sidebar" | "Right Sidebar" | "No Sidebar"
}

export type ISingleCategory = {
   id: number
   documentId: string
   title: string
}
export type IJobType = {
   id: number
   documentId: string
   title: string
   value: string
}

export type ISingleJob = {
   id: number
   documentId: string
   title: string
   description: string
   endDate: Date
   price: number
   location: any //this filed will be update after location map adding
   publishedAt: Date
   type: { title: string }
   vacancy: number
   slug: string
   is_featured?: boolean
   company: {
      name: string
      logo: {
         url?: string
      }
   }
}

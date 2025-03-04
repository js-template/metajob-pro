export type IJobFilterData = {
   id: number
   __component: string
   title: string
   description: string
   search: {
      id: number
      title: string
      search_placeholder: string
      location_placeholder: string
      category_placeholder: string
      sort_placeholder: string
      button_placeholder: string
   }
}

export type ISingleCategory = {
   id: number
   documentId: string
   title: string
}

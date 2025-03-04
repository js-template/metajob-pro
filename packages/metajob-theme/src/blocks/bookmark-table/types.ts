export type IBookmarkTableBock = {
   __component: "metajob-block.bookmark"
   title?: string
   description?: string
   table_config: {
      label: boolean
      enable_delete: boolean
      enable_edit: boolean
      enable_search: boolean
      search_placeholder?: string
      default_data_count?: number
   }
   table_head: {
      value: string
   }[]
   empty?: {
      id: number
      title: string
      description: string
   }
   style?: {
      color?: any
      backgroundColor?: any
      mobile: number
      tab: number
      desktop: number
   }
}

export type IBookmarkItem = {
   id: number
   documentId: string
} & IBookmarkAttribute

export type IBookmarkAttribute = {
   job?: {
      title: string
      price: string
      slug: string
      job_status: string
   }
   company?: {
      name: string
      avg_salary: {
         title: string
      }
      slug: string
      createdAt: string
   }
   resume?: {
      name: string
      salary: {
         title: string
      }
      slug: string
      createdAt: string
   }
   type: "job" | "company" | "resume"
}

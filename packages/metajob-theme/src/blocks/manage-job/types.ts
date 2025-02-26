export type IManageJobBock = {
   title?: string
   description?: string
   add_button_placeholder?: string
   table_config: {
      label: boolean
      enable_delete: boolean
      enable_edit: boolean
      enable_search: boolean
      search_placeholder?: string
      default_data_count?: number
      per_page_placeholder?: string
   }
   table_head: {
      value: string
   }[]
   apply_table_head: {
      value: string
   }[]
   empty?: {
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

export type IJobData = {
   id: number
   documentId: string
   title: string
   slug: string
   status: "draft" | "open" | "closed"
   vacancy: number
   publishedAt: string
   endDate: string
   applications: {
      count?: number
   }
}

export type IJobApplyData = {
   id: number
   documentId: string
   cover_letter: string
   createdAt: string
   updatedAt: string
   publishedAt: string
   apply_status: string
   owner: {
      id: 3
      documentId: string
      username: string
      email: string
      first_name?: string
      last_name?: string
      phone?: string
   }
   job: {
      id: 17
      documentId: string
      title: string
      price: number
      slug: string
   }
}

export type IJobCategory = {
   id: number
   documentId: string
   title: string
}
export type IEditJobData = {
   id: number
   documentId: string
   title: string
   description: string
   startDate: string
   endDate: string
   price: number
   vacancy: number
   type: {
      documentId: string
   }
   skills: {
      documentId: string
   }[]
   category: {
      documentId: string
   }
}

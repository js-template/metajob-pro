export type IAppliedJobsBlock = {
   __component: "metajob-block.applied-jobs"
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

export type IApplyJobData = {
   id: string
   documentId: number
   apply_status: "Pending" | "Shortlisted" | "Rejected"
   cover_letter?: string
   job: {
      id: string
      title: string
      slug: string
      documentId: number
      createdAt: string
      startDate: string
      endDate: string
      vacancy: number
   }
}

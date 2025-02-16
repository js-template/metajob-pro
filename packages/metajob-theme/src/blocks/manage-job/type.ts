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

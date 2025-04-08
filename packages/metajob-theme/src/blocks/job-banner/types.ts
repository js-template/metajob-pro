export type IBannerBlock = {
   id: number
   __component: string
   content?: {
      sub_title: string
      title: string
      variation?: string
   }
   search: {
      search_placeholder: string
      location_placeholder: string
      category_placeholder: string
      button_placeholder: string
   }
   job_count_placeholder?: string
   company_count_placeholder?: string
   resume_count_placeholder?: string
   show_count: boolean
   image?: {
      url: string
   }
   button?: {
      label: string
      link: string
      target: string
      disabled: boolean
   }
   style?: {
      color?: any
      backgroundColor?: any
      mobile: number
      tab: number
      desktop: number
   }
}

export type ICategory = {
   title: string
}

export type ICountData = {
   job: number
   company: number
   resume: number
}

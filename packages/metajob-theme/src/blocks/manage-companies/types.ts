export type IManageCompanyBock = {
   __component: "metajob-block.manage-company"
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

export type ISingleCompany = {
   id: number
   documentId: string
   name: string
   tagline: string
   email: string
   phone: string
   website: string
   slug: string
   about: string
   createdAt: Date
   updatedAt: Date
   publishedAt: Date
   industry: {
      id: number
      documentId: string
      title: string
      description: string
      slug: string
   }
   company_size: {
      title: string
      value: string
   }
   revenue: {
      title: string
      value: string
   }
   avg_salary: {
      title: string
      value: string
   }
   logo: {
      url: string
   }
   social_links: [
      {
         link: string
         type: string
      }
   ]
   owner: {
      id: number
      documentId: string
      username: string
      email: string
   }
   location?: any //this will be updated
   //    location: {
   //       lat: number | null
   //       lng: number | null
   //       place_id: string
   //       address: string
   //    }
}

export type IJobCategory = {
   id: number
   documentId: string
   title: string
}

export type ICompanyFillData = {
   id: number
   name: string
   documentId: string
   tagline: string
   email: string
   phone: string
   website: string
   logo?: string
   about: string
   industry: {
      id: number
      documentId: string
      title: string
      slug: string
   }
   company_size: {
      id: number
      documentId: string
      title: string
      slug: string
   }
   revenue: {
      id: number
      documentId: string
      title: string
      slug: string
   }
   avg_salary: {
      id: number
      documentId: string
      title: string
      slug: string
   }
   slug: string
   location: {
      address: string
      geohash: string
      coordinates: {
         lat: number
         lng: number
      }
   }
   social_links: {
      type: string
      link: string
   }[]
}

export type ICompanyFilterBlockData = {
   id: number
   __component: string
   title: string
   description: string
   show_filter: boolean
   search: {
      title?: string
      search_placeholder?: string
      category_placeholder?: string
      button_placeholder?: string
   }
   empty?: {
      title: string
      description: string
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

export type ICompanyFilterProps = {
   selectedIndustry: string
   selectedCompanySize: string
   selectedAverageSalary: string
   selectedRevenue: string
   companyName?: string
}

export type ISingleCategory = {
   id: number
   documentId: string
   title: string
}

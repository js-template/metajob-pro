export type IManageResumeBlock = {
   __component: "metajob-block.manage-resume"
   title?: string
}

export type ResumeFormProps = {
   name: string
   slug: string
   tagline: string
   qualification: string
   language: string
   experience_time: string
   salary_type: string
   salary: string
   category: string
   about: string
   education: {
      title: string
      description: string
      startDate: string
      endDate: string
      institution: string
   }[]
   experience: {
      title: string
      description: string
      startDate: string
      endDate: string
      institution: string
   }[]
   portfolio: {
      title: string
      description: string
      link: {
         link: string
         label: string
         target: string
         type: string
      }
      // image: string;
   }[]
   contact: {
      friendlyAddress: string
      location: string
   }
   user?: any
}

export type IJobCategory = {
   id: number
   documentId: string
   title: string
}

export type IResumeAttribute = {
   categoryData: IJobCategory[]
   experienceData: IJobCategory[]
   avgSalaryData: IJobCategory[]
   salaryTypesData: IJobCategory[]
}

export type ISingleResume = {
   id: number
   documentId: string
   description: string
   name: string
   tagline: string
   about: string
   show_profile: "Show" | "Hide"
   language: string
   slug: string
   createdAt: Date
   updatedAt: Date
   publishedAt: Date
   category: {
      id: number
      documentId: string
      title: string
      description: string
      slug: string
   }
   salary: {
      documentId: string
      title: string
      value: string
   }
   salary_type: {
      documentId: string
      title: string
      value: string
   }
   experience_time: {
      documentId: string
      title: string
      value: string
   }
   qualification: {
      title: string
      value: string
   }
   contact: {
      friendlyAddress: null //this field will be updated
      location: null
   }
   education: {
      title: string
      description: string
      startDate: string
      endDate: string
      institution: string
   }[]
   experience: {
      title: string
      description: string
      startDate: string
      endDate: string
      institution: string
   }[]
   portfolio: {
      id: number
      title: string
      description: string
      link: {
         link: string
         label: string
         type: string
         target: string
      }
      image?: {
         url: string
      }
   }[]
   user: {
      id: number
      documentId: string
      username: string
      phone: string
      email: string
      avatar: {
         url: string
      }
   }
}

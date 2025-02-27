export type IManageResumeBlock = {
   __component: "metajob-block.manage-resume"
   title?: string
}

export type ResumeFormProps = {
   name: ""
   slug: ""
   tagline: ""
   qualification: ""
   language: ""
   experience_time: string | ""
   salary_type: string | ""
   salary: string | ""
   category: string | ""
   about: string
   education: {
      title: string
      institution: string
      startDate: string
      endDate: string
      description: string
   }[]
   experience: {
      title: string
      institution: string
      startDate: string
      endDate: string
      description: string
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

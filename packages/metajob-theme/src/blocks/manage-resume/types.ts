export type IManageResumeBlock = {
   __component: "metajob-block.manage-resume"
   title?: string
}

export type ResumeFormProps = {
   name: ""
   tagline: ""
   qualification: ""
   experienceTime: ""
   language: ""
   salaryType: ""
   salary: number
   category: number
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
   attributes: {
      title: string
   }
}

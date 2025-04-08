export type IJobCardBlock = {
   id: number
   __component: "block.job-card"
   content?: {
      sub_title: string
      title: string
      title_color?: string
      sub_title_color?: string
      variation?: string
   }
   style?: {
      id: 25
      color?: any
      backgroundColor?: any
      mobile: number
      tab: number
      desktop: number
   }
   empty?: {
      id: number
      title: string
      description: string
   }
   button?: {
      label: string
      link: string
      target: string
      disabled: boolean
   }
   card_button?: {
      label?: string
   }
}

export type ISingleJob = {
   id: number
   documentId: string
   title: string
   description: string
   endDate: Date
   price: number
   location: any //this filed will be update after location map adding
   publishedAt: Date // Consider using Date
   type: { title: string }
   vacancy: number
   slug: string
   salary: string
   is_featured?: boolean
   company: {
      name: string
      logo: {
         url?: string
      }
   }
}

export type IJobs = ISingleJob[]

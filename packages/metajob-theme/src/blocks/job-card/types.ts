export type IJobCardBlock = {
   id: number
   __component: "block.job-card"
   content?: {
      sub_title: string
      title: string
      variation?: string
   }
   style?: {
      color?: any
      secondary_color?: string
      backgroundColor?: any
      mobile: number
      tab: number
      desktop: number
      bg_overlay?: number
      header_color?: string
      sub_header_color: string
      header_width: "Full" | "Small"
      section_padding?: number
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
   item_count?: number
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

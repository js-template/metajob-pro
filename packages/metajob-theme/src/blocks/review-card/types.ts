export type IReviewsBlock = {
   id: number
   __component: "block.review-card"
   content?: {
      sub_title: string
      title: string
      title_color?: string
      sub_title_color?: string
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
}
export type ISingleReview = {
   id: number
   name: string
   designation: string
   review: string
   avatar: {
      url: string
   }
}

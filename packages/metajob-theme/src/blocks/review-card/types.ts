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
   description_color?: string
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

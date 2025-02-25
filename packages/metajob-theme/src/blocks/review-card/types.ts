export type IReviewsBlock = {
   id: number
   __component: "block.review-card"
   content?: {
      sub_title: string
      title: string
      variation: string
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

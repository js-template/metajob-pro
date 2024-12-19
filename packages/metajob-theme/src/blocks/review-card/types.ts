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
   reviews?: IReview
}
export type ISingleReview = {
   id: number
   rating: number
   review: string
   reviewer: string
   avatar: {
      url: string //TODO: need to update here
   }
}

export type IReview = ISingleReview[]

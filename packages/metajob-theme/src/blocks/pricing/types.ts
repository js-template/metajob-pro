// *** Membership Plan Item Props
export type subscriptionProps = {
   data: {
      id: number
      title?: string
      description?: string
      price?: number
      reward_percentage?: number
      features?: {
         title: string
      }[]
   }
   isLoader?: boolean
   formLoader?: boolean
   currentPlan: number
   handleGetStarted?: (type: string) => Promise<void>
}

export type subscriptionItemProps = {
   id: number
   title?: string
   description?: string
   price?: number
   reward_percentage?: number
   features?: {
      title: string
   }[]
}

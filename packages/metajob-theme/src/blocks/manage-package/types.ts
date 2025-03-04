export type IManagePackageBock = {
   title: string
   description: string
   empty?: {
      title: string
      description: string
   }
   style?: {
      id: 25
      color?: any
      backgroundColor?: any
      mobile: number
      tab: number
      desktop: number
   }
}

export type IPackageData = {
   id: number
   documentId: string
   title?: string
   description?: string
   price?: number
   frequency: string
   create_ads_limit: number
   ads_boost_limit: number
   button?: {
      label?: string
   }
   feature?: {
      key: string
      value: string
   }[]
}

export type IMemberShip = {
   documentId: string
   user_plan: {
      documentId: string
   }
}

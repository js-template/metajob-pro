export type IPublicPackageBlock = {
   id: number
   __component: string
   description?: string
   title?: string
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
      link?: string
   }
   feature?: {
      key: string
      value: string
   }[]
}

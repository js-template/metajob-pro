export type IPublicPackageBlock = {
   id: number
   __component: string
   content?: {
      title?: string
      sub_title?: string
      variation: string
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
      sidebar?: "Left Sidebar" | "Right Sidebar" | "No Sidebar"
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

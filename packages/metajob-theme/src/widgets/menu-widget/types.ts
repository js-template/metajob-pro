export type IContactWidgetBlock = {
   id: number
   title: string
   menu_items: {
      id: 7
      label: string
      link: string
      type?: string
      target?: string
      icon: string
      disabled: boolean
   }[]
   style?: {
      id: number
      color?: any
      backgroundColor?: any
      mobile: number
      tab: number
      desktop: number
   }
}

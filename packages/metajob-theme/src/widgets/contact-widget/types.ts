export type IContactWidgetBlock = {
   id: number
   title: string
   description?: string
   location?: string
   phone?: string
   email?: string
   style?: {
      id: number
      color?: any
      backgroundColor?: any
      mobile: number
      tab: number
      desktop: number
   }
}

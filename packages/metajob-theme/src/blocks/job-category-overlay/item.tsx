"use client"
import { CategoryOverlayCard } from "../../components/cards/category-cards/category-overlay-card"
import { ISingleCategory } from "./types"

type Props = {
   data: ISingleCategory
   variation?: string
   button_label?: string
   style?: {
      color?: any
      backgroundColor?: any
   }
   show_icon: boolean
   overlay: boolean
}

export const CardItem = ({ data, button_label, style, show_icon, overlay }: Props) => {
   const { backgroundColor, color } = style || {}

   return <CategoryOverlayCard data={data} color={color} show_icon={show_icon} overlay={overlay} />
}

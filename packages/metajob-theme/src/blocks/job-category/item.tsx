"use client"
import { ISingleCategory } from "./types"
import { CategoryCardTwo } from "../../components/cards/category-cards/category-card-two"
import { CategoryCardOne } from "../../components/cards/category-cards/category-card-one"

type Props = {
   data: ISingleCategory
   variation?: string
   button_label?: string
   style?: {
      color?: any
      backgroundColor?: any
   }
}

export const CardItemWithVariation = ({ data, variation, button_label, style }: Props) => {
   const variationTwo = variation === "Variation Two" ? true : false

   const { backgroundColor, color } = style || {}

   return variationTwo ? (
      <CategoryCardTwo data={data} button_label={button_label} color={color} backgroundColor={backgroundColor} />
   ) : (
      <CategoryCardOne data={data} color={color} />
   )
}

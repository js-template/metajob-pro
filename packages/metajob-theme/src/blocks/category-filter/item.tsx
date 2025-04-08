"use client"
import { ISingleCategory } from "./types"
import { CategoryCardTwo } from "../../components/cards/category-cards/category-card-two"
import { CategoryCardOne } from "../../components/cards/category-cards/category-card-one"

type Props = {
   data: ISingleCategory
   variation?: string
   button_label?: string
}

export const CardItemWithVariation = ({ data, variation, button_label }: Props) => {
   const variationTwo = variation === "Variation Two" ? true : false

   return variationTwo ? <CategoryCardTwo data={data} button_label={button_label} /> : <CategoryCardOne data={data} />
}

import { emptyProps, styleProps } from "../../shared/type"

export type bookmarksListsProps = {
   title: string
   column_1: string
   column_2: string
   style: styleProps
   empty: emptyProps
}

export type bookmarksListsItemProps = {
   id: number
   title: string
   type: string
   note: string
   createdAt: string
   updatedAt: string
}

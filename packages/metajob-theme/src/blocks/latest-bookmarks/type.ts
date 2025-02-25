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
   type: string
   note: string
   job: {
      id: number
      title: string
      slug: string
   }
   resume: {
      id: number
      name: string
      slug: string
   }
}

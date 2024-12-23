import { emptyProps, styleProps } from "../../shared/type"

export type appliedListsProps = {
   title: string
   column_1: string
   column_2: string
   style: styleProps
   empty: emptyProps
}

export type appliedListsItemProps = {
   id: number
   status: string
   job: {
      title: string
      slug: string
   }
   createdAt: string
   updatedAt: string
}

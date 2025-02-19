import { emptyProps, styleProps } from "../../shared/type"

export type recentActivitiesProps = {
   title: string
   column_1: string
   style: styleProps
   empty: emptyProps
}

export type recentActivitiesItemProps = {
   dateTime: string
   title: string
}

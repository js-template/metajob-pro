import { IUserSession } from "../../types/user"
import { formProps } from "../../types/forms"

export type ManageCompaniesProps = {
   block: ManageCompaniesDataProps
   session?: IUserSession | null | any
   language?: string
   data?: any
}

export type ManageCompaniesDataProps = {
   title: string
   enableSearch: boolean
   tableConfig: {
      enableEdit: boolean
      enableDelete: boolean
   }
   empty: {
      title: string
      description: string
   }
   tableHead: {
      label: string
      sort: boolean
      align: "left" | "center" | "right"
   }[]
   form: {
      data: {
         attributes: formProps
      }
   }
   addButtonText: string
   editButtonText: string
   perPageText: string
}

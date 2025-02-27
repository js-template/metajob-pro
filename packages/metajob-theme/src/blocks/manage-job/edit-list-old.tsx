"use client"
import * as React from "react"
import Dialog from "@mui/material/Dialog"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import { KeyedMutator } from "swr"
import { formProps } from "@/types/forms"
import DynamicForm from "../../form"
import { findOne, updateOne } from "../../lib/strapi"
import _ from "lodash"
import toast from "react-hot-toast"
import { IManageJobBock } from "./types"

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement<any, any>
   },
   ref: React.Ref<unknown>
) {
   return <Slide direction='up' ref={ref} {...props} />
})

type EditListProps = {
   open: boolean
   handleClickOpen: () => void
   handleClose: () => void
   listID: number
   mutate: KeyedMutator<any>
   userId?: number
   formData: formProps
   blockData: IManageJobBock
}

export default function EditList({
   open,
   handleClickOpen,
   handleClose,
   listID,
   mutate,
   userId,
   formData,
   blockData
}: EditListProps) {
   const [loading, setLoading] = React.useState(false)
   const [listData, setListData] = React.useState<{
      id: number
      title: string
      startDate: string
      endDate: string
      category: string
      type: string
      price: number
      description: string
      vacancy: number
      company: string
      tags: string
      location: {
         address: string
         geohash: string
         coordinates: {
            lat: number
            lng: number
         }
      }
   } | null>(null)
   // *** data format
   const { title, buttonsText, stepLabels, fields } = formData || {}

   // *** handle form submit
   const handleFromSubmit = async (data: { [key: string]: any }): Promise<boolean> => {
      try {
         if (!listData) return false

         setLoading(true)

         // ?? create list function
         const {
            data: updateList,
            error,
            message
         } = await updateOne("lists", listData.id, {
            data: {
               title: data.title,
               description: data.description,
               price: data.price,
               vacancy: data.vacancy,
               category: data.category?.id,
               company: data.company?.id,
               location: data.location,
               // ?? get the tags id should be [1,2,3]
               tags: data.tags?.map((tag: any) => Number(tag.id)),
               // ?? get the type value
               type: data.type?.map((type: any) => type.value),
               startDate: data.startDate,
               endDate: data.endDate,
               owner: userId,
               // if the startDate is greater than the current date then the status will be draft otherwise open
               job_status: new Date(data.startDate) > new Date() ? "draft" : "open"
            }
         })

         if (error) {
            setLoading(false)
            toast.error(message || "Something went wrong")
            return false
         }

         if (updateList) {
            await mutate().finally(() => {
               setLoading(false)
               toast.error("Job Updated Successfully", {
                  icon: "🚀"
               })
               handleClose()
            })
            return true
         }
         return false
      } catch (error) {
         setLoading(false)
         toast.error("Error updating job")
         return false
      }
   }

   // *** get the list data by the listID
   React.useEffect(() => {
      const getList = async () => {
         const { data, error } = await findOne(
            "api/metajob-backend/jobs",
            listID,
            {
               populate: "deep"
            },
            "no-store"
         )

         if (error) {
            handleClose()
            toast.error(error ?? "Failed to fetch list data")
            return
         }

         // filtered list data
         let filteredData = _.get(data, "data.attributes", {})

         // ?? tags array string
         let tags = _.get(filteredData, "tags.data", [])
         tags = tags.map((tag: any) => tag.attributes.value)

         // set list data
         setListData({
            id: data?.data.id,
            title: filteredData?.title,
            startDate: filteredData?.startDate,
            endDate: filteredData?.endDate,
            price: filteredData?.price,
            description: filteredData?.description,
            vacancy: filteredData?.vacancy,
            location: filteredData?.location,
            category: _.get(filteredData, "category.data.attributes.slug", ""),
            company: _.get(filteredData, "company.data.attributes.slug", ""),
            type: filteredData?.type,
            tags: tags
         })
      }

      if (open) {
         if (!listID) return
         // ?? get list data by listID
         getList()
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [open])

   return (
      <Dialog
         open={open}
         TransitionComponent={Transition}
         keepMounted
         aria-describedby='edit-list'
         sx={{
            "& .MuiDialog-paper": {
               backgroundColor: (theme) => theme.palette.background.default,
               maxWidth: "1440px",
               width: "100%"
            }
         }}>
         <DynamicForm
            title={"Edit"}
            buttonsText={buttonsText}
            fields={fields}
            handleFromSubmit={handleFromSubmit}
            open={open}
            handleClose={() => {
               handleClose()
               setListData(null)
            }}
            loading={loading}
            setLoading={setLoading}
            stepLabels={stepLabels}
            dataLoading={listData ? false : true}
            defaultData={{
               ...listData
            }}
         />
      </Dialog>
   )
}

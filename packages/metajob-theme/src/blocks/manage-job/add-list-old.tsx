"use client"
import React from "react"
import { formProps } from "../../types/forms"
import DynamicForm from "../../form"
import { KeyedMutator } from "swr"
import { Box, CircularProgress } from "@mui/material"
import { IManageJobBock } from "./types"
import { createEntry, find } from "../../lib/strapi"
import toast from "react-hot-toast"
import _ from "lodash"

type addListProps = {
   open: boolean
   handleClose: () => void
   data: formProps
   userId?: number
   mutate: KeyedMutator<any>
   blockData: IManageJobBock
}

/**
 * Add List Component
 * @param {boolean} open - open modal
 * @param {function} handleClose - close modal
 * @param {formProps} data - form data object
 * @param {number} userId - user id of the list owner
 * @param {mutate} - mutate function from swr
 * @param {ManageListsDataProps} - list data object for the form
 * @returns {React.ReactElement} - React Component
 * @example
 * <AddList
 *   open={open}
 *   handleClose={handleClose}
 *   data={data}
 *   userId={userId}
 *   mutate={mutate}
 *   blockData={blockData}
 * />
 */
const AddList = ({ open, handleClose, data, userId, mutate, blockData }: addListProps) => {
   const [loading, setLoading] = React.useState(false)
   // *** data format
   const { buttonsText, stepLabels, fields } = data

   // *** handle form submit
   const handleFromSubmit = async (data: { [key: string]: any }): Promise<boolean> => {
      setLoading(true)

      // ?? check if slug is already exist
      const { data: slugData } = await find(
         "api/metajob-strapi/jobs",
         {
            fields: ["slug"],
            filters: {
               slug: _.kebabCase(data.title)
            }
         },
         "no-store"
      )

      if (slugData?.data?.length > 0) {
         setLoading(false)
         toast.error("Slug already exist, please change the title")
         return false
      }

      // *** create new list entry
      const { data: newJob, error } = await createEntry("lists", {
         data: {
            title: data.title,
            // slug should not have space and special characters
            slug: _.kebabCase(data.title),
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
            status: new Date(data.startDate) > new Date() ? "draft" : "open"
         }
      })

      if (error) {
         setLoading(false)
         toast.error("Failed to create list")
         return false
      }

      // ?? check if newJob exist
      if (newJob) {
         await mutate().finally(() => {
            toast.success("Successfully created!")
            handleClose()
            setLoading(false)
         })

         return true
      }

      return false
   }

   return data ? (
      <DynamicForm
         title={"Add Job"}
         buttonsText={buttonsText}
         fields={fields}
         handleFromSubmit={handleFromSubmit}
         open={open}
         handleClose={handleClose}
         loading={loading}
         setLoading={setLoading}
         stepLabels={stepLabels}
      />
   ) : (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
         }}>
         <CircularProgress />
      </Box>
   )
}

export default AddList

"use client"
import React from "react"
import toast from "react-hot-toast"
import { formProps } from "../../types/forms"
import DynamicForm from "../../form"
import { createEntry, find, updateOne, uploadImage } from "../../lib/strapi"
import { KeyedMutator } from "swr"

type addCompanyProps = {
   open: boolean
   handleClose: () => void
   data: formProps
   userId?: number
   mutate: KeyedMutator<any>
}

/**
 * Add Company Component
 * @param {boolean} open - open modal
 * @param {function} handleClose - close modal
 * @param {formProps} data - form data object
 * @param {number} userId - user id of the company owner
 * @returns {React.ReactElement} - React Component
 * @example
 * <AddCompany
 *   open={open}
 *   handleClose={handleClose}
 *   data={data}
 *   userId={userId}
 * />
 */
const AddCompany = ({ open, handleClose, data, userId, mutate }: addCompanyProps) => {
   const [loading, setLoading] = React.useState(false)
   // *** data format
   const { title, buttonsText, stepLabels, fields } = data

   // *** handle form submit
   const handleFromSubmit = async (data: { [key: string]: any }): Promise<boolean> => {
      setLoading(true)

      // ?? check if slug is already exist
      const { data: slugData } = await find(
         "api/metajob-strapi/companies",
         {
            fields: ["slug"],
            filters: {
               slug: data.slug
            }
         },
         "no-store"
      )

      if (slugData?.data?.length > 0) {
         setLoading(false)
         toast.error("Slug already exist")
         return false
      }

      // ?? social links array
      const socialLinks = [
         // ?? check if facebook_url exist
         data.facebook_url && {
            type: "facebook",
            link: data.facebook_url
         },
         // ?? check if twitter_url exist
         data.twitter_url && {
            type: "twitter",
            link: data.twitter_url
         },
         // ?? check if linkedin_url exist
         data.linkedin_url && {
            type: "linkedin",
            link: data.linkedin_url
         }
      ]

      // ?? remove empty values from socialLinks
      const filteredSocialLinks = socialLinks.filter((link) => link)

      // ?? create company function
      const {
         data: companyData,
         error,
         message
      } = await createEntry("companies", {
         data: {
            name: data.name,
            slug: data.slug,
            tagline: data.tagline,
            email: data.email,
            phone: data.phone,
            website: data.website,
            company_size: data.company_size?.value,
            revenue: data?.revenue?.value,
            about: data.about,
            location: data.location,
            industry: data?.industry?.id,
            avg_price: data.avg_price?.value,
            social_links: filteredSocialLinks,
            owner: userId
         }
      })

      if (error) {
         setLoading(false)
         toast.error(message || "Something went wrong")
         return false
      }

      // ?? if company created successfully and data?.logo is exist then upload logo
      if (companyData && data?.logo) {
         const formData = new FormData()
         formData.append("files", data.logo[0])
         const { data: logoData, error: logoError } = await uploadImage(formData)

         if (logoError) {
            setLoading(false)
            toast.error("Failed to upload image")
            return false
         }

         // ?? update company with logo
         const { data: updatedCompanyData, error: updateError } = await updateOne("companies", companyData.id, {
            data: {
               logo: logoData[0].id
            }
         })

         if (updateError) {
            setLoading(false)
            toast.error("Image uploaded successfully but failed to update company", {
               // warning icon
               icon: "⚠️"
            })
            toast.error(updateError, {
               icon: "❌"
            })
            return false
         }

         setLoading(false)
         await mutate().finally(() => {
            toast.success("Company Created Successfully", {
               icon: "🚀"
            })
            handleClose()
            setLoading(false)
         })
         return true
      }

      await mutate().finally(() => {
         setLoading(false)
         toast.error("Company Created Successfully", {
            icon: "🚀"
         })
         handleClose()
      })

      return true
   }

   return (
      <DynamicForm
         title={title}
         buttonsText={buttonsText}
         fields={fields}
         handleFromSubmit={handleFromSubmit}
         open={open}
         handleClose={handleClose}
         loading={loading}
         setLoading={setLoading}
         stepLabels={stepLabels}
      />
   )
}

export default AddCompany

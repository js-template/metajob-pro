"use client"
import * as React from "react"
import Dialog from "@mui/material/Dialog"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import { KeyedMutator } from "swr"
import { formProps } from "@/types/forms"
import DynamicForm from "../../form"
import { findOne, updateOne, uploadImage } from "../../lib/strapi"
import _ from "lodash"
import toast from "react-hot-toast"
import { urlToFile } from "../../lib/urlToFile"

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement<any, any>
   },
   ref: React.Ref<unknown>
) {
   return <Slide direction='up' ref={ref} {...props} />
})

type EditCompanyProps = {
   open: boolean
   handleClickOpen: () => void
   handleClose: () => void
   companyDocID: string
   mutate: KeyedMutator<any>
   formData: formProps
}

export default function EditCompany({
   open,
   handleClickOpen,
   handleClose,
   companyDocID,
   mutate,
   formData
}: EditCompanyProps) {
   const [loading, setLoading] = React.useState(false)
   const [companyData, setCompanyData] = React.useState<{
      id: number
      name: string
      tagline: string
      email: string
      phone: string
      website: string
      company_size: string
      revenue: string
      logo: File | null
      about: string
      industry: {
         id: number
         title: string
         slug: string
      }
      slug: string
      location: {
         address: string
         geohash: string
         coordinates: {
            lat: number
            lng: number
         }
      }
      social_links: {
         type: string
         link: string
      }[]
      avg_price: string
   } | null>(null)
   // *** data format
   const { title, buttonsText, stepLabels, fields } = formData || {}

   // ?? fields input field name slug remove
   const filterFields = fields?.filter((field) => field.name !== "slug")

   // *** handle form submit
   const handleFromSubmit = async (data: { [key: string]: any }): Promise<boolean> => {
      if (!companyData) return false

      setLoading(true)

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
         data: updateCompany,
         error,
         message
      } = await updateOne("companies", companyData.id, {
         data: {
            name: data.name,
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
            social_links: filteredSocialLinks
         }
      })

      if (error) {
         setLoading(false)
         toast.error(message || "Something went wrong")
         return false
      }

      // ?? if company created successfully and data?.logo is exist then upload logo
      if (updateCompany && data?.logo) {
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
            toast.success("Company Updated Successfully", {
               icon: "🚀"
            })
            handleClose()
         })
         return true
      }

      await mutate().finally(() => {
         setLoading(false)
         toast.error("Company Updated Successfully", {
            icon: "🚀"
         })
         handleClose()
      })

      return true
   }

   // *** get the company data by the companyDocID
   React.useEffect(() => {
      const getCompany = async () => {
         const { data, error } = await findOne(
            "api/metajob-backend/companies",
            companyDocID,
            {
               populate: "*"
            },
            "no-store"
         )

         if (error) {
            handleClose()
            toast.error(error ?? "Failed to fetch company data")
            return
         }

         // filtered company data
         let filteredData = _.get(data, "data", {})
         // industry data
         const industry = _.get(filteredData, "industry.data.attributes", {})
         filteredData.industry = {
            id: filteredData.industry.data.id,
            ...industry
         }

         // // logo data
         const logo = _.get(filteredData, "logo.data.attributes", {})

         await urlToFile(logo.url, logo.name).then((file) => {
            filteredData.logo = file
         })

         // set company data
         setCompanyData({
            id: data?.data.id,
            ...filteredData
         })
      }

      if (open) {
         if (!companyDocID) return
         // ?? get company data by companyID
         getCompany()
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [open])

   return (
      <Dialog
         open={open}
         TransitionComponent={Transition}
         keepMounted
         aria-describedby='edit-company'
         sx={{
            "& .MuiDialog-paper": {
               backgroundColor: (theme) => theme.palette.background.default,
               maxWidth: "1440px",
               width: "100%"
            }
         }}>
         <DynamicForm
            title={"Edit Company"}
            buttonsText={buttonsText}
            fields={filterFields}
            handleFromSubmit={handleFromSubmit}
            open={open}
            handleClose={() => {
               handleClose()
               setCompanyData(null)
            }}
            loading={loading}
            setLoading={setLoading}
            stepLabels={stepLabels}
            dataLoading={companyData ? false : true}
            defaultData={{
               name: companyData?.name,
               tagline: companyData?.tagline,
               email: companyData?.email,
               phone: companyData?.phone,
               website: companyData?.website,
               logo: companyData?.logo,
               about: companyData?.about,
               location: {
                  address: _.get(companyData, "location.address", ""),
                  geohash: _.get(companyData, "location.geohash", ""),
                  coordinates: {
                     lat: _.get(companyData, "location.coordinates.lat", 0),
                     lng: _.get(companyData, "location.coordinates.lng", 0)
                  }
               },
               facebook_url: companyData?.social_links.find((item) => item.type === "facebook")?.link,
               linkedin_url: companyData?.social_links.find((item) => item.type === "linkedin")?.link,
               twitter_url: companyData?.social_links.find((item) => item.type === "twitter")?.link,
               company_size: companyData?.company_size,
               revenue: companyData?.revenue,
               industry: [companyData?.industry?.slug],
               avg_price: companyData?.avg_price
            }}
         />
      </Dialog>
   )
}

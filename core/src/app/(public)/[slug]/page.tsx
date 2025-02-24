import { Fragment } from "react"
import { notFound } from "next/navigation"
import { Metadata, ResolvingMetadata } from "next"
import { find } from "@/lib/strapi"
import { StrapiSeoFormate } from "@/lib/strapiSeo"
import { getLanguageFromCookie } from "@/utils/language"
import { loadActiveTheme } from "config/theme-loader"
import { cookies } from "next/headers"

export const dynamicParams = true // true | false,

export default async function DynamicPages({
   params
}: {
   params: { slug: string }
   searchParams: { [key: string]: string | string[] | undefined }
}) {
   const pageSlug = params?.slug
   const language = await getLanguageFromCookie()

   // console.log("language in cookie", language)

   const { data, error } = await find(
      "api/padma-backend/public-pages",
      {
         filters: {
            slug: {
               $eq: pageSlug
            }
         },
         populate: {
            blocks: {
               populate: "*"
            }
         },
         locale: language ?? ["en"]
      },
      "no-store"
   )

   console.log("data", data)

   const activeTheme = await loadActiveTheme()

   // Define as an empty object by default
   let getPublicComponents: Record<string, any> = {}

   if (activeTheme) {
      getPublicComponents = activeTheme.getPublicComponents
   } else {
      console.error("Active theme could not be loaded!", error)
   }

   // console.log("data", data, "error", error)

   const blocks = data?.data[0]?.blocks || []

   // *** if blocks is empty, return 404 ***
   if (!blocks || blocks?.length === 0) {
      return notFound()
   }
   // *** if error, return error page ***
   if (error) {
      throw error
   }

   return (
      <>
         {blocks?.map((block: any, index: number) => {
            const BlockConfig = getPublicComponents[block.__component as keyof typeof getPublicComponents]

            if (BlockConfig) {
               const { component: ComponentToRender } = BlockConfig

               //@ts-ignore
               return <ComponentToRender key={index} block={block} language={language} />
            }
            return null // Handle the case where the component mapping is missing
         })}
      </>
   )
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
   // const cookieStore = await cookies()
   // const language = cookieStore.get("lang")

   const { data, error } = await find(
      "api/padma-backend/public-pages",
      {
         fields: ["slug"],
         filters: {
            slug: {
               $ne: null
            }
         }
      },
      "no-store"
   )

   return data?.data?.map((post: any) => ({
      slug: post?.slug || ""
   }))
}

// *** generate metadata type
type Props = {
   params: { slug: string }
   searchParams: { [key: string]: string | string[] | undefined }
}

// *** generate metadata for the page
export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const pageSlug = params?.slug
   //const language = await getLanguageFromCookie()

   // ***fetch seo data
   const product = await find(
      "api/padma-backend/public-pages",
      {
         filters: {
            slug: {
               $eq: pageSlug
            }
         },
         populate: {
            seo: {
               populate: "*"
            }
         }
         //locale: language ?? ["en"]
      },
      "no-store"
   )

   return StrapiSeoFormate(product?.data?.data?.[0]?.seo, `/${pageSlug}`)
}

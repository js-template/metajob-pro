import { notFound } from "next/navigation"
import { Metadata, ResolvingMetadata } from "next"
import { find } from "@/lib/strapi"
import { StrapiSeoFormate } from "@/lib/strapiSeo"
import { getLanguageFromCookie } from "@/utils/language"
import { loadActiveTheme } from "config/theme-loader"
import { Grid } from "@mui/material"

export const dynamicParams = false // true | false,

export default async function DynamicPages({
   params
}: {
   params: { slug: string }
   searchParams: { [key: string]: string | string[] | undefined }
}) {
   const pageSlug = params?.slug

   //console.log("Page Slug", pageSlug)

   const language = getLanguageFromCookie()

   const { data, error } = await find(
      "api/padma-backend/private-pages",
      {
         filters: {
            slug: {
               $eq: pageSlug
            }
         },
         populate: "*" // populate all the fields
      },
      "no-store"
   )

   const activeTheme = await loadActiveTheme()
   const getPrivateComponents = activeTheme?.getPrivateComponents || {}

   //console.log("Private Page Data", data?.data)

   const blocks = data?.data[0]?.blocks || []

   console.log("Private Page Blocks Loaded", blocks)
   const style = data?.data[0]?.styles || {}

   //console.log("Private Page Styles", style)

   //console.log("Private Page Blocks Loaded", blocks)

   //console.log("Private Page Blocks Loaded", blocks)

   // *** if blocks is empty, return 404 ***
   if (!blocks || blocks?.length === 0) {
      return notFound()
   }
   //*** if error, return error page ***
   if (error) {
      throw error
   }

   return (
      <Grid
         container
         {...(style?.columnSpacing && { columnSpacing: style.columnSpacing })}
         {...(style?.rowSpacing && { rowSpacing: style.rowSpacing })}
         {...(style?.spacing && { spacing: style.spacing })}
         {...(style?.zeroMinWidth && { zeroMinWidth: style.zeroMinWidth })}
         {...(style?.columns && { columns: style.columns })}
         {...(style?.wrap && { wrap: style.wrap })}
         sx={{ mb: 4 }}>
         {blocks?.map((block: any, index: number) => {
            const BlockConfig = getPrivateComponents[block.__component as keyof typeof getPrivateComponents]
            console.log("Block Config", BlockConfig)
            if (BlockConfig) {
               const { component: ComponentToRender } = BlockConfig

               //@ts-ignore
               return <ComponentToRender key={index} block={block} language={language} />
            }
            return null // Handle the case where the component mapping is missing
         })}
      </Grid>
   )
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
   const { data, error } = await find("api/padma-backend/private-pages", {
      fields: ["slug"],
      filters: {
         slug: {
            $ne: null
         }
      }
   })

   return data?.data?.map((post: any) => ({
      slug: post?.slug || ""
   }))
}

// // *** generate metadata type
type Props = {
   params: { slug: string }
   searchParams: { [key: string]: string | string[] | undefined }
}

// // *** generate metadata for the page
export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
   const pageSlug = params?.slug
   const language = getLanguageFromCookie()

   // ***fetch seo data
   const product = await find(
      "api/padma-backend/private-pages",
      {
         filters: {
            slug: {
               $eq: pageSlug
            }
         },
         populate: "*"
      },
      "no-store"
   )

   if (!product?.data?.data?.[0]?.attributes?.seo) {
      return {
         title: product?.data?.data?.[0]?.attributes?.title || "Title not found",
         description: `Description ${product?.data?.data[0]?.attributes?.title}` || "Description not found"
      }
   }
   return StrapiSeoFormate(product?.data?.data?.[0]?.attributes?.seo, `/${pageSlug}`)
}

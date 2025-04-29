"use server"
import { Suspense } from "react"
import { find } from "../../lib/strapi"
import { IPublicPackageBlock } from "./types"
import PublicPackageClient from "./public-package"
import PublicPackageLoader from "./loader"

type Props = {
   block: IPublicPackageBlock
   data?: any
   language?: string
}

export const PublicPackage = async ({ block, data, language }: Props) => {
   const { data: packageDataAll } = await find("api/metajob-backend/packages", {
      populate: "*",
      publicationState: "live",
      locale: language ?? "en"
   })

   return (
      <Suspense fallback={<PublicPackageLoader />}>
         <PublicPackageClient block={block} packageData={packageDataAll?.data} data={data} />
      </Suspense>
   )
}

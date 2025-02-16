import { Grid } from "@mui/material"
import { CountCard } from "../../components/cards/count"
import CountCardLoader from "../../shared/count-card/loader"

import _ from "lodash"
import { countCardProps } from "../../shared/count-card/type"
import AppliedError from "./error"
import { IUserSession } from "../../types/user"
import { useSession } from "next-auth/react"
import { find } from "@/lib/strapi"

export const AppliedList = async ({
   block
}: {
   block: any
   session?: IUserSession | null | any
   data?: any
   language?: string
}) => {
   const role = "candidate"

   console.log("block", block)

   const queryParams = {
      fields: "title",
      populate: {
         role1Components: {
            on: {
               "widget.applied-list": {
                  populate: "*"
               }
            }
         }
      }
   }

   const { data, error } = await find("api/padma-backend/private-frontpage", queryParams, "no-store")

   //console.log("Compoinents- Private Page Data ", data?.data)

   const details = data?.data?.role1Components[0]?.details

   // console.log("Details", details)
   // if (error) {
   //    console.error("Error fetching dashboard data:", error?.message)
   //    return <div>Error loading dashboard. Please try again later.</div>
   // }

   const totalList = block?.details || ({} as countCardProps)
   const styleData = block?.style || {}
   const isLoading = false

   const dynamicTotalList = 20
   // console.log("Dynamic Total List", countData)

   return role === "candidate" ? (
      <>
         {isLoading ? (
            <Grid item xs={styleData?.mobile} sm={styleData?.tab} md={styleData?.desktop}>
               <CountCardLoader />
            </Grid>
         ) : (
            <Grid item xs={styleData?.mobile} sm={styleData?.tab} md={styleData?.desktop}>
               <CountCard item={details} style={styleData} />
            </Grid>
         )}
      </>
   ) : (
      // Add message for employer
      <Grid item xs={styleData?.mobile} sm={styleData?.tab} md={styleData?.desktop}>
         <AppliedError />
      </Grid>
   )
}

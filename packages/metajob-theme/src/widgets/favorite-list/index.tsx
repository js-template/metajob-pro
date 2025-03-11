import { Grid } from "@mui/material"
import { CountCard } from "../../shared/count-card"
import CountCardLoader from "../../shared/count-card/loader"
import _ from "lodash"

import OpenError from "./error"
import { IUserSession } from "../../types/user"
import { find } from "../../lib/strapi"

export const FavoriteList = async ({
   block,
   session
}: {
   block: any
   session?: IUserSession | null | any
   data?: any
   language?: string
}) => {
   const { user } = session || {}
   const { id: userId, role: userRole } = user || {}
   const role = userRole?.type || ""

   const styleData = block?.style || {}

   const { data: JobData, error: JobError } = await find(
      "api/metajob-backend/bookmarks",
      {
         fields: ["id"],
         filters: {
            owner: userId
         }
      },
      "no-store"
   )

   const openJob = JobData?.meta?.pagination.total || 0

   // Extract relevant data
   const componentData = block?.details || null

   return role === "candidate" ? (
      <>
         {!componentData ? (
            <Grid item xs={styleData?.mobile} sm={styleData?.tab} md={styleData?.desktop}>
               <CountCardLoader />
            </Grid>
         ) : (
            <Grid item xs={styleData?.mobile} sm={styleData?.tab} md={styleData?.desktop}>
               <CountCard item={componentData} count={openJob} />
            </Grid>
         )}
      </>
   ) : (
      // Add message for candidate
      <Grid item xs={styleData?.mobile} sm={styleData?.tab} md={styleData?.desktop}>
         <OpenError />
      </Grid>
   )
}

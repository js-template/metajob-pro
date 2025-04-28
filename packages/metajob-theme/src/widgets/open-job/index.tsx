import { Grid } from "@mui/material"
import { CountCard } from "../../shared/count-card"
import CountCardLoader from "../../shared/count-card/loader"
import _ from "lodash"

import OpenError from "./error"
import { IUserSession } from "../../types/user"
import { find } from "../../lib/strapi"

export const OpenJob = async ({
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

   const { style } = block || {}
   const { mobile, tab, desktop, backgroundColor, color } = style || {}
   const bgColor = backgroundColor || "#1CAF57"

   const { data: JobData, error: JobError } = await find(
      "api/metajob-backend/jobs",
      {
         fields: ["id"],
         filters: {
            owner: userId,
            job_status: "open"
         }
      },
      "no-store"
   )

   const openJob = JobData?.meta?.pagination.total || 0

   // Extract relevant data
   const componentData = block?.details || null

   return role === "employer" ? (
      <>
         {!componentData ? (
            <Grid item xs={mobile} sm={tab} md={desktop}>
               <CountCardLoader />
            </Grid>
         ) : (
            <Grid item xs={mobile} sm={tab} md={desktop}>
               <CountCard item={componentData} count={openJob} bgColor={bgColor} textColor={color} />
            </Grid>
         )}
      </>
   ) : (
      // Add message for candidate
      <Grid item xs={mobile} sm={tab} md={desktop}>
         <OpenError />
      </Grid>
   )
}

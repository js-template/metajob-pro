import { Grid } from "@mui/material"
import { CountCard } from "../../shared/count-card"
import TotalError from "./error"
import CountCardLoader from "../../shared/count-card/loader"
import { IUserSession } from "../../types/user"
import { find } from "../../lib/strapi"

export const TotalJobs = async ({ block, session }: { block: any; session?: IUserSession | null }) => {
   // Extract user session details
   const { user } = session || {}
   const { id: userId, role: userRole } = user || {}
   const role = userRole?.type || ""

   const componentData = block?.details || null

   const { style } = block || {}
   const { mobile, tab, desktop, backgroundColor, color } = style || {}
   const bgColor = backgroundColor || "#FB8B2F"

   const { data: JobData, error: JobError } = await find(
      "api/metajob-backend/jobs",
      {
         fields: ["id"],
         filters: {
            owner: userId
         }
      },
      "no-store"
   )

   const totalJob = JobData?.meta?.pagination.total || 0

   // Extract relevant data

   // If the user is not an employer, return an error message early
   if (role !== "employer") {
      return (
         <Grid item xs={mobile} sm={tab} md={desktop}>
            <TotalError />
         </Grid>
      )
   }

   // If data is not available yet, return a loading state
   if (!block) {
      return (
         <Grid item xs={mobile} sm={tab} md={desktop}>
            <CountCardLoader />
         </Grid>
      )
   }

   // Return the actual component once data is available
   return (
      <Grid item xs={mobile} sm={tab} md={desktop}>
         <CountCard item={componentData} count={totalJob} bgColor={bgColor} textColor={color} />
      </Grid>
   )
}

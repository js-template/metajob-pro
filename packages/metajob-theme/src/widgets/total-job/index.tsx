import { Grid } from "@mui/material"
import { CountCard } from "../../shared/count-card"
import TotalError from "./error"
import CountCardLoader from "../../shared/count-card/loader"
// import { countCardProps } from "../../shared/count-card/type"
import { IUserSession } from "../../types/user"
import { find } from "@/lib/strapi"

export const TotalJobs = async ({ block, session }: { block: any; session?: IUserSession | null }) => {
   // Extract user session details
   const { user } = session || {}
   const { id: userId, role: userRole } = user || {}
   const role = userRole?.type || ""

   const styleData = block?.style || {}

   // Fetch component data
   const { data, error } = await find(
      "api/padma-backend/private-frontpage",
      {
         populate: {
            role2Components: {
               on: {
                  "widget.total-job": {
                     populate: "*"
                  }
               }
            }
         }
      },
      "no-store"
   )

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

   console.log("Total Job Data", totalJob)

   // Extract relevant data
   const componentData =
      data?.data?.role2Components?.find((comp: any) => comp.__component === "widget.total-job")?.details || null

   // If the user is not an employer, return an error message early
   if (role !== "employer") {
      return (
         <Grid item xs={styleData?.mobile} sm={styleData?.tab} md={styleData?.desktop}>
            <TotalError />
         </Grid>
      )
   }

   // If data is not available yet, return a loading state
   if (!data && !error) {
      return (
         <Grid item xs={styleData?.mobile} sm={styleData?.tab} md={styleData?.desktop}>
            <CountCardLoader />
         </Grid>
      )
   }

   // Return the actual component once data is available
   return (
      <Grid item xs={styleData?.mobile} sm={styleData?.tab} md={styleData?.desktop}>
         <CountCard item={componentData} count={totalJob} />
      </Grid>
   )
}

import { Grid } from "@mui/material"
import { CountCard } from "../../shared/count-card"
import CountCardLoader from "../../shared/count-card/loader"
import useSWR from "swr"
import { fetcher } from "../../utils/swr-fetcher"
import _ from "lodash"
import { countCardProps } from "../../shared/count-card/type"
import OpenError from "./error"
import { IUserSession } from "../../types/user"
import { find } from "@/lib/strapi"

export const ClosedJob = async ({
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

   // Fetch component data
   const { data, error } = await find(
      "api/padma-backend/private-frontpage",
      {
         populate: {
            role2Components: {
               on: {
                  "widget.closed-job": {
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
            owner: userId,
            status: "open"
         }
      },
      "no-store"
   )

   const closedJob = JobData?.meta?.pagination.total || 0

   // Extract relevant data
   const componentData =
      data?.data?.role2Components?.find((comp: any) => comp.__component === "widget.closed-job")?.details || null

   const isLoading = !data && !error

   return role === "employer" ? (
      <>
         {isLoading ? (
            <Grid item xs={styleData?.mobile} sm={styleData?.tab} md={styleData?.desktop}>
               <CountCardLoader />
            </Grid>
         ) : (
            <Grid item xs={styleData?.mobile} sm={styleData?.tab} md={styleData?.desktop}>
               <CountCard item={componentData} count={closedJob} />
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

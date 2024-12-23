"use client"
import { Grid } from "@mui/material"
import useSWR from "swr"
import { fetcher } from "../../utils/swr-fetcher"
import _ from "lodash"
import { CountCard } from "../../shared/count-card"
import CountCardLoader from "../../shared/count-card/loader"
import { countCardProps } from "../../shared/count-card/type"
import TotalError from "./error"
import { IUserSession } from "../../types/user"

export const TotalList = ({
   block,
   session
}: {
   block: any
   session?: IUserSession | null | any
   data?: any
   language?: string
}) => {
   // session data destructuring
   const { user } = session || {}
   const { id: userId, role: userRole } = user || {}
   const role = userRole?.type || ""

   const queryParams = {
      fields: ["id"],
      filters: {
         owner: {
            id: userId
         }
      }
   }

   const totalList = (block?.details || {}) as countCardProps
   const styleData = block?.style || {}
   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = `/api/find?model=api/metajob-strapi/jobs&query=${queryString}&cache=no-store`

   const {
      data: countData,
      error,
      isLoading
   } = useSWR(apiUrl, block?.details?.dynamicCount && role === "employer" ? fetcher : null)
   const dynamicTotalList = _.get(countData, "meta.pagination.total", null)

   // TODO: We wnat move this role to pagel level and only in server side . actually we
   // we should only send the data that is required for the user
   return role === "employer" ? (
      <>
         {isLoading ? (
            <Grid item xs={styleData?.mobile} sm={styleData?.tab} md={styleData?.desktop}>
               <CountCardLoader />
            </Grid>
         ) : (
            <Grid item xs={styleData?.mobile} sm={styleData?.tab} md={styleData?.desktop}>
               <CountCard
                  item={{
                     ...totalList,
                     count: block?.details?.dynamicCount ? dynamicTotalList : totalList.count
                  }}
               />
            </Grid>
         )}
      </>
   ) : (
      <Grid item xs={styleData?.mobile} sm={styleData?.tab} md={styleData?.desktop}>
         <TotalError />
      </Grid>
   )
}

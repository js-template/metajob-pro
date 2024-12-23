"use client"
import { Grid } from "@mui/material"
import { CountCard } from "../../components/cards/count"
import CountCardLoader from "../../shared/count-card/loader"
import useSWR from "swr"
import { fetcher } from "../../utils/swr-fetcher"
import _ from "lodash"
import { countCardProps } from "../../shared/count-card/type"
import AppliedError from "./error"
import { IUserSession } from "../../types/user"

export const AppliedList = ({
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

   const totalList = block?.details || ({} as countCardProps)
   const styleData = block?.style || {}

   // Convert queryParams to a string for the URL
   const queryString = encodeURIComponent(JSON.stringify(queryParams))

   // Construct the API URL
   const apiUrl = `/api/find?model=api/metajob-strapi/applied-jobs&query=${queryString}&cache=no-store`

   const {
      data: countData,
      error,
      isLoading
   } = useSWR(apiUrl, block?.details?.dynamicCount && role === "candidate" ? fetcher : null)
   const dynamicTotalList = _.get(countData, "meta.pagination.total", null)

   return role === "candidate" ? (
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
                     count: block?.details?.dynamicCount ? dynamicTotalList : totalList?.count
                  }}
                  style={styleData}
               />
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

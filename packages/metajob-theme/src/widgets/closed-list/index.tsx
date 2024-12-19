"use client"
import { CountCard } from "../../components/cards/count"
import CountCardLoader from "../../shared/count-card/loader"
import _ from "lodash"

import { fetcher } from "../../utils/swr-fetcher"
import useSWR from "swr"
import { Grid } from "@mui/material"
import { countCardProps } from "../../shared/count-card/type"
import ClosedError from "./error"
import { IUserSession } from "../../types/user"

export const ClosedList = ({
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
         },
         status: "closed"
      }
   }

   const totalList = block?.details || ({} as countCardProps)
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
                  style={styleData}
               />
            </Grid>
         )}
      </>
   ) : (
      // Add message for candidate
      <Grid item xs={styleData?.mobile} sm={styleData?.tab} md={styleData?.desktop}>
         <ClosedError />
      </Grid>
   )
}

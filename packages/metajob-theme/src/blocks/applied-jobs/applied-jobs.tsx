"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import _ from "lodash"
import { FormControl, Grid, MenuItem, Pagination, Paper, Select, TextField, useTheme } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { boxHeaderData } from "./data"
import CIcon from "../../components/common/icon"
import ListsTable from "./table"
import { AccessError } from "../../shared/error-table"
import { IAppliedJobsBlock, IApplyJobData } from "./type"
import { find } from "../../lib/strapi"
import { TableFooterPagination } from "../../components/table-footer"

type Props = {
   block: IAppliedJobsBlock
   language?: string
   appliedJobsPre: IApplyJobData[]
}

const AppliedJobsClient = ({ block, language, appliedJobsPre }: Props) => {
   const theme = useTheme()

   // session data destructuring
   const { data: session } = useSession()
   const { user } = session || {}
   const { id: userId, role: userRole } = user || {}
   const role = userRole?.type || ""

   const { title, style, empty, table_config, table_head: tableHeader } = block || {}
   const { label: tableLabel, enable_search: enableSearch, search_placeholder, default_data_count } = table_config || {}

   //const [search, setSearch] = useState("")
   const [pagination, setPagination] = useState<{
      page: number
      pageSize: number
      pageCount: number
      total: number
   }>({
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 0
   })
   const [applicationData, setApplicationData] = useState<IApplyJobData[]>(appliedJobsPre)
   const [isLoading, setIsLoading] = useState(false)

   //  fetch applied-job from db
   useEffect(() => {
      const getAppliedJobs = async () => {
         setIsLoading(true)
         const { data: appliedJobsDataAll, error: resumeError } = await find(
            "api/metajob-backend/applied-jobs",
            {
               populate: "*",
               pagination: {
                  page: pagination.page,
                  pageSize: pagination.pageSize,
                  withCount: true
               },
               filters: {
                  owner: {
                     id: userId
                  }
                  // ...(search && {
                  //    $or: [
                  //       {
                  //          title: { $containsi: search }
                  //       },
                  //       {
                  //          slug: { $containsi: search }
                  //       },
                  //       {
                  //          description: { $containsi: search }
                  //       },
                  //       {
                  //          status: { $containsi: search }
                  //       }
                  //    ]
                  // })
               },
               locale: language ?? "en"
            },
            "no-store"
         )
         if (!resumeError) {
            setApplicationData(appliedJobsDataAll?.data)
            setPagination(appliedJobsDataAll?.meta?.pagination)
            setIsLoading(false)
         } else {
            setApplicationData([])
            setIsLoading(false)
         }
      }
      if (userId) {
         if (!userId) return
         getAppliedJobs()
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [userId, pagination?.page, pagination?.pageSize])

   return role === "candidate" ? (
      <Grid item xs={12}>
         <Paper
            elevation={0}
            sx={{
               width: "100%",
               border: "1px solid",
               borderColor: "divider",
               borderRadius: "12px",
               p: 0,
               mb: 5
            }}>
            <>
               <Box
                  sx={{
                     px: 3,
                     py: 2,
                     borderBottom: "1px solid",
                     borderColor: "divider",
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center",
                     gap: 3
                  }}>
                  <Typography
                     variant='body1'
                     fontWeight={700}
                     fontSize={{
                        xs: "1.25rem",
                        sm: "1.5rem"
                     }}
                     lineHeight={"24px"}>
                     {tableLabel}
                  </Typography>
               </Box>
               {/* table data filter actions input fields */}
               {/* {enableSearch && (
                     <Box
                        sx={{
                           px: 3,
                           py: 2,
                           borderBottom: "1px solid",
                           borderColor: "divider",
                           display: "flex",
                           gap: 3,
                           alignItems: "center",
                           flexWrap: "wrap"
                        }}>
                        
                        <FormControl size='small'>
                           <TextField
                              id='outlined-basic'
                              placeholder={boxHeaderData?.searchPlaceholder}
                              variant='outlined'
                              onChange={handleSearch}
                              InputProps={{
                                 endAdornment: (
                                    <CIcon
                                       icon='iconoir:search'
                                       size={24}
                                       sx={{
                                          color: theme.palette.text.secondary
                                       }}
                                    />
                                 )
                              }}
                              sx={{
                                 "& .MuiInputBase-input": {
                                    py: 1.2
                                 },
                                 "& .MuiInputBase-root": {
                                    minHeight: "40px !important",
                                    pl: theme.direction === "rtl" ? "10px !important" : "0px !important"
                                 }
                              }}
                           />
                        </FormControl>
                     </Box>
                  )} */}

               {/* Table */}
               <ListsTable
                  headCells={tableHeader}
                  data={applicationData}
                  isLoading={isLoading}
                  empty={empty}
                  pageSize={pagination.pageSize}
               />

               {/* Footer-pagination */}
               {pagination.pageCount > 0 && (
                  <TableFooterPagination pagination={pagination} setPagination={setPagination} />
               )}
            </>
         </Paper>
      </Grid>
   ) : (
      <AccessError roleValue={"Candidate"} />
   )
}

export default AppliedJobsClient

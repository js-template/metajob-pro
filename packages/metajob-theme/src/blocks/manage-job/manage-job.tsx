"use client"
import { FormControl, Grid, Paper, TextField, useTheme } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import _ from "lodash"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@mui/material"
import CIcon from "../../components/common/icon"
import ManageListsTable from "./table"
import { AccessError } from "../../shared/error-table"
import { IJobAttribute, IJobData, IManageJobBock } from "./types"
import AddJob from "./add-job"
import { find } from "../../lib/strapi"
import { getFeaturedCount } from "./hook"
import { TableFooterPagination } from "../../components/table-footer"

type Props = {
   block: IManageJobBock
   language?: string
   jobAttributes?: IJobAttribute
}

const ManageJobsClient = ({ block, language, jobAttributes }: Props) => {
   // session data destructuring
   const { data: session } = useSession()
   const { user } = session || {}
   const { id: userId, role: userRole } = user || {}
   const role = userRole?.type || ""

   const theme = useTheme()

   const { title, style, empty, table_config, table_head: tableHeader, add_button_placeholder } = block || {}
   const {
      label: tableLabel,
      enable_search,
      search_placeholder,
      default_data_count,
      per_page_placeholder
   } = table_config || {}

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
   const [addList, setAddList] = useState(false)
   const [search, setSearch] = useState("")
   const [jobsData, setJobsData] = useState<IJobData[]>([])
   const [isLoading, setIsLoading] = useState(false)
   const [jobCount, setJobCount] = useState({
      total: 0,
      featured: 0
   })
   const [isMute, setIsMute] = useState(false)

   //  fetch jobs from db
   useEffect(() => {
      const getJobsData = async () => {
         setIsLoading(true)
         const { data: jobsDataAll, error: jobError } = await find(
            "api/metajob-backend/jobs",
            {
               populate: {
                  applications: { count: true }
               },
               sort: ["createdAt:desc"],
               pagination: {
                  page: pagination.page,
                  pageSize: pagination.pageSize,
                  withCount: true
               },
               filters: {
                  owner: {
                     id: {
                        $eq: userId
                     }
                  },
                  ...(search && {
                     $or: [
                        {
                           title: { $containsi: search }
                        },
                        {
                           slug: { $containsi: search }
                        },
                        {
                           description: { $containsi: search }
                        },
                        {
                           job_status: { $containsi: search }
                        }
                     ]
                  })
               },
               locale: language ?? "en"
            },
            "no-store"
         )
         if (!jobError) {
            setJobsData(jobsDataAll?.data)
            setPagination(jobsDataAll?.meta?.pagination)
            const featuredJobCount = getFeaturedCount(jobsDataAll?.data)
            setJobCount({
               total: jobsDataAll?.data?.length || 0,
               featured: featuredJobCount || 0
            })
            setIsLoading(false)
         } else {
            setJobsData([])
            setJobCount({
               total: 0,
               featured: 0
            })
            setIsLoading(false)
         }
      }
      if (userId) {
         if (!userId) return
         getJobsData()
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [userId, pagination?.page, pagination?.pageSize, search, isMute])

   const handleMute = () => {
      setIsMute(!isMute)
   }

   // *** open add lists popup
   const handleAddList = () => {
      setAddList(true)
   }

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
   }

   return role === "employer" ? (
      <Grid item xs={12}>
         <Paper
            elevation={0}
            sx={{
               width: "100%",
               p: 0,
               mb: 5
            }}>
            {addList ? (
               <AddJob
                  handleClose={() => setAddList(false)}
                  userId={userId}
                  handleMute={handleMute}
                  jobAttributes={jobAttributes}
                  jobCount={jobCount}
                  language={language}
               />
            ) : (
               <Box
                  sx={{
                     border: "1px solid",
                     borderColor: "divider",
                     borderRadius: "12px"
                  }}>
                  <Box
                     sx={{
                        px: { xs: 2, md: 3 },
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
                        fontWeight={600}
                        fontSize={{
                           xs: 18,
                           sm: 24
                        }}>
                        {title}
                     </Typography>
                     <Button
                        color='primary'
                        variant='contained'
                        onClick={handleAddList}
                        sx={{
                           display: "flex",
                           gap: { xs: 0.5, md: 1 },
                           fontSize: { xs: 16, md: 18 },
                           justifyContent: "center",
                           alignItems: "center",
                           borderRadius: "8px",
                           textTransform: "capitalize",
                           boxShadow: "none",
                           px: { xs: 1, md: 1.5 },
                           minWidth: "auto",
                           color: (theme) => theme.palette.primary.contrastText + "!important",
                           "& svg": {
                              color: theme.palette.primary.contrastText + " !important"
                           }
                        }}>
                        <CIcon icon={"mdi:plus"} size={24} />
                        {add_button_placeholder || "Add Job"}
                     </Button>
                  </Box>
                  {/* table data filter actions input fields */}
                  {enable_search && (
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
                        {/* Search input */}
                        <FormControl size='small'>
                           <TextField
                              id='outlined-basic'
                              placeholder={search_placeholder}
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
                  )}

                  {/* Table */}
                  <ManageListsTable
                     headCells={tableHeader}
                     language={language}
                     data={jobsData}
                     blockData={block}
                     handleMute={handleMute}
                     isLoading={isLoading}
                     empty={empty}
                     pageSize={pagination.pageSize}
                     jobAttributes={jobAttributes}
                     jobCount={jobCount}
                  />

                  {/* Footer-pagination */}
                  {pagination.pageCount > 0 && (
                     <TableFooterPagination pagination={pagination} setPagination={setPagination} />
                  )}
               </Box>
            )}
         </Paper>
      </Grid>
   ) : (
      <AccessError />
   )
}
export default ManageJobsClient

"use client"
import _ from "lodash"
import { FormControl, InputLabel, MenuItem, Pagination, Select, useTheme } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { showingPerPage } from "./data"
import CIcon from "../common/icon"

type Props = {
   per_page_placeholder?: string
   pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
   }
   setPagination: (pagination: { page: number; pageSize: number; pageCount: number; total: number }) => void
}

export const TableFooterPagination = ({ per_page_placeholder, pagination, setPagination }: Props) => {
   const theme = useTheme()

   return (
      <Box
         sx={{
            py: 2.5,
            px: 3,
            borderTop: "1px solid",
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
         }}>
         {/* per-page-select  */}
         <Box
            sx={{
               display: "flex",
               gap: 1,
               alignItems: "center",
               minWidth: { xs: "90px", sm: "180px" }
            }}>
            <FormControl fullWidth>
               <InputLabel id='show_per_page-label'> {per_page_placeholder || "Show"} </InputLabel>
               <Select
                  label='Age'
                  labelId='show_per_page-label'
                  id='show_per_page'
                  autoWidth
                  defaultValue={pagination.pageSize}
                  onChange={(e) => {
                     setPagination({ ...pagination, pageSize: e.target.value as number })
                  }}
                  renderValue={(selected) => {
                     const selectedValue = selected as number

                     return (
                        <Typography variant='body1' fontWeight={500} lineHeight={"24px"}>
                           {selectedValue}
                        </Typography>
                     )
                  }}
                  IconComponent={() => (
                     <CIcon
                        icon='iconamoon:arrow-down-2-duotone'
                        size={20}
                        sx={{
                           position: "absolute",
                           right: "8px",
                           top: "50%",
                           transform: "translateY(-50%)",
                           pointerEvents: "none"
                        }}
                     />
                  )}
                  sx={{
                     backgroundColor: (theme) => theme.palette.text.primary + "10",
                     borderRadius: "8px",
                     borderColor: "divider",
                     minWidth: "70px",
                     "& .MuiSelect-select": {
                        px: 1.8,
                        py: 1
                     }
                  }}>
                  {_.map(showingPerPage?.options, (option, index) => (
                     <MenuItem key={index} value={option}>
                        {option}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </Box>
         {/* pagination  */}
         <Box>
            {pagination.pageCount > 0 && (
               <Pagination
                  count={pagination.pageCount}
                  variant='text'
                  shape='rounded'
                  color='primary'
                  size='large'
                  siblingCount={0}
                  onChange={(event, page) => {
                     setPagination({ ...pagination, page })
                  }}
                  dir={theme.direction}
                  sx={{
                     "& li": {
                        borderRadius: 0,
                        height: "40px",
                        margin: 0
                     },
                     "& .MuiButtonBase-root": {
                        margin: 0,
                        border: "none",
                        borderLeft: "1px solid",
                        borderTop: "1px solid",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        borderRadius: 0,
                        "&:hover": {
                           backgroundColor: (theme) => theme.palette.action.hover
                        }
                     },
                     "& li:last-child .MuiButtonBase-root": {
                        borderRadius: theme.direction === "rtl" ? "6px 0px 0px 6px" : "0px 6px 6px 0px",
                        borderRight: "1px solid",
                        borderColor: "divider"
                     },
                     "& li:first-child .MuiButtonBase-root": {
                        borderRadius: theme.direction === "rtl" ? "0px 6px 6px 0px" : "6px 0px 0px 6px",
                        borderLeft: "1px solid",
                        borderColor: "divider"
                     },
                     "& .MuiPaginationItem-ellipsis": {
                        borderTop: "1px solid",
                        borderBottom: "1px solid",
                        borderLeft: "1px solid",
                        borderColor: "divider",
                        height: "100%",
                        margin: 0,
                        borderRadius: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                     }
                  }}
               />
            )}
         </Box>
      </Box>
   )
}

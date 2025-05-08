"use client"
import { Fragment, useEffect, useRef, useState } from "react"
import {
   Box,
   Typography,
   useTheme,
   TextField,
   IconButton,
   Grid,
   Container,
   Stack,
   Pagination,
   PaginationItem,
   Icon
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import ModalWrapper from "./modal-wrapper"
import CIcon from "../../../components/common/icon"
import { find } from "../../../lib/strapi"
import { JobItem } from "../../../components/cards/job-item"
import ListCardLoader from "./loader"

type Props = {
   open: boolean
   handleClose: () => void
   language?: string
}

const SearchModal = ({ open, handleClose, language }: Props) => {
   const theme = useTheme()
   const searchInputRef = useRef<any>(null)
   const [searchResults, setSearchResults] = useState<any[] | []>([])
   const [searchTerm, setSearchTerm] = useState("")
   const [searchLoader, setSearchLoader] = useState(false)
   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
   const [page, setPage] = useState<number>(1)
   const [totalPage, setTotalPage] = useState(0)
   // clear-search handler
   const handleClearSearch = () => {
      setSearchTerm("")
      setSearchResults([])
   }

   // Update debouncedSearchTerm after a delay
   useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedSearchTerm(searchTerm)
      }, 400) // Delay of 400ms

      return () => {
         clearTimeout(handler) // Clear timeout if searchTerm changes
      }
   }, [searchTerm])

   // search whenever debouncedSearchTerm changes
   useEffect(() => {
      const fetchSearchResults = async () => {
         if (debouncedSearchTerm.length > 0) {
            try {
               setSearchLoader(true)
               const { data: jobsDataAll, error: jobDataError } = await find(
                  "api/metajob-backend/jobs",
                  {
                     filters: {
                        title: {
                           $containsi: debouncedSearchTerm || undefined
                        },

                        job_status: "open"
                     },
                     populate: {
                        company: {
                           populate: {
                              logo: {
                                 fields: ["url"]
                              }
                           }
                        },
                        type: {
                           fields: ["title"]
                        },
                        category: {
                           fields: ["title"]
                        }
                     },
                     pagination: {
                        pageSize: 12,
                        page: page
                     },
                     publicationState: "live",
                     locale: language ?? "en"
                  },
                  "no-store"
               )
               if (!jobDataError) {
                  setSearchResults(jobsDataAll?.data)
                  setTotalPage(jobsDataAll?.meta?.pagination?.pageCount || 0)
               } else {
                  setSearchResults([])
               }
            } catch (error) {
               console.error("Error fetching search results:", error)
            } finally {
               setSearchLoader(false)
            }
         } else {
            setSearchResults([])
            setSearchLoader(false)
         }
      }

      fetchSearchResults()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [debouncedSearchTerm, page])

   // Focus the input when the modal opens
   useEffect(() => {
      if (open && searchInputRef.current) {
         searchInputRef.current.focus()
      }
   }, [open])

   return (
      <Fragment>
         <ModalWrapper
            open={open}
            handleClose={() => {
               handleClose()
               setSearchTerm("")
               setSearchResults([])
            }}
            title='Search Jobs'
            width='100%'
            height='100%'
            plain>
            {/* content  */}
            <Container maxWidth='lg' sx={{ py: 2 }}>
               <Box
                  sx={{
                     p: 3
                  }}>
                  <Box sx={{ minHeight: "70vh", mt: 3 }}>
                     {/* Search input */}
                     <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                        <Box sx={{ position: "relative", display: "flex", width: { md: "100%" }, maxWidth: "1024px" }}>
                           <IconButton
                              sx={{
                                 width: { xs: "42px", md: "60px" },
                                 borderRadius: "50px 0 0 50px",
                                 bgcolor: "primary.main",
                                 color: "background.default",
                                 "&:hover": {
                                    bgcolor: "primary.main"
                                 }
                              }}>
                              <SearchIcon />
                           </IconButton>
                           {/* Input Field */}
                           <TextField
                              autoFocus
                              inputRef={searchInputRef}
                              value={searchTerm || ""}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              fullWidth
                              placeholder='Search'
                              InputProps={{
                                 sx: {
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0
                                 }
                              }}
                              sx={{
                                 "& .MuiOutlinedInput-root": {
                                    height: "100%",
                                    borderRadius: "0 50px 50px 0"
                                 }
                              }}
                           />
                           {/* Clear Icon */}
                           {searchTerm && (
                              <IconButton
                                 color='inherit'
                                 onClick={handleClearSearch}
                                 edge='start'
                                 sx={{
                                    height: "42px",
                                    width: "42px",
                                    borderRadius: "8px",
                                    position: "absolute",
                                    right: 1,
                                    top: 10
                                 }}>
                                 <CIcon
                                    icon='oui:cross'
                                    fontSize={"16px"}
                                    sx={{
                                       color: theme.palette.text.primary
                                    }}
                                 />
                              </IconButton>
                           )}
                        </Box>
                     </Box>

                     {/* search result items  */}
                     {!searchLoader && searchResults && searchResults?.length > 0 && (
                        <Box sx={{ mt: 6 }}>
                           <Grid container spacing={2} rowSpacing={4}>
                              {searchResults?.map((item, index) => (
                                 <Grid item xs={12} sm={6} md={4} key={index}>
                                    <JobItem
                                       data={item}
                                       // button_label={card_button?.label}
                                       // color={color}
                                       // secondary_color={secondary_color}
                                    />
                                 </Grid>
                              ))}
                           </Grid>
                        </Box>
                     )}

                     {/* loader  */}
                     {searchLoader && (
                        <Box sx={{ position: "relative", mt: 6 }}>
                           <Grid container spacing={3} rowSpacing={4}>
                              {Array.from({ length: 15 }).map((_, index) => (
                                 <Grid item xs={12} sm={6} md={4} key={index}>
                                    <ListCardLoader />
                                 </Grid>
                              ))}
                           </Grid>
                        </Box>
                     )}

                     {/* empty data  */}
                     {!searchLoader &&
                        debouncedSearchTerm &&
                        debouncedSearchTerm?.length > 0 &&
                        searchResults &&
                        searchResults?.length === 0 && (
                           <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                              <Box sx={{ width: "100%", px: 2, py: 5, textAlign: "center" }}>
                                 <Typography variant='h6'>No data found</Typography>
                                 <Typography variant='body2'>Please try with different words</Typography>
                              </Box>
                           </Box>
                        )}
                  </Box>
                  {/* Pagination */}
                  {!searchLoader && totalPage > 0 && searchResults?.length > 0 && (
                     <Stack
                        sx={{
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "center",
                           py: 4
                        }}>
                        <Pagination
                           variant='outlined'
                           shape='rounded'
                           count={totalPage}
                           renderItem={(item) => (
                              <PaginationItem
                                 {...item}
                                 components={{
                                    previous: (props) => <Icon {...props} className='icon-arrow-left-circle' />,
                                    next: (props) => <Icon {...props} className='icon-arrow-right-circle' />
                                 }}
                                 sx={{
                                    fontWeight: 400,
                                    fontSize: 16,
                                    color: (theme) => theme.palette.text.disabled,
                                    border: "none",
                                    height: 40,
                                    width: 40,

                                    "&.Mui-selected": {
                                       color: (theme) => theme.palette.primary.contrastText,
                                       backgroundColor: (theme) => theme.palette.primary.main,
                                       "&:hover": {
                                          backgroundColor: (theme) => theme.palette.secondary.main,
                                          color: (theme) => theme.palette.secondary.contrastText
                                       }
                                    },
                                    ...(item.type === "previous" || item.type === "next"
                                       ? {
                                            backgroundColor: (theme) => theme.palette.background.default
                                         }
                                       : {
                                            backgroundColor: (theme) => theme.palette.background.paper
                                         })
                                 }}
                              />
                           )}
                           page={page}
                           onChange={(e, value) => {
                              setPage(value)
                           }}
                        />
                     </Stack>
                  )}
               </Box>
            </Container>
         </ModalWrapper>
      </Fragment>
   )
}

export default SearchModal

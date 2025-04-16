"use client"
import { Fragment, useEffect, useRef, useState } from "react"
import { Box, Typography, useTheme, TextField, IconButton, Grid, Skeleton, Paper } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import ModalWrapper from "./modal-wrapper"
import CIcon from "../../../components/common/icon"

type Props = {
   open: boolean
   handleClose: () => void
}

const SearchModal = ({ open, handleClose }: Props) => {
   const theme = useTheme()
   const searchInputRef = useRef<any>(null)
   const [searchResults, setSearchResults] = useState<any[] | []>([])
   const [searchTerm, setSearchTerm] = useState("")
   const [searchLoader, setSearchLoader] = useState(false)
   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

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

               setSearchResults([])
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
   }, [debouncedSearchTerm])

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
            <Box
               sx={{
                  p: 3
               }}>
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
                     <Grid container spacing={2} rowSpacing={4} columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 15 }}>
                        {searchResults?.map((item, index) => (
                           <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                              {/* <SearchItemCard data={item} sm /> */}
                           </Grid>
                        ))}
                     </Grid>
                  </Box>
               )}
               {/* loader  */}
               {searchLoader && (
                  <Box sx={{ position: "relative", mt: 6 }}>
                     <Grid container spacing={3} rowSpacing={4} columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 15 }}>
                        {Array.from({ length: 15 }).map((_, index) => (
                           <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                              <Paper
                                 elevation={2}
                                 sx={{
                                    width: "100%",
                                    bgcolor: "background.default",
                                    borderRadius: 2,
                                    boxShadow: "none"
                                 }}>
                                 {/* Top Image */}
                                 <Box sx={{ position: "relative" }}>
                                    <Skeleton
                                       variant='rectangular'
                                       sx={{
                                          height: "11rem",
                                          width: "100%",
                                          borderRadius: 2,
                                          bgcolor: "grey.300"
                                       }}
                                    />
                                 </Box>

                                 {/* Bottom Text */}
                                 <Box sx={{ p: 1 }}>
                                    <Skeleton
                                       variant='rectangular'
                                       sx={{
                                          height: "1rem",
                                          width: "80%",
                                          borderRadius: 1,
                                          bgcolor: "grey.300"
                                       }}
                                    />
                                    <Skeleton
                                       variant='rectangular'
                                       sx={{
                                          mt: 1,
                                          height: "0.75rem",
                                          width: "90%",
                                          borderRadius: 1,
                                          bgcolor: "grey.300"
                                       }}
                                    />
                                 </Box>
                              </Paper>
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
         </ModalWrapper>
      </Fragment>
   )
}

export default SearchModal

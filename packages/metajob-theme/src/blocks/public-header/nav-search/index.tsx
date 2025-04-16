"use client"
import { useRef, useState } from "react"
import { useTheme } from "next-themes"
import { TextField, IconButton, Box, useTheme as muiTheme } from "@mui/material"
import CIcon from "../../../components/common/icon"
import SearchModal from "./search-modal"

const NavSearch = () => {
   const theme = muiTheme()
   const { theme: mode } = useTheme()

   // search modal states
   const hasFetched = useRef(false)
   const [openSearch, setOpenSearch] = useState(false)

   // primary popup handler
   const handleOpenPrimary = () => setOpenSearch(true)
   const handleClosePrimary = () => {
      setOpenSearch(false)
   }

   return (
      <Box
         sx={{
            display: "flex",
            flex: 1,
            justifyContent: { xs: "center", md: "center" },
            width: "100%"
         }}>
         <Box
            onClick={() => {
               handleOpenPrimary()
            }}
            sx={{
               display: "flex",
               width: { md: "100%" },
               maxWidth: "500px"
            }}>
            {/* Input Field */}
            <TextField
               fullWidth
               placeholder='Search..'
               // search-icon
               InputProps={{
                  readOnly: true,
                  endAdornment: (
                     <CIcon
                        icon='iconoir:search'
                        size={20}
                        sx={{
                           mx: 1
                        }}
                     />
                  )
               }}
               variant='outlined'
               size='small'
               sx={{
                  display: { xs: "none", sm: "flex" },
                  borderColor: (theme) => theme.palette.divider,
                  "& .MuiOutlinedInput-root": {
                     borderRadius: "50px",
                     height: "40px",
                     bgcolor: (theme) => theme.palette.background.default
                  }
               }}
            />

            <IconButton
               sx={{
                  display: {
                     xs: "flex",
                     p: 1,
                     sm: "none",
                     background: theme.palette.background.default,
                     "&:hover": {
                        background: theme.palette.background.default
                     }
                  }
               }}>
               <CIcon icon='iconoir:search' size={20} sx={{}} />
            </IconButton>
         </Box>

         {/* Search Modal  */}
         <SearchModal open={openSearch} handleClose={handleClosePrimary} />
      </Box>
   )
}

export default NavSearch

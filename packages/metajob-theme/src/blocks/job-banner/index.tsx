"use client"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Box, Container, Divider, FormControl, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Button } from "@mui/material"
import { Card } from "../../components/common/card"
import CIcon from "../../components/common/icon"
import useSWR from "swr"
import { categoryFetcher } from "./hook"
import { IBannerBlock, ICategory, IUserSession } from "./types"

type Props = {
   block: IBannerBlock
   data: any
   language?: string
   session?: IUserSession | null | any
}
export const JobBanner = ({ block, language }: Props) => {
   const { content, search, image } = block || {}
   const { title, sub_title } = content || {}
   const { search_placeholder, location_placeholder, category_placeholder, button_placeholder } = search || {}
   const bannerBackground = image?.url || ""

   const router = useRouter()
   const [searchText, setSearchText] = useState("")
   const [searchLocation, setSearchLocation] = React.useState("")
   const [searchCategory, setSearchCategory] = React.useState("")

   const { theme: mode } = useTheme()
   const getBgColorWithImage = (theme: any) => {
      if (mode === "dark") {
         return `linear-gradient(0deg,${hexToRGBA(theme.palette.background.default, 0.7)},${hexToRGBA(theme.palette.background.default, 0.7)}), url(${bannerBackground})`
      } else {
         return `linear-gradient(0deg,${hexToRGBA(theme.palette.primary.main, 0.7)},${hexToRGBA(theme.palette.primary.main, 0.7)}), url(${bannerBackground})`
      }
   }

   const handleSearch = () => {
      // route with search query : endpoint is find-jobs
      const queryParams = []

      if (searchText) {
         queryParams.push(`search=${encodeURIComponent(searchText)}`)
      }

      if (searchLocation) {
         queryParams.push(`location=${encodeURIComponent(searchLocation)}`)
      }
      if (searchCategory && searchCategory !== "Select Category") {
         queryParams.push(`category=${encodeURIComponent(searchCategory)}`)
      }

      const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : ""

      const url = `/find-job${queryString}`

      router.push(url, {
         scroll: false
      })
   }

   // fetch category data
   const categoryQueryParams = {
      fields: ["title"]
      // locale: language ? [language] : ["en"]
   }
   const categoryQueryString = encodeURIComponent(JSON.stringify(categoryQueryParams))
   const categoryAPiUrl = `/api/find?model=api/metajob-backend/job-categories&query=${categoryQueryString}`
   const { data: categories, isLoading: categoryIsLoading } = useSWR(categoryAPiUrl, categoryFetcher, {
      fallbackData: []
   })

   return (
      <Box
         sx={{
            // height: 'calc(100vh - 180px)',
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: (theme) => getBgColorWithImage(theme),
            backgroundSize: "cover",
            backgroundPosition: "center",
            textAlign: "center",
            padding: "5rem 2rem"
         }}>
         <Container maxWidth='md'>
            <Stack spacing={5}>
               <Stack
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center"
                  }}>
                  <Typography
                     variant='h1'
                     fontSize={{
                        md: 64,
                        xs: 40
                     }}
                     fontWeight={700}
                     maxWidth={650}
                     textAlign={"center"}
                     color={(theme) => theme.palette.primary.contrastText}>
                     {title}
                  </Typography>
                  <Typography
                     fontSize={24}
                     maxWidth={650}
                     textAlign={"center"}
                     fontWeight={400}
                     color={(theme) => theme.palette.primary.contrastText}>
                     {sub_title}
                  </Typography>
               </Stack>
               <Card
                  sx={{
                     bgcolor:
                        mode === "light"
                           ? (theme) => hexToRGBA(theme.palette.primary.main, 0.5)
                           : (theme) => hexToRGBA(theme.palette.background.default, 0.5)
                  }}>
                  <Stack
                     direction={{
                        sm: "row"
                     }}
                     gap={1}
                     p={{
                        xs: 2,
                        sm: 0
                     }}
                     sx={{
                        borderRadius: "1rem",
                        bgcolor: (theme) => theme.palette.background.paper,
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                     }}>
                     <TextField
                        sx={{
                           "& .MuiOutlinedInput-root": {
                              border: "none"
                           }
                        }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        fullWidth
                        placeholder={search_placeholder}
                        InputProps={{
                           startAdornment: (
                              <Box sx={{ pr: 1 }} component={"span"}>
                                 <CIcon icon='iconamoon:search-light' />
                              </Box>
                           )
                        }}
                     />
                     <Divider orientation='vertical' flexItem />
                     <Divider orientation='horizontal' flexItem />
                     <TextField
                        placeholder={location_placeholder}
                        InputProps={{
                           startAdornment: (
                              <Box sx={{ pr: 1 }} component={"span"}>
                                 <CIcon icon='ph:map-pin' />
                              </Box>
                           )
                        }}
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        sx={{
                           "& .MuiOutlinedInput-root": {
                              border: "none"
                           }
                        }}
                        fullWidth
                     />
                     <Divider orientation='vertical' flexItem />
                     <Divider orientation='horizontal' flexItem />
                     {/* category options  */}
                     <FormControl fullWidth>
                        <Select
                           sx={{
                              "& .MuiSelect-select": {
                                 "&.MuiSelect-standard": {
                                    backgroundColor: (theme) => theme.palette.background.paper + " !important"
                                 }
                              },
                              px: 2,
                              textAlign: "left",
                              color: "text.disabled",
                              fontWeight: 400,
                              fontSize: 16
                           }}
                           variant='standard'
                           disableUnderline
                           value={searchCategory || "Select Category"}
                           onChange={(e) => setSearchCategory(e.target.value)}>
                           <MenuItem value={"Select Category"}>{category_placeholder || "Select Category"}</MenuItem>
                           {categoryIsLoading && <MenuItem value={""}>Loading..</MenuItem>}
                           {categories &&
                              categories?.map((item: ICategory, index: number) => (
                                 <MenuItem key={index} value={item?.title}>
                                    {item?.title}
                                 </MenuItem>
                              ))}
                        </Select>
                     </FormControl>
                     <Button
                        variant='contained'
                        size='medium'
                        sx={{ my: 1, ml: 2, mr: 2, px: 5 }}
                        onClick={handleSearch}>
                        {button_placeholder || "Search"}
                     </Button>
                  </Stack>
               </Card>
               {/* <Stack
                  sx={{
                     display: "grid",
                     gridTemplateColumns: {
                        lg: "repeat(3, 1fr)",
                        xs: "1fr"
                     },
                     gap: 5
                  }}>
                  {_.map([1, 2, 3], (item, index) => (
                     <Card
                        key={index}
                        sx={{
                           borderRadius: "8px",
                           p: 5,
                           bgcolor: (theme) => hexToRGBA(theme.palette.background.default, 0.9)
                        }}>
                        <Stack alignItems={"center"} gap={2}>
                           <Icon
                              sx={{
                                 fontSize: "3rem",
                                 color: (theme) => theme.palette.primary.main
                              }}
                              className={item?.icon}
                           />
                           <Stack spacing={1}>
                              <Typography
                                 variant={"h1"}
                                 fontSize={32}
                                 fontWeight={700}
                                 color={(theme) => theme.palette.text.primary}>
                                 {"100"} +
                              </Typography>
                              <Typography
                                 variant={"h4"}
                                 fontSize={16}
                                 fontWeight={500}
                                 color={(theme) => theme.palette.text.disabled}>
                                 {"Total Jobs"}
                              </Typography>
                           </Stack>
                        </Stack>
                     </Card>
                  ))}
               </Stack> */}
            </Stack>
         </Container>
      </Box>
   )
}

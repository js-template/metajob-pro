"use client"
import React, { useState } from "react"
import NextLink from "next/link"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import _ from "lodash"
import { usePlacesWidget } from "react-google-autocomplete"
import {
   Box,
   Button,
   Container,
   Divider,
   FormControl,
   MenuItem,
   Select,
   Stack,
   TextField,
   Typography
} from "@mui/material"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Card } from "../../components/common/card"
import CIcon from "../../components/common/icon"
import { IBannerBlock, ICategory, ICountData } from "./types"

type Props = {
   block: IBannerBlock
   language?: string
   categoryData?: ICategory[]
   countData?: ICountData
}

export const JobBannerClient = ({ block, categoryData, countData }: Props) => {
   const { theme: mode } = useTheme()

   const {
      content,
      search,
      image,
      job_count_placeholder,
      company_count_placeholder,
      resume_count_placeholder,
      show_count,
      button,
      style
   } = block || {}
   const {
      backgroundColor,
      color,
      secondary_color,
      header_color,
      sub_header_color,
      bg_overlay,
      header_width,
      section_padding
   } = style || {}
   const { label, link, target, disabled } = button || {}
   const { title, sub_title } = content || {}
   const { search_placeholder, location_placeholder, category_placeholder, button_placeholder } = search || {}
   const bannerBackground = image?.url
      ? image.url.startsWith("http")
         ? image.url
         : `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`
      : ""

   const router = useRouter()
   const [searchText, setSearchText] = useState("")
   const [searchLocation, setSearchLocation] = React.useState("")
   const [searchCategory, setSearchCategory] = React.useState("")

   const { ref: materialRef } = usePlacesWidget({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
      onPlaceSelected: (place) => {
         setSearchLocation(place?.formatted_address as string)
      }
   })

   const handleSearch = () => {
      // route with search query : endpoint is find-jobs
      const queryParams: string[] = []

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

   const noOverLay = bg_overlay === 0
   return (
      <Box
         sx={{
            position: "relative",
            // height: 'calc(100vh - 180px)',
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: bannerBackground ? `url(${bannerBackground})` : "",
            bgcolor: backgroundColor ? backgroundColor : "primary.main",
            backgroundSize: "cover",
            backgroundPosition: "center",
            textAlign: "center",
            px: { xs: 0.5, md: 4 },
            py: { xs: 4, sm: 8, md: section_padding || 10 },
            "&::before": {
               content: '""',
               position: "absolute",
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               backgroundColor:
                  mode === "light"
                     ? (theme) =>
                          hexToRGBA(backgroundColor || theme.palette.primary.main, noOverLay ? 0 : bg_overlay || 0.7)
                     : (theme) => hexToRGBA(theme.palette.background.default, noOverLay ? 0 : bg_overlay || 0.7),
               zIndex: 1
            },
            "& > *": {
               position: "relative",
               zIndex: 2
            }
         }}>
         <Container maxWidth='md'>
            <Stack spacing={{ xs: 2, md: 5 }}>
               <Stack
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center"
                  }}>
                  <Typography
                     variant='h1'
                     fontWeight={700}
                     maxWidth={header_width === "Full" ? "100%" : 650}
                     textAlign={"center"}
                     sx={{
                        fontSize: { xs: 36, md: 64 },
                        color: (theme) =>
                           mode === "light"
                              ? header_color || theme.palette.primary.contrastText
                              : theme.palette.primary.contrastText
                     }}>
                     {title}
                  </Typography>
                  <Typography
                     maxWidth={header_width === "Full" ? "100%" : 650}
                     textAlign={"center"}
                     fontWeight={400}
                     sx={{
                        fontSize: { xs: 20, md: 24 },
                        color: (theme) =>
                           mode === "light"
                              ? sub_header_color || theme.palette.primary.contrastText
                              : theme.palette.primary.contrastText
                     }}>
                     {sub_title}
                  </Typography>
               </Stack>
               {/* search  */}
               {search && (
                  <Card
                     sx={{
                        bgcolor:
                           mode === "light"
                              ? (theme) => hexToRGBA(backgroundColor || theme.palette.primary.main, 0.5)
                              : (theme) => hexToRGBA(backgroundColor || theme.palette.background.default, 0.5)
                     }}>
                     <Stack
                        direction={{
                           sm: "row"
                        }}
                        p={{
                           xs: 1,
                           sm: 0
                        }}
                        sx={{
                           borderRadius: "1rem",
                           bgcolor: (theme) => theme.palette.background.paper,
                           overflow: "hidden",
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "center",
                           gap: 0.5
                        }}>
                        <TextField
                           sx={{
                              "& .MuiOutlinedInput-root": {
                                 border: "none"
                              },
                              "& .MuiInputBase-input": {
                                 py: { xs: 1, sm: 1.5, md: 2 }
                              }
                           }}
                           value={searchText}
                           onChange={(e) => setSearchText(e.target.value)}
                           fullWidth
                           placeholder={search_placeholder || "Search"}
                           InputProps={{
                              startAdornment: (
                                 <Box sx={{ pr: 1 }} component={"span"}>
                                    <CIcon
                                       icon='iconamoon:search-light'
                                       sx={{
                                          color: (theme) =>
                                             mode === "light"
                                                ? secondary_color || theme.palette.text.disabled
                                                : theme.palette.text.disabled
                                       }}
                                    />
                                 </Box>
                              )
                           }}
                        />
                        <Divider orientation='vertical' flexItem />
                        <Divider orientation='horizontal' flexItem />
                        {/* location  */}
                        <TextField
                           sx={{
                              "& .MuiOutlinedInput-root": {
                                 border: "none"
                              },
                              "& .MuiInputBase-input": {
                                 py: { xs: 1, sm: 1.5, md: 2 }
                              }
                           }}
                           placeholder={location_placeholder}
                           inputRef={materialRef}
                           InputProps={{
                              startAdornment: (
                                 <Box sx={{ pr: 1 }} component={"span"}>
                                    <CIcon
                                       icon='ph:map-pin'
                                       sx={{
                                          color: (theme) =>
                                             mode === "light"
                                                ? secondary_color || theme.palette.text.disabled
                                                : theme.palette.text.disabled
                                       }}
                                    />
                                 </Box>
                              )
                           }}
                           fullWidth
                        />

                        <Divider orientation='vertical' flexItem />
                        <Divider orientation='horizontal' flexItem />
                        {/* category options  */}
                        <FormControl fullWidth>
                           <Select
                              sx={{
                                 color: (theme) =>
                                    mode === "light"
                                       ? secondary_color || theme.palette.text.disabled
                                       : theme.palette.text.disabled,
                                 "& .MuiSelect-select": {
                                    "&.MuiSelect-standard": {
                                       backgroundColor: (theme) => theme.palette.background.paper + " !important"
                                    }
                                 },
                                 px: 2,
                                 textAlign: "left",
                                 fontWeight: 400,
                                 fontSize: 16
                              }}
                              variant='standard'
                              disableUnderline
                              value={searchCategory || "Select Category"}
                              onChange={(e) => setSearchCategory(e.target.value)}>
                              <MenuItem
                                 value={"Select Category"}
                                 sx={{
                                    color: (theme) =>
                                       mode === "light"
                                          ? secondary_color || theme.palette.text.disabled
                                          : theme.palette.text.disabled
                                 }}>
                                 {category_placeholder || "Select Category"}
                              </MenuItem>
                              {categoryData &&
                                 categoryData?.length > 0 &&
                                 categoryData?.map((item: ICategory, index: number) => (
                                    <MenuItem
                                       key={index}
                                       value={item?.title}
                                       sx={{
                                          color: (theme) =>
                                             mode === "light"
                                                ? secondary_color || theme.palette.text.disabled
                                                : theme.palette.text.disabled
                                       }}>
                                       {item?.title}
                                    </MenuItem>
                                 ))}
                           </Select>
                        </FormControl>
                        <Box
                           sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              pt: { xs: 2, sm: 0 },
                              pb: { xs: 0.5, sm: 0 },
                              px: 1.5
                           }}>
                           <Button
                              variant='contained'
                              size='medium'
                              sx={{
                                 background: mode === "light" ? backgroundColor || "primary.main" : "primary.main",
                                 color: (theme) =>
                                    mode === "light"
                                       ? color || theme.palette.primary.contrastText
                                       : theme.palette.primary.contrastText,
                                 px: 2,
                                 py: { xs: 0.5, md: 1 },
                                 fontSize: { xs: 15, sm: 16 }
                              }}
                              onClick={handleSearch}>
                              {button_placeholder || "Search"}
                           </Button>
                        </Box>
                     </Stack>
                  </Card>
               )}

               {/* count  */}
               {show_count && (
                  <Stack
                     sx={{
                        display: "grid",
                        gridTemplateColumns: {
                           sm: "repeat(3, 1fr)",
                           xs: "repeat(3, 1fr)"
                        },
                        gap: { xs: 1, sm: 3, md: 4, lg: 5 }
                     }}>
                     <Card
                        sx={{
                           borderRadius: "8px",
                           py: { xs: 1, sm: 3, md: 4, lg: 5 },
                           px: { xs: 2, sm: 3, md: 4, lg: 5 },
                           bgcolor: (theme) => theme.palette.background.default
                        }}>
                        <Stack alignItems={"center"} gap={{ xs: 1, sm: 2, md: 2 }}>
                           <CIcon
                              sx={{
                                 fontSize: { xs: 28, sm: 40, md: 48 },
                                 color: (theme) => backgroundColor || theme.palette.primary.main
                              }}
                              icon={"mdi:nfc-search-variant"}
                           />
                           <Stack spacing={{ xs: 0.5, sm: 1 }}>
                              <Typography
                                 variant={"h4"}
                                 sx={{
                                    color: (theme) =>
                                       mode === "light"
                                          ? color || theme.palette.text.primary
                                          : theme.palette.text.primary,
                                    fontSize: { xs: 20, sm: 28, md: 32 },
                                    fontWeight: { xs: 500, sm: 700 }
                                 }}>
                                 {countData?.job}+
                              </Typography>
                              <Typography
                                 variant={"h6"}
                                 fontSize={16}
                                 fontWeight={500}
                                 sx={{
                                    color: (theme) =>
                                       mode === "light"
                                          ? secondary_color || theme.palette.text.disabled
                                          : theme.palette.text.disabled,
                                    fontSize: { xs: 12, sm: 16, md: 16 },
                                    // line clamp 1
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    WebkitLineClamp: 1
                                 }}>
                                 {job_count_placeholder || "Job Available"}
                              </Typography>
                           </Stack>
                        </Stack>
                     </Card>
                     <Card
                        sx={{
                           borderRadius: "8px",
                           py: { xs: 1, sm: 3, md: 4, lg: 5 },
                           px: { xs: 2, sm: 3, md: 4, lg: 5 },
                           bgcolor: (theme) => theme.palette.background.default
                        }}>
                        <Stack alignItems={"center"} gap={{ xs: 1, sm: 2, md: 2 }}>
                           <CIcon
                              sx={{
                                 fontSize: { xs: 28, sm: 40, md: 48 },
                                 color: (theme) => backgroundColor || theme.palette.primary.main
                              }}
                              icon={"heroicons:building-office-2"}
                           />
                           <Stack spacing={{ xs: 0.5, sm: 1 }}>
                              <Typography
                                 variant={"h4"}
                                 sx={{
                                    color: (theme) =>
                                       mode === "light"
                                          ? color || theme.palette.text.primary
                                          : theme.palette.text.primary,
                                    fontSize: { xs: 20, sm: 28, md: 32 },
                                    fontWeight: { xs: 500, sm: 700 }
                                 }}>
                                 {countData?.company}+
                              </Typography>
                              <Typography
                                 variant={"h6"}
                                 fontWeight={500}
                                 sx={{
                                    color: (theme) =>
                                       mode === "light"
                                          ? secondary_color || theme.palette.text.disabled
                                          : theme.palette.text.disabled,
                                    fontSize: { xs: 12, sm: 16, md: 16 },
                                    // line clamp 1
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    WebkitLineClamp: 1
                                 }}>
                                 {company_count_placeholder || "Company"}
                              </Typography>
                           </Stack>
                        </Stack>
                     </Card>
                     <Card
                        sx={{
                           borderRadius: "8px",
                           py: { xs: 1, sm: 3, md: 4, lg: 5 },
                           px: { xs: 2, sm: 3, md: 4, lg: 5 },
                           bgcolor: (theme) => theme.palette.background.default
                        }}>
                        <Stack alignItems={"center"} gap={{ xs: 1, sm: 2, md: 2 }}>
                           <CIcon
                              sx={{
                                 fontSize: { xs: 28, sm: 40, md: 48 },
                                 color: (theme) => backgroundColor || theme.palette.primary.main
                              }}
                              icon={"icomoon-free:user-tie"}
                           />

                           <Stack spacing={{ xs: 0.5, sm: 1 }}>
                              <Typography
                                 variant={"h4"}
                                 sx={{
                                    color: (theme) =>
                                       mode === "light"
                                          ? color || theme.palette.text.primary
                                          : theme.palette.text.primary,
                                    fontSize: { xs: 20, sm: 28, md: 32 },
                                    fontWeight: { xs: 500, sm: 700 }
                                 }}>
                                 {countData?.resume}+
                              </Typography>
                              <Typography
                                 variant={"h6"}
                                 fontWeight={500}
                                 sx={{
                                    color: (theme) =>
                                       mode === "light"
                                          ? secondary_color || theme.palette.text.disabled
                                          : theme.palette.text.disabled,
                                    fontSize: { xs: 12, sm: 16, md: 16 },
                                    // line clamp 1
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    WebkitLineClamp: 1
                                 }}>
                                 {resume_count_placeholder || "Employee Available"}
                              </Typography>
                           </Stack>
                        </Stack>
                     </Card>
                  </Stack>
               )}

               {/* button */}
               {button && (
                  <Box>
                     <Button
                        disabled={disabled}
                        //  @ts-ignore
                        component={NextLink}
                        href={link || "/find-job"}
                        target={target ?? "_self"}
                        variant='contained'
                        sx={{
                           color: (theme) => theme.palette.primary.contrastText,
                           bgcolor: (theme) =>
                              mode === "light" ? theme.palette.secondary.main : theme.palette.primary.main
                        }}>
                        {label || "View Details"}
                     </Button>
                  </Box>
               )}
            </Stack>
         </Container>
      </Box>
   )
}

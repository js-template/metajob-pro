"use client"
import { useEffect, useRef, useState } from "react"
import CIcon from "../components/common/icon"
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api"
import {
   Box,
   ClickAwayListener,
   FormControl,
   IconButton,
   Skeleton,
   TextField,
   TextFieldProps,
   Tooltip,
   Typography,
   TypographyProps,
   useTheme
} from "@mui/material"
import GoogleMapUIBox from "../shared/google-map-box"
import { hexToRGBA } from "../lib/hex-to-rgba"
import { Control, Controller, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { googleMapStateProps } from "../types/forms"

const libraries: "places"[] = ["places"]

type InputFieldProps = {
   label: string
   placeholder?: string
   labelProps?: TypographyProps
   fullWidth?: boolean
   textFieldProps?: TextFieldProps
   textFieldSx?: TextFieldProps["sx"]
   type?: "text" | "email" | "password" | "number" | "tel" | "url" | "date" | "file" | "textarea"
   id?: string
   helperText?: string
   size?: "small" | "medium"
   required?: boolean
   noteText?: string
   inputProps?: TextFieldProps["inputProps"]
   // react hook from register
   name: string
   control: Control<any>
   rules?: any
   setValue: UseFormSetValue<{
      [key: string]: any
   }>
   watch: UseFormWatch<{
      [key: string]: any
   }>
}

const GoogleMap = ({
   label,
   placeholder,
   type = "text",
   labelProps,
   fullWidth,
   helperText,
   textFieldProps,
   textFieldSx,
   required = false,
   size = "medium",
   inputProps,
   name,
   control,
   rules,
   setValue,
   noteText,
   watch
}: InputFieldProps) => {
   // *** Search Box Ref and Map Ref
   const mapRef = useRef<any>()
   const theme = useTheme()
   const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null)
   const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
   const [selectedLocation, setSelectedLocation] = useState<googleMapStateProps>({
      center: {
         lat: -33.866234,
         lng: 151.1153528
      },
      circle: {
         radius: 50,
         options: {
            strokeColor: theme.palette.primary.main
         }
      },
      zoom: 15
   })
   const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: googleApiKey,
      libraries
   })
   const onSearchBoxLoad = (searchBox: google.maps.places.SearchBox) => {
      searchBoxRef.current = searchBox
   }
   // ?? tooltip open/close
   const [open, setOpen] = useState(false)

   // ?? handle tooltip close
   const handleTooltipClose = () => {
      setOpen(false)
   }

   // ?? handle tooltip open
   const handleTooltipOpen = () => {
      setOpen(true)
   }

   const onPlacesChanged = () => {
      const places = searchBoxRef.current?.getPlaces()
      if (places && places.length > 0) {
         const place = places[0]
         if (place.geometry?.location) {
            setSelectedLocation({
               center: {
                  lat: place?.geometry?.location?.lat(),
                  lng: place?.geometry?.location?.lng()
               },
               zoom: 20,
               circle: {
                  ...selectedLocation.circle,
                  radius: 50
               }
            })
            // set value
            setValue(name, {
               address: place?.name + ", " + place?.vicinity,
               geohash: place?.place_id,
               coordinates: {
                  lat: place?.geometry?.location.lat(),
                  lng: place?.geometry?.location.lng()
               }
            })
            // get country
            const country = place?.address_components?.find((c) => c.types.includes("country"))
            // format location
            const formatLocation = {
               address: place?.name + ", " + place?.vicinity + ", " + country?.long_name,
               geohash: place?.place_id,
               coordinates: {
                  lat: place?.geometry?.location.lat(),
                  lng: place?.geometry?.location.lng()
               }
            }

            const location = {
               lat: place?.geometry?.location?.lat(),
               lng: place?.geometry?.location?.lng()
            }
            mapRef.current?.panTo(location)
         }
      }
   }

   // *** set the default value to the form
   useEffect(() => {
      if (watch(name) && watch(name).coordinates) {
         const location = watch(name)
         setSelectedLocation({
            center: {
               lat: location.coordinates.lat,
               lng: location.coordinates.lng
            },
            zoom: 20,
            circle: {
               ...selectedLocation.circle,
               radius: 50
            }
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [watch(name)])

   return (
      <Box
         className='MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl mui-jf74m2-MuiInputBase-root-MuiOutlinedInput-root'
         sx={{
            flexDirection: "column",
            "& div": {
               width: "100%"
            },
            "& .MuiOutlinedInput-root": {
               width: "100%",
               border: "1px solid",
               borderRadius: "6px",
               minHeight: "47px",
               px: 2,
               py: 1.5,
               borderColor: (theme) => hexToRGBA(theme.palette.text.secondary, 0.3),
               fontSize: "16px !important",
               fontWeight: 500,
               color: (theme) => theme.palette.text.secondary + " !important",
               "& input": {
                  p: 0
               }
            }
         }}>
         {isLoaded ? (
            <StandaloneSearchBox onLoad={onSearchBoxLoad} onPlacesChanged={onPlacesChanged}>
               <Controller
                  name={name}
                  control={control}
                  rules={rules}
                  render={({ field, fieldState: { error } }) => (
                     <FormControl fullWidth={fullWidth}>
                        <Box
                           sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: 1
                           }}>
                           <Typography
                              variant='body1'
                              sx={{
                                 color: (theme) => theme.palette.text.primary,
                                 fontSize: 16
                              }}
                              pb={0.5}
                              {...labelProps}>
                              {label}{" "}
                              {required ? (
                                 <Typography component='span' color='error'>
                                    *
                                 </Typography>
                              ) : (
                                 <Typography
                                    component='span'
                                    sx={{
                                       fontSize: 14,
                                       color: (theme) => theme.palette.text.secondary
                                    }}>
                                    (optional)
                                 </Typography>
                              )}
                           </Typography>
                           {/* Note Text with tooltip */}
                           {noteText && (
                              <ClickAwayListener onClickAway={handleTooltipClose}>
                                 <div>
                                    <Tooltip
                                       PopperProps={{
                                          disablePortal: true
                                       }}
                                       onClose={handleTooltipClose}
                                       open={open}
                                       disableFocusListener
                                       disableHoverListener
                                       disableTouchListener
                                       title={noteText}
                                       placement='top'
                                       arrow>
                                       <IconButton size='small' onClick={handleTooltipOpen}>
                                          <CIcon icon='tabler:info-hexagon' size={20} />
                                       </IconButton>
                                    </Tooltip>
                                 </div>
                              </ClickAwayListener>
                           )}
                        </Box>
                        <TextField
                           {...field}
                           placeholder={placeholder}
                           sx={{
                              "& .MuiFormHelperText-root": {
                                 color: (theme) => theme.palette.error.main,
                                 textTransform: "capitalize",
                                 mx: 0.5
                              },
                              "& input": {
                                 py: "10px"
                              },
                              width: "100%",
                              "& .MuiOutlinedInput-root": {
                                 px: 2,
                                 py: 1.5,
                                 mb: 3,
                                 borderColor: "divider",
                                 "& input": {
                                    p: 0
                                 }
                              },
                              ...textFieldSx
                           }}
                           type={type}
                           error={!!error}
                           value={field?.value?.address}
                           helperText={error ? helperText : ""}
                           {...textFieldProps}
                           size={size}
                           inputProps={inputProps}
                        />
                     </FormControl>
                  )}
               />
            </StandaloneSearchBox>
         ) : (
            <Skeleton
               variant='rectangular'
               width='100%'
               height='49px'
               sx={{
                  borderRadius: "6px"
               }}
            />
         )}
         <Box width={"100%"}>
            <GoogleMapUIBox
               coordinates={selectedLocation.center}
               circle={undefined}
               mapRef={mapRef}
               height='400px'
               isLoaded={isLoaded}
            />
         </Box>
      </Box>
   )
}

export default GoogleMap

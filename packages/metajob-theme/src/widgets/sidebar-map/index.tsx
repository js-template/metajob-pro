"use client"

import { useRef } from "react"
import { Box } from "@mui/material"
import GoogleMapUIBox from "../../shared/google-map-box"
import { useJsApiLoader } from "@react-google-maps/api"

const libraries: "places"[] = ["places"]

type Props = {
   location: {
      address?: string
      coordinates?: {
         lat: number
         lng: number
      }
   }
}

export const SidebarMap = ({ location }: Props) => {
   const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string

   const mapRef = useRef<any>()
   const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: googleApiKey,
      libraries
   })

   const { coordinates } = location || {}

   return (
      <Box
         sx={{
            height: "400px",
            width: "100%",
            borderRadius: 2,
            overflow: "hidden"
         }}>
         {coordinates && (
            <GoogleMapUIBox
               coordinates={coordinates}
               circle={undefined}
               mapRef={mapRef}
               height='400px'
               isLoaded={isLoaded}
            />
         )}
      </Box>
   )
}

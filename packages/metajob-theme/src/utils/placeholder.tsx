"use client"
import { Box } from "@mui/material"

type Props = {
   block: {
      __component: string
   }
}

const PlaceholderComponent = ({ block }: Props) => {
   return (
      <Box
         sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100px",
            backgroundColor: "lightgray",
            padding: 1
         }}>
         <p>
            This <b>{block?.__component} </b> component is not yet available.
         </p>
      </Box>
   )
}

export default PlaceholderComponent

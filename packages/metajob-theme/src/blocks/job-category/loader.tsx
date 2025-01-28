"use client"
import { Stack, Box, Card, Skeleton } from "@mui/material"
import { hexToRGBA } from "../../lib/hex-to-rgba"

const CardItemLoader = () => {
   return (
      <Card
         sx={{
            p: 4,
            display: "block",
            textDecoration: "none",
            cursor: "pointer",
            "&:hover .iconBox": {
               transform: "scale(1.2)"
            }
         }}>
         <Stack
            spacing={2}
            sx={{
               justifyContent: "center",
               alignItems: "center"
            }}>
            <Box
               className='iconBox'
               sx={{
                  color: (theme) => theme.palette.primary.main,
                  bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                  borderRadius: "12px",
                  width: "fit-content",
                  p: 2,
                  transition: "transform 0.3s ease-in-out"
               }}>
               <Skeleton variant='rectangular' width={20} height={20} />
            </Box>

            <Stack>
               <Skeleton variant='text' width={80} height={20} />
            </Stack>
         </Stack>
      </Card>
   )
}

export default CardItemLoader

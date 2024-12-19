"use client"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Box, Stack, Typography } from "@mui/material"
import { Card } from "../../components/common/card"
import CIcon from "../../components/common/icon"
import { ISingleCompany } from "./types"

const InfoSidebar = ({ data }: { data: ISingleCompany }) => {
   const { industry, company_size, avg_salary, location } = data || {}

   return (
      <Card
         sx={{
            borderRadius: 2,
            p: 3,
            display: data ? "block" : "none"
         }}>
         <Stack spacing={2}>
            <Typography fontWeight={700} fontSize={20} color={(theme) => theme.palette.text.primary}>
               Company Info
            </Typography>
            {industry && (
               <Stack spacing={2} direction='row'>
                  <Box
                     sx={{
                        bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                        borderRadius: 2,
                        p: 1.5
                     }}>
                     <CIcon icon={"pajamas:work"} size={24} color='primary.main' />
                  </Box>
                  <Stack>
                     <Typography fontWeight={500} fontSize={14} color={(theme) => theme.palette.text.primary}>
                        Industry
                     </Typography>
                     <Typography fontWeight={400} fontSize={16} color={(theme) => theme.palette.text.disabled}>
                        {industry?.title}
                     </Typography>
                  </Stack>
               </Stack>
            )}
            {company_size && (
               <Stack spacing={2} direction='row'>
                  <Box
                     sx={{
                        bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                        borderRadius: 2,
                        p: 1.5
                     }}>
                     <CIcon icon={"ph:watch-light"} size={24} color='primary.main' />
                  </Box>
                  <Stack>
                     <Typography fontWeight={500} fontSize={14} color={(theme) => theme.palette.text.primary}>
                        Company Size
                     </Typography>
                     <Typography fontWeight={400} fontSize={16} color={(theme) => theme.palette.text.disabled}>
                        {company_size?.title}
                     </Typography>
                  </Stack>
               </Stack>
            )}
            {avg_salary && (
               <Stack spacing={2} direction='row'>
                  <Box
                     sx={{
                        bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                        borderRadius: 2,
                        p: 1.5
                     }}>
                     <CIcon icon={"mdi:dollar"} size={24} color='primary.main' />
                  </Box>
                  <Stack>
                     <Typography fontWeight={500} fontSize={14} color={(theme) => theme.palette.text.primary}>
                        AVG. Salary
                     </Typography>
                     <Typography fontWeight={400} fontSize={16} color={(theme) => theme.palette.text.disabled}>
                        {avg_salary?.title}
                     </Typography>
                  </Stack>
               </Stack>
            )}
            {location && (
               <Stack spacing={2} direction='row'>
                  <Box
                     sx={{
                        bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                        borderRadius: 2,
                        p: 1.5
                     }}>
                     <CIcon icon={"ph:map-pin"} size={24} color='primary.main' />
                  </Box>
                  <Stack>
                     <Typography fontWeight={500} fontSize={14} color={(theme) => theme.palette.text.primary}>
                        Location
                     </Typography>
                     <Typography fontWeight={400} fontSize={16} color={(theme) => theme.palette.text.disabled}>
                        {location?.address}
                     </Typography>
                  </Stack>
               </Stack>
            )}
         </Stack>
      </Card>
   )
}

export default InfoSidebar

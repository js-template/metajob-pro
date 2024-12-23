"use client"
import NextLink from "next/link"
import { Box, Chip, TableCell, TableRow, Typography } from "@mui/material"
import CIcon from "../../components/common/icon"
import { ISingleList } from "../../types/job-filter"
import moment from "moment"

type Props = {
   data: ISingleList
}
const ListItem = ({ data }: Props) => {
   const { attributes, id } = data || {}
   const { title, slug, status, startDate, endDate, vacancy } = attributes || {}

   return (
      <TableRow
         sx={{
            "& td, th": {
               borderBottom: "1px solid",
               borderColor: "divider",
               color: (theme) => theme.palette.text.secondary
            },
            "& td:last-child": {
               pr: 5,
               pl: 0
            },
            "&:last-child td, &:last-child th": { border: 0 }
         }}>
         <TableCell
            sx={{
               px: 3
            }}>
            <Box
               component={NextLink}
               href={`/job/${slug}`}
               sx={{
                  textDecoration: "none",
                  "& p": {
                     transition: "all 200ms ease-in-out",
                     "&:hover": {
                        color: (theme) => theme.palette.primary.main
                     }
                  }
               }}>
               <Typography
                  variant='body1'
                  fontWeight={400}
                  lineHeight={"24px"}
                  sx={{
                     color: (theme) => theme.palette.text.primary,
                     // line clamp 1
                     display: "-webkit-box",
                     WebkitBoxOrient: "vertical",
                     overflow: "hidden",
                     textOverflow: "ellipsis",
                     WebkitLineClamp: 1
                  }}>
                  {title}
               </Typography>
            </Box>
         </TableCell>
         <TableCell> {moment(startDate)?.format("DD MMM YYYY")}</TableCell>
         <TableCell> {moment(endDate)?.format("DD MMM YYYY")}</TableCell>
         <TableCell>
            <Chip
               className='notranslate'
               label={status === "open" ? "Open" : status === "closed" ? "Closed" : status}
               color={status === "open" ? "success" : status === "closed" ? "error" : "default"}
               size='small'
               icon={<CIcon icon='radix-icons:dot-filled' fontSize={"24px"} />}
               sx={{
                  backgroundColor: (theme) =>
                     status === "draft"
                        ? theme.palette.text.primary + "20"
                        : status === "open"
                          ? theme.palette.success.light + "20"
                          : status === "closed"
                            ? theme.palette.warning.light + "20"
                            : theme.palette.text.primary + "20",
                  color: (theme) =>
                     status === "draft"
                        ? theme.palette.text.primary
                        : status === "open"
                          ? theme.palette.success.light
                          : status === "closed"
                            ? theme.palette.error.light
                            : theme.palette.text.primary,
                  borderRadius: "6px",
                  "& .MuiChip-label": {
                     pl: 0.7
                  }
               }}
            />
         </TableCell>
         <TableCell align={"center"}> {vacancy}</TableCell>
      </TableRow>
   )
}

export default ListItem

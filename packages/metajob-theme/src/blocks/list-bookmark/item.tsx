"use client"
import { Fragment, useState } from "react"
import NextLink from "next/link"
import { mutate } from "swr"
import toast from "react-hot-toast"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Chip, IconButton, TableCell, TableRow, Typography } from "@mui/material"
import CIcon, { SpinnersClock } from "../../components/common/icon"
import { deleteEntry } from "../../lib/strapi"
import { getItemValue } from "./hook"
import { IBookmarkItem } from "./types"

const AllBookmarkTableItem = ({
   row,
   direction,
   mutateUrl
}: {
   row: IBookmarkItem
   direction: "ltr" | "rtl"
   mutateUrl: string
}) => {
   const { id: bookmarkId, attributes } = row || {}
   const { type } = attributes || {}

   const { itemTitle, itemPrice, itemUrl, itemStatus } = getItemValue(attributes)

   const model = "api/metajob-strapi/bookmarks"

   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const [success, setSuccess] = useState(null) // New state to track success

   /**
    * Function to handle delete operation
    */
   const handleDelete = async () => {
      setLoading(true)
      setError(null)
      setSuccess(null) // Reset success message

      try {
         const { data, error } = await deleteEntry(model, bookmarkId)

         if (error) {
            throw new Error(error)
         }
         // Set success message after successful deletion
         toast.success("Successfully deleted!")

         // Mutate the cache for the specific API URL
         mutate(mutateUrl || null)
      } catch (err: any) {
         toast.error(err.message || "An error occurred during deletion")
      } finally {
         setLoading(false)
      }
   }

   return (
      <Fragment>
         <TableRow
            sx={{
               "& td, th": {
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  color: (theme) => theme.palette.text.secondary
               },
               "& td": {
                  py: 1
               },
               "& td:last-child": {
                  pr: direction === "rtl" ? 0 : 5,
                  pl: direction === "ltr" ? 0 : 5
               },
               "&:last-child td, &:last-child th": { border: 0 }
            }}>
            <TableCell>
               <Typography
                  component={NextLink}
                  href={itemUrl || "#"}
                  variant='body1'
                  fontWeight={500}
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
                  {itemTitle}
               </Typography>
            </TableCell>
            <TableCell>{type}</TableCell>
            <TableCell>{itemPrice}</TableCell>
            <TableCell
               sx={{
                  color: (theme) => theme.palette.primary.main
               }}>
               <Chip
                  label={<Typography variant='body2'>{itemStatus}</Typography>}
                  color='default'
                  variant='outlined'
                  size='small'
                  sx={{
                     backgroundColor:
                        itemStatus === "open" || "active"
                           ? (theme) => hexToRGBA(theme.palette.primary.main, 0.1)
                           : (theme) => hexToRGBA(theme.palette.error.main, 0.1),
                     color:
                        itemStatus === "open" || "active"
                           ? (theme) => theme.palette.primary.main
                           : (theme) => theme.palette.error.main,
                     borderColor: (theme) => hexToRGBA(theme.palette.text.disabled, 0.2) + " !important",
                     px: 1
                  }}
               />
            </TableCell>
            <TableCell
               align='center'
               sx={{
                  display: "flex",
                  gap: 0.5,
                  alignItems: "center",
                  justifyContent: "center"
               }}>
               {/* Delete icon */}
               <IconButton
                  size='small'
                  sx={{
                     color: (theme) => theme.palette.text.secondary
                  }}
                  onClick={() => handleDelete()}
                  disabled={loading}>
                  {loading ? <SpinnersClock /> : <CIcon icon='tabler:trash' size={24} />}
               </IconButton>
            </TableCell>
         </TableRow>
      </Fragment>
   )
}

export default AllBookmarkTableItem

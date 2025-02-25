"use client"
import { Box, IconButton, Stack, TableCell, TableRow, Typography } from "@mui/material"
import Image from "next/image"
import { Fragment, useState } from "react"
import CIcon, { SpinnersClock } from "../../components/common/icon"
import _ from "lodash"
import Link from "next/link"
import { deleteEntry } from "../../lib/strapi"
import toast from "react-hot-toast"
import { KeyedMutator } from "swr"
import dynamic from "next/dynamic"
import { getValueFromWebsite } from "./hook"
import { ISingleCompany } from "./types"
const EditCompany = dynamic(() => import("./edit-company"))

const ManageCompaniesTableItem = ({
   row,
   selectAll,
   noteFunctionHandler,
   direction,
   mutate
}: {
   row: ISingleCompany
   direction: "ltr" | "rtl"
   selectAll: boolean
   noteFunctionHandler: () => void
   mutate: KeyedMutator<any>
}) => {
   const [show, setShow] = useState(false)
   const [loading, setLoading] = useState(false)

   const { name, email, phone, website, logo, documentId } = row || {}
   const imageUrl = logo?.url || "https://placehold.co/150/png"

   const companyID = row?.id as number
   const model = "api/metajob-backend/companies"

   const companySiteValue = getValueFromWebsite(website)

   const handleClickOpen = () => {
      // toast.error("This feature is under development")
      setShow(true)
   }

   const handleClose = () => {
      setShow(false)
   }

   // *** Function to handle delete operation
   const handleDelete = async () => {
      setLoading(true)

      try {
         const { data, error } = await deleteEntry(model, documentId)
         if (error) {
            throw new Error(error)
         }
         // Set success message after successful deletion
         mutate().finally(() => {
            toast.success("Successfully deleted!")
         })
      } catch (err: any) {
         toast.error(err.message || "An error occurred during deletion")
      } finally {
         setLoading(false)
      }
   }

   return (
      <Fragment>
         <TableRow
            dir={direction}
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
            <TableCell dir={direction}>
               <Box
                  dir={direction}
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     gap: 2
                  }}>
                  <Image src={imageUrl} alt='company logo' width={50} height={50} />
                  <Box dir={direction}>
                     <Typography variant='body1' dir={direction}>
                        {name}
                     </Typography>
                     {email && (
                        <Typography variant='body2' dir={direction}>
                           {email}
                        </Typography>
                     )}
                  </Box>
               </Box>
            </TableCell>
            <TableCell dir={direction}>
               <Link href={website || ""} dir={direction} target='_blank' rel='noopener noreferrer'>
                  {companySiteValue}
               </Link>
            </TableCell>
            <TableCell>{phone}</TableCell>
            {/* <TableCell
          sx={{
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <Chip
            label={<Typography variant="body2">{row.status}</Typography>}
            color={getStatusColor(row.status)}
            variant="outlined"
            size="small"
            sx={{
              px: 1,
            }}
          />
        </TableCell> */}
            <TableCell align='center'>
               <Stack direction='row' justifyContent={"center"} alignItems={"center"} spacing={1}>
                  {/* Edit icon */}
                  <IconButton
                     sx={{
                        color: (theme) => theme.palette.text.secondary
                     }}
                     onClick={() => handleClickOpen()}>
                     <CIcon icon='tabler:edit' size={24} />
                  </IconButton>
                  {/* Delete icon */}
                  <IconButton
                     sx={{
                        color: (theme) => theme.palette.text.secondary
                     }}
                     onClick={() => handleDelete()}
                     disabled={loading}>
                     {loading ? <SpinnersClock /> : <CIcon icon='tabler:trash' size={24} />}
                  </IconButton>
               </Stack>
            </TableCell>
         </TableRow>
         {/*  Edit Company */}
         <EditCompany open={show} handleClose={handleClose} companyDocID={documentId} mutate={mutate} />
      </Fragment>
   )
}

export default ManageCompaniesTableItem

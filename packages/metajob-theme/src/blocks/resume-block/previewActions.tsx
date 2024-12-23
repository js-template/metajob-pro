import { Box, Button, Card, CardContent, Skeleton, useTheme } from "@mui/material"
import CIcon from "../../components/common/icon"

interface Props {
   handleEdit: () => void
   isLoading?: boolean
}

const PreviewActions = ({ handleEdit, isLoading }: Props) => {
   const theme = useTheme()

   return (
      <Card
         sx={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "12px"
         }}>
         <CardContent>
            {/* TODO: Feature will be enhance later in update version */}
            {/* {isLoading ? (
               <Skeleton variant='rounded' width={"100%"} height={47} sx={{ mb: 2, "& svg": { mr: 2 } }} />
            ) : (
               <Button fullWidth variant='contained' sx={{ mb: 2, "& svg": { mr: 2 } }}>
                  <CIcon
                     size={24}
                     sx={{
                        color: theme.palette.primary.contrastText
                     }}
                     icon='solar:plain-2-linear'
                  />
                  Donwload Resume
               </Button>
            )} */}
            {isLoading ? (
               <Skeleton variant='rounded' width={"100%"} height={47} sx={{ mb: 2 }} />
            ) : (
               <Button
                  onClick={handleEdit}
                  fullWidth
                  sx={{
                     mb: 2,
                     bgcolor: (theme) => theme.palette.background.default,
                     color: (theme) => theme.palette.text.primary,
                     "&:hover": {
                        color: (theme) => theme.palette.primary.contrastText,
                        bgcolor: (theme) => theme.palette.primary.main
                     }
                  }}
                  color='secondary'>
                  Edit Resume
               </Button>
            )}
            {/* <Box
               sx={{
                  display: "flex",
                  gap: 2
               }}>
               {isLoading ? (
                  <>
                     <Skeleton variant='rounded' width={"100%"} height={47} sx={{ flexGrow: 1 }} />
                     <Skeleton variant='rounded' width={"100%"} height={47} sx={{ flexGrow: 1 }} />
                  </>
               ) : (
                  <>
                     <Button
                        disabled
                        fullWidth
                        sx={{
                           bgcolor: (theme) => theme.palette.background.default,
                           color: (theme) => theme.palette.text.primary,
                           "&:hover": {
                              color: (theme) => theme.palette.primary.contrastText,
                              bgcolor: (theme) => theme.palette.primary.main
                           }
                        }}>
                        Print
                     </Button>
                     <Button
                        onClick={handleEdit}
                        fullWidth
                        sx={{
                           bgcolor: (theme) => theme.palette.background.default,
                           color: (theme) => theme.palette.text.primary,

                           "&:hover": {
                              color: (theme) => theme.palette.primary.contrastText,
                              bgcolor: (theme) => theme.palette.primary.main
                           }
                        }}
                        color='secondary'>
                        Edit
                     </Button>
                  </>
               )}
            </Box> */}
         </CardContent>
      </Card>
   )
}
export default PreviewActions

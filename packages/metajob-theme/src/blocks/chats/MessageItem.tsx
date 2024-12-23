"use client"
import { Avatar, Box, Menu, MenuItem, TextField, Typography, useTheme } from "@mui/material"
import Moment from "react-moment"
import "yet-another-react-lightbox/plugins/counter.css"
import "yet-another-react-lightbox/styles.css"
import MarkdownCustomPreview from "../../components/markdown-preview"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { LoadingButton } from "@mui/lab"
import CIcon from "../../components/common/icon"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { ChatSectionProps } from "./type"

// FIXME: too many code like not used.need t0 talk robi
type MessageItemProps = {
   data: ChatSectionProps
   messageId: number
   id: number
   message: string
   images: {
      src: string
      alt: string
      caption: string
      width: number
      height: number
   }[]
   avatar?: string
   name: string
   date: string
   isSender?: boolean
   onEdit?: (
      id: number,
      data: {
         message: string
      }
   ) => Promise<void>
   // onDelete?: (id: number) => void
}

const MessageItem = ({
   data,
   messageId,
   message,
   id,
   images,
   avatar,
   name,
   date,
   isSender,
   onEdit
   // onDelete
}: MessageItemProps) => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const theme = useTheme()
   const [loading, setLoading] = useState(false)
   const [edit, setEdit] = useState(false)
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors, isDirty }
   } = useForm({
      mode: "onChange",
      defaultValues: {
         message: message
      }
   })

   useEffect(() => {
      setValue("message", message)

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [message])

   const handleClose = (type: "edit" | "delete" | "copy") => {
      if (type === "edit") {
         toast.error("The edit feature is under development")
      } else if (type === "delete") {
         toast.error("The delete feature is under development")
      } else if (type === "copy") {
         toast.error("The copy feature is under development")
      }
      setAnchorEl(null)
   }

   // *** edit submit function handler
   const onSubmit = async (data: any) => {
      if (onEdit) {
         setLoading(true)
         if (!messageId) {
            toast.error("Something went wrong. Please try again")
            setLoading(false)
            return
         }
         await onEdit(messageId, {
            message: data.message
         }).finally(() => {
            setEdit(false)
            setLoading(false)
         })
      }
   }

   return (
      <Box
         sx={{
            display: "flex",
            gap: 2,
            flexDirection: isSender ? "row-reverse" : "row"
         }}>
         <Avatar
            alt={name}
            className='notranslate'
            src={avatar}
            sx={{
               width: "32px",
               height: "32px"
            }}
         />
         <Box
            sx={{
               width: edit ? "100%" : "auto"
            }}>
            <Box
               sx={{
                  position: "relative",
                  "& .item-hovered": {
                     transform: "translate(10px, 0)",
                     transition: "transform 0.2s ease-in-out",
                     visibility: "hidden",
                     opacity: "0"
                  },
                  "&:hover .item-hovered": {
                     transform: "translate(0, 0)",
                     transition: "transform 0.2s ease-in-out",
                     opacity: "1",
                     visibility: "visible"
                  }
               }}>
               <Box
                  sx={{
                     border: "1px solid",
                     borderColor: (theme) =>
                        !isSender ? theme.palette.divider : hexToRGBA(theme.palette.primary.main, 0.5),
                     minWidth: "200px",
                     px: 1.5,
                     py: 1,
                     color: (theme) => (!isSender ? theme.palette.text.secondary : theme.palette.primary.contrastText),
                     backgroundColor: (theme) =>
                        !isSender ? theme.palette.background.paper : hexToRGBA(theme.palette.primary.main, 0.1),
                     borderRadius: "6px",
                     overflow: "hidden",
                     mb: 1
                  }}>
                  {edit ? (
                     <Box
                        component='form'
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                           position: "relative",
                           width: edit ? "100%" : "auto"
                        }}>
                        <TextField
                           fullWidth
                           id='outlined-basic'
                           placeholder={data?.sendMessagePlaceholder}
                           variant='outlined'
                           type='text'
                           multiline
                           defaultValue={message}
                           maxRows={4}
                           onKeyDown={(event) => {
                              if (event.key === "Enter" && !event.shiftKey) {
                                 event.preventDefault()
                                 handleSubmit(onSubmit)()
                              }
                           }}
                           {...register("message", {
                              required: true
                           })}
                           error={errors?.message ? true : false}
                           sx={{
                              "& .MuiInputBase-root": {
                                 p: 0 + " !important",
                                 backgroundColor: (theme) => theme.palette.background.paper
                              }
                           }}
                        />
                        <LoadingButton
                           loading={loading}
                           disabled={!isDirty || loading}
                           variant='contained'
                           className='notranslate'
                           color='inherit'
                           type='submit'
                           size='small'
                           sx={{
                              mt: 2,
                              boxShadow: "none",
                              px: 2.5,
                              py: 1 + " !important",
                              textTransform: "capitalize",
                              color: (theme) => theme.palette.text.primary
                           }}>
                           {data?.saveButtonText}
                        </LoadingButton>
                        {/* Cancel button */}
                        <LoadingButton
                           loading={loading}
                           type='button'
                           variant='contained'
                           className='notranslate'
                           color='error'
                           size='small'
                           onClick={() => {
                              setEdit(false)
                           }}
                           sx={{
                              mt: 2,
                              ml: 2,
                              boxShadow: "none",
                              px: 2.5,
                              py: 1 + " !important",
                              textTransform: "capitalize",
                              color: (theme) => theme.palette.text.primary
                           }}>
                           {data?.cancelButtonText}
                        </LoadingButton>
                     </Box>
                  ) : (
                     <>
                        <Box
                           sx={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: 1,
                              flexWrap: "wrap",
                              mb: images.length > 0 ? 1 : 0
                           }}></Box>
                        <MarkdownCustomPreview
                           source={message}
                           wrapperElement={{
                              "data-color-mode": theme.palette.mode
                           }}
                           sx={{
                              "& p": {
                                 color: (theme) => hexToRGBA(theme.palette.text.primary, 0.8)
                              },
                              "& a": {
                                 color: (theme) => theme.palette.primary.main
                              },
                              "& h1": {
                                 fontSize: "28px",
                                 fontWeight: 600,
                                 color: (theme) => theme.palette.text.primary
                              },
                              "& h2": {
                                 fontSize: "24px",
                                 fontWeight: 600,
                                 color: (theme) => theme.palette.text.primary,
                                 borderBottom: "none !important"
                              },
                              "& h3": {
                                 fontSize: "20px",
                                 fontWeight: 600,
                                 color: (theme) => theme.palette.text.primary
                              },
                              "& h4": {
                                 fontSize: "18px",
                                 fontWeight: 600,
                                 color: (theme) => theme.palette.text.primary
                              },
                              "& h5": {
                                 fontSize: "16px",
                                 fontWeight: 600,
                                 color: (theme) => theme.palette.text.primary
                              },
                              "& h6": {
                                 fontSize: "14px",
                                 fontWeight: 600,
                                 color: (theme) => theme.palette.text.primary
                              },
                              "& blockquote": {
                                 color: (theme) => hexToRGBA(theme.palette.text.primary, 0.8),
                                 borderLeft: `4px solid ${theme.palette.primary.main}`,
                                 padding: "0 0 0 16px",
                                 margin: "0"
                              },
                              "& ul": {
                                 color: (theme) => hexToRGBA(theme.palette.text.primary, 0.8)
                              },
                              "& ol": {
                                 color: (theme) => hexToRGBA(theme.palette.text.primary, 0.8)
                              },
                              "& li": {
                                 color: (theme) => hexToRGBA(theme.palette.text.primary, 0.8)
                              }
                           }}
                        />
                     </>
                  )}
               </Box>

               {/* On hover top right arrow show */}
               {edit ? (
                  <Box
                     className='item-hovered'
                     sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        top: 2,
                        right: 5,
                        zIndex: 100,
                        cursor: "pointer",
                        background: (theme) => theme.palette.background.paper,
                        color: (theme) => theme.palette.error.main,
                        boxShadow: (theme) => theme.shadows[2]
                     }}
                     onClick={() => {
                        setEdit(false)
                     }}>
                     <CIcon icon='ic:baseline-close' />
                  </Box>
               ) : (
                  <>
                     {/* @ts-ignore */}
                     <Box
                        className='item-hovered'
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           position: "absolute",
                           top: 2,
                           right: 5,
                           zIndex: 100,
                           cursor: "pointer",
                           background: (theme) => theme.palette.background.paper + "50",
                           color: (theme) => theme.palette.text.secondary
                        }}
                        onClick={handleClick}>
                        <CIcon icon='iconamoon:arrow-down-2-light' />
                     </Box>
                     <Menu
                        id='message-menu'
                        anchorEl={anchorEl}
                        open={open}
                        anchorOrigin={{
                           vertical: "bottom",
                           horizontal: "right"
                        }}
                        transformOrigin={{
                           vertical: "top",
                           horizontal: "right"
                        }}
                        onClose={handleClose}
                        MenuListProps={{
                           "aria-labelledby": "basic-button"
                        }}
                        sx={{
                           "& .MuiList-root": {
                              width: "160px"
                              //  width: "100%"
                           }
                        }}>
                        {isSender && (
                           <MenuItem
                              onClick={() => {
                                 if (onEdit) {
                                    setEdit(true)
                                    setAnchorEl(null)
                                    return
                                 }
                                 handleClose("edit")
                              }}
                              sx={{
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "flex-start",
                                 gap: "10px",
                                 py: ".6rem",
                                 m: 0
                              }}>
                              <CIcon icon='tabler:edit' />
                              {data?.editActionText}
                           </MenuItem>
                        )}
                        {/* {isSender && (
                           <MenuItem
                              onClick={() => {
                                 if (onDelete) {
                                    onDelete(messageId)
                                    setAnchorEl(null)
                                    return
                                 }
                                 handleClose("delete")
                              }}
                              sx={{
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "flex-start",
                                 gap: "10px",
                                 py: ".6rem",
                                 m: 0
                              }}>
                              <CIcon icon='tabler:trash' />
                              Delete
                           </MenuItem>
                        )} */}
                        <CopyToClipboard
                           text={message}
                           onCopy={() => {
                              toast.success("Copy to clipboard")
                              setAnchorEl(null)
                           }}>
                           <MenuItem
                              sx={{
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "flex-start",
                                 gap: "10px",
                                 py: ".6rem",
                                 m: 0
                              }}>
                              <CIcon icon='tabler:copy' />
                              {data?.copyActionText}
                           </MenuItem>
                        </CopyToClipboard>
                     </Menu>
                  </>
               )}
            </Box>
            <Typography
               variant='body2'
               sx={{
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "16px",
                  color: (theme) => theme.palette.text.secondary,
                  textAlign: !isSender ? "left" : "right"
               }}>
               <Moment fromNow>{date}</Moment>
            </Typography>
         </Box>
      </Box>
   )
}

export default MessageItem

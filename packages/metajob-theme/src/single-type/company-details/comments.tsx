"use client"
import { Avatar, Box, Divider, Stack, TextField, Typography } from "@mui/material"
import _ from "lodash"
import { Button } from "@mui/material"
import { Card } from "../../components/common/card"
import CIcon from "../../components/common/icon"

const comments = [
   {
      id: 1,
      name: "John Doe",
      rating: 5,
      date: "May 9, 2021 at 10:00 am",
      comment: "Great company to work for. I love the culture and the people.",
      avatar: "/images/candidate/candidate-1.png"
   },
   {
      id: 2,
      name: "John Doe",
      rating: 2,
      date: "May 9, 2021 at 10:00 am",
      comment: "Great company to work for. I love the culture and the people.",
      avatar: "/images/candidate/candidate-2.png"
   },
   {
      id: 3,
      name: "John Doe",
      rating: 4,
      date: "May 9, 2021 at 10:00 am",
      comment: "Great company to work for. I love the culture and the people.",
      avatar: "/images/candidate/candidate-3.png"
   }
]
const CommentsSection = () => {
   const Comments = () => {
      return (
         <Stack spacing={2}>
            <Typography
               variant={"h1"}
               fontWeight={700}
               fontSize={24}
               color={(theme) => theme.palette.text.primary}
               py={2}>
               Comments {"( "}
               {comments.length} {" )"}
            </Typography>
            <Stack spacing={2}>
               {_.map(comments, (comment, index) => (
                  <Box>
                     <Stack direction='row' gap={2} alignItems='center' pb={2}>
                        <Avatar
                           alt={comment.name}
                           src={comment.avatar}
                           sx={{
                              width: 80,
                              height: 80
                           }}
                        />
                        <Stack spacing={1.5}>
                           <Stack spacing={0.5}>
                              <Typography
                                 variant={"h3"}
                                 fontWeight={700}
                                 fontSize={20}
                                 color={(theme) => theme.palette.text.primary} // gray 4
                                 sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2
                                 }}>
                                 {comment.name}
                                 <Stack component={"span"} direction='row' alignItems={"center"} spacing={1}>
                                    <CIcon icon='ph:star-bold' size={20} color='warning.light' />
                                    <Typography
                                       variant={"h3"}
                                       fontWeight={700}
                                       fontSize={16}
                                       color={(theme) => theme.palette.warning.light} // gray 4
                                    >
                                       {comment.rating}
                                    </Typography>
                                 </Stack>
                              </Typography>
                              <Typography fontWeight={400} fontSize={12} color={(theme) => theme.palette.text.disabled}>
                                 {comment.date}
                              </Typography>
                           </Stack>
                           <Typography fontWeight={400} fontSize={16} color={(theme) => theme.palette.text.disabled}>
                              {comment.comment}
                           </Typography>
                        </Stack>
                     </Stack>
                     <Divider />
                  </Box>
               ))}
            </Stack>
         </Stack>
      )
   }
   const CommentBox = () => {
      return (
         <Stack spacing={3}>
            <Typography variant={"h1"} fontWeight={700} fontSize={24} color={(theme) => theme.palette.text.primary}>
               Leave a Comment
            </Typography>
            <Stack direction='row' spacing={1.5}>
               <CIcon
                  icon='ph:star-bold'
                  size={20}
                  color='warning.light'
                  sx={{
                     "&:hover": {
                        cursor: "pointer"
                     }
                  }}
               />
               <CIcon
                  icon='ph:star-bold'
                  size={20}
                  color='warning.light'
                  sx={{
                     "&:hover": {
                        cursor: "pointer"
                     }
                  }}
               />
               <CIcon
                  icon='ph:star-bold'
                  size={20}
                  color='warning.light'
                  sx={{
                     "&:hover": {
                        cursor: "pointer"
                     }
                  }}
               />
               <CIcon
                  icon='ph:star-bold'
                  size={20}
                  color='warning.light'
                  sx={{
                     "&:hover": {
                        cursor: "pointer"
                     }
                  }}
               />
               <CIcon
                  icon='ph:star-bold'
                  size={20}
                  color='warning.light'
                  sx={{
                     "&:hover": {
                        cursor: "pointer"
                     }
                  }}
               />
            </Stack>
            <TextField
               placeholder='Write your comment here'
               multiline
               rows={4}
               sx={{
                  "& .MuiOutlinedInput-root": {
                     "& fieldset": {
                        border: (theme) => `1px solid ${theme.palette.divider}`
                     },
                     "&.Mui-focused fieldset": {
                        border: (theme) => `1px solid ${theme.palette.divider}`
                     },
                     backgroundColor: (theme) => theme.palette.background.paper,
                     "&:hover fieldset": {
                        border: (theme) => `1px solid ${theme.palette.divider}`
                     }
                  }
               }}
            />
            <Box>
               <Button variant='contained' color='primary'>
                  Post Comment
               </Button>
            </Box>
         </Stack>
      )
   }
   return (
      <Card
         sx={{
            borderRadius: 2,
            p: 2
         }}>
         <Stack spacing={4}>
            <Comments />
            <CommentBox />
         </Stack>
      </Card>
   )
}

export default CommentsSection

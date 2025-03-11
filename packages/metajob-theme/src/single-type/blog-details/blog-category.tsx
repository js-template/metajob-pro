"use client"
import _ from "lodash"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Stack, Typography } from "@mui/material"
import { Card } from "../../components/common/card"
import { IBlogCategory } from "./types"

type Props = {
   blogCategoryData?: IBlogCategory[]
}
const BlogCategory = ({ blogCategoryData }: Props) => {
   return blogCategoryData && blogCategoryData?.length > 0 ? (
      <Card
         sx={{
            p: 2,
            borderRadius: 3,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: (theme) => theme.palette.divider
         }}>
         <Stack spacing={4}>
            <Typography
               fontSize={20}
               fontWeight={700}
               sx={{
                  color: (theme) => hexToRGBA(theme.palette.text.primary, 0.9)
               }}>
               Category
            </Typography>
            {blogCategoryData && blogCategoryData?.length > 0 && (
               <Stack spacing={2}>
                  {blogCategoryData?.map((item: IBlogCategory, index: number) => {
                     const { title, posts } = item || {}
                     const count = posts?.count || 0

                     return (
                        <Stack
                           key={item.id}
                           direction={"row"}
                           justifyContent={"space-between"}
                           gap={2}
                           pb={1.5}
                           borderBottom={(theme) =>
                              index !== blogCategoryData?.length - 1 ? `1px solid ${theme.palette.divider}` : ""
                           }>
                           <Typography
                              fontSize={16}
                              fontWeight={600}
                              sx={{
                                 color: (theme) => hexToRGBA(theme.palette.text.primary, 0.9)
                              }}>
                              {title}
                           </Typography>
                           <Typography
                              fontSize={16}
                              fontWeight={600}
                              sx={{
                                 color: (theme) => hexToRGBA(theme.palette.text.primary, 0.9)
                              }}>
                              {count}
                           </Typography>
                        </Stack>
                     )
                  })}
               </Stack>
            )}
         </Stack>
      </Card>
   ) : (
      <></>
   )
}
export default BlogCategory

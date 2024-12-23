import Image from "next/image"
import Link from "next/link"
import moment from "moment"
import _ from "lodash"
import { Box, Button, Icon, Stack, Typography } from "@mui/material"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { ISinglePost } from "./types"

const CardItem = ({ data }: { data: ISinglePost }) => {
   const { title, slug, featuredImage, short_description, publishedAt } = data || {}
   const image = featuredImage?.url || "https://via.placeholder.com/300x250"
   return (
      <Stack
         sx={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: (theme) => theme.palette.divider,
            p: 2,
            borderRadius: 1.5,
            "&:hover": {
               borderColor: (theme) => theme.palette.primary.main,
               transition: "all .3s ease-in-out"
            },
            "&:hover .image-scale": {
               transform: "scale(1.2)"
            }
         }}
         spacing={2}>
         <Box
            sx={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               overflow: "hidden",
               borderRadius: 1.5,
               position: "relative", // Make sure the container is positioned
               width: "100%", // Define width and height for the container
               height: 250
            }}
            component={Link}
            href={`blog/${slug}`}>
            <Image
               src={image}
               alt={title}
               style={{
                  transition: "transform 0.3s ease-in-out"
               }}
               className='image-scale'
               fill={true}
            />
         </Box>
         <Stack spacing={1}>
            <Typography fontSize={14} fontWeight={400} color={(theme) => theme.palette.text.disabled}>
               {moment(publishedAt).format("DD MMMM YYYY")}
            </Typography>
            <Typography
               fontSize={20}
               fontWeight={700}
               color={(theme) => hexToRGBA(theme.palette.text.primary, 0.9)}
               sx={{
                  "&:hover": {
                     color: (theme) => theme.palette.primary.main,
                     cursor: "pointer",
                     transition: "all .3s ease-in-out"
                  },
                  textDecoration: "none"
               }}
               component={Link}
               href={`blog/${slug}`}>
               {title}
            </Typography>
         </Stack>
         <Typography fontSize={16} fontWeight={400} color={(theme) => theme.palette.text.disabled}>
            {short_description}
         </Typography>
         <Button
            sx={{
               bgcolor: (theme) => theme.palette.background.default,
               color: (theme) => hexToRGBA(theme.palette.text.primary, 0.9),
               fontSize: 18,
               fontWeight: 500,
               "&:hover": {
                  bgcolor: (theme) => theme.palette.primary.main
               }
            }}
            LinkComponent={Link}
            href={`blog/${slug}`}
            endIcon={<Icon className='icon-arrow-right' />}>
            Read More
         </Button>
      </Stack>
   )
}

export default CardItem

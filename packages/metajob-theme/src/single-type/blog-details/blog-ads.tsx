import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Stack, Typography } from "@mui/material"
import { Card } from "../../components/common/card"
// FIXME: Should be dynamic
const BlogAds = () => {
   return (
      <Stack p={4}>
         <Card
            sx={{
               p: 10,
               borderRadius: 3,
               borderWidth: 1,
               borderStyle: "solid",
               borderColor: (theme) => theme.palette.divider
            }}>
            <Typography
               fontSize={14}
               fontWeight={400}
               color={(theme) => hexToRGBA(theme.palette.text.primary, 0.9)}
               textAlign={"center"}>
               Advertisement
            </Typography>
            <Typography
               fontSize={24}
               fontWeight={600}
               textAlign={"center"}
               color={(theme) => hexToRGBA(theme.palette.text.primary, 0.9)}>
               You can place ads
            </Typography>
            <Typography
               fontSize={16}
               fontWeight={400}
               textAlign={"center"}
               color={(theme) => hexToRGBA(theme.palette.text.primary, 0.9)}>
               250x360
            </Typography>
         </Card>
      </Stack>
   )
}

export default BlogAds

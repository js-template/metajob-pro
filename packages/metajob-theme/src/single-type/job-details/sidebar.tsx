"use client"
import NextLink from "next/link"
import Image from "next/image"
import { Box, Stack, Typography } from "@mui/material"
import moment from "moment"
import { hexToRGBA } from "../../lib/hex-to-rgba"
import { Card } from "../../components/common/card"
import CIcon from "../../components/common/icon"
import { IJobDetailsBlock, ISingleCompany, ISingleJob } from "./types"

type Props = {
   data: ISingleJob
   companyData: ISingleCompany
   block: IJobDetailsBlock
}

const Sidebar = ({ data, companyData, block }: Props) => {
   const { overview_placeholder, posted_placeholder, deadline_placeholder, type_placeholder, salary_placeholder } =
      block || {}

   const { company, publishedAt, type, endDate, price } = data || {}
   const { name: companyName, tagline, email, phone, website, slug, about } = company || {}

   const logo = companyData?.logo?.url || ""
   const socialLinks = companyData?.social_links || []
   const facebook = socialLinks?.find((item: { type: string }) => item.type === "facebook")?.link || ""
   const twitter = socialLinks?.find((item: { type: string }) => item.type === "twitter")?.link || ""

   return (
      <Stack spacing={4}>
         <Card
            sx={{
               borderRadius: 2,
               p: 2
            }}>
            <Typography
               variant={"h1"}
               fontWeight={700}
               fontSize={20}
               sx={{
                  color: (theme) => theme.palette.text.primary
               }}>
               {overview_placeholder || "Job Overview"}
            </Typography>
            <Stack spacing={2} pt={2}>
               {/* Job Posted */}
               {publishedAt && (
                  <Stack direction={"row"} gap={2} alignItems={"center"}>
                     <Box
                        sx={{
                           bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                           borderRadius: 2,
                           p: 1.5
                        }}>
                        <CIcon icon={"uil:calender"} size={24} color='primary.main' />
                     </Box>

                     <Stack>
                        <Typography
                           variant={"body1"}
                           fontWeight={500}
                           fontSize={14}
                           sx={{
                              color: (theme) => theme.palette.text.primary
                           }}>
                           {posted_placeholder || "Job Posted"}
                        </Typography>
                        <Typography
                           variant={"body1"}
                           fontWeight={400}
                           fontSize={16}
                           sx={{
                              color: (theme) => theme.palette.text.disabled
                           }}>
                           {moment(publishedAt)?.format("DD MMMM YYYY")}
                        </Typography>
                     </Stack>
                  </Stack>
               )}
               {/* Deadline */}
               {endDate && (
                  <Stack direction={"row"} gap={2} alignItems={"center"}>
                     <Box
                        sx={{
                           bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                           borderRadius: 2,
                           p: 1.5
                        }}>
                        <CIcon icon={"iconamoon:clock-light"} size={24} color='primary.main' />
                     </Box>

                     <Stack>
                        <Typography
                           variant={"body1"}
                           fontWeight={500}
                           fontSize={14}
                           sx={{
                              color: (theme) => theme.palette.text.primary
                           }}>
                           {deadline_placeholder || "Deadline"}
                        </Typography>
                        <Typography
                           variant={"body1"}
                           fontWeight={400}
                           fontSize={16}
                           sx={{
                              color: (theme) => theme.palette.text.disabled
                           }}>
                           {moment(endDate)?.format("DD MMMM YYYY")}
                        </Typography>
                     </Stack>
                  </Stack>
               )}
               {/* Job Type */}
               {type && (
                  <Stack direction={"row"} gap={2} alignItems={"center"}>
                     <Box
                        sx={{
                           bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                           borderRadius: 2,
                           p: 1.5
                        }}>
                        <CIcon icon={"pajamas:work"} size={24} color='primary.main' />
                     </Box>
                     <Stack>
                        <Typography
                           variant={"body1"}
                           fontWeight={500}
                           fontSize={14}
                           sx={{
                              color: (theme) => theme.palette.text.primary
                           }}>
                           {type_placeholder || "Job Type"}
                        </Typography>
                        <Stack direction={"row"} spacing={0.5}>
                           <Typography
                              variant={"body1"}
                              fontWeight={400}
                              fontSize={16}
                              sx={{
                                 color: (theme) => theme.palette.text.disabled
                              }}>
                              {type?.title}
                           </Typography>
                        </Stack>
                     </Stack>
                  </Stack>
               )}
               {/* Salary */}
               {price && (
                  <Stack direction={"row"} gap={2} alignItems={"center"}>
                     <Box
                        sx={{
                           bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                           borderRadius: 2,
                           p: 1.5
                        }}>
                        <CIcon icon={"mdi:dollar"} size={24} color='primary.main' />
                     </Box>
                     <Stack>
                        <Typography
                           variant={"body1"}
                           fontWeight={500}
                           fontSize={14}
                           sx={{
                              color: (theme) => theme.palette.text.primary
                           }}>
                           {salary_placeholder || "Salary"}
                        </Typography>
                        <Typography
                           variant={"body1"}
                           fontWeight={400}
                           fontSize={16}
                           sx={{
                              color: (theme) => theme.palette.text.disabled
                           }}>
                           {price}
                        </Typography>
                     </Stack>
                  </Stack>
               )}
               {/* Job Location */}
               {/* {location && (
                  <Stack direction={"row"} gap={2} alignItems={"center"}>
                     <Box
                        sx={{
                           bgcolor: (theme) => hexToRGBA(theme.palette.primary.main, 0.1),
                           borderRadius: 2,
                           p: 1.5
                        }}>
                        <CIcon icon={"ph:map-pin"} size={24} color='primary.main' />
                     </Box>

                     <Stack>
                        <Typography
                           variant={"body1"}
                           fontWeight={500}
                           fontSize={14}
                           color={(theme) => theme.palette.text.primary}>
                           Job Location
                        </Typography>
                        <Typography
                           variant={"body1"}
                           fontWeight={400}
                           fontSize={16}
                           color={(theme) => theme.palette.text.disabled}>
                           {location?.address}
                        </Typography>
                     </Stack>
                  </Stack>
               )} */}
            </Stack>
         </Card>
         <Card
            sx={{
               borderRadius: 2,
               p: 4
            }}>
            <Stack
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
               }}
               spacing={2}>
               {logo && (
                  <Box component={NextLink} href={`/company/${slug}`}>
                     <Image src={logo} alt={companyName || "company logo"} width={150} height={150} />
                  </Box>
               )}
               <Stack spacing={1}>
                  {companyName && (
                     <Typography
                        component={NextLink}
                        href={`/company/${slug}`}
                        variant={"h1"}
                        fontWeight={700}
                        fontSize={20}
                        textAlign={"center"}
                        sx={{
                           color: (theme) => theme.palette.text.primary,
                           textDecoration: "none"
                        }}>
                        {companyName}
                     </Typography>
                  )}
                  {tagline && (
                     <Typography
                        variant={"h1"}
                        fontWeight={400}
                        fontSize={16}
                        textAlign={"center"}
                        sx={{
                           color: (theme) => theme.palette.text.primary
                        }}>
                        {tagline}
                     </Typography>
                  )}
               </Stack>
               <Stack spacing={1}>
                  {email && (
                     <Typography
                        component={NextLink}
                        target={"_blank"}
                        href={`mailto:${email}`}
                        fontWeight={400}
                        fontSize={18}
                        textAlign={"center"}
                        sx={{
                           color: (theme) => theme.palette.text.primary,
                           textDecoration: "none"
                        }}>
                        {email}
                     </Typography>
                  )}
                  {phone && (
                     <Typography
                        component={NextLink}
                        target={"_blank"}
                        href={`tel:${phone}`}
                        textAlign={"center"}
                        fontWeight={400}
                        fontSize={18}
                        sx={{
                           color: (theme) => theme.palette.text.primary,
                           textDecoration: "none"
                        }}>
                        {phone}
                     </Typography>
                  )}
               </Stack>
               <Stack direction={"row"} gap={2}>
                  {website && (
                     <Box
                        component={NextLink}
                        href={website}
                        target={"_blank"}
                        sx={{
                           p: 1,
                           borderRadius: 50,
                           borderColor: (theme) => theme.palette.divider,
                           borderWidth: 1,
                           borderStyle: "solid",
                           transitionDuration: ".3s",
                           "&:hover": {
                              bgcolor: (theme) => theme.palette.divider
                           }
                        }}>
                        <CIcon icon={"ph:globe"} size={20} />
                     </Box>
                  )}
                  {facebook && (
                     <Box
                        component={"a"}
                        href={facebook}
                        target={"_blank"}
                        sx={{
                           p: 1,
                           borderRadius: 50,
                           borderColor: (theme) => theme.palette.divider,
                           borderWidth: 1,
                           borderStyle: "solid",
                           "&:hover": {
                              bgcolor: (theme) => theme.palette.divider
                           }
                        }}>
                        <CIcon icon={"gg:facebook"} size={20} />
                     </Box>
                  )}
                  {twitter && (
                     <Box
                        component={"a"}
                        href={twitter}
                        target={"_blank"}
                        sx={{
                           p: 1,
                           borderRadius: 50,
                           borderColor: (theme) => theme.palette.divider,
                           borderWidth: 1,
                           borderStyle: "solid",
                           "&:hover": {
                              bgcolor: (theme) => theme.palette.divider
                           }
                        }}>
                        <CIcon icon={"mdi:twitter"} size={20} />
                     </Box>
                  )}
               </Stack>
            </Stack>
         </Card>
      </Stack>
   )
}

export default Sidebar

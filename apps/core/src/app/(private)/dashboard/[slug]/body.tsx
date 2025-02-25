// //  FIXME: We can delete this file

// import React, { Fragment } from "react"
// import { Grid } from "@mui/material"
// import { Session } from "next-auth"
// import useSWR from "swr"
// import { privetPageFetcher } from "./utils"
// import { useGlobalContext } from "@/context/store"
// import { loadActiveTheme } from "config/theme-loader"

// interface BodyProps {
//    blocks: any[]
//    language?: string
//    styleData?: {
//       columnSpacing: number | null
//       rowSpacing: number | null
//       spacing: number | null
//       wrap: "nowrap" | "wrap" | "wrap-reverse" | null
//       zeroMinWidth: boolean | null
//       columns: number | null
//    }
//    pageSlug: string
//    session: Session | null
// }

// const Body = async ({ blocks, language, styleData, pageSlug, session }: BodyProps) => {
//    const data = {
//       blocks: blocks,
//       styles: styleData
//    }

//    const activeTheme = await loadActiveTheme()
//    const getPrivateComponents = activeTheme?.getPrivateComponents || {}

//    return (
//       <Grid
//          container
//          {...(data?.styles?.columnSpacing && { columnSpacing: data?.styles.columnSpacing })}
//          {...(data?.styles?.rowSpacing && { rowSpacing: data?.styles.rowSpacing })}
//          {...(data?.styles?.spacing && { spacing: data?.styles.spacing })}
//          {...(data?.styles?.zeroMinWidth && { zeroMinWidth: data?.styles.zeroMinWidth })}
//          {...(data?.styles?.columns && { columns: data?.styles.columns })}
//          {...(data?.styles?.wrap && { wrap: data?.styles.wrap })}
//          sx={{ mb: 4 }}>
//          {blocks?.map((block: any, index: number) => {
//             const BlockConfig = getPrivateComponents[block.__component as keyof typeof getPrivateComponents]

//             if (BlockConfig) {
//                const { component: ComponentToRender } = BlockConfig

//                return <ComponentToRender key={index} block={block} language={language} />
//             }
//             return null // Handle the case where the component mapping is missing
//          })}
//       </Grid>
//    )
// }

// export default Body

import { ThemeOptions } from "@mui/material"

type IThemeSettings = {
   light_primary_main?: string
   light_primary_light?: string
   light_secondary?: string
   light_divider?: string
   light_background_default?: string
   light_background_paper?: string
   dark_primary_main?: string
   dark_primary_light?: string
   dark_secondary?: string
   dark_divider?: string
   dark_background_default?: string
   dark_background_paper?: string
   font_family?: string
   light_text_primary?: string
   light_text_secondary?: string
   dark_text_primary?: string
   dark_text_secondary?: string
}
type IKey = keyof IThemeSettings

export const mergeThemeSettings = (
   baseTheme: ThemeOptions,
   backendTheme: IThemeSettings,
   mode: "light" | "dark"
): ThemeOptions => {
   const updatedTheme = { ...baseTheme }
   const palette = { ...(baseTheme.palette || {}) }

   const apply = (key: IKey, path: string[]) => {
      if (!backendTheme) return
      const value = backendTheme[key]
      if (!value) return

      let current = palette as any

      for (let i = 0; i < path.length - 1; i++) {
         current[path[i]] = current[path[i]] || {}
         current = current[path[i]]
      }
      current[path[path.length - 1]] = value
   }

   const fields = [
      [`${mode}_primary_main`, ["primary", "main"]],
      [`${mode}_primary_light`, ["primary", "light"]],
      [`${mode}_secondary`, ["secondary", "main"]],
      [`${mode}_divider`, ["divider"]],
      [`${mode}_background_default`, ["background", "default"]],
      [`${mode}_background_paper`, ["background", "paper"]],
      [`${mode}_text_primary`, ["text", "primary"]],
      [`${mode}_text_secondary`, ["text", "secondary"]]
   ] as [IKey, string[]][]

   fields.forEach(([key, path]) => apply(key, path))

   // Inject updated palette
   updatedTheme.palette = palette

   return updatedTheme
}

type IListLocalesData = {
   name: string
   code: string | null
}

const defaultLocaleData = [
   {
      name: "English (en)",
      code: "en"
   },
   {
      name: "French (fr)",
      code: "fr"
   },
   {
      name: "German (de)",
      code: "de"
   },
   {
      name: "Spanish (es)",
      code: "es"
   },
   {
      name: "Arabic (ar)",
      code: "ar"
   }
]
export const getLanguageValue = (ln: string, localeList: IListLocalesData[] = []) => {
   if (ln === "" || localeList?.length < 1) {
      return ""
   }

   const lanValue = localeList.find((locale) => locale?.code === ln)?.name || "English"

   return lanValue.replace(/\s*\(.*?\)/, "")
}

export const getLanguageValue = (ln: "ar" | "en" | "es" | "") => {
   if (ln === "") {
      return ""
   }
   const languageList = { ar: "Arabic", en: "English", es: "Spanish", fr: "French", de: "German" }
   const lanValue = languageList[ln]
   return lanValue
}

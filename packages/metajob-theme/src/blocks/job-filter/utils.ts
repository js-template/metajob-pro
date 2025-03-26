//function for getting sort param
export const getSortParam = (sortValue?: string) => {
   if (!sortValue) return ""
   const sortMapping = {
      "title-asc": "title:asc",
      "title-desc": "title:desc",
      "price-asc": "price:asc",
      "price-desc": "price:desc"
   }

   const sortParam = sortMapping[sortValue] || ""
   return sortParam
}

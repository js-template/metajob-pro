"use client"
export const fetcher = async (url: string) => {
   const response = await fetch(url)
   if (!response.ok) {
      throw new Error("An error occurred while fetching the data.")
   }
   const result = await response.json()

   const categoryData = result?.data?.data || []
   return categoryData
}

/**
 * Function to remove 'id' property from root and nested 'link' objects.
 * @param {Array} data - Array of objects.
 * @returns {Array} - New array with 'id' properties removed.
 */
export const removeIdFromObjects = (data: Record<string, any>[]): Record<string, any>[] => {
   if (!data) return []
   return data.map(({ id, link, ...rest }) => ({
      ...rest,
      link: link ? (({ id, ...linkRest }) => linkRest)(link) : undefined
   }))
}

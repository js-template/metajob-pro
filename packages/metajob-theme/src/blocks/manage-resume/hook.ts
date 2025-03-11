"use client"

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

"use client"
export const fetcher = async (url: string) => {
   const response = await fetch(url)

   if (!response.ok) {
      throw new Error("An error occurred while fetching the data.")
   }
   const result = await response.json()

   // Return the nested data to match fallbackData structure
   const blocks = result?.data

   return blocks
}

type InputData = {
   id: number
   relationId: number
}

/**
 * Function to extract all relationId as an array.
 *
 * @param data The array of objects containing relationId.
 * @returns An array of relationId.
 */
export const getRelationIds = (data?: InputData[]): number[] => {
   if (!data) {
      return []
   }
   return data
      .filter((item) => item?.relationId !== null) // Exclude objects with null relationId
      .map((item) => item?.relationId as number) // Cast to number since nulls are filtered
}

"use client"

// fetcher to fetch category data
export const categoryFetcher = async (url: string) => {
   const response = await fetch(url)
   if (!response.ok) {
      throw new Error("An error occurred while fetching the data.")
   }
   const result = await response.json()

   const categoryData = result?.data?.data || []
   return categoryData
}

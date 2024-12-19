export const resumeFetcher = async (url: string) => {
   const response = await fetch(url)
   if (!response.ok) {
      throw new Error("An error occurred while fetching the data.")
   }
   const result = await response.json()
   return result?.data?.data?.[0] // Return the nested data
}

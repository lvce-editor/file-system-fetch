export const getJson = async (url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const result = await response.json()
    return result
  } catch (error) {
    throw new Error(`Failed to get json: ${error}`)
  }
}

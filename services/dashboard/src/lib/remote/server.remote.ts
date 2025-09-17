import { getRequestEvent, query } from "$app/server";

export const online = query(async () => {
  const { fetch } = getRequestEvent()

  try {
    const response = await fetch("http://api/server")
    return response.status === 200
  } catch (error) {
    console.log(error)
    return false
  }
})
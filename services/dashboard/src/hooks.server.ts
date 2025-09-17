import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ resolve, event }) => {
  const auth = event.request.headers.get("Authorization")
  if (auth !== `Basic ${btoa("admin:admin")}`) {
    return new Response("Not Authorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="User Visible Realm", charset="UTF-8"'
      }
    })
  }

  return resolve(event)
}
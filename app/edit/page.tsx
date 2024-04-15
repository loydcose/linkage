import { getUser, getUserSocials } from "@/actions"
import { redirect } from "next/navigation"
import Edit from "./edit"

export default async function page() {
  const user = await getUser()
  const userSocials = await getUserSocials()

  if (!user || !userSocials) {
    redirect("/")
  }

  return <Edit user={user} socials={userSocials} />
}

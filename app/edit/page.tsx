import { getAllSocialMedias, getUser, getUserSocials } from "@/actions"
import { SetStoreState } from "@/components/set-store-state"
import { useSocialMediasStore } from "@/stores/use-social-medias-store"
import { redirect } from "next/navigation"
import Edit from "./edit"

export default async function page() {
  const user = await getUser()
  const userSocials = await getUserSocials()
  const socialMedias = await getAllSocialMedias()

  if (!user || !userSocials) {
    redirect("/")
  }

  return (
    <>
    {/* wala parin ampotah */}
      <SetStoreState state={socialMedias} />
      <Edit user={user} socials={userSocials} />
    </>
  )
}

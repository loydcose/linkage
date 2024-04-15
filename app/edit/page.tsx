import { getUser, getUserSocials } from "@/actions";
import Edit from "./edit";
import { redirect } from "next/navigation";

export default async function page() {
    const user = await getUser()
    const userSocials = await getUserSocials()

    if (!user || !userSocials) {
        redirect("/")
    }
    
   return <Edit user={user} socials={userSocials}/>
}

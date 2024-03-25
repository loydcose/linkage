import { getUser, getUserSocials } from "@/actions";
import Edit from "./edit";

export default async function page() {
    const user = await getUser()
    const userSocials = await getUserSocials()
    
   return <Edit user={user} socials={userSocials}/>
}

"use server"

import { currentUser } from "@clerk/nextjs"
import db from "./lib/db";


export async function getUser() {
    const authUser = await currentUser();
    if (!authUser?.id) return null

    try {
        const user = await db.user.findUnique({
            where: {
                clerkId: authUser.id
            }
        })
        return user
    } catch (error: any) {
        console.error(error.message)
        return null
    }
}


export async function createUser() {
    const authUser = await currentUser();
    if (!authUser) return null

    try {
        const user = await db.user.create({
            data: {
                clerkId: authUser?.id,  
                name: `${authUser?.firstName} ${authUser?.lastName}`,
                username: String(authUser?.firstName)?.toLowerCase().trim() + new Date().getTime() ,
                email: authUser?.emailAddresses[0].emailAddress,
                imageUrl: authUser?.imageUrl
            }
        })
        return user
    } catch (error: any) {
        console.error(error.message)
        return null
    }
}  

export async function getUserSocials () {
    const user = await getUser()
    if (!user) return null

    try {
        const socials = await db.social.findMany({
            where: {
                userId: user.id
            }
        })
        return socials
    } catch (error: any) {
        console.error(error.message)
        return null
    }
}

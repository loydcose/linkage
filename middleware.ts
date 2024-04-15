import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/:username"],
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
}

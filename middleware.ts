import { authMiddleware } from "@clerk/nextjs"

// See https://clerk.com/docs/references/nextjs/auth-middleware



export default authMiddleware({
  publicRoutes: ["/:path"],
})

export const config = {
  matcher: ["/(api|trpc)(.*)"],
}

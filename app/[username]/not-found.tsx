"use client"

import { SearchX } from "lucide-react"
import { usePathname } from "next/navigation"

export default function NotFound() {
  const pathname = usePathname()

  return <div className="flex flex-col gap-4 items-center justify-center h-full">
    <SearchX size={32} className="text-rose-400"/>
    {pathname.slice(1)} not found!</div>
}

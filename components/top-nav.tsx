"use client";

import { UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

export default function TopNav() {
  const pathname = usePathname();
  const isNotInPublicView = pathname === "/edit" || pathname === "/";

  return (
    <nav className="relative mb-8 w-[90%] mx-auto max-w-xl py-8">
      {isNotInPublicView && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <UserButton />
        </div>
      )}
      <Link
        href="/"
        className="w-fit block absolute hover:text-purple-600 transition-colors top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      >
        <h1 className="font-bold text-xl">Linkage</h1>
      </Link>
      {isNotInPublicView && pathname === "/" && (
        <Link
          href="/edit"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-8 h-8 p-0 flex absolute right-0 top-1/2 -translate-y-1/2"
          )}
        >
          <Settings className="m-auto text-xs text-stone-500" />
        </Link>
      )}
    </nav>
  );
}

"use client";

import { UserButton } from "@clerk/nextjs";

import Link from "next/link";
import { usePathname } from "next/navigation";
import TopRightBtn from "./top-right-btn";

export default function TopNav() {
  const pathname = usePathname();
  const isNotInPublicView = pathname === "/edit" || pathname === "/";

  return (
    <nav className="flex justify-between items-center mb-8 w-[90%] mx-auto max-w-xl py-8">
      {isNotInPublicView && <UserButton />}
      <Link href="/" className="hover:text-purple-600 transition-colors w-full">
        <h1 className="font-bold text-2xl text-center">Linkage</h1>
      </Link>
      {isNotInPublicView && <TopRightBtn />}
    </nav>
  );
}

"use client"

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ToggleActive from './toggle-active';


export default function TopRightBtn() {
    const pathname = usePathname()

    console.log(pathname)

  return (
    <> 
        {pathname === "/" && (
            <Link href="/edit" className={cn(buttonVariants({ variant: "ghost" }), "w-8 h-8 p-0 flex")}>
                <Settings className='m-auto text-xs text-stone-500'/>
            </Link>
        )}
        {pathname === "/edit" && (
            <ToggleActive isAdmin/>

        )}
    </>
  )
}

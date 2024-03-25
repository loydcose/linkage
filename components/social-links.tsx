import React from 'react'
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function SocialLinks() {
  return (
    <div className='flex flex-col gap-2'>
        <Link href="#" className={buttonVariants({ variant: "outline" })}>Twitter: jhon_doe</Link>
        <Link href="#" className={buttonVariants({ variant: "outline" })}>Twitter: jhon_doe</Link>
        <Link href="#" className={buttonVariants({ variant: "outline" })}>Twitter: jhon_doe</Link>
  </div>
  )
}

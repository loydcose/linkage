import React from 'react'
import Image from 'next/image';

export default function ProfileImage() {
  return (
    <div className='border-2 border-purple-600 size-[100px] rounded-full overflow-hidden mx-auto w-fit mb-4'>
      <Image src="/vercel.svg" alt="profile pic" width={150} height={150} className='size-[100px] object-cover'/>
    </div>
  )
}

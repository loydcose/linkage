import React from 'react'
import Image from 'next/image';

export default function ProfileImage() {
  return (
    <div className='border-2 border-purple-600 w-[100px] h-[100px] rounded-full overflow-hidden mx-auto w-fit mb-4'>
      <Image src="/vercel.svg" alt="profile pic" width={150} height={150} className='w-full h-full object-cover'/>
    </div>
  )
}

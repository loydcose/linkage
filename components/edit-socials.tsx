"use client"

import { Input } from './ui/input'
import { Button } from './ui/button'
import { Social } from '@prisma/client'

type TEditSocials = {
    socials: Social[]
}

export default function EditSocials({socials}: TEditSocials) {
    


  return (
    <div className='space-y-3 py-10 border-b border-b-stone-300'>
        {socials.map(social => (
            <div className='mb-8'>
                <div className='grid grid-cols-2 gap-2 mb-2'>
                    <Input placeholder='Enter social media' defaultValue={social.socialMedia}/>
                    <Input placeholder='Enter display name' defaultValue={social.name}/>
                </div>
                <Input placeholder='Enter your link' defaultValue={social.link}/>
            </div>
        ))}
        <Button className='mt-6 w-full' variant={"secondary"} size={"sm"}>Add new</Button>
    </div>
)
}

"use client"

import { Input } from './ui/input'
import { Button } from './ui/button'
import { Social } from '@prisma/client'
import { useState } from 'react'

type TEditSocials = {
    socials: Social[]
}

export default function EditSocials({socials}: TEditSocials) {
    const [socialFields, setSocialFields] = useState(socials)
    
    // GOLO MAG ISIP KA KAYA MUNA PRE..
    const addSocialField = () => {
        // @ts-ignore
        setSocialFields(prev => ([...prev, {
            id: new Date().getTime().toString(),
            socialMedia: "",
            name: "",
            link: ""
        }]))
    }

    console.log({socialFields})


  return (
    <div className='space-y-3 py-10 border-b border-b-stone-300'>
        {socialFields && socialFields.map((social, index) => (
            <div className='mb-8' key={social.id}>
                <div className='grid grid-cols-2 gap-2 mb-2'>
                    <Input placeholder='Enter social media' value={social.socialMedia} onChange={e => socials[index].socialMedia = e.target.value}/>
                    <Input placeholder='Enter display name' value={social.name} onChange={e => socials[index].name = e.target.value}/>
                </div>
                <Input placeholder='Enter your link' value={social.link} onChange={e => socials[index].link = e.target.value}/>
            </div>
        ))}
        <Button className='mt-6 w-full' onClick={addSocialField} variant={"secondary"} size={"sm"}>Add new</Button>
    </div>
)
}

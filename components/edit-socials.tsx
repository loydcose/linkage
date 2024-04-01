"use client"

import { Input } from './ui/input'
import { Button } from './ui/button'
import { Social } from '@prisma/client'
import { useState } from 'react'

type TEditSocials = {
    socials: Social[]
}

export default function EditSocials({socials}: TEditSocials) {
    const [socialFields, setSocialFields] = useState<Social[] | any[]>(socials)
    
    const addSocialField = () => {
        setSocialFields(prev => ([...prev, {
            id: new Date().getTime().toString(),
            socialMedia: "",
            name: "",
            link: ""
        }]))
    }

    const handleInputChange = (index: number, field: string, value: string) => {
        setSocialFields(prev => prev.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    [field]: value
                }
            }
            return item;
        }))
    }

    console.log({socialFields})

    return (
        <div className='py-10 border-b border-b-stone-300'>
            <h2 className='font-bold mb-2'>Social medias</h2>
            {socialFields && socialFields.map((social, index) => (
                <div className='mb-8' key={social.id}>
                    <div className='grid grid-cols-2 gap-2 mb-2'>
                        <Input 
                            placeholder='Enter social media' 
                            value={socialFields[index].socialMedia} 
                            onChange={e => handleInputChange(index, 'socialMedia', e.target.value)}
                            required
                        />
                        <Input 
                            placeholder='Enter display name' 
                            value={socialFields[index].name} 
                            onChange={e => handleInputChange(index, 'name', e.target.value)}
                            required
                        />
                    </div>
                    <Input 
                        placeholder='Enter your link' 
                        value={socialFields[index].link} 
                        onChange={e => handleInputChange(index, 'link', e.target.value)}
                        required
                    />
                </div>
            ))}
            <Button className='mt-6 w-full' onClick={addSocialField} variant={"secondary"} size={"sm"}>Add new</Button>
        </div>
    )
}
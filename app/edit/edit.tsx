"use client"

import EditSocials from '@/components/edit-socials'
import ImageUpload from '@/components/image-upload'
import ToggleActive from '@/components/toggle-active'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Social, User } from '@prisma/client'
import { Plus, X } from 'lucide-react'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'

type TEdit = {
    user: User
    socials: Social[]
}

export default function Edit({user, socials}: TEdit) {
    const {id, imageUrl, name, bio, isActivated} = user
    const [formObj, setFormObj] = useState({
        name: user.name,
        username: user.username,
        imageUrl: user.imageUrl,
        bio: user.bio,
        isActivated: user.isActivated,
        socials: socials.map(social => ({
            name: social.name,
            slug: social.slug,
            link: social.link,
            socialMedia: social.socialMedia
        }))
    }) 

    console.log({socials})


    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(Array.from(formData.entries()));
    }

  return (
    <form onSubmit={handleFormSubmit}>  
        <div className='flex flex-col gap-4 py-10 border-b border-b-stone-300'>
            <ImageUpload formObj={formObj} setFormObj={setFormObj}/>
            <Input placeholder='Enter your name' name='name' defaultValue={name}/>
            <Input placeholder='Enter your bio' name='bio' defaultValue={bio || ""}/>
        </div>
        <EditSocials formObj={formObj} setFormObj={setFormObj}/>
        <div className='py-10 flex gap-2 w-fit ml-auto'>
            <Link href="/" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
            <Button >Save</Button>
        </div>
    </form>
  )
}

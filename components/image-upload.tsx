"use client"

import { Plus, X } from 'lucide-react'
import React, { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react'

// type TImageUpload = {
//     image: File | null
//     setImage: Dispatch<SetStateAction<File | null>>
// }

export default function ImageUpload() {
    const [image, setImage] = useState<File | null>(null)
    const inputFileRef = useRef<HTMLInputElement>(null)
    const hasImageSet = image ? true : false    

    const clickImageUpload = () => {
        if (inputFileRef?.current) {
            inputFileRef.current?.click()
        }
    }

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImage(file ? file : null)
    }

    const removeImageUpload = () => {
        if (!inputFileRef || !inputFileRef.current) return 
        console.log("clicked! 222")
        inputFileRef.current.value = ''
        setImage(null)
    }

    console.log({image})

  return (
    <>
        <input type="file" onChange={e => handleImageUpload(e)} ref={inputFileRef} className='hidden'/>
        <button type='button' 
        onClick={() =>  hasImageSet ? removeImageUpload() : clickImageUpload()} 
        className='group isolate bg-stone-100 flex w-[100px] h-[100px] aspect-square rounded-full overflow-hidden mx-auto w-fit mb-4 relative'>
            {hasImageSet ? <X className='hidden text-white group-hover:block m-auto z-10'/> : <Plus className='text-stone-400 m-auto z-10'/>}
            {image && <img src={URL.createObjectURL(image)} alt="" className='-z-1 absolute inset-0 w-full h-full object-cover'/>}
        </button>
    </>
  )
}

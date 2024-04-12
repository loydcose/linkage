"use client";

import { User } from "@prisma/client";
import { Plus, X } from "lucide-react";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import type { Image } from "./edit-personal-info";

type TImageUpload = {
  image: Image;
  setImage: Dispatch<SetStateAction<Image>>;
  user: User;
  setHasProfileChanged: Dispatch<SetStateAction<boolean>>;
};

export default function ImageUpload({
  image,
  setImage,
  user,
  setHasProfileChanged,
}: TImageUpload) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const clickImageUpload = () => {
    if (inputFileRef?.current) {
      inputFileRef.current?.click();
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setHasProfileChanged(true);
    setImage({ file: file, name: file.name, url: URL.createObjectURL(file) });
  };

  return (
    <>
      <input
        type="file"
        onChange={(e) => handleImageUpload(e)}
        ref={inputFileRef}
        className="hidden"
      />
      <button
        type="button"
        onClick={clickImageUpload}
        className="group isolate bg-stone-100 flex h-[100px] aspect-square rounded-full overflow-hidden w-fit mb-4 relative"
      >
        <Plus className="hidden text-white group-hover:block m-auto z-10" />
        {image?.url && (
          <img
            src={image?.url}
            alt=""
            className="-z-1 absolute inset-0 w-full h-full object-cover"
          />
        )}
      </button>
    </>
  );
}

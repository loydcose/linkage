"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { User } from "@prisma/client";
import { updateUser, uploadImage } from "@/actions";
import { useToast } from "./ui/use-toast";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import ImageUpload from "./image-upload";
import { convertToBase64 } from "@/lib/utils";

type TEditPersonalInfo = {
  user: User;
};

export type Image = {
  file: File | null;
  name: string;
  url: string | null;
};

export default function EditPersonalInfo({ user }: TEditPersonalInfo) {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [image, setImage] = useState<Image>({
    file: null,
    name: "Image from auth",
    url: user.imageUrl,
  });
  const [hasProfileChanged, setHasProfileChanged] = useState(false);
  const [hasSetToPublic, setHasSetToPublic] = useState(user.isActivated);

  const inputs = [
    {
      name: "name",
      value: name,
      placeholder: "Enter your name",
      onChange: (e: ChangeEvent<HTMLInputElement>) => handleInputChange(e),
    },
    {
      name: "username",
      value: username,
      placeholder: "Enter your username",
      onChange: (e: ChangeEvent<HTMLInputElement>) => handleInputChange(e),
    },
    {
      name: "bio",
      value: bio,
      placeholder: "Enter your bio",
      onChange: (e: ChangeEvent<HTMLInputElement>) => handleInputChange(e),
    },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // get form data
    let formData: any = new FormData(e.currentTarget);
    formData = Object.fromEntries(formData.entries());

    setIsLoading(true);
    setBtnDisabled(true);
    if (hasProfileChanged) {
      const base64 = await convertToBase64(image.file as File);
      var imgUrl = await uploadImage(base64, image.name);
    }
    const res = await updateUser({
      ...formData,
      imageUrl: hasProfileChanged ? imgUrl : user.imageUrl,
      isActivated: hasSetToPublic,
    });
    if (res) {
      toast({
        title: "Profile information updated!",
      });

      // native reload to hard refresh
      location.reload();
      console.log({ res });
    } else {
      toast({
        title: "Something went wrong! Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
    setBtnDisabled(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;

    if (inputName === "name") {
      setName(value);
    } else if (inputName === "username") {
      setUsername(value);
    } else if (inputName === "bio") {
      setBio(value);
    }
  };

  useEffect(() => {
    // detect changes in the form
    if (
      name !== user.name ||
      username !== user.username ||
      (bio || null) !== user.bio ||
      image?.url !== user.imageUrl ||
      hasSetToPublic !== user.isActivated
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [name, username, bio, image?.url, hasSetToPublic]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 pb-10 border-b border-b-stone-300"
    >
      <ImageUpload
        user={user}
        image={image}
        setImage={setImage}
        setHasProfileChanged={setHasProfileChanged}
      />
      {inputs.map(({ name, placeholder, value, onChange }) => (
        <Input
          key={name}
          placeholder={placeholder}
          name={name}
          value={value || ""}
          onChange={onChange}
        />
      ))}
      <div className="flex items-center gap-2">
        <Switch
          id="setActive"
          checked={hasSetToPublic}
          onCheckedChange={setHasSetToPublic}
        />
        <Label htmlFor="setActive">Set to public</Label>
      </div>
      <div className="py-6 flex gap-2 w-fit ml-auto">
        <Button type="submit" disabled={btnDisabled}>
          Save
        </Button>
      </div>
    </form>
  );
}

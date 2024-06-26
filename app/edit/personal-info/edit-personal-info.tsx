"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User } from "@prisma/client";
import { ChangeEvent } from "react";
import ImageUpload from "./image-upload";
import { useEditPersonalInfo } from "./use-edit-personal-info";

type TEditPersonalInfo = {
  user: User;
};

export type Image = {
  file: File | null;
  name: string;
  url: string | null;
};

export default function EditPersonalInfo({ user }: TEditPersonalInfo) {
  const {
    btnDisabled,
    name,
    username,
    bio,
    image,
    setImage,
    setHasProfileChanged,
    hasSetToPublic,
    setHasSetToPublic,
    handleInputChange,
    handleSubmit,
  } = useEditPersonalInfo({ user });

  const inputs = [
    {
      name: "name",
      value: name || "",
      placeholder: "Enter your name",
      onChange: (e: ChangeEvent<HTMLInputElement>) => handleInputChange(e),
      required: true,
      maxLength: 64,
      minLength: 1,
    },
    {
      name: "username",
      value: username || "",
      pattern: "^[a-zA-Z0-9_]{1,32}$",
      placeholder: "Enter your username",
      onChange: (e: ChangeEvent<HTMLInputElement>) => handleInputChange(e),
      required: true,
      maxLength: 32,
      minLength: 1,
      title:
        "Username must be 1-32 characters long, alphanumeric, and can include underscores.",
    },
    {
      name: "bio",
      value: bio || "",
      placeholder: "Enter your bio",
      onChange: (e: ChangeEvent<HTMLInputElement>) => handleInputChange(e),
      maxLength: 128,
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <ImageUpload
        user={user}
        image={image}
        setImage={setImage}
        setHasProfileChanged={setHasProfileChanged}
      />
      {inputs.map((inputProps) => (
        <Input key={inputProps.name} {...inputProps} />
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

"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { User } from "@prisma/client";

type TEditPersonalInfo = {
  user: User;
};

export default function EditPersonalInfo({ user }: TEditPersonalInfo) {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);

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
    let formData: any = new FormData(e.currentTarget);
    formData = Object.fromEntries(formData.entries());
    console.log(formData);
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

    // still has bugs
    if (name !== user.name || username !== user.username || bio !== user.bio) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 pb-10 border-b border-b-stone-300"
    >
      {/* <ImageUpload formObj={formObj} setFormObj={setFormObj}/> */}
      {inputs.map(({ name, placeholder, value, onChange }) => (
        <Input
          key={name}
          placeholder={placeholder}
          name={name}
          value={value || ""}
          onChange={onChange}
        />
      ))}
      <div className="py-6 flex gap-2 w-fit ml-auto">
        <Button type="submit" disabled={btnDisabled}>
          Save
        </Button>
      </div>
    </form>
  );
}

"use client";

import EditSocials from "@/app/edit/socials/edit-socials";
import { Button, buttonVariants } from "@/components/ui/button";
import { Social, User } from "@prisma/client";
import Link from "next/link";
import { FormEvent } from "react";
import EditPersonalInfo from "./personal-info/edit-personal-info";

type TEdit = {
  user: User;
  socials: Social[];
};

export default function Edit({ user, socials }: TEdit) {
  const { id, imageUrl, name, bio, isActivated, username } = user;

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData: any = new FormData(e.currentTarget);
    formData = Object.fromEntries(formData.entries());

    console.log(formData);
  };

  return (
    // <form onSubmit={handleFormSubmit}>
    <>
      <h2 className="font-bold mb-2">Personal Info</h2>
      <EditPersonalInfo user={user} />
      <EditSocials socials={socials} />
      <div className="py-10 flex gap-2 w-fit ml-auto">
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Cancel
        </Link>
        <Button>Save</Button>
      </div>
    </>
  );
}
{
  /* </form> */
}

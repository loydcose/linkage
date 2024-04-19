"use client";

import { createSocial, updateSocial } from "@/actions";
import { useToast } from "@/components/ui/use-toast";
import type { Social, Social as SocialType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import NewSocials from "./new-socials";
import SubmitBtn from "./submit-btn";
import UpdateSocial from "./update-social";

type TEditSocials = {
  socials: Social[];
};

export type CreateFields = {
  name: string;
  link: string;
};

export type UpdateFields = SocialType & { hasChanged: boolean };

export default function EditSocials({ socials }: TEditSocials) {
  const [updateFields, setUpdateFields] = useState<UpdateFields[]>(
    socials.map((social) => ({ ...social, hasChanged: false }))
  );
  const [createFields, setCreateFields] = useState<CreateFields[]>([]);
  const [hasChanged, setHasChanged] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedSocials = updateFields.filter((social) => social.hasChanged);

    // todo: handler error
    if (updatedSocials.length !== 0) {
      const updateRes = await Promise.all(
        updatedSocials.map(({ id, name, link, socialMediaId }) => {
          const data = {
            name,
            link,
            socialMediaId,
          };
          return updateSocial(data, id);
        })
      );
    }
    if (createFields.length !== 0) {
      const createRes = await Promise.all(
        createFields.map((social) => {
          return createSocial(social);
        })
      );
    }

    toast({
      title: "Socials updated!",
    });
    setHasChanged(false);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="py-10 border-b border-b-stone-300">
        <h2 className="font-bold mb-2">Social medias</h2>
        {updateFields.map((social, index) => (
          <UpdateSocial
            key={social.id}
            social={social}
            index={index}
            updateFields={updateFields}
            setUpdateFields={setUpdateFields}
            setHasChanged={setHasChanged}
          />
        ))}
        <NewSocials
          createFields={createFields}
          setCreateFields={setCreateFields}
          setHasChanged={setHasChanged}
        />
      </div>

      {/* clean this button */}
      <SubmitBtn
        hasChanged={hasChanged}
        updateFields={updateFields}
        createFields={createFields}
      />
    </form>
  );
}

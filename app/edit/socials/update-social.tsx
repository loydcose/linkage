import { SocialMediaSelection } from "@/app/edit/socials/social-media-selection";
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog";
import { Input } from "@/components/ui/input";
import type { Social as SocialType } from "@prisma/client";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { UpdateFields } from "./edit-socials";

type TSocial = {
  social: SocialType;
  index: number;
  updateFields: UpdateFields[];
  setUpdateFields: Dispatch<SetStateAction<UpdateFields[]>>;
  setHasChanged: Dispatch<SetStateAction<boolean>>;
};

export default function UpdateSocial({
  social,
  index,
  updateFields,
  setUpdateFields,
  setHasChanged,
}: TSocial) {
  // temporary intial set:  id of 'other' item
  const [isCustomNameHidden, setIsCustomNameHidden] = useState(
    social.socialMediaId !== "15da9e1d-b3d9-43fc-aea5-5f418041ac2b"
  );

  // todo: handle the customname submission properly
  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;

    setHasChanged(true);
    const newField = {
      ...social,
      [name]: value,
      hasChanged: true,
    };
    setUpdateFields((prev) =>
      prev.map((field, i) => (i === index ? newField : field))
    );
  };

  return (
    <div className="mb-8">
      <div className="flex gap-2 mb-2">
        <SocialMediaSelection
          value={social.socialMediaId}
          onChange={handleInputChange}
          setIsCustomNameHidden={setIsCustomNameHidden}
        />
        {!isCustomNameHidden && (
          <Input
            name="customName"
            placeholder="Please specify social media"
            value={social?.customName || ""}
            onChange={handleInputChange}
            required
            maxLength={64}
            minLength={1}
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <Input
          name="name"
          placeholder="Enter display name"
          value={social.name}
          onChange={handleInputChange}
          required
          maxLength={64}
          minLength={1}
        />
        <Input
          name="link"
          type="url"
          placeholder="Enter your link"
          value={social.link}
          onChange={handleInputChange}
          required
          maxLength={64}
          minLength={1}
        />
      </div>
      <DeleteConfirmationDialog
        socialId={social.id}
        title={`Delete your ${social.name}?`}
      />
    </div>
  );
}

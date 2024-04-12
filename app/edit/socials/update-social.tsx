import { Input } from "@/components/ui/input";
import type { Social as SocialType } from "@prisma/client";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
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
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      <div className="grid grid-cols-2 gap-2 mb-2">
        <Input
          name="socialMedia"
          placeholder="Enter social media"
          value={social.socialMedia}
          onChange={handleInputChange}
          required
          maxLength={64}
          minLength={1}
        />
        <Input
          name="name"
          placeholder="Enter display name"
          value={social.name}
          onChange={handleInputChange}
          required
          maxLength={64}
          minLength={1}
        />
      </div>
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
  );
}

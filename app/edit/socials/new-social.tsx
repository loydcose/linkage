import { Input } from "@/components/ui/input";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import type { CreateFields } from "./edit-socials";
import { SocialMediaSelection } from "./social-media-selection";

type TSocial = {
  social: CreateFields;
  index: number;
  createFields: CreateFields[];
  setCreateFields: Dispatch<SetStateAction<CreateFields[]>>;
};

export default function NewSocial({
  social,
  index,
  createFields,
  setCreateFields,
}: TSocial) {
  // temporary intial set:  id of 'other' item
  const [isCustomNameHidden, setIsCustomNameHidden] = useState(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log({ name, value });

    // setIsCustomNameHidden(name !== "customName");

    const newField = {
      ...social,
      [name]: value,
    };
    setCreateFields((prev) =>
      prev.map((field, i) => (i === index ? newField : field))
    );
  };

  // todo: add other website

  return (
    <div className="mb-8">
      <div className="flex gap-2 mb-2">
        <SocialMediaSelection
          value={""}
          onChange={handleInputChange}
          setIsCustomNameHidden={setIsCustomNameHidden}
        />
        {/* we must use this conditional display instead of class name hidden. to
        avoid invalid form control not focusable */}
        {!isCustomNameHidden && (
          <Input
            name="customName"
            placeholder="Please specify social media"
            // value={social.socialMediaId}
            onChange={handleInputChange}
            required={!isCustomNameHidden}
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
    </div>
  );
}

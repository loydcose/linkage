import { Input } from "@/components/ui/input";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
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
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

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
      <div className="grid grid-cols-2 gap-2 mb-2">
        <SocialMediaSelection value={""} onChange={handleInputChange} />
        {/* <Input
          name="socialMedia"
          placeholder="Enter social media"
          value={""}
          onChange={handleInputChange}
          required
          maxLength={64}
          minLength={1}
        /> */}
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

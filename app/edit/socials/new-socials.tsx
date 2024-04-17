import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import type { CreateFields } from "./edit-socials";
import NewSocial from "./new-social";

type TSocial = {
  createFields: CreateFields[];
  setCreateFields: Dispatch<SetStateAction<CreateFields[]>>;
  setHasChanged: Dispatch<SetStateAction<boolean>>;
};

export default function NewSocials({
  createFields,
  setCreateFields,
  setHasChanged,
}: TSocial) {
  const handleAddNew = () => {
    setHasChanged(true);
    setCreateFields((prev) => [
      ...prev,
      {
        name: "",
        link: "",
      },
    ]);
  };

  return (
    <>
      {createFields.map((social, index) => (
        <NewSocial
          key={index}
          social={social}
          index={index}
          createFields={createFields}
          setCreateFields={setCreateFields}
        />
      ))}
      <Button
        className="mt-6 w-full"
        onClick={handleAddNew}
        variant={"secondary"}
        size={"sm"}
      >
        Add new
      </Button>
    </>
  );
}

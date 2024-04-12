import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { CreateFields, UpdateFields } from "./edit-socials";

type TSubmitBtn = {
  hasChanged: boolean;
  updateFields: UpdateFields[];
  createFields: CreateFields[];
};

export default function SubmitBtn({
  hasChanged,
  updateFields,
  createFields,
}: TSubmitBtn) {
  return (
    <div className="py-10 flex gap-2 w-fit ml-auto">
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Cancel
      </Link>
      <Button type="submit" disabled={!hasChanged}>
        Save
      </Button>
    </div>
  );
}

import EditSocials from "@/app/edit/socials/edit-socials";
import { Social, User } from "@prisma/client";
import EditPersonalInfo from "./personal-info/edit-personal-info";

type TEdit = {
  user: User;
  socials: Social[];
};

export default function Edit({ user, socials }: TEdit) {
  return (
    <>
      <h2 className="font-bold mb-2">Personal Info</h2>
      <EditPersonalInfo user={user} />
      <EditSocials socials={socials} />
    </>
  );
}

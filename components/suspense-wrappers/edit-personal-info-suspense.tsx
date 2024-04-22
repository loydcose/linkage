import { getUser } from "@/actions";
import EditPersonalInfo from "@/app/edit/personal-info/edit-personal-info";
import { redirect } from "next/navigation";

export default async function EditPersonalInfoSuspense() {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  return <EditPersonalInfo user={user} />;
}

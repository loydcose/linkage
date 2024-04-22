import { getAllSocialMedias, getUserSocials } from "@/actions";
import EditSocials from "@/app/edit/socials/edit-socials";
import { redirect } from "next/navigation";
import { SetStoreState } from "../set-store-state";

export default async function EditSocialSuspense() {
  const socials = await getUserSocials();
  const socialMedias = await getAllSocialMedias();

  if (!socials) {
    redirect("/");
  }

  return (
    <>
      <SetStoreState state={socialMedias || []} />
      <EditSocials socials={socials} />;
    </>
  );
}

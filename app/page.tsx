import { createUser, getUser, getUserSocials } from "@/actions";
import ProfileImage from "@/components/profile-image";
import ProfileInfo from "@/components/profile-info";
import PublicBadge from "@/components/public-badge";
import SocialLinks from "@/components/social-links";
import { notFound, redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();
  const socials = await getUserSocials();

  if (!user) {
    const res = await createUser();
    if (!res) {
      notFound();
    } else {
      redirect("/");
    }
  }

  return (
    <>
      <PublicBadge user={user} />
      <ProfileImage userImage={user.imageUrl} />
      <ProfileInfo user={user} />
      <SocialLinks socials={socials || []} />
    </>
  );
}

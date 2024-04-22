import { getUser } from "@/actions";
import ProfileImage from "../profile-image";
import ProfileInfo from "../profile-info";
import PublicBadge from "../public-badge";

export default async function ProfileInfoSuspense() {
  const user = await getUser();

  if (!user) return null;

  return (
    <>
      <PublicBadge user={user} />
      <ProfileImage userImage={user.imageUrl} />
      <ProfileInfo user={user} />
    </>
  );
}

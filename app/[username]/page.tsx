import {
  getAllUsernames,
  getUserByUsername,
  getUserSocialsByUsername,
} from "@/actions";
import ProfileImage from "@/components/profile-image";
import ProfileInfo from "@/components/profile-info";
import SocialLinks from "@/components/social-links";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateMetadata(prop: any) {
  const username = prop.params.username || "";
  const user = await getUserByUsername(username);

  return {
    title: `${user?.name || "User"}'s Profile`,
  };
}

export const generateStaticParams = async () => {
  const usernames = (await getAllUsernames()) || [];
  return usernames.map(({ username }) => ({ username }));
};

export default async function Home({
  params: { username },
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(username);
  const socials = await getUserSocialsByUsername(username);

  if (!user || !user.isActivated) {
    notFound();
  }

  return (
    <div className="h-full flex flex-col">
      <ProfileImage userImage={user.imageUrl} />
      <ProfileInfo user={user} />
      <SocialLinks socials={socials || []} />
      <Link
        href="/"
        className="text-gray-600 text-sm justify-center mt-auto hover:text-purple-600 transition-colors flex items-center gap-2"
      >
        Create my own linkage profile <ArrowUpRight size={16} />
      </Link>
    </div>
  );
}

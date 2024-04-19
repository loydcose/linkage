import { createUser, getUser, getUserSocials } from "@/actions";
import ProfileImage from "@/components/profile-image";
import ProfileInfo from "@/components/profile-info";
import PublicBadge from "@/components/public-badge";
import SocialLinks from "@/components/social-links";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
      {!socials || socials.length === 0 ? (
        <div className="flex flex-col gap-2 text-center border border-gray-200 rounded-xl p-4 mx-auto md:w-[75%]">
          <p>No social media found.</p>
          <Link
            href="/edit"
            className={cn(buttonVariants({ variant: "default", size: "sm" }))}
          >
            Start creating one
          </Link>
        </div>
      ) : (
        <SocialLinks socials={socials || []} />
      )}
    </>
  );
}

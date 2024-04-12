import { createUser, getUser, getUserSocials } from "@/actions";
import ProfileImage from "@/components/profile-image";
import ProfileInfo from "@/components/profile-info";
import SocialLinks from "@/components/social-links";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
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
      <Link href="/settings" className="w-fit block mx-auto">
        <Badge
          variant={"outline"}
          className={cn(
            !user.isActivated
              ? "border-red-600 text-red-600"
              : "border-green-600 text-green-600",
            "flex items-center gap-2 my-4"
          )}
        >
          <Pencil size={14} />
          Profile is in {user.isActivated ? "public" : "private"}
        </Badge>
      </Link>
      <ProfileImage userImage={user.imageUrl} />
      <ProfileInfo user={user} />
      <SocialLinks socials={socials || []} />
    </>
  );
}

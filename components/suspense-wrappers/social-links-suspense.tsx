import { getUserSocials } from "@/actions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SocialLinks from "../social-links";
import { buttonVariants } from "../ui/button";

export default async function SocialLinksSuspense() {
  const socials = await getUserSocials();

  return (
    <>
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

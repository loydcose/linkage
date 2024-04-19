import { DisplaySelected } from "@/app/edit/socials/social-media-selection";
import { buttonVariants } from "@/components/ui/button";
import { Social, SocialMedia } from "@prisma/client";
import Link from "next/link";

type SocialLinks = {
  socials: (Social & { socialMedia: SocialMedia })[];
};

export default function SocialLinks({ socials }: SocialLinks) {
  return (
    <div className="flex flex-col gap-2 mb-16">
      {socials.map(({ id, name, link, socialMedia }) => (
        <Link
          key={id}
          href={link}
          className={buttonVariants({ variant: "outline" })}
        >
          <DisplaySelected name={name} icon={socialMedia.icon} />
        </Link>
      ))}
    </div>
  );
}

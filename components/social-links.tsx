import { buttonVariants } from "@/components/ui/button";
import { Social } from "@prisma/client";
import Link from "next/link";

export default function SocialLinks({ socials }: { socials: Social[] }) {
  return (
    <div className="flex flex-col gap-2">
      {socials.map(({ id, name, link, socialMedia }) => (
        <Link
          key={id}
          href={link}
          className={buttonVariants({ variant: "outline" })}
        >
          {socialMedia}: {name}
        </Link>
      ))}
    </div>
  );
}

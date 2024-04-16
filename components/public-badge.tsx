import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";

export default function PublicBadge({ user }: { user: User }) {
  const { isActivated, username } = user;

  return (
    <Link
      href={isActivated ? `/${username}` : "/settings"}
      className="w-fit block mx-auto"
    >
      <Badge
        variant={"outline"}
        className={cn(
          !isActivated
            ? "border-red-600 text-red-600"
            : "border-green-600 text-green-600",
          "flex items-center gap-2 my-4"
        )}
      >
        {isActivated ? <Eye size={14} /> : <Pencil size={14} />}
        {isActivated ? "View in public" : "Profile in is private"}
      </Badge>
    </Link>
  );
}

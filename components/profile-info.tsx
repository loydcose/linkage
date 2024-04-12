import { User } from "@prisma/client";

export default function ProfileInfo({ user }: { user: User }) {
  return (
    <>
      <h1 className="text-center font-bold mb-2 text-xl md:text-2xl">
        {user.name}
      </h1>
      <p className="mb-8 text-center text-stone-600">{user.bio}</p>
    </>
  );
}

import { User } from "@prisma/client";

export default function ProfileInfo({ user }: { user: User }) {
  return (
    <>
      <h1 className="text-center font-bold text-xl md:text-2xl">{user.name}</h1>
      <p className="text-sm text-gray-600 text-center mb-2">{user.username}</p>
      <p className="mb-12 text-center text-stone-600">{user.bio}</p>
    </>
  );
}

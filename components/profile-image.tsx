import Image from "next/image";

export default function ProfileImage({ userImage }: { userImage: string }) {
  return (
    <div className="border-2 border-purple-600 size-[100px] rounded-full overflow-hidden mx-auto w-fit mb-4">
      <Image
        src={userImage}
        alt="profile pic"
        width={150}
        height={150}
        className="size-[100px] object-cover"
      />
    </div>
  );
}

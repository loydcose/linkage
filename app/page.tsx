import { createUser, getUser } from "@/actions";
import ProfleInfoLoader from "@/components/loaders/profile-info-loader";
import SocialLinksLoader from "@/components/loaders/social-links-loader";
import ProfileInfoSuspense from "@/components/suspense-wrappers/profile-info-suspense";
import SocialLinksSuspense from "@/components/suspense-wrappers/social-links-suspense";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Home() {
  const user = await getUser();

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
      <Suspense fallback={<ProfleInfoLoader />}>
        <ProfileInfoSuspense />
      </Suspense>
      <Suspense fallback={<SocialLinksLoader />}>
        <SocialLinksSuspense />
      </Suspense>
    </>
  );
}

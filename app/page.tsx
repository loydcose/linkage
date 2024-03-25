import { createUser, getUser } from '@/actions';
import ProfileImage from '@/components/profile-image';
import ProfileInfo from '@/components/profile-info';
import SocialLinks from '@/components/social-links';
import { notFound, redirect } from 'next/navigation';

export default async function Home() {
  const user = await getUser();

  if (!user) {
    const res = await createUser()
    if (!res) {
      notFound()
    } else {
      redirect("/")
    }
  }

  return (
    <>
      <ProfileImage/>
      <ProfileInfo/>
      <SocialLinks/>
    </>
  );
}

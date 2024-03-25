import ProfileImage from '@/components/profile-image';
import ProfileInfo from '@/components/profile-info';
import SocialLinks from '@/components/social-links';
import ToggleActive from '@/components/toggle-active';

export default function Home() {

  return (
    <>
      <ProfileImage/>
      <ProfileInfo/>

      <SocialLinks/>
    </>
  );
}

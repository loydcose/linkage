import EditPersonalInfoSuspense from "@/components/suspense-wrappers/edit-personal-info-suspense";
import EditSocialSuspense from "@/components/suspense-wrappers/edit-socials-suspense";
import { Suspense } from "react";

export const metadata = {
  title: "Settings",
};

export default async function page() {
  return (
    <>
      <h2 className="font-bold mb-4">Personal Info</h2>

      <Suspense
        fallback={
          <div>
            <span className="h-[100px] w-[100px] rounded-full bg-gray-200 animate-pulse block mb-4"></span>
            <span className="mx-auto mb-2 h-8 w-full block rounded-lg bg-gray-200 animate-pulse"></span>
            <span className="mx-auto mb-2 h-8 w-full block rounded-lg bg-gray-200 animate-pulse"></span>
            <span className="mx-auto mb-2 h-8 w-full block rounded-lg bg-gray-200 animate-pulse"></span>
            <span className="mb-2 h-8 w-12 block rounded-full bg-gray-200 animate-pulse"></span>
            <span className="ml-auto mb-2 h-8 w-20 block rounded-lg bg-gray-200 animate-pulse"></span>
          </div>
        }
      >
        <EditPersonalInfoSuspense />
      </Suspense>

      <span className="w-full h-1 bg-gray-100 block my-10"></span>

      <h2 className="font-bold mb-4">Social medias</h2>

      <Suspense
        fallback={
          <div>
            {[1, 2].map((_, i) => (
              <>
                <span className="mx-auto mb-2 h-8 w-full block rounded-lg bg-gray-200 animate-pulse"></span>
                <span className="flex gap-2 items-center mb-2">
                  <span className="mx-auto h-8 w-full block rounded-lg bg-gray-200 animate-pulse"></span>
                  <span className="mx-auto h-8 w-full block rounded-lg bg-gray-200 animate-pulse"></span>
                </span>
                <span className="mb-8 h-8 w-12 block rounded-lg bg-gray-200 animate-pulse"></span>
              </>
            ))}
            <span className="ml-auto h-8 w-20 block rounded-lg bg-gray-200 animate-pulse"></span>
          </div>
        }
      >
        <EditSocialSuspense />
      </Suspense>
    </>
  );
}

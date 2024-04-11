"use server";

import { auth, currentUser } from "@clerk/nextjs";
import db from "./lib/db";
import type { Image } from "./components/edit-personal-info";

// todo: use auth() to get user's clerk id instead of getUser()

export async function getUser() {
  const authUser = await currentUser();
  if (!authUser?.id) return null;

  try {
    const user = await db.user.findUnique({
      where: {
        clerkId: authUser.id,
      },
    });
    return user;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

export async function createUser() {
  const authUser = await currentUser();
  if (!authUser) return null;

  try {
    const user = await db.user.create({
      data: {
        clerkId: authUser?.id,
        name: `${authUser?.firstName} ${authUser?.lastName}`,
        username:
          String(authUser?.firstName)?.toLowerCase().trim() +
          new Date().getTime(),
        email: authUser?.emailAddresses[0].emailAddress,
        imageUrl: authUser?.imageUrl,
      },
    });
    return user;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

export async function getUserSocials() {
  const user = await getUser();
  if (!user) return null;

  try {
    const socials = await db.social.findMany({
      where: {
        userId: user.id,
      },
    });
    return socials;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

export async function updateUser(data: any) {
  const { userId: clerkId } = auth();

  if (!clerkId) throw new Error("User is not authenticated");
  if (!data) throw new Error("Data is required");

  try {
    const user = await db.user.update({
      where: {
        clerkId,
      },
      data,
    });
    return user;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

export async function imageUpload(image: Image) {
  const { file, name, url } = image;
  // upload to imgbb
  // save imglink to db

  console.log({ file, name, url });
  // try {
  //   const data = new FormData();
  //   data.append("image", file);
  //   data.append(
  //     "name",
  //     `/linkage/profile-images/${name}-${new Date().getTime()}`
  //   );

  //   const uploadToHosting = await fetch(
  //     `https://api.imgbb.com/1/upload?key=${process.env.IMG_BB_KEY}`,
  //     {
  //       method: "POST",
  //       body: data,
  //     }
  //   );
  //   const uploadedImage = await uploadToHosting.json();
  //   console.log(uploadedImage);
  // } catch (error: any) {
  //   console.error(error.message);
  //   return null;
  // }
}

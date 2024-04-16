"use server";

import { auth, currentUser } from "@clerk/nextjs";
import db from "./lib/db";
import { ReadableError } from "./lib/erros";

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

export async function getUserByUsername(username: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        username: username,
      },
      include: {
        socials: true,
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
      include: {
        socialMedia: true,
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

export async function uploadImage(base64: string, name: string) {
  // upload to imgbb hosting

  // remove name extenstion (eg. .png, .jpg)
  name = name
    .replace(/\.[^/.]+$/, "")
    .replace(/\s/g, "-")
    .toLowerCase();

  try {
    const data = new FormData();
    data.append("image", base64);
    data.append(
      "name",
      `/linkage/profile-images/${name}-${new Date().getTime()}`
    );

    const uploadToHosting = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMG_BB_KEY}`,
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedImage = await uploadToHosting.json();
    return uploadedImage.data.url;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

// todo: use updateMany instead of update
export async function updateSocial(data: any, id: string) {
  const { userId: clerkId } = auth();

  if (!clerkId) throw new ReadableError("User is not authenticated");
  if (!data) throw new ReadableError("Missing `socials` param");

  // todo: should we base on userId or clerkId?
  try {
    const social = await db.social.update({
      where: {
        id,
      },
      data,
    });
    return social;
  } catch (error: any) {
    console.error(error.message);
    return null;
    // if (error instanceof ReadableError) {
    //   return { error: error.message };
    // } else {
    //   console.error(error.message);
    //   return { error: "Server error" };
    // }
  }
}

export async function createSocial(data: any) {
  const user = await getUser();

  if (!user) throw new ReadableError("User is not authenticated");
  if (!data) throw new ReadableError("Data param is required");

  try {
    const social = await db.social.create({
      data: {
        ...data,
        userId: user.id,
      },
    });
    return social;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

export async function getAllSocialMedias() {
  try {
    const socialMedias = await db.socialMedia.findMany();
    return socialMedias;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

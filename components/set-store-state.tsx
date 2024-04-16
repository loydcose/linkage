"use client";

import { useSocialMediasStore } from "@/stores/use-social-medias-store";
import { SocialMedia } from "@prisma/client";
import { useEffect } from "react";

type SetStoreStateProps = {
  state: SocialMedia[];
};

export function SetStoreState({ state }: SetStoreStateProps) {
  const { setSocialMedias } = useSocialMediasStore();

  useEffect(() => {
    setSocialMedias(state);
  }, [state]);

  return <></>;
}

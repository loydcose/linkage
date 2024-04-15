import { SocialMedia } from "@prisma/client"
import { create } from "zustand"

export type SocialMedias = {
  socialMedias: SocialMedia[]
  setSocialMedias: (socialMedias: SocialMedia[]) => void  
}

export const useSocialMediasStore = create<SocialMedias>()((set) => ({
  socialMedias: [],
  setSocialMedias: (socialMedias) => set((state) => ({ socialMedias })),
}))

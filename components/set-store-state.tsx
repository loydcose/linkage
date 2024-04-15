"use client"

import { useSocialMediasStore } from "@/stores/use-social-medias-store"
import { useEffect } from "react"

type SetStoreStateProps = {
  state: any
}

export function SetStoreState({ state }: SetStoreStateProps) {
  useEffect(() => {
    useSocialMediasStore.setState(state)
  }, [state])

  return <></>
}

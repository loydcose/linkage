import { updateUser, uploadImage } from "@/actions";
import { useToast } from "@/components/ui/use-toast";
import { convertToBase64 } from "@/lib/utils";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export type Image = {
  file: File | null;
  name: string;
  url: string | null;
};

type TEditPersonalInfo = {
  user: User;
};

export function useEditPersonalInfo({ user }: TEditPersonalInfo) {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [image, setImage] = useState<Image>({
    file: null,
    name: "Image from auth",
    url: user.imageUrl,
  });
  const [hasProfileChanged, setHasProfileChanged] = useState(false);
  const [hasSetToPublic, setHasSetToPublic] = useState(user.isActivated);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;

    if (inputName === "name") {
      setName(value);
    } else if (inputName === "username") {
      setUsername(value);
    } else if (inputName === "bio") {
      setBio(value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // get form data
    let formData: any = new FormData(e.currentTarget);
    formData = Object.fromEntries(formData.entries());

    setIsLoading(true);
    setBtnDisabled(true);
    if (hasProfileChanged) {
      const base64 = await convertToBase64(image.file as File);
      var imgUrl = await uploadImage(base64, image.name);
    }
    const res = await updateUser({
      ...formData,
      imageUrl: hasProfileChanged ? imgUrl : user.imageUrl,
      isActivated: hasSetToPublic,
    });
    if (res.error) {
      toast({
        title: res.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile information updated!",
      });
      // native reload to hard refresh
      // location.reload();
      router.refresh();
    }
    setIsLoading(false);
    setBtnDisabled(true);
  };

  useEffect(() => {
    // detect changes in the form
    if (
      name !== user.name ||
      username !== user.username ||
      (bio || null) !== user.bio ||
      image?.url !== user.imageUrl ||
      hasSetToPublic !== user.isActivated
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [name, username, bio, image?.url, hasSetToPublic]);

  return {
    btnDisabled,
    name,
    setName,
    username,
    setUsername,
    bio,
    setBio,
    isLoading,
    image,
    setImage,
    hasProfileChanged,
    setHasProfileChanged,
    hasSetToPublic,
    setHasSetToPublic,
    handleInputChange,
    handleSubmit,
  };
}

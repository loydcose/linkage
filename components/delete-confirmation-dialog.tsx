"use client";

import { deleteSocial } from "@/actions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { useToast } from "./ui/use-toast";

type DeleteConfirmationDialogProps = {
  title: string | ReactNode;
  socialId: string;
};

export function DeleteConfirmationDialog({
  title,
  socialId,
}: DeleteConfirmationDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteSocial = async () => {
    setLoading(true);
    const res = await deleteSocial(socialId);

    if (res.error) {
      toast({
        title: res.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Social media succesfully deleted!",
      });
      location.reload();
    }
    setOpen(false);
    setLoading(false);
    console.log(socialId);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-3xl mx-auto w-[90%] rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction asChild> */}
          <Button onClick={handleDeleteSocial} disabled={loading}>
            {loading ? "Deleting..." : "Continue"}
          </Button>
          {/* </AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

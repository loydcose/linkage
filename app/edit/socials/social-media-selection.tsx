"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useSocialMediasStore } from "@/stores/use-social-medias-store";
import { CommandList } from "cmdk";
import Image from "next/image";

type SocialMediaSelectionProps = {
  value: string;
  onChange: (e: any) => void;
};

export function SocialMediaSelection({
  value,
  onChange,
}: SocialMediaSelectionProps) {
  const [open, setOpen] = React.useState(false);
  const { socialMedias } = useSocialMediasStore();
  const [selected, setSelected] = React.useState("");
  const selectedSocialMedia = socialMedias?.find(
    (media) => media.name === selected
  );

  React.useEffect(() => {
    setSelected(socialMedias?.find((media) => media.id === value)?.name || "");
  }, [value, socialMedias]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selected ? (
            <DisplaySelected
              name={selectedSocialMedia?.name}
              icon={selectedSocialMedia?.icon}
            />
          ) : (
            "Select social media..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {socialMedias?.map((media) => {
                const { id, name, icon } = media;

                return (
                  <CommandItem
                    key={id}
                    value={name}
                    onSelect={(item) => {
                      onChange({
                        target: {
                          name: "socialMediaId",
                          value: socialMedias?.find(
                            (media) => media.name === item
                          )?.id,
                        },
                      });
                      setSelected(item === name ? item : "");
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <DisplaySelected name={name} icon={icon} />
                  </CommandItem>
                );
              })}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function DisplaySelected({
  name,
  icon,
}: {
  name: string | undefined;
  icon: string | undefined;
}) {
  if (!name || !icon) return null;

  return (
    <span className="flex items-center gap-2">
      <Image src={icon} alt={name + " Logo"} width={20} height={20} />
      {name}
    </span>
  );
}

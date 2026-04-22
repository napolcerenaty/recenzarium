"use client";

import { togglePublisherActive } from "@/actions/publishers";
import { useTransition } from "react";

type Props = { id: string; isActive: boolean };

export function ToggleActiveButton({ id, isActive }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={pending}
      onClick={() => startTransition(() => togglePublisherActive(id, !isActive))}
      className="text-sm text-muted-foreground hover:text-foreground underline disabled:opacity-50 transition-colors"
    >
      {pending ? "..." : isActive ? "Dezaktywuj" : "Aktywuj"}
    </button>
  );
}

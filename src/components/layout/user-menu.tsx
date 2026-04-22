"use client";

import { logout } from "@/actions/auth";
import { LogOut, User } from "lucide-react";

type Props = {
  name: string;
};

export function UserMenu({ name }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
        <User className="h-4 w-4" />
        {name}
      </span>
      <form action={logout}>
        <button
          type="submit"
          aria-label="Wyloguj się"
          className="inline-flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

"use client";

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
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
        <Button variant="ghost" size="icon" aria-label="Wyloguj się">
          <LogOut className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}

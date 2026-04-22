"use client";

import { useActionState, useEffect, useRef } from "react";
import { addPublisher } from "@/actions/publishers";
import { slugify } from "@/lib/publishers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewPublisherPage() {
  const [state, action, pending] = useActionState(addPublisher, undefined);
  const nameRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const nameInput = nameRef.current;
    const slugInput = slugRef.current;
    if (!nameInput || !slugInput) return;

    const handler = () => {
      if (!slugInput.dataset.touched) {
        slugInput.value = slugify(nameInput.value);
      }
    };
    nameInput.addEventListener("input", handler);
    return () => nameInput.removeEventListener("input", handler);
  }, []);

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
        <Link href="/admin/wydawnictwa" className="hover:text-foreground">Wydawnictwa</Link>
        <span>/</span>
        <span>Nowe</span>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Dodaj wydawnictwo</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Nazwa *</Label>
              <Input ref={nameRef} id="name" name="name" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="slug">Slug</Label>
              <Input
                ref={slugRef}
                id="slug"
                name="slug"
                placeholder="auto-generowany"
                onInput={(e) => {
                  (e.target as HTMLInputElement).dataset.touched = "1";
                }}
              />
              <p className="text-xs text-muted-foreground">
                Używany w URL. Generowany automatycznie z nazwy.
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="description">Opis</Label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="flex w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="websiteUrl">Strona www</Label>
                <Input id="websiteUrl" name="websiteUrl" type="url" placeholder="https://" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="instagramUrl">Instagram</Label>
                <Input id="instagramUrl" name="instagramUrl" placeholder="https://instagram.com/..." />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email kontaktowy</Label>
              <Input id="email" name="email" type="email" />
            </div>
            {state?.error && (
              <p className="text-sm text-destructive">{state.error}</p>
            )}
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={pending}>
                {pending ? "Zapisywanie..." : "Dodaj wydawnictwo"}
              </Button>
              <Link
                href="/admin/wydawnictwa"
                className="inline-flex items-center h-8 px-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Anuluj
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

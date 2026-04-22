"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { slugify } from "@/lib/slugify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type PublisherOption = { id: string; name: string };

type PublisherData = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
  websiteUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  email: string;
  submissionEmail: string;
  isImprint: boolean;
  parentId: string | null;
  collaborationInfo: string;
  collaborationUrl: string;
  followersRequirement: string;
  dataSource: string;
};

type Props = {
  action: (prevState: unknown, formData: FormData) => Promise<{ error: string } | undefined>;
  publishers: PublisherOption[];
  defaultValues?: Partial<PublisherData>;
  cancelHref?: string;
};

const textareaClass =
  "flex w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none";

export function PublisherForm({ action, publishers, defaultValues, cancelHref = "/admin/wydawnictwa" }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const nameRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const [isImprint, setIsImprint] = useState(defaultValues?.isImprint ?? false);

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
    <form action={formAction} className="flex flex-col gap-5">
      {/* Podstawowe */}
      <Card>
        <CardHeader><CardTitle className="text-base">Podstawowe informacje</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Nazwa *</Label>
            <Input ref={nameRef} id="name" name="name" required defaultValue={defaultValues?.name} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input
              ref={slugRef}
              id="slug"
              name="slug"
              placeholder="auto-generowany"
              defaultValue={defaultValues?.slug}
              onInput={(e) => { (e.target as HTMLInputElement).dataset.touched = "1"; }}
            />
            <p className="text-xs text-muted-foreground">Używany w URL. Generowany automatycznie z nazwy.</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="logoUrl">Logo (URL obrazka)</Label>
            <Input id="logoUrl" name="logoUrl" type="url" placeholder="https://..." defaultValue={defaultValues?.logoUrl} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">Opis wydawnictwa</Label>
            <textarea id="description" name="description" rows={3} className={textareaClass} defaultValue={defaultValues?.description} />
          </div>
        </CardContent>
      </Card>

      {/* Kontakt i social */}
      <Card>
        <CardHeader><CardTitle className="text-base">Kontakt i media społecznościowe</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="websiteUrl">Strona www</Label>
              <Input id="websiteUrl" name="websiteUrl" type="url" placeholder="https://" defaultValue={defaultValues?.websiteUrl} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email kontaktowy</Label>
              <Input id="email" name="email" type="email" defaultValue={defaultValues?.email} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="instagramUrl">Instagram</Label>
              <Input id="instagramUrl" name="instagramUrl" placeholder="https://instagram.com/..." defaultValue={defaultValues?.instagramUrl} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tiktokUrl">TikTok</Label>
              <Input id="tiktokUrl" name="tiktokUrl" placeholder="https://tiktok.com/@..." defaultValue={defaultValues?.tiktokUrl} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Imprint */}
      <Card>
        <CardHeader><CardTitle className="text-base">Imprint</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isImprint"
              value="1"
              checked={isImprint}
              onChange={(e) => setIsImprint(e.target.checked)}
              className="h-4 w-4 rounded border-input accent-primary"
            />
            <span className="text-sm">To jest imprint (marka należąca do większego wydawnictwa)</span>
          </label>
          {isImprint && (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="parentId">Wydawnictwo nadrzędne</Label>
              <select
                id="parentId"
                name="parentId"
                defaultValue={defaultValues?.parentId ?? ""}
                className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">— wybierz —</option>
                {publishers.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Współprace */}
      <Card>
        <CardHeader><CardTitle className="text-base">Informacje o współpracach</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="followersRequirement">Wymagania dot. obserwujących</Label>
            <Input
              id="followersRequirement"
              name="followersRequirement"
              placeholder="np. min. 1000 obserwujących na IG"
              defaultValue={defaultValues?.followersRequirement}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="submissionEmail">Email do zgłoszeń</Label>
            <Input
              id="submissionEmail"
              name="submissionEmail"
              type="email"
              placeholder="zgloszenia@wydawnictwo.pl"
              defaultValue={defaultValues?.submissionEmail}
            />
            <p className="text-xs text-muted-foreground">
              Wyświetlany jako klikalne łącze <code>mailto:</code> — otworzy klienta pocztowego.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="collaborationUrl">Link do zgłoszeń / portalu</Label>
            <Input id="collaborationUrl" name="collaborationUrl" type="url" placeholder="https://..." defaultValue={defaultValues?.collaborationUrl} />
            <p className="text-xs text-muted-foreground">Bezpośredni link do formularza lub strony z naborami.</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="collaborationInfo">Opis — jak i gdzie szukać współprac</Label>
            <textarea
              id="collaborationInfo"
              name="collaborationInfo"
              rows={6}
              placeholder="Obsługuje Markdown: **pogrubienie**, _kursywa_, - lista, [tekst](url)"
              className={textareaClass}
              defaultValue={defaultValues?.collaborationInfo}
            />
            <p className="text-xs text-muted-foreground">Obsługuje składnię Markdown.</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dataSource">Źródło danych</Label>
            <Input
              id="dataSource"
              name="dataSource"
              placeholder="np. https://... lub nazwa portalu / strony"
              defaultValue={defaultValues?.dataSource}
            />
            <p className="text-xs text-muted-foreground">
              Skąd pochodzi informacja — link lub opis źródła.
            </p>
          </div>
        </CardContent>
      </Card>

      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Zapisywanie..." : "Zapisz"}
        </Button>
        <Link
          href={cancelHref}
          className="inline-flex items-center h-8 px-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Anuluj
        </Link>
      </div>
    </form>
  );
}

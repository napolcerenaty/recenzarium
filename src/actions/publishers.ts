"use server";

import { auth } from "@/auth";
import {
  createPublisher,
  slugify,
  getPublisherBySlug,
  updatePublisher,
} from "@/lib/publishers";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "admin") redirect("/");
  return session;
}

export async function addPublisher(_prevState: unknown, formData: FormData) {
  await requireAdmin();

  const name = (formData.get("name") as string)?.trim();
  const rawSlug = (formData.get("slug") as string)?.trim();

  if (!name) return { error: "Nazwa jest wymagana." };

  const slug = rawSlug || slugify(name);
  const existing = await getPublisherBySlug(slug);
  if (existing) return { error: "Wydawnictwo z tym slugiem już istnieje." };

  const isImprint = formData.get("isImprint") === "1";
  const rawParentId = (formData.get("parentId") as string)?.trim();
  const parentId = isImprint && rawParentId ? rawParentId : null;

  await createPublisher({
    name,
    slug,
    logoUrl: (formData.get("logoUrl") as string) ?? "",
    description: (formData.get("description") as string) ?? "",
    websiteUrl: (formData.get("websiteUrl") as string) ?? "",
    instagramUrl: (formData.get("instagramUrl") as string) ?? "",
    tiktokUrl: (formData.get("tiktokUrl") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    isImprint,
    parentId,
    collaborationInfo: (formData.get("collaborationInfo") as string) ?? "",
    collaborationUrl: (formData.get("collaborationUrl") as string) ?? "",
    isActive: true,
  });

  redirect("/admin/wydawnictwa");
}

export async function togglePublisherActive(id: string, isActive: boolean) {
  await requireAdmin();
  await updatePublisher(id, { isActive });
}


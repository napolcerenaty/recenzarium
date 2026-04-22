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

function extractPublisherFields(formData: FormData) {
  const isImprint = formData.get("isImprint") === "1";
  const rawParentId = (formData.get("parentId") as string)?.trim();
  return {
    name: (formData.get("name") as string)?.trim(),
    rawSlug: (formData.get("slug") as string)?.trim(),
    logoUrl: (formData.get("logoUrl") as string) ?? "",
    description: (formData.get("description") as string) ?? "",
    websiteUrl: (formData.get("websiteUrl") as string) ?? "",
    instagramUrl: (formData.get("instagramUrl") as string) ?? "",
    tiktokUrl: (formData.get("tiktokUrl") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    submissionEmail: (formData.get("submissionEmail") as string) ?? "",
    isImprint,
    parentId: isImprint && rawParentId ? rawParentId : null,
    collaborationInfo: (formData.get("collaborationInfo") as string) ?? "",
    collaborationUrl: (formData.get("collaborationUrl") as string) ?? "",
  };
}

export async function addPublisher(_prevState: unknown, formData: FormData) {
  await requireAdmin();
  const fields = extractPublisherFields(formData);
  if (!fields.name) return { error: "Nazwa jest wymagana." };
  const slug = fields.rawSlug || slugify(fields.name);
  const existing = await getPublisherBySlug(slug);
  if (existing) return { error: "Wydawnictwo z tym slugiem już istnieje." };
  await createPublisher({ ...fields, slug, isActive: true });
  redirect("/admin/wydawnictwa");
}

export async function editPublisher(id: string, _prevState: unknown, formData: FormData) {
  await requireAdmin();
  const fields = extractPublisherFields(formData);
  if (!fields.name) return { error: "Nazwa jest wymagana." };
  const slug = fields.rawSlug || slugify(fields.name);
  const existing = await getPublisherBySlug(slug);
  if (existing && existing.id !== id) return { error: "Wydawnictwo z tym slugiem już istnieje." };
  await updatePublisher(id, { ...fields, slug });
  redirect("/admin/wydawnictwa");
}

export async function togglePublisherActive(id: string, isActive: boolean) {
  await requireAdmin();
  await updatePublisher(id, { isActive });
}


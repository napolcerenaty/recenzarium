import { prisma } from "@/lib/prisma";

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getAllPublishers() {
  return prisma.publisher.findMany({ orderBy: { name: "asc" } });
}

export async function getPublisherBySlug(slug: string) {
  return prisma.publisher.findUnique({ where: { slug } });
}

export async function createPublisher(data: {
  name: string;
  slug: string;
  description: string;
  websiteUrl: string;
  instagramUrl: string;
  email: string;
  isActive: boolean;
}) {
  return prisma.publisher.create({ data });
}

export async function updatePublisher(
  id: string,
  data: Partial<{
    name: string;
    slug: string;
    description: string;
    websiteUrl: string;
    instagramUrl: string;
    email: string;
    isActive: boolean;
  }>
) {
  return prisma.publisher.update({ where: { id }, data });
}


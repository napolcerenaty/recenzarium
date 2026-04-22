import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

export { slugify };

export async function getAllPublishers() {
  return prisma.publisher.findMany({
    orderBy: { name: "asc" },
    include: { parent: { select: { id: true, name: true } } },
  });
}

export async function getPublishersForSelect() {
  return prisma.publisher.findMany({
    where: { isActive: true },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}

export async function getPublisherBySlug(slug: string) {
  return prisma.publisher.findUnique({
    where: { slug },
    include: { parent: { select: { id: true, name: true } }, imprints: true },
  });
}

export async function createPublisher(data: {
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
  websiteUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  email: string;
  isImprint: boolean;
  parentId?: string | null;
  collaborationInfo: string;
  collaborationUrl: string;
  isActive: boolean;
}) {
  return prisma.publisher.create({ data });
}

export async function updatePublisher(
  id: string,
  data: Partial<{
    name: string;
    slug: string;
    logoUrl: string;
    description: string;
    websiteUrl: string;
    instagramUrl: string;
    tiktokUrl: string;
    email: string;
    isImprint: boolean;
    parentId: string | null;
    collaborationInfo: string;
    collaborationUrl: string;
    isActive: boolean;
  }>
) {
  return prisma.publisher.update({ where: { id }, data });
}


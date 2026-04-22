import fs from "fs";
import path from "path";
import crypto from "crypto";

const PUBLISHERS_FILE = path.join(process.cwd(), "data", "publishers.json");

export type Publisher = {
  id: string;
  name: string;
  slug: string;
  description: string;
  websiteUrl: string;
  instagramUrl: string;
  email: string;
  isActive: boolean;
  createdAt: string;
};

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readPublishers(): Publisher[] {
  try {
    return JSON.parse(fs.readFileSync(PUBLISHERS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writePublishers(publishers: Publisher[]): void {
  fs.writeFileSync(PUBLISHERS_FILE, JSON.stringify(publishers, null, 2));
}

export async function getAllPublishers(): Promise<Publisher[]> {
  return readPublishers();
}

export async function getPublisherBySlug(slug: string): Promise<Publisher | null> {
  return readPublishers().find((p) => p.slug === slug) ?? null;
}

export async function createPublisher(
  data: Omit<Publisher, "id" | "createdAt">
): Promise<Publisher> {
  const publishers = readPublishers();
  const publisher: Publisher = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  publishers.push(publisher);
  writePublishers(publishers);
  return publisher;
}

export async function updatePublisher(
  id: string,
  data: Partial<Omit<Publisher, "id" | "createdAt">>
): Promise<Publisher | null> {
  const publishers = readPublishers();
  const index = publishers.findIndex((p) => p.id === id);
  if (index === -1) return null;
  publishers[index] = { ...publishers[index], ...data };
  writePublishers(publishers);
  return publishers[index];
}

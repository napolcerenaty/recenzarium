import { prisma } from "@/lib/prisma";
import type { UserRole } from "@/types/auth";
import bcrypt from "bcryptjs";

export type { UserRole };

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(
  name: string,
  email: string,
  passwordHash: string,
  role: UserRole = "user"
) {
  return prisma.user.create({
    data: { name, email, passwordHash, role },
  });
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}


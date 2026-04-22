import fs from "fs";
import path from "path";
import crypto from "crypto";

const USERS_FILE = path.join(process.cwd(), "data", "users.json");

export type LocalUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

function readUsers(): LocalUser[] {
  try {
    const content = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

function writeUsers(users: LocalUser[]): void {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function getUserByEmail(email: string): Promise<LocalUser | null> {
  const users = readUsers();
  return users.find((u) => u.email === email) ?? null;
}

export async function createUser(
  name: string,
  email: string,
  passwordHash: string
): Promise<LocalUser> {
  const users = readUsers();
  const user: LocalUser = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  return user;
}

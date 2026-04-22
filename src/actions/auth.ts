"use server";

import { signIn, signOut } from "@/auth";
import { createUser, getUserByEmail, hashPassword } from "@/lib/users";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function login(_prevState: unknown, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Nieprawidłowy email lub hasło." };
    }
    throw error;
  }
}

export async function register(_prevState: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Wypełnij wszystkie pola." };
  }
  if (password.length < 8) {
    return { error: "Hasło musi mieć co najmniej 8 znaków." };
  }

  const existing = await getUserByEmail(email);
  if (existing) {
    return { error: "Konto z tym adresem email już istnieje." };
  }

  const passwordHash = await hashPassword(password);
  await createUser(name, email, passwordHash);

  redirect("/logowanie?registered=1");
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

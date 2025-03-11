"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
const COMPANY_REGISTRATION_CODE = process.env.COMPANY_REGISTRATION_CODE;

export async function loginWithEmailPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  // validate inputs with zod
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const result = loginSchema.safeParse({ email, password });

  if (!result.success) {
    return { success: false, message: "The input data is invalid" };
  }

  const { error } = await supabase.auth.signInWithPassword(result.data);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard?loginSuccess=true");
}

export async function signUpWithEmail({
  email,
  password,
  companycode,
}: {
  email: string;
  password: string;
  companycode: string;
}) {
  if (!email || !password || !companycode) {
    return { success: false, message: "Please fill in all fields" };
  }
  if (companycode !== COMPANY_REGISTRATION_CODE) {
    return { success: false, message: "Company code is incorrect" };
  }
  const supabase = await createClient();

  // validate inputs with zod
  const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    companycode: z.string().min(1),
  });

  const result = signUpSchema.safeParse({ email, password, companycode });

  if (!result.success) {
    return { success: false, message: "The input data is invalid" };
  }

  const { data: { user }, error: errorSignUp } = await supabase.auth.signUp(result.data);
  
  const { error: errorInsertNewUser } = await supabase.from("users").insert({
    id: user?.id,
    email: user?.email,
    aktif: false,
    created_at: new Date(),
    updated_at: new Date(),
  })

  if (errorSignUp) {
    return { success: false, message: errorSignUp.message };
  }

  if (errorInsertNewUser) {
    return { success: false, message: errorInsertNewUser.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  return redirect("/login");
}

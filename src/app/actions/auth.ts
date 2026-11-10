"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/training");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const headersList = await headers();
  const origin = headersList.get("origin");

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Without this, a confirmation email points at Supabase's own default
      // site URL rather than back here, so the link appears to do nothing.
      emailRedirectTo: `${origin}/auth/callback?next=/training`,
      data: {
        full_name: name,
      },
    },
  });

  if (signUpError) {
    return { error: signUpError.message };
  }

  // If email confirmation is disabled, the user is auto-confirmed.
  // Sign them in and redirect straight to training.
  if (signUpData.session) {
    revalidatePath("/", "layout");
    redirect("/training");
  }

  // If Supabase still requires confirmation (session is null),
  // try signing in directly in case auto-confirm is on but session wasn't returned
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!signInError) {
    revalidatePath("/", "layout");
    redirect("/training");
  }

  // Confirmation is switched on: the account exists but can't sign in until
  // the emailed link is opened.
  return {
    success:
      "Account created. Check your email for a confirmation link, then sign in.",
  };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const headersList = await headers();
  const origin = headersList.get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const headersList = await headers();
  const origin = headersList.get("origin");

  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  // Deliberately the same message whether or not the address exists, so this
  // form can't be used to find out who has an account.
  return {
    success:
      "If that address has an account, a reset link is on its way. The link works once and expires in an hour.",
  };
}

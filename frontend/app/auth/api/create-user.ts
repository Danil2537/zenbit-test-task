"use server";

import { post } from "@/app/shared/utils/fetch";
import { loginAction } from "../server/actions";

type FormState = { error?: string };

export default async function createUser(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const { error: createError } = await post("user", Object.fromEntries(formData));

  if (createError) {
    return { error: createError };
  }

  const loginResult = await loginAction(state, formData);

  if (loginResult?.error) {
    return { error: loginResult.error };
  }

  return { error: undefined };
}

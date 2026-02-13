// "use server";

// import { FormError } from "@/app/common/interfaces/form-error.interface";
// import { post } from "@/app/common/util/fetch";
// import { redirect } from "next/navigation";
// import login from "./login";

// export default async function createUser(
//   _prevState: FormError,
//   formData: FormData
// ) {
//   const { error } = await post("user", Object.fromEntries(formData));

//   if (error) {
//     return { error };
//   }
//   login(_prevState, formData);
//   //redirect("/");
// }

"use server";

import { post } from "@/app/common/util/fetch";
import login from "./login";

type FormState = { error?: string };

export default async function createUser(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const { error: createError } = await post("user", Object.fromEntries(formData));

  if (createError) {
    return { error: createError };
  }

  const loginResult = await login(state, formData);

  if (loginResult?.error) {
    return { error: loginResult.error };
  }

  return { error: undefined };
}

// "use server";

// import { jwtDecode } from "jwt-decode";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// import { post } from "@/app/common/util/fetch";
// import { FormError } from "@/app/common/interfaces/form-error.interface";

// export default async function login(
//   _prevState: FormError,
//   formData: FormData
// ) {
//   const { response, error } = await post("auth/login", Object.fromEntries(formData));

//   if (error) {
//     return { error };
//   }

//   setAuthCookie(response);
//   redirect("/");
// }

// const setAuthCookie = (response: Response) => {
//   const setCookieHeader = response.headers.get("Set-Cookie");

//   if (!setCookieHeader) return;

//   const token = setCookieHeader.split(";")[0].split("=")[1];

//   cookies().set({
//     name: "Authentication",
//     value: token,
//     secure: true,
//     httpOnly: true,
//     expires: new Date(jwtDecode(token).exp! * 1000),
//   });
// };

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { post } from "@/app/common/util/fetch";

type FormState = { error?: string };

export default async function login(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  const { response, error } = await post("auth/login", Object.fromEntries(formData));

  if (error) {
    return { error };
  }

  // Set auth cookie
  const setCookieHeader = response.headers.get("Set-Cookie");
  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];
    cookies().set({
      name: "Authentication",
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }

  redirect("/"); // successful login
  return { error: undefined }; // must return something
}


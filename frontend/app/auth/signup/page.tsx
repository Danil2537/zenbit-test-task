// "use client";

// import { useFormState } from "react-dom";
// import createUser from "../../common/util/create-user";
// import Link from "next/link";

// export default function Signup() {
//   const [state, formAction] = useFormState(createUser, { error: "" });

//   return (
//     <form action={formAction} className="">
//       <div>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           className=""
//         />
//         {state.error && (
//           <p className="">{state.error}</p>
//         )}
//       </div>

//       <div>
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           className=""
//         />
//       </div>

//       <button
//         type="submit"
//         className=""
//       >
//         Signup
//       </button>

//       <div className="text-center">
//         <Link href="/auth/login" className="">
//           Login
//         </Link>
//       </div>
//     </form>
//   );
// }
"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import getImage from "@/app/common/util/get-image";
import { useEffect, useState } from "react";
import createUser from "@/app/common/util/create-user";

export default function Login() {
  const [state, formAction] = useFormState(createUser, { error: "" });
  const [imgUrl, setImgUrl] = useState<{ url: string; } | null>(null);
  useEffect(() => {
    const getImgSrc = async () => {
      const url = await getImage("login.png");
      setImgUrl(url);
    };
    getImgSrc();
  }, []);
  return (
    <div className="flex min-h-screen w-full">      
      <div className="relative hidden md:block w-[60%]">
        {imgUrl && (
          <Image
            src={imgUrl.url}
            alt="login visual"
            fill
            priority
            className="object-cover"
          />
        )}
      </div>
      <div className="flex w-full md:w-[40%] items-center justify-center bg-white px-6">
        <form
          action={formAction}
          className="w-full max-w-[360px]"
        >
          <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold text-black">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border-2 border-[#E0E0E0] bg-[#E0E0E0] px-4 py-3 text-black placeholder-opacity-50 focus:border-[#B29F7E] focus:ring-2 focus:ring-[#B29F7E]"
            />
            {state.error && (
              <p className="mt-2 text-sm text-red-500">{state.error}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="mb-2 block text-lg font-semibold text-black">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border-2 border-[#E0E0E0] bg-[#E0E0E0] px-4 py-3 text-black placeholder-opacity-50 focus:border-[#B29F7E] focus:ring-2 focus:ring-[#B29F7E]"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#B29F7E] py-3 font-semibold text-white transition hover:bg-[#a28b67]"
          >
            Sign Up
          </button>
          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-[#B29F7E]"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

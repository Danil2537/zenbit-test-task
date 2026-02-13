"use client";

import { useFormState } from "react-dom";
import createUser from "../../common/util/create-user";
import Link from "next/link";

export default function Signup() {
  const [state, formAction] = useFormState(createUser, { error: "" });

  return (
    <form action={formAction} className="">
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className=""
        />
        {state.error && (
          <p className="">{state.error}</p>
        )}
      </div>

      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          className=""
        />
      </div>

      <button
        type="submit"
        className=""
      >
        Signup
      </button>

      <div className="text-center">
        <Link href="/auth/login" className="">
          Login
        </Link>
      </div>
    </form>
  );
}

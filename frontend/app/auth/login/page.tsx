"use client";

import { useFormState } from "react-dom";
import login from "../../common/util/login";
import Link from "next/link";
import Image from "next/image";
import getImage from "@/app/common/util/get-image";
import { useEffect, useState } from "react";

export default function Login() {
  const [state, formAction] = useFormState(login, { error: "" });
  
  const [imgUrl, setImgUrl] = useState<{ url: string; } | null>(null);
  useEffect(()=>{
    const getImgSrc = async () => {
        const url = await getImage('login.png');
        setImgUrl(url);
      };
      getImgSrc();
  },[]);
  return (
    <>
    {imgUrl!==null && (<Image src={imgUrl.url} alt="image not found" width={500} height={800}/>)}
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
        Login
      </button>

      <div className="">
        <Link href="/auth/signup" className="">
          Signup
        </Link>
      </div>
    </form>
    </>
  );
}

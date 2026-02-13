"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logout } from "../store/reducers/authSlice";
import logout from "../common/util/logout";

export default function Header() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    dispatch(Logout());
    router.push("/");
    router.refresh();
  };

  return (
    <header className="">
      <div className="">

        <Link href="/">Home</Link>

        {!isAuthenticated ? (
          <div className="flex gap-4">
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/signup">Signup</Link>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className=""
          >
            Sign out
          </button>
        )}

      </div>
    </header>
  );
}

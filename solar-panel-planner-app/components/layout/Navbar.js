import React from "react";
import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-white shadow-sm px-4 lg:px-8 py-4">
      <nav className="flex justify-between">
        <h1 className="tracking-tighter bg-gradient-to-r from-orange-800 via-orange-500 to-orange-900 bg-clip-text text-transparent font-extrabold text-2xl ">
          ⚡️ BrightGrid
        </h1>
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              {console.log(`Session :${session}`)}
              <Link href="/">
                <span className="">💻 All Requests</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="">🏃 Logout</span>
                </button>
              </form>
              <span className="bg-secondary-light text-white font-bold">
                👋 {session?.user?.name}
              </span>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              {console.log(`No Active session `)}
              <button type="submit">
                <span className="">🚪 Admin Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

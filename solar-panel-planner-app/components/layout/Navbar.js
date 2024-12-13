import React from "react";
import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import { RiAdminLine } from "react-icons/ri";
import DropdownNav from "../ui/DropdownNav";
const Navbar = async () => {
  const session = await auth();

  const handleSignOut = async () => {
    console.log("handle sign out");
    // "use server";
    // await signOut({ redirectTo: "/" });
  };

  return (
    <header className="w-full px-12 lg:px-16 2x:mx-60 py-4 z-10 bg-transparent text-black md:text-white 2xl:text-black text-sm 2xl max-h-[16px]">
      <nav className="flex justify-between">
        <Link
          href="/"
          className="tracking-tighter bg-gradient-to-r from-orange-800 via-orange-400 to-orange-900 bg-clip-text text-transparent font-extrabold text-2xl "
        >
          ⚡️ BrightGrid
        </Link>
        <div className="">
          {session && session?.user ? (
            <div>
              <div className="hidden md:flex items-center gap-5 ">
                <Link href="/admin">
                  <span className="border p-2 rounded-md hover:bg-secondary-light">
                    💻 All Requests
                  </span>
                </Link>
                <Link href="/admin/plan">
                  <span className="border p-2 rounded-md hover:bg-secondary-light">
                    🗺️ Plan Visits
                  </span>
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button type="submit">
                    <span className="border p-2 rounded-md hover:bg-secondary-light">
                      🏃 Logout
                    </span>
                  </button>
                </form>
                <span className="bg-secondary-light p-2 font-semibold rounded-md text-white">
                  👋 Welcome, {session?.user?.name}!
                </span>
              </div>
              <DropdownNav session={session} />
            </div>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button className="rounded-md bg-secondary-light px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">
                <span className="inline-flex items-center gap-1">
                  <RiAdminLine /> Admin Login
                </span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

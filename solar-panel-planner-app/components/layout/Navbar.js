import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import { RiAdminLine } from "react-icons/ri";
import DropdownNav from "../ui/DropdownNav";
import { PiSolarPanelFill } from "react-icons/pi";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="w-full px-12 lg:px-16 2x:mx-60 py-4 z-10 bg-transparent text-white text-sm 2xl max-h-[16px]">
      <nav className="flex justify-between">
        <Link href="/" className="inline-flex gap-1 items-center text-2xl ">
          <span>
            <PiSolarPanelFill color="#F97316" className="" />
          </span>
          <h1 className="font-black font-inter tracking-tight bg-gradient-to-b from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Bright
            <span className="bg-gradient-to-b from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Grid
            </span>
          </h1>
        </Link>
        <div className="bg-gradient-to-bl from-orange-400 via-orange-600 to-orange-400 backdrop-blur-sm rounded-lg">
          {session && session?.user ? (
            <div>
              <div className="hidden md:flex items-center gap-2 ">
                <Link href="/admin">
                  <span className=" p-2 rounded-md hover:bg-secondary-light">
                    💻 All Requests
                  </span>
                </Link>
                <Link href="/admin/plan">
                  <span className=" p-2 rounded-md hover:bg-secondary-light">
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
                    <span className=" p-2 rounded-md hover:bg-secondary-light">
                      🏃 Logout
                    </span>
                  </button>
                </form>
                <span className="p-2 font-semibold rounded-md text-white">
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
              <button className="rounded-md bg-secondary-light px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">
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

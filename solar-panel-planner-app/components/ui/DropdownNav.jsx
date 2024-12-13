"use client";
import { useState } from "react";
import { signOutUser } from "@/app/actions/logoutAction";
import { GiHamburgerMenu } from "react-icons/gi";

const DropdownNav = ({ session }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="md:hidden text-right">
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className="relative text-white bg-orange-500 hover:bg-orange-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center"
        type="button"
        onClick={() => setShow(!show)}
      >
        <GiHamburgerMenu />
      </button>
      <div
        id="dropdownHover"
        className={`z-10 bg-white mt-1 divide-y  rounded-lg shadow w-44 ${
          !show && "hidden"
        }`}
      >
        <ul className="py-2 text-sm text-gray-900 text-left">
          <li>
            <span className="block px-4 py-2 border-b">
              👋 Welcome, {session?.user?.name}!
            </span>
          </li>
          <li>
            <a href="/admin" className="block px-4 py-2 hover:bg-gray-100">
              💻 All Requests
            </a>
          </li>
          <li>
            <a
              href="/admin/plan"
              className="block px-4 py-2 hover:bg-gray-100 "
            >
              🗺️ Plan Visits
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => {
                console.log("should signOut");
                signOutUser();
              }}
              className="block px-4 py-2 hover:bg-gray-100 "
            >
              🏃 Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownNav;

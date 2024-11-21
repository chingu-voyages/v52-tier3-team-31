import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm px-4 lg:px-8 py-4">
      <nav className="flex justify-between">
        <h1 className="tracking-tighter bg-gradient-to-r from-orange-800 via-orange-500 to-orange-900 bg-clip-text text-transparent font-extrabold text-2xl ">
          ⚡️ BrightGrid
        </h1>
        <div className="flex items-center gap-5">
          <button type="button" className="btn">
            Admin Login
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

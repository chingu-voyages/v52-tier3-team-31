"use client";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { FaSearch } from "react-icons/fa";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching for ${term}`);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
      params.set("page", 1);
    } else {
      params.delete("query");
    }
    replace(`${pathName}?${params.toString()}`);
  }, 200);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder="Type to start searching..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <FaSearch className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
};

export default Search;

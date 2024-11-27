"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const Pagination = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSelection = (e) => {
    console.log(e.target.value);
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    params.set("limit", e.target.value);
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="flex px-2">
      <label htmlFor="perPage" className="text-xs w-fit">
        Per page
      </label>
      <select
        className="block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
        defaultValue={5}
        onChange={handleSelection}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
    </div>
  );
};

export default Pagination;

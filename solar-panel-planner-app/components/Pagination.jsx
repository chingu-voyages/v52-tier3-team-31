"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ totalPages }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const [pages, setPages] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [activePage, setActivePage] = useState(1);

  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  useEffect(() => {
    setPages(Array.from({ length: totalPages }, (_, i) => i + 1));
    setActivePage(searchParams.get("page"));
  }, [totalPages]);

  useEffect(() => {
    console.log(`Last page : ${pages.at(-1)} First Page : ${pages.at(0)}`);
    if (activePage === pages.at(-1)) {
      console.log(`disable next`);
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }

    if (activePage === pages.at(0)) {
      console.log(`disable previous`);

      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
  }, [activePage, pages]);

  const handlePerPageChange = (e) => {
    setPerPage(e.target.value);
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    params.set("limit", e.target.value);
    replace(`${pathName}?${params.toString()}`);
  };

  const handleActivePageChange = (e) => {
    setActivePage(e.target.value);
    const params = new URLSearchParams(searchParams);
    params.set("page", e.target.value);
    replace(`${pathName}?${params.toString()}`);
  };

  const handlePageChangeButton = (e) => {
    console.log(`Should go to page ${e}`);
  };

  return (
    <div className="flex gap-2 mb-4 mx-auto justify-center">
      <div className="flex px-2 gap-1">
        <button
          disabled={prevDisabled}
          className="my-auto border border-gray-200 h-full size-10 px-2 rounded-md"
        >
          <FaChevronLeft />
        </button>
        <select
          className="block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
          value={activePage}
          onChange={handleActivePageChange}
        >
          {pages.map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
        <button
          disabled={nextDisabled}
          className="my-auto border border-gray-200 h-full size-10 px-2 rounded-md"
          onClick={() => {
            handlePageChangeButton;
          }}
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="flex px-2">
        <label htmlFor="perPage" className="text-xs w-fit">
          Per page
        </label>
        <select
          className="block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
          value={perPage}
          onChange={handlePerPageChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;

import React, { useState, useEffect } from "react";

export default function Paginate({currentPage, numberOfPages, setCurrentPage, clickedPageRef}) {

  const pageNumbers = Array.from(
    { length: numberOfPages },
    (_, i) => i + 1
  );

  return (
    <nav>
      <ul className="pagination flex gap-2 mt-4">
        {
          pageNumbers.map((number) => (
            <li
              className={
                `px-3 py-2 border rounded-lg cursor-pointer ${currentPage === number ? 'bg-primary text-white' : 'bg-white'}`
              }
              key={number}
              onClick={() => {
                setCurrentPage(number);
                clickedPageRef.current = number;
              }}
              >
                {number}
            </li>
          ))
        }
      </ul>
    </nav>
  )
};
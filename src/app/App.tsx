"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "../app/components/Navbar";

export default function App({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      {/* Navbar nur anzeigen, wenn die Route nicht "/" ist */}
      {pathname !== "/" && <Navbar />}

      <div className="mt-40 flex justify-center items-center">
        <div className="sm:w-[1225px] min-h-screen flex flex-col pb-10">
          <div className="flex justify-center items-center">
            <div className="sm:w-[70%] w-full sm:px-0 px-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
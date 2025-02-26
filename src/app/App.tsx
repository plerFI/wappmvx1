"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "../app/components/Navbar";

export default function App({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  // useEffect, um sicherzustellen, dass der Pfad nach dem Rendern korrekt ist
  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <div>
      {/* Navbar nur anzeigen, wenn die Route nicht "/" ist */}
      {currentPath !== "/" && <Navbar />}

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

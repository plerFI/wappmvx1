"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import ConnectWallet from "./ConnectWallet";
import DiscordButton from "./DiscordButton";
import Image from "next/image";

export default function Navbar() {
  const [drawer, setDrawer] = useState(false);
  const pathname = usePathname(); // Holt die aktuelle Route

  return (
    <div className="flex justify-center w-full items-center fixed top-0 z-[99] bg-themeblack/90 border-bottom">
      <div className="sm:w-[1225px] w-full justify-between items-center px-4 py-4 sm:py-5 flex">
      <Link href="/">
        <Image
            src="/VaultFILogo.png"
            className="w-14 sm:w-18 relative z-[99]" 
            alt={""}        />
        </Link>

        <nav
          className={`sm:static fixed flex justify-center sm:flex-row flex-col max-sm:h-screen max-sm:w-full max-sm:bg-themeblack ${
            drawer ? "max-sm:top-0" : "max-sm:top-[-2000px]"
          } transition-all ease-in duration-300 max-sm:left-0 items-center gap-4`}
        >
         {/* <Link
            href="/"
            className={`text-themeWhite transition-all ease-in duration-150 px-2 py-2 tracking-wide font-Pooppins text-sm font-semibold uppercase ${
              pathname === "/" ? "text-themeGreen" : "hover:text-themeGreen"
            }`}
          >
            Home
          </Link>*/}
          <Link
            href="/metavault"
            className={`text-themeWhite transition-all ease-in duration-150 px-2 py-2 tracking-wide font-Pooppins text-sm font-semibold uppercase ${
              pathname === "/metavault" ? "text-themeGreen" : "hover:text-themeGreen"
            }`}
          >
            Meta-Vault
          </Link>
          <Link
            href="/swap"
            className={`text-themeWhite transition-all ease-in duration-150 px-2 py-2 tracking-wide font-Pooppins text-sm font-semibold uppercase ${
              pathname === "/swap" ? "text-themeGreen" : "hover:text-themeGreen"
            }`}
          >
            Swap
          </Link>
          <Link
            href="/docs"
            className={`text-themeWhite transition-all ease-in duration-150 px-2 py-2 tracking-wide font-Pooppins text-sm font-semibold uppercase ${
              pathname === "/docs" ? "text-themeGreen" : "hover:text-themeGreen"
            }`}
          >
            Documentation
          </Link>
          <div className="sm:hidden mt-4 flex justify-end items-center gap-2">
            <DiscordButton />
            <ConnectWallet />
          </div>
        </nav>

        <div className="hidden sm:flex justify-end items-center gap-2">
          <DiscordButton />
          <ConnectWallet />
        </div>

        {!drawer ? (
          <HiOutlineBars3BottomRight
            onClick={() => setDrawer(true)}
            className="sm:hidden relative z-[99] flex text-3xl text-themeWhite cursor-pointer"
          />
        ) : (
          <RxCross2
            onClick={() => setDrawer(false)}
            className="sm:hidden relative z-[99] flex text-3xl text-themeWhite cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

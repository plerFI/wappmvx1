"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getContract } from "thirdweb";
import { client } from "../../client";
import { defineChain } from "thirdweb/chains";
import { getVaultContract, getVaultUSDCAddress } from "../../contract";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import Fees from "./Fees";
import BestVaults from "./BestVaults";
import PanicMode from "./PanicMode";

export default function VaultPage() {
  // Alle Hooks ganz oben deklarieren
  const [active, setActive] = useState<"Deposit" | "Withdraw">("Deposit");
  const [isPanicActive, setIsPanicActive] = useState(false);

  // Parameter aus der URL lesen
  const params = useParams();
  const vaultIdParam = params.vaultId;
  const vaultId = Array.isArray(vaultIdParam) ? vaultIdParam[0] : vaultIdParam;

  // Falls kein vaultId vorhanden ist, direkt ein Loading-UI rendern
  if (!vaultId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-400 animate-pulse">Loading Vault...</p>
      </div>
    );
  }

  const vaultContract = getVaultContract(vaultId);
  const usdcAddress = getVaultUSDCAddress(vaultId);

  if (!vaultContract || !usdcAddress) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-400 animate-pulse">Loading Vault...</p>
      </div>
    );
  }

  // Bestimmen der passenden Chain: "base-vault" verwendet Chain-ID 8453, sonst Chain-ID 1
  const chain = vaultId === "base-vault" ? defineChain(8453) : defineChain(1);

  const usdcContract = getContract({
    client,
    address: usdcAddress,
    chain: chain,
  });

  if (!usdcContract) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-400 animate-pulse">Loading USDC Contract...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-[#282828] px-6 py-8 sm:p-8 rounded-xl shadow-xl shadow-themeGreen/20 flex flex-col gap-7 max-w-3xl mx-auto">
      {/* Deposit / Withdraw Umschalter */}
      <div className="flex border border-themeWhite/70 rounded-full overflow-hidden">
        <button
          onClick={() => setActive("Deposit")}
          className={`flex-1 ${
            active === "Deposit" ? "bg-themeGreen/80" : ""
          } text-xs sm:text-sm cursor-pointer uppercase font-bold tracking-widest rounded-full text-themeWhite py-2.5 px-4`}
        >
          Deposit
        </button>
        <button
          onClick={() => setActive("Withdraw")}
          className={`flex-1 ${
            active === "Withdraw" ? "bg-themeGreen/80" : ""
          } text-xs sm:text-sm cursor-pointer uppercase font-bold tracking-widest rounded-full text-themeWhite py-2.5 px-4`}
        >
          Withdraw
        </button>
      </div>

      {/* Dynamischer Inhalt je nach Auswahl */}
      <div className="p-4 bg-[#282828] w-full">
        {active === "Deposit" && (
          <Deposit
            vaultContract={vaultContract}
            usdcContract={usdcContract}
            isPanicActive={isPanicActive}
          />
        )}
        {active === "Withdraw" && (
          <Withdraw vaultContract={vaultContract} maxShares={BigInt(100)} />
        )}
      </div>

      {/* Trennlinie */}
      <div className="border-b border-gray-700 my-4"></div>

      {/* Vault-Informationen als reiner Text */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-themeWhite font-Poppins tracking-widest uppercase font-medium">
            Pool Status
          </p>
          <p className="text-xs text-themeWhite font-Poppins tracking-widest font-semibold">
            {isPanicActive ? "Inactive" : "Active"}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-themeWhite font-Poppins tracking-widest uppercase font-medium">
            Vault Fees
          </p>
          <p className="text-xs text-themeWhite font-Poppins tracking-widest font-semibold">
            <Fees vaultId={vaultId} />
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-themeWhite font-Poppins tracking-widest uppercase font-medium">
            Best Vaults
          </p>
          <p className="text-xs text-themeWhite font-Poppins tracking-widest font-semibold">
            <BestVaults contract={vaultContract} />
          </p>
        </div>
      </div>
    </div>
  );
}

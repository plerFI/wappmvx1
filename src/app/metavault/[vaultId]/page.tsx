"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getVaultContract } from "../../contract";
import PanicMode from "./PanicMode";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Fees from "./Fees";
import BestVaults from "./BestVaults";

export default function VaultPage() {
  const { vaultId } = useParams();

  // Hole den Smart Contract für diesen Vault
  const vaultContract = getVaultContract(vaultId as string);

  // Zustand für Panic Mode, um Deposit zu deaktivieren
  const [isPanicActive, setIsPanicActive] = useState(false);

  if (!vaultId || !vaultContract) return <p className="text-center text-lg text-gray-300">Loading Vault...</p>;

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-center text-white mb-6">{vaultId}</h1>

      {/* Panic Mode Status */}
      <PanicMode vaultContract={vaultContract} setPanicState={setIsPanicActive} />

      {/* Gebührenübersicht */}
      <Fees vaultId={vaultId as string} />

      {/* Deposit & Withdraw Funktionen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Deposit vaultContract={vaultContract} isPanicActive={isPanicActive} />
        <Withdraw vaultContract={vaultContract} maxShares={BigInt(100)} /> {/* Placeholder für maxShares */}
      </div>

      {/* Beste Vaults Empfehlung */}
      <div className="mt-6">
        <BestVaults contract={vaultContract} />
      </div>
    </div>
  );
}

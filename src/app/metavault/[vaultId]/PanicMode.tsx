"use client";

import { useReadContract } from "thirdweb/react";

export default function PanicMode({ vaultContract, setPanicState }: { vaultContract: any; setPanicState: (state: boolean) => void }) {
  const { data: isPanicActive, isPending } = useReadContract({
    contract: vaultContract,
    method: "function panic() view returns (bool)", // Liest den Panic-Status
    params: [],
  });

  // Sobald der Wert geladen ist, setzen wir den Panic-Status im übergeordneten Zustand
  if (isPanicActive !== undefined) {
    setPanicState(isPanicActive);
  }

  return (
    <div className="p-4 border rounded bg-red-900">
      <h3 className="text-lg font-bold mb-2 text-white">⚠️ Panic Mode</h3>

      {isPending ? (
        <p className="text-white">Checking panic status...</p>
      ) : isPanicActive ? (
        <p className="text-yellow-300 font-bold">🔥 Vault is in Panic Mode! Deposits are disabled.</p>
      ) : (
        <p className="text-green-300">✅ Vault is running normally.</p>
      )}
    </div>
  );
}

"use client";

import { useReadContract } from "thirdweb/react";
import { getVaultContract } from "@/app/contract"; // Import vault contract function
import { useEffect, useState } from "react";

export default function Fees({ vaultId }: { vaultId: string }) {
  const contract = getVaultContract(vaultId);
  const [totalFee, setTotalFee] = useState<number | null>(null);

  const { data: depositFee } = useReadContract({
    contract,
    method: "function depositFeeBP() view returns (uint256)",
    params: [],
  });

  const { data: withdrawFee } = useReadContract({
    contract,
    method: "function withdrawFeeBP() view returns (uint256)",
    params: [],
  });

  const { data: performanceFee } = useReadContract({
    contract,
    method: "function performanceFeeBP() view returns (uint256)",
    params: [],
  });

  useEffect(() => {
    if (depositFee !== undefined && withdrawFee !== undefined && performanceFee !== undefined) {
      const total =
        Number(depositFee) / 100 +
        Number(withdrawFee) / 100 +
        Number(performanceFee) / 100;

      setTotalFee(total);
    }
  }, [depositFee, withdrawFee, performanceFee]);

  return (
    <div className="relative p-4 border rounded bg-zinc-900">
      <h3 className="text-lg font-bold mb-2">📊 Total Fee</h3>
      <div className="group relative inline-block">
        <span className="text-2xl font-semibold text-blue-400">
          {totalFee !== null ? `${totalFee.toFixed(2)}%` : "Loading..."}
        </span>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs p-2 rounded shadow-lg">
          📥 Deposit Fee: {depositFee ? `${Number(depositFee) / 100}%` : "Loading..."} <br />
          📤 Withdraw Fee: {withdrawFee ? `${Number(withdrawFee) / 100}%` : "Loading..."} <br />
          📈 Performance Fee: {performanceFee ? `${Number(performanceFee) / 100}%` : "Loading..."}
        </div>
      </div>
    </div>
  );
}

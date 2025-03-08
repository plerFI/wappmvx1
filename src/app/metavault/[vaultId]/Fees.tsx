"use client";

import { useReadContract } from "thirdweb/react";
import { getVaultContract } from "@/app/contract";
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

  return totalFee !== null ? `${totalFee.toFixed(2)}%` : "Loading...";
}

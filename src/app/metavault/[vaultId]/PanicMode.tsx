"use client";

import { useReadContract } from "thirdweb/react";

export default function PanicMode({ vaultContract }: { vaultContract: any }) {
  const { data: isPanicActive, isPending } = useReadContract({
    contract: vaultContract,
    method: "function panic() view returns (bool)",
    params: [],
  });

  if (isPending) return "Loading...";
  return isPanicActive ? "Inactive" : "Active";
}

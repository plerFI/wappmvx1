"use client";

import { useReadContract } from "thirdweb/react";

export default function BestVaults({ contract }: { contract: any }) {
  const { data: bestVault1 } = useReadContract({
    contract,
    method: "function bestVaults(uint256) view returns (string)",
    params: [BigInt(0)], // ✅ Verwende BigInt für die Parameter
  });

  const { data: bestVault2 } = useReadContract({
    contract,
    method: "function bestVaults(uint256) view returns (string)",
    params: [BigInt(1)], // ✅ Verwende BigInt für die Parameter
  });

  const { data: bestVault3 } = useReadContract({
    contract,
    method: "function bestVaults(uint256) view returns (string)",
    params: [BigInt(2)], // ✅ Verwende BigInt für die Parameter
  });

  if (!bestVault1 || !bestVault2 || !bestVault3) return "Loading...";

  return `${bestVault1}, ${bestVault2}, ${bestVault3}`;
}

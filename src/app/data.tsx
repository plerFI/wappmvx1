import { useReadContract } from "thirdweb/react";
import { getVaultContract } from "./contract";
import { defineChain } from "thirdweb";
import { client } from "./client"

export function useVaultData(vaultId: string) {
  let contract = getVaultContract(vaultId);

  // Dummy Contract, um den Hook immer auszuführen
  if (!contract) {
    contract = { client, address: "0x1e12966EC12B981281e7078f4877b62fef16D7aF", chain: defineChain(8453),}; // Dummy Address
    console.error(`No contract found for Vault ${vaultId}.`);
  }

  const { data: name, isPending: isNameLoading } = useReadContract({
    contract,
    method: "function getVaultName() external view returns (string memory)",
    params: [],
  });

  const { data: network, isPending: isNetworkLoading } = useReadContract({
    contract,
    method: "function getChain() external view returns (string)",
    params: [],
  });

  const { data: rawTvl, isPending: isTvlLoading } = useReadContract({ 
    contract,
    method: "function getTVL() view returns (uint256)",
    params: [],
  });
  
  const tvl = rawTvl ? rawTvl / 1_000_000n : undefined; 

  const { data: apy, isPending: isApyLoading } = useReadContract({
    contract,
    method: "function getAPY() view returns (uint256)",
    params: [],
  });

  const isLoading = isNameLoading || isNetworkLoading || isTvlLoading || isApyLoading;

  return {
    name: name || "Unbekannt",
    network: network || "Unbekannt",
    tvl: tvl ? Number(tvl) : 0,
    apy: apy ? Number(apy) : 0,
    isLoading,
  };
}

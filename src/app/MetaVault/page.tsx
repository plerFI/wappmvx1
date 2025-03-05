"use client";
import Link from "next/link";
import { useVaultData } from "../data"; 

import { arbitrum, ethereum, optimism, base } from "thirdweb/chains";
import { ChainProvider, ChainIcon } from "thirdweb/react";
import { client } from "@/app/client";

interface Vault {
  id: string;
  chain: any;
}

const vaults: Vault[] = [
  { id: "base-vault", chain: base },
  { id: "ethereum-vault", chain: ethereum },
  { id: "arbitrum-vault", chain: arbitrum },
  { id: "optimism-vault", chain: optimism },
];

export default function MetavaultList() {
  return (
    <main className="p-4 min-h-screen flex flex-col items-center container max-w-screen-lg mx-auto">
      <div className="py-10">
        <h1 className="text-3xl font-bold text-white mb-6">Meta-Vaults</h1>
        <div className="w-full">
          <VaultList />
        </div>
      </div>
    </main>
  );
}

function VaultList() {
  return (
    <div className="grid gap-4 w-full">
      {vaults.map((vault) => (
        <VaultCard key={vault.id} vault={vault} />
      ))}
    </div>
  );
}

function VaultCard({ vault }: { vault: Vault }) {
  const { name, network, apy, tvl, isLoading } = useVaultData(vault.id);

  if (isLoading) {
    return <p className="text-white text-center">Loading {vault.id}...</p>;
  }

  return (
    <Link href={`/metavault/${vault.id}`} passHref>
      <div className="flex items-center p-4 border border-gray-700 rounded-lg hover:bg-gray-900 transition cursor-pointer">
        <ChainProvider chain={vault.chain}>
          <ChainIcon
            client={client}
            className="h-auto w-20 rounded-full mr-4"
            loadingComponent={<span>Loading...</span>}
          />
        </ChainProvider>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white">{name}</h2>
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <p className="text-gray-400 text-sm">{network}</p>
          </div>
        </div>
        <div className="text-right ml-10">
          <p className="text-green-400 font-bold"></p>
          <p className="text-green-400 font-sm">TVL: ${tvl.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
}
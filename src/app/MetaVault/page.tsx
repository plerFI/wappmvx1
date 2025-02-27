"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Vault {
  id: string;
  name: string;
  network: string;
  apy: number;
  tvl: number;
  status: string;
  image: string;
}

export default function MetavaultList() {
  const [vaults, setVaults] = useState<Vault[]>([]);

  useEffect(() => {
    // Simulierte API-Daten (hier müsstest du eine echte API-Anfrage integrieren)
    const fetchVaults = async () => {
      const data: Vault[] = [
        {
          id: "vault-1",
          name: "USDC Optimizer",
          network: "Ethereum",
          apy: 12.5,
          tvl: 5000000,
          status: "Active",
          image: "/images/vault1.png",
        },
        {
          id: "vault-2",
          name: "DAI Safe Yield",
          network: "Polygon",
          apy: 9.8,
          tvl: 3200000,
          status: "Active",
          image: "/images/vault2.png",
        },
        {
          id: "vault-3",
          name: "WBTC Growth",
          network: "Binance Smart Chain",
          apy: 14.2,
          tvl: 2100000,
          status: "Inactive",
          image: "/images/vault3.png",
        },
      ];
      setVaults(data);
    };

    fetchVaults();
  }, []);

  return (
    <main className="p-4 min-h-screen flex flex-col items-center container max-w-screen-lg mx-auto">
      <div className="py-10">
        <h1 className="text-3xl font-bold text-white mb-6">Beefy Vaults Übersicht</h1>

        <div className="w-full">
          <VaultList vaults={vaults} />
        </div>
      </div>
    </main>
  );
}

function VaultList({ vaults }: { vaults: Vault[] }) {
  return (
    <div className="grid gap-4 w-full">
      {vaults.map((vault) => (
        <Link key={vault.id} href={`/vault/${vault.id}`} passHref>
          <div className="flex items-center p-4 border border-gray-700 rounded-lg hover:bg-gray-900 transition cursor-pointer">
            <Image src={vault.image} alt={vault.name} width={50} height={50} className="rounded-full mr-4" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white">{vault.name}</h2>
              <p className="text-gray-400 text-sm">{vault.network} - {vault.status}</p>
            </div>
            <div className="text-right">
              <p className="text-green-400 font-bold">{vault.apy}% APY</p>
              <p className="text-gray-400 text-sm">TVL: ${vault.tvl.toLocaleString()}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

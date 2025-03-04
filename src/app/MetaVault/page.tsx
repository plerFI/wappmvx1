"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { useVaultData } from "../data"; 
import vault1 from "../assets/vault1.png";
import vault2 from "../assets/vault2.png";
import vault3 from "../assets/vault3.png";
import vault4 from "../assets/vault4.png";
import vault5 from "../assets/vault5.png";
import vault6 from "../assets/vault6.png";
import vault7 from "../assets/vault7.png";
import vault8 from "../assets/vault8.png";
import vault9 from "../assets/vault9.png";
import vault10 from "../assets/vault10.png";


interface Vault {
  id: string;
  image: StaticImageData;
}

const vaults: Vault[] = [
  { id: "base-vault", image: vault1 },
/*  { id: "ethereum-vault", image: "vault2" }, */
/*  { id: "arbitrum-vault", image: "vault3" }, */
/*  { id: "optimistic-vault", image: "vault4" }, */
/*  { id: "vault-6", image: "vault6" }, */
/*  { id: "vault-7", image: "vault7" }, */
/*  { id: "vault-8", image: "vault8" }, */
/*  { id: "vault-9", image: "vault9" }, */
/*  { id: "vault-10", image: "vault10" }, */
];

export default function MetavaultList() {

  return (
    <main className="p-4 min-h-screen flex flex-col items-center container max-w-screen-lg mx-auto">
      <div className="py-10">
        <h1 className="text-3xl font-bold text-white mb-6">Meta-Vaults</h1>
        <div className="w-full">
          <VaultList/>
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
    <Link href={`/vaults/${vault.id}`} passHref>
      <div className="flex items-center p-4 border border-gray-700 rounded-lg hover:bg-gray-900 transition cursor-pointer">
        <Image src={vault.image} alt={name} width={50} height={50} className="rounded-full mr-4" />
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

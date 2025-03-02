"use client";

import { useState, useEffect } from "react";
import { useVaultData } from "../data";
import { getVaultContract } from "../contract";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import Image from "next/image";
import { parseUnits } from "ethers/lib/utils"; 

interface VaultModalProps {
  vaultId: string;
  onClose: () => void;
}

/* 🔹 Vault → Stablecoin Mapping */
const vaultStablecoins: Record<string, { symbol: string; decimals: number }> = {
  "vault1": { symbol: "USDC", decimals: 6 },
  "vault2": { symbol: "DAI", decimals: 18 },
  "vault3": { symbol: "USDT", decimals: 6 },
  "vault4": { symbol: "FRAX", decimals: 18 },
  "vault5": { symbol: "LUSD", decimals: 18 },
};

export default function VaultModal({ vaultId, onClose }: VaultModalProps) {
  const { name, network, isLoading } = useVaultData(vaultId);
  const [amount, setAmount] = useState("");
  const [active, setActive] = useState("Deposit");

  // Hole den passenden Stablecoin für die Vault-ID
  const stablecoin = vaultStablecoins[vaultId] || { symbol: "TOKEN", decimals: 18 };

  // Fetch contract for the selected Vault
  const contract = getVaultContract(vaultId);

  const { mutate: sendTransaction, isPending: isDepositPending } = useSendTransaction();

  const handleDeposit = async () => {
    if (!amount || isNaN(Number(amount))) return alert("❌ Please enter a valid amount.");
  
    try {
      const formattedAmount = parseUnits(amount, stablecoin.decimals);
  
      const transaction = {
        contract,
        method: "deposit",
        params: [formattedAmount],
      };
  
      const tx = await sendTransaction(transaction);
      alert(`✅ Deposit successful! Transaction Hash: ${tx.transactionHash}`);
    } catch (err) {
      alert(`❌ Error during deposit: ${err}`);
    }
  };
  
  

  if (isLoading) {
    return <p className="text-white text-center">Loading vault data...</p>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-[#282828] px-6 py-8 sm:p-8 rounded-xl shadow-xl shadow-themeGreen/20 flex flex-col gap-7">
        <button className="absolute top-4 right-4 text-white text-2xl" onClick={onClose}>✕</button>

        {/* Header Section */}
        <div className="flex items-center mb-4">
          <Image src={`/images/${vaultId}.png`} alt={name} width={60} height={60} className="rounded-full mr-4" />
          <div>
            <h2 className="text-xl font-bold text-white">{name} ({stablecoin.symbol})</h2>
            <p className="text-gray-400">{network}</p>
          </div>
        </div>

        {/* Button Navigation */}
        <div className="flex border border-themeWhite/70 rounded-full overflow-hidden">
          <button
            onClick={() => setActive("Deposit")}
            className={`flex-1 ${active === "Deposit" ? "bg-themeGreen/80" : ""} text-xs sm:text-sm cursor-pointer uppercase font-bold tracking-widest rounded-full text-themeWhite py-2.5 px-4`}
          >
            Deposit
          </button>
          <button
            onClick={() => setActive("Withdraw")}
            className={`flex-1 ${active === "Withdraw" ? "bg-themeGreen/80" : ""} text-xs sm:text-sm cursor-pointer uppercase font-bold tracking-widest rounded-full text-themeWhite py-2.5 px-4`}
          >
            Withdraw
          </button>
          <button
            onClick={() => setActive("TVL")}
            className={`flex-1 ${active === "TVL" ? "bg-themeGreen/80" : ""} text-xs sm:text-sm cursor-pointer uppercase font-bold tracking-widest rounded-full text-themeWhite py-2.5 px-4`}
          >
            TVL
          </button>
        </div>

        {/* Content Sections */}
        {active === "Deposit" && <Deposit amount={amount} setAmount={setAmount} stablecoin={stablecoin} handleDeposit={handleDeposit} />}
        {active === "Withdraw" && <Withdraw amount={amount} setAmount={setAmount} stablecoin={stablecoin} />}
        {active === "TVL" && <Graph />}
      </div>
    </div>
  );
}

/* Deposit Component */
function Deposit({ amount, setAmount, stablecoin, handleDeposit }: { amount: string; setAmount: (val: string) => void; stablecoin: any; handleDeposit: () => void }) {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <p className="text-gray-400 text-sm mb-2">Enter Amount ({stablecoin.symbol})</p>
      <div className="relative mb-4 flex items-center">
        <input
          type="number"
          placeholder={`0.00 ${stablecoin.symbol}`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 border border-gray-700 bg-gray-900 text-white rounded-lg"
        />
        <span className="absolute right-4 text-gray-400 text-sm">{stablecoin.symbol}</span>
      </div>
      <button
        className="w-full px-4 py-3 bg-green-600 rounded-lg font-semibold hover:bg-green-500 transition-all duration-300"
        onClick={handleDeposit}
      >
        Deposit {stablecoin.symbol}
      </button>
    </div>
  );
}

/* Withdraw Component */
function Withdraw({ amount, setAmount, stablecoin }: { amount: string; setAmount: (val: string) => void; stablecoin: any }) {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <p className="text-gray-400 text-sm mb-2">Enter Amount ({stablecoin.symbol})</p>
      <div className="relative mb-4 flex items-center">
        <input
          type="number"
          placeholder={`0.00 ${stablecoin.symbol}`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 border border-gray-700 bg-gray-900 text-white rounded-lg"
        />
        <span className="absolute right-4 text-gray-400 text-sm">{stablecoin.symbol}</span>
      </div>
      <button className="w-full px-4 py-3 bg-red-600 rounded-lg font-semibold hover:bg-red-500 transition-all duration-300">
        Withdraw {stablecoin.symbol}
      </button>
    </div>
  );
}

/* TVL Graph Placeholder */
function Graph() {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-center">
      <p className="text-white text-sm">📊 TVL Graph coming soon!</p>
    </div>
  );
}

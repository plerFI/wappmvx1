"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { getVaultContract } from "../../contract";
import PanicMode from "./PanicMode";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Fees from "./Fees";
import BestVaults from "./BestVaults";

export default function VaultPage() {
  const router = useRouter();
  const { vaultId } = router.query;

  // Hole den Smart Contract für diesen Vault
  const vaultContract = getVaultContract(vaultId as string);

  // Zustand für Panic Mode, um Deposit zu deaktivieren
  const [isPanicActive, setIsPanicActive] = useState(false);

  if (!vaultId || !vaultContract)
    return <p className="text-center text-lg text-gray-300">Loading Vault...</p>;

  return (
    <div className="container mx-auto p-6 max-w-7xl flex flex-col md:flex-row gap-8">
      {/* Hauptbereich - Vault-Informationen */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <img src="/usdc-logo.png" alt="USDC Logo" className="w-8 h-8" />
          Moonwell Flagship USDC
        </h1>

        {/* Stats Übersicht */}
        <div className="flex justify-between text-white mb-6">
          <div>
            <p className="text-sm text-gray-400">Total Deposits</p>
            <h2 className="text-2xl font-bold">$31,274,901.42</h2>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Available Liquidity</p>
            <h2 className="text-2xl font-bold">$16,825,761.96</h2>
          </div>
        </div>

        {/* Performance Chart (Platzhalter) */}
        <div className="bg-gray-900 rounded-lg h-40 mb-6 flex items-center justify-center">
          <p className="text-gray-500">[Chart Placeholder]</p>
        </div>

        {/* Vault Informationen */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-bold text-white mb-2">Vault Information</h3>
          <p className="text-gray-400">Curators: Block Analitica, B.Protocol</p>
          <p className="text-gray-400">Curator Timelock: 96 hours</p>
          <p className="text-gray-400">Performance Fee: 15%</p>
        </div>

        {/* Vault Breakdown Tabelle */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-white mb-4">Vault Breakdown</h3>
          <table className="w-full text-gray-300">
            <thead>
              <tr className="text-gray-500">
                <th className="text-left">Allocation</th>
                <th className="text-left">Vault Deposit</th>
                <th className="text-left">Collateral</th>
                <th className="text-left">LTV</th>
                <th className="text-left">APY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>91.05%</td>
                <td>$28,475,589.92</td>
                <td>cbBTC</td>
                <td>86%</td>
                <td>5.36%</td>
              </tr>
              <tr>
                <td>4.67%</td>
                <td>$1,459,811.01</td>
                <td>cbETH</td>
                <td>86%</td>
                <td>5.37%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sidebar - Deposit/Withdraw */}
      <div className="w-full md:w-96 bg-gray-900 p-6 rounded-lg">
        {/* Deposit / Withdraw Tabs */}
        <div className="flex justify-between mb-4">
          <button className="text-white border-b-2 border-blue-500 pb-2 w-1/2 text-center">
            Deposit
          </button>
          <button className="text-gray-500 pb-2 w-1/2 text-center">Withdraw</button>
        </div>

        {/* Deposit Box */}
        <Deposit vaultContract={vaultContract} isPanicActive={isPanicActive} />

        {/* Deposited Info */}
        <div className="bg-gray-800 p-4 rounded-lg mt-4">
          <p className="text-gray-500">You have deposited</p>
          <h3 className="text-xl text-white">$0.00</h3>
        </div>

        {/* Claimable Info */}
        <div className="bg-gray-800 p-4 rounded-lg mt-4">
          <p className="text-gray-500">Claimable Now</p>
          <h3 className="text-xl text-white">$0.00</h3>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { prepareContractCall, PreparedTransaction } from "thirdweb"; 

export default function Deposit({ vaultContract, isPanicActive }: { vaultContract: any; isPanicActive: boolean }) {
  const account = useActiveAccount();
  const [amount, setAmount] = useState("");
  const { mutate: sendTransaction, isPending } = useSendTransaction();

  const handleDeposit = async () => {
    if (!account || !vaultContract || isPanicActive) return; // Blockiert, wenn Panic Mode aktiv ist
    try {
      const transaction: PreparedTransaction = prepareContractCall({
        contract: vaultContract,
        method: "function deposit(uint256 amount)", 
        params: [BigInt(amount) * BigInt(1e18)], 
      });

      sendTransaction(transaction);
      alert("Deposit successful!");
    } catch (error) {
      console.error("Deposit failed:", error);
    }
  };

  return (
    <div className="p-4 border rounded bg-zinc-900">
      <h3 className="text-lg font-bold mb-2">Deposit USDC</h3>
      <input
        type="number"
        placeholder="Enter amount"
        className="p-2 border rounded w-full mb-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={handleDeposit}
        className={`px-4 py-2 rounded w-full ${
          isPanicActive ? "bg-gray-500 text-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
        }`}
        disabled={isPending || isPanicActive}
      >
        {isPanicActive ? "Deposits Disabled (Panic Mode)" : isPending ? "Processing..." : "Deposit"}
      </button>
    </div>
  );
}
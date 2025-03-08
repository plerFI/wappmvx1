"use client";

import { useState } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { prepareContractCall, PreparedTransaction } from "thirdweb"; 

export default function Deposit({ vaultContract, isPanicActive }: { vaultContract: any; isPanicActive: boolean }) {
  const account = useActiveAccount();
  const [amount, setAmount] = useState("");
  const { mutate: sendTransaction, isPending } = useSendTransaction();

  const handleDeposit = async () => {
    if (!account || !vaultContract || isPanicActive) return; 
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
    <div className="bg-gray-900 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-white mb-2">Deposit USDC</h3>
      
      {/* Input mit dunklerem Platzhalter */}
      <input
        type="number"
        placeholder="Enter amount"
        className="p-2 w-full bg-white text-gray-900 rounded-md border-none placeholder-gray-600 focus:outline-none focus:ring-0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Deposit-Button ohne blauen Schatten */}
      <button
        onClick={handleDeposit}
        className={`w-full text-white font-semibold py-2 rounded-md mt-2 focus:outline-none focus:ring-0 ${
          isPanicActive ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
        }`}
        disabled={isPending || isPanicActive}
      >
        {isPanicActive ? "Deposits Disabled (Panic Mode)" : isPending ? "Processing..." : "Deposit"}
      </button>
    </div>
  );
}

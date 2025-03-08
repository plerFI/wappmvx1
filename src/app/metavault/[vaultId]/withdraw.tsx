"use client";

import { useState } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { prepareContractCall, PreparedTransaction } from "thirdweb";

export default function Withdraw({ vaultContract, maxShares }: { vaultContract: any; maxShares: bigint }) {
  const account = useActiveAccount();
  const [amount, setAmount] = useState("");
  const [percentage, setPercentage] = useState(0);
  const { mutate: sendTransaction, isPending } = useSendTransaction();

  const handleWithdraw = async () => {
    if (!account || !vaultContract) return;
    try {
      const withdrawAmount = (maxShares * BigInt(percentage)) / BigInt(100);

      const transaction: PreparedTransaction = prepareContractCall({
        contract: vaultContract,
        method: "function withdraw(uint256 amount)",
        params: [withdrawAmount],
      });

      sendTransaction(transaction);
      alert("Withdrawal successful!");
    } catch (error) {
      console.error("Withdrawal failed:", error);
    }
  };

  return (
    <div className="bg-[#1d1d1d] p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-white mb-2">Withdraw USDC</h3>

      {/* Eingabefeld für Betrag mit dunklerem Platzhalter */}
      <input
        type="number"
        placeholder="Enter amount"
        className="p-2 w-full bg-white text-gray-900 rounded-md border-none placeholder-gray-600 focus:outline-none focus:ring-0"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          setPercentage(Math.min((Number(e.target.value) / Number(maxShares)) * 100, 100));
        }}
      />

      {/* Schieberegler für Prozentsatz */}
      <input
        type="range"
        min="0"
        max="100"
        value={percentage}
        className="w-full mb-2"
        aria-label="Withdraw percentage slider"
        title="Adjust the withdrawal percentage"
        onChange={(e) => {
          const newPercentage = Number(e.target.value);
          setPercentage(newPercentage);
          setAmount(((Number(maxShares) * newPercentage) / 100).toFixed(6));
        }}
      />
      <p className="text-center text-sm text-gray-400">Selected: {percentage}% of your shares</p>

      {/* Withdraw-Button ohne blauen Schatten */}
      <button
        onClick={handleWithdraw}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md mt-2 focus:outline-none focus:ring-0"
        disabled={isPending}
      >
        {isPending ? "Processing..." : "Withdraw"}
      </button>
    </div>
  );
}

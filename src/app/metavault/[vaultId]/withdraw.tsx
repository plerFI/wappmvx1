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
    <div className="p-4 border rounded bg-zinc-900">
      <h3 className="text-lg font-bold mb-2">Withdraw USDC</h3>

      {/* Eingabefeld für den Betrag */}
      <label htmlFor="withdrawAmount" className="block text-sm text-gray-300">
        Enter Amount:
      </label>
      <input
        id="withdrawAmount"
        type="number"
        placeholder="Enter amount"
        className="p-2 border rounded w-full mb-2"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          setPercentage(Math.min((Number(e.target.value) / Number(maxShares)) * 100, 100));
        }}
      />

      {/* Schieberegler mit Label & aria-label für Barrierefreiheit */}
      <label htmlFor="withdrawSlider" className="block text-sm text-gray-300">
        Select withdrawal percentage:
      </label>
      <input
        id="withdrawSlider"
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

      {/* Abheben-Button */}
      <button
        onClick={handleWithdraw}
        className="bg-red-500 text-white px-4 py-2 rounded w-full"
        disabled={isPending}
      >
        {isPending ? "Processing..." : "Withdraw"}
      </button>
    </div>
  );
}
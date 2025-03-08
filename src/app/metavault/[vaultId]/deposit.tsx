"use client";

import { useState } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { prepareContractCall, PreparedTransaction } from "thirdweb";

type DepositProps = {
  vaultContract: any;
  usdcContract: any;
  isPanicActive: boolean;
};

export default function Deposit({ vaultContract, usdcContract, isPanicActive }: DepositProps) {
  const account = useActiveAccount();
  const [amount, setAmount] = useState("");
  const { mutate: sendTransaction, isPending } = useSendTransaction();

  const handleDeposit = async () => {
    if (!account || !vaultContract || !usdcContract || isPanicActive) return;
    try {
      // USDC verwendet in der Regel 6 Dezimalstellen
      const depositAmount = BigInt(amount) * BigInt(1e6);

      // Zuerst: Approve-Transaktion vorbereiten, damit der Vault-Contract USDC ausgeben darf
      const approveTx: PreparedTransaction = prepareContractCall({
        contract: usdcContract,
        method: "function approve(address spender, uint256 amount)",
        params: [vaultContract.address, depositAmount],
      });

      await new Promise<void>((resolve, reject) => {
        sendTransaction(approveTx, {
          onSuccess: () => {
            console.log("Approve transaction successful");
            resolve();
          },
          onError: (error) => {
            console.error("Approve transaction failed:", error);
            reject(error);
          },
        });
      });

      // Anschließend: Deposit-Transaktion vorbereiten
      const depositTx: PreparedTransaction = prepareContractCall({
        contract: vaultContract,
        method: "function deposit(uint256 amount)",
        params: [depositAmount],
      });

      await new Promise<void>((resolve, reject) => {
        sendTransaction(depositTx, {
          onSuccess: () => {
            console.log("Deposit transaction successful");
            resolve();
          },
          onError: (error) => {
            console.error("Deposit transaction failed:", error);
            reject(error);
          },
        });
      });

      alert("Deposit successful!");
    } catch (error) {
      console.error("Deposit process failed:", error);
    }
  };

  return (
    <div className="bg-[#1d1d1d] p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-white mb-2">Deposit USDC</h3>
      
      <input
        type="number"
        placeholder="Enter amount"
        className="p-2 w-full bg-white text-gray-900 rounded-md border-none placeholder-gray-600 focus:outline-none focus:ring-0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

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

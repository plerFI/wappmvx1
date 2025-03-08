"use client";

import { useState } from "react";
import { 
  useActiveAccount, 
  useSendTransaction, 
  useReadContract,  
} from "thirdweb/react";
import { useContract } from "@thirdweb-dev/react";
import { prepareContractCall, PreparedTransaction } from "thirdweb";

export default function Deposit({ vaultContract, isPanicActive }: { vaultContract: any; isPanicActive: boolean }) {
  const account = useActiveAccount();
  const [amount, setAmount] = useState("");
  const { mutate: sendTransaction, isPending } = useSendTransaction();

  // Dynamisch die USDC-Adresse aus dem Vault-Contract lesen
  const { data: usdcAddress, isLoading: isUsdcLoading } = useReadContract({
    contract: vaultContract,
    method: "function usdc() view returns (address)",
    params: [],
  });;

  // Sobald die USDC-Adresse vorliegt, den USDC-Contract instanziieren
  const { contract: usdcContract } = useContract(usdcAddress);

  const handleDeposit = async () => {
    if (!account || !vaultContract || isPanicActive || isUsdcLoading || !usdcContract) return;
    try {
      // USDC verwendet üblicherweise 6 Dezimalstellen
      const depositAmount = BigInt(amount) * BigInt(1e6);

      // Zuerst: Approve-Transaktion vorbereiten, damit der Vault-Contract USDC ausgeben darf
      const approveTx: PreparedTransaction = prepareContractCall({
        contract: usdcContract as any,
        method: "function approve(address spender, uint256 amount)",
        params: [vaultContract.getAddress(), depositAmount],
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
        disabled={isPending || isPanicActive || isUsdcLoading}
      >
        {isPanicActive ? "Deposits Disabled (Panic Mode)" : isPending ? "Processing..." : "Deposit"}
      </button>
    </div>
  );
}

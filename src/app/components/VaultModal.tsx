"use client";

import { useState, useEffect } from "react";
import { useVaultData } from "../data";
import { getVaultContract } from "../contract"; // Hole den spezifischen Vault Contract
import { prepareContractCall } from "thirdweb";
import { useSendTransaction, useReadContract } from "thirdweb/react";
import Image from "next/image";

interface VaultModalProps {
  vaultId: string;
  onClose: () => void;
}




export default function VaultModal({ vaultId, onClose }: VaultModalProps) {
  const { name, network, apy, tvl, isLoading } = useVaultData(vaultId);
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  // Fetch the specific contract for this Vault
  const contract = getVaultContract(vaultId);

  // Check if the contract exists
  if (!contract) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-900 p-6 rounded-lg text-white max-w-md w-full">
          <button className="absolute top-4 right-4 text-white" onClick={onClose}>✕</button>
          <p className="text-center text-red-500">❌ Error: No smart contract found!</p>
        </div>
      </div>
    );
  }

  // Fetch user balance in the vault
  const { data: userBalance, refetch: refreshUserBalance } = useReadContract({
    contract,
    method: "function balanceOf(address) view returns (uint256)",
    params: ["user-wallet-address"], // Replace with the user's wallet address dynamically
  });

  // Thirdweb Transaction Hooks
  const { mutate: sendDeposit, isPending: isDepositPending, error: depositError } = useSendTransaction();
  const { mutate: sendWithdraw, isPending: isWithdrawPending, error: withdrawError } = useSendTransaction();

  // Auto-update vault data and user balance after a transaction
  useEffect(() => {
    if (transactionHash) {
      const timer = setTimeout(() => {
        refreshVaultData();
        refreshUserBalance();
        setTransactionHash(null); // Reset transaction hash after update
      }, 5000); // Wait 5 seconds before fetching new data

      return () => clearTimeout(timer);
    }
  }, [transactionHash, refreshVaultData, refreshUserBalance]);

  // Deposit function with prepareContractCall
  const handleDeposit = async () => {
    if (!amount || isNaN(Number(amount))) return alert("❌ Please enter a valid amount.");

    try {
      const transaction = prepareContractCall({
        contract,
        method: "function deposit(uint256 amount)",
        params: [amount],
      });

      const result = await sendDeposit(transaction);
      setTransactionHash(result.transactionHash);
      alert(`✅ Deposit successful! Transaction Hash: ${result.transactionHash}`);
    } catch (err) {
      alert(`❌ Error during deposit: ${err}`);
    }
  };

  // Withdraw function with prepareContractCall
  const handleWithdraw = async () => {
    if (!amount || isNaN(Number(amount))) return alert("❌ Please enter a valid amount.");

    try {
      const transaction = prepareContractCall({
        contract,
        method: "function withdraw(uint256 amount)",
        params: [amount],
      });

      const result = await sendWithdraw(transaction);
      setTransactionHash(result.transactionHash);
      alert(`✅ Withdraw successful! Transaction Hash: ${result.transactionHash}`);
    } catch (err) {
      alert(`❌ Error during withdraw: ${err}`);
    }
  };

  if (isLoading) {
    return <p className="text-white text-center">Loading vault data...</p>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 p-6 rounded-lg text-white max-w-md w-full relative">
        <button className="absolute top-4 right-4 text-white" onClick={onClose}>✕</button>

        <div className="flex items-center mb-4">
          <Image src={`/images/${vaultId}.png`} alt={name} width={60} height={60} className="rounded-full mr-4" />
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-400">{network}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
            {apy && (
             <div className="p-4 bg-gray-800 rounded">
                <p className="text-gray-400 text-sm">APY</p>
                <p className="text-lg font-bold text-green-400">{apy}%</p>
            </div>
           )}

          <div className="p-4 bg-gray-800 rounded">
            <p className="text-gray-400 text-sm">TVL</p>
            <p className="text-lg font-bold">${tvl.toLocaleString()}</p>
          </div>
        </div>

        <div className="p-4 bg-gray-800 rounded mb-4">
          <p className="text-gray-400 text-sm">Your Vault Balance</p>
          <p className="text-lg font-bold text-blue-400">{userBalance ? Number(userBalance).toLocaleString() : "0"} Tokens</p>
        </div>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-700 bg-gray-800 rounded text-white"
        />

        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 disabled:opacity-50"
            onClick={handleDeposit}
            disabled={isDepositPending}
          >
            {isDepositPending ? "Processing deposit..." : "Deposit"}
          </button>

          <button
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 disabled:opacity-50"
            onClick={handleWithdraw}
            disabled={isWithdrawPending}
          >
            {isWithdrawPending ? "Processing withdraw..." : "Withdraw"}
          </button>
        </div>

        {transactionHash && (
          <p className="text-green-500 text-sm mt-2">
            ✅ Transaction successful! <br />
            <a
              href={`https://etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-400"
            >
              View transaction on Etherscan
            </a>
          </p>
        )}

        {depositError && <p className="text-red-500 text-sm mt-2">{depositError.message}</p>}
        {withdrawError && <p className="text-red-500 text-sm mt-2">{withdrawError.message}</p>}
      </div>
    </div>
  );
}
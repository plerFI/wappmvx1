"use client";

import { useReadContract } from "thirdweb/react";
import { getVaultContract } from "@/app/contract"; // Import vault contract function
import { useEffect, useState } from "react";

export default function BestVaults({ contract }: { contract: any }) {
  const [vaults, setVaults] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBestVaults() {
      try {
        const bestVault1 = await contract.call("bestVaults", [0]);
        const bestVault2 = await contract.call("bestVaults", [1]);
        const bestVault3 = await contract.call("bestVaults", [2]);

        setVaults([bestVault1, bestVault2, bestVault3]);
      } catch (error) {
        console.error("Error fetching best vaults:", error);
      } finally {
        setLoading(false);
      }
    }

    if (contract) {
      fetchBestVaults();
    }
  }, [contract]);

  return (
    <div className="p-4 border rounded bg-zinc-900">
      <h3 className="text-lg font-bold mb-2">🔥 Top 3 Vaults</h3>
      {loading ? (
        <p>Loading best vaults...</p>
      ) : (
        <ol className="list-decimal pl-4">
          {vaults.map((vault, index) => (
            <li key={index} className="text-blue-400">
              {vault}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

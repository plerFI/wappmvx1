"use client"
import { useContractEvents } from "thirdweb/react";
import { transferEvent } from "thirdweb/extensions/erc20";
import { getVaultContract } from "@/app/contract";
import { useVaultData } from "@/app/data";

    export default function TransactionList({ vaultId }: { vaultId: string }) {
     let contract = getVaultContract(vaultId);
     const vaultData = useVaultData(vaultId);

  // Listen to USDC transfers on Base
  const contractEvents = useContractEvents({
    contract,
    events: [transferEvent()],
    blockRange: 100,
  });

  return (
    <div>
      <h2>Transaction List for {vaultData?.name}</h2>
      {contractEvents?.data?.length ? (
        <ul>
          {contractEvents.data.map((item, index) => {
            const { from, to, value } = item.args;
            return (
              <li key={index}>
                {from} → {value.toString()}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
}




{/*
"use client";

import { useState, useEffect } from "react";
import { useContractEvents } from "thirdweb/react";
import { transferEvent } from "thirdweb/extensions/erc20";
import { getVaultContract } from "@/app/contract";
import { useVaultData } from "@/app/data";

export default function TransactionList({ vaultId }: { vaultId: string }) {
  const [contract, setContract] = useState<any>(null); // Zustand für Contract
  const vaultData = useVaultData(vaultId); // React-Hook in Komponente nutzen

  useEffect(() => {
    async function fetchContract() {
      const vaultContract = await getVaultContract(vaultId);
      setContract(vaultContract);
    }
    fetchContract();
  }, [vaultId]); // Läuft, wenn sich vaultId ändert

  // `useContractEvents` erst nutzen, wenn der Contract geladen wurde
  const contractEvents = useContractEvents(
    contract
      ? {
          contract,
          events: [transferEvent()],
          blockRange: 100,
        }
      : undefined
  );

  return (
    <div>
      <h2>Transaction List for {vaultData?.name}</h2>
      {contractEvents?.data?.length ? (
        <ul>
          {contractEvents.data.map((item, index) => {
            const { from, to, value } = item.args;
            return (
              <li key={index}>
                {from} → {name}, {value.toString()}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
}
*/}
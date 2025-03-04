"use client";

import { useParams } from "next/navigation";
import TransactionList from "./transactionlist";

export default function VaultDetailPage() {
  const params = useParams();
  const vaultId = Array.isArray(params.vaultId) ? params.vaultId[0] : params.vaultId;

  if (!vaultId) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <h1 className="text-3xl font-bold">Vault nicht gefunden</h1>
        <p className="text-gray-400">Bitte überprüfe die URL.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold">Vault Details für {vaultId}</h1>
      <p className="text-gray-400 mb-6">
        Hier kommen die detaillierten Informationen über diesen Vault.
      </p>

      {/* 🔹 TransactionList dynamisch einfügen */}
      <TransactionList vaultId={vaultId} />
    </div>
  );
}
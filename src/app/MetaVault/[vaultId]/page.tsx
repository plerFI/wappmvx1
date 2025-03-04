"use client";

import { useParams } from "next/navigation";
import TransactionList from "./transactionlist";
import { useVaultData } from "@/app/data";

export default function VaultDetailPage() {
  const params = useParams();
  const vaultId = Array.isArray(params.vaultId) ? params.vaultId[0] : params.vaultId;

  if (!vaultId) {
    return <p>Vault nicht gefunden.</p>;
  }

  const vaultData = useVaultData(vaultId);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold">Vault Details für {vaultData?.name || vaultId}</h1>
      <p className="text-gray-400 mb-6">Hier kommen die detaillierten Informationen über diesen Vault.</p>
      <TransactionList vaultId={vaultId} />
    </div>
  );
}

export async function getStaticPaths() {
  // Liste der Vaults, die generiert werden sollen
  const vaultIds = ["base-vault", "ethereum-vault", "arbitrum-vault" , "optimistic-vault"];

  return {
    paths: vaultIds.map((id) => ({ params: { vaultId: id } })),
    fallback: false, // `false`: Zeigt 404 an, wenn die Seite nicht existiert
  };
}

export async function getStaticProps({ params }: { params: { vaultId: string } }) {
  return {
    props: { vaultId: params.vaultId },
  };
}

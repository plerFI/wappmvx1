// app/vaults/[vaultId]/page.jsx
export async function generateStaticParams() {
  return [
    { vaultId: "base-vault" },
    { vaultId: "ethereum-vault" },
    { vaultId: "arbitrum-vault" },
    { vaultId: "optimism-vault" }
  ];
}

export default async function VaultDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ vaultId: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Params werden hier asynchron aufgelöst:
  const { vaultId } = await params;

  if (!vaultId) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <h1 className="text-3xl font-bold">Vault not found</h1>
        <p className="text-gray-400">Please check the URL.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold">Vault Details for {vaultId}</h1>
      <p className="text-gray-400 mb-6">
        Detailed information about this vault will be displayed here.
      </p>
    </div>
  );
}

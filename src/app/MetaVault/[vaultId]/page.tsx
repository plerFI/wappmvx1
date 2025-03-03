"use client";

import { useParams } from "next/navigation";

export default function VaultDetailPage() {

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold">Vault Details für</h1>
      <p className="text-gray-400">Hier kommen die detaillierten Informationen über diesen Vault.</p>
    </div>
  )};
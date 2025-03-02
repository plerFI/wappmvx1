import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "./client"

// Define the type for Vault contracts dynamically
interface VaultContracts {
  [key: string]: ReturnType<typeof getContract>;
}

// Vault Smart Contracts with the Thirdweb Client
export const vaultContracts: VaultContracts = {
  "vault-1": getContract({
    client,
    address: "0x1234567890abcdef1234567890abcdef12345678", // Vault 1 Contract
    chain: defineChain(8453), // Base Chain
  }),
  /* "vault-2": getContract({
    client,
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd", // Vault 2 Contract
    chain: defineChain(8453), // Base Chain
  }), */
  /* "vault-3": getContract({
    client,
    address: "0x9876543210abcdef9876543210abcdef98765432", // Vault 3 Contract
    chain: defineChain(8453), // Base Chain
  }), */
};

// Function to get a contract for a specific Vault
export async function getVaultContract(vaultId: string) {
  return vaultContracts[vaultId] ?? null;
}
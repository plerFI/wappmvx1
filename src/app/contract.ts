import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "./client"

// Define the type for Vault contracts dynamically
interface VaultContracts {
  [key: string]: ReturnType<typeof getContract>;
}

// Vault Smart Contracts with the Thirdweb Client
export const vaultContracts: VaultContracts = {
  "base-vault": getContract({
    client,
    address: "0x1234567890abcdef1234567890abcdef12345678", // Vault 1 Contract
    chain: defineChain(8453), // Base Chain
  }),
  /* "ethereum-vault": getContract({
    client,
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd", // Vault 2 Contract
    chain: defineChain(1), // ethereum Chain
  }), */
  /* "arbitrum-vault": getContract({
    client,
    address: "0x9876543210abcdef9876543210abcdef98765432", // Vault 3 Contract
    chain: defineChain(42161), // arbitrum Chain
  }), */
  /* "optimistic-vault": getContract({
    client,
    address: "0x9876543210abcdef9876543210abcdef98765432", // Vault 3 Contract
    chain: defineChain(10), // optimistic Chain
  }), */
};

// Function to get a contract for a specific Vault
export function getVaultContract(vaultId: string) {
  return vaultContracts[vaultId] ?? null;
}
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "./client";

// Define the type for Vault contracts dynamically
interface VaultContracts {
  [key: string]: ReturnType<typeof getContract>;
}

// Vault Smart Contracts with the Thirdweb Client
export const vaultContracts: VaultContracts = {
  "base-vault": getContract({
    client,
    address: "0x175fD51BA7fE09c7dFfe857ebb99A2F15dE9a858", // Vault 1 Contract
    chain: defineChain(8453), // Base Chain
  }),
  /* "ethereum-vault": getContract({
    client,
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd", // Vault 2 Contract
    chain: defineChain(1), // Ethereum Chain
  }), */
  /* "arbitrum-vault": getContract({
    client,
    address: "0x9876543210abcdef9876543210abcdef98765432", // Vault 3 Contract
    chain: defineChain(42161), // Arbitrum Chain
  }), */
  /* "optimistic-vault": getContract({
    client,
    address: "0x9876543210abcdef9876543210abcdef98765432", // Vault 4 Contract
    chain: defineChain(10), // Optimistic Chain
  }), */
};

// Interface for USDC addresses per Vault
interface VaultUSDCAddresses {
  [key: string]: string;
}

// Mapping der USDC-Contract-Adressen zu den jeweiligen Vaults
export const vaultUSDCAddresses: VaultUSDCAddresses = {
  "base-vault": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  // Fügen Sie hier die weiteren Vaults hinzu:
  "ethereum-vault": "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  // "arbitrum-vault": "0xUSDCAddressForArbitrumVault",
  // "optimistic-vault": "0xUSDCAddressForOptimisticVault",
};

// Funktion, um einen Vault-Contract anhand der Vault-ID zu erhalten
export function getVaultContract(vaultId: string) {
  return vaultContracts[vaultId] ?? null;
}

// Funktion, um die USDC-Adresse für einen bestimmten Vault abzurufen
export function getVaultUSDCAddress(vaultId: string): string | null {
  return vaultUSDCAddresses[vaultId] ?? null;
}

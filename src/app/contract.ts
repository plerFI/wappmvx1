import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "./client"

// connect to your contract
const contract = getContract({
    client,
    chain: defineChain(8453),
    address: 'process.env.NEXT_PUBLIC_Contract_Adress',
  });
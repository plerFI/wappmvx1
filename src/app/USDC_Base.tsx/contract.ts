import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "../client"


const cAddress = "";

if (!cAddress) {
  throw new Error("No address provided");
}
// connect to your contract
export const contract = getContract({
    client,
    chain: defineChain(8453),
    address: cAddress,
  });
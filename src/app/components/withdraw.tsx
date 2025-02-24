import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import  contract from "../contract";

export default function Withdraw() {
    const { mutate: sendTransaction } = useSendTransaction();
  
    const onClick = () => {
      const transaction = prepareContractCall({
        contract,
        method: "function withdraw(uint256 amount)",
        params: [amount],
      });
      sendTransaction(transaction);
    };
  }
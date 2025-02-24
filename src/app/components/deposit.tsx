import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import  contract from "../contract";

export default function Deposit() {
  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method: "function deposit(uint256 amount)",
      params: [amount],
    });
    sendTransaction(transaction);
  };
}
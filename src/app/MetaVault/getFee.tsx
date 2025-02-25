import { useReadContract } from "thirdweb/react";
import contract from "../contract";

// Custom Hook, der alle Gebühren abruft und zusammenfasst
export function useCombinedFee() {
  const { data: depositFee, isPending: isDepositLoading } = useReadContract({
    contract,
    method: "function depositFeeBP() view returns (uint256)",
    params: [],
  });

  const { data: performanceFee, isPending: isPerformanceLoading } = useReadContract({
    contract,
    method: "function performanceFeeBP() view returns (uint256)",
    params: [],
  });

  const { data: withdrawFee, isPending: isWithdrawLoading } = useReadContract({
    contract,
    method: "function withdrawFeeBP() view returns (uint256)",
    params: [],
  });

  const isLoading = isDepositLoading || isPerformanceLoading || isWithdrawLoading;

  let fee = null;
  if (!isLoading && depositFee != null && performanceFee != null && withdrawFee != null) {
    // Alle Werte liegen in Basis Points (BP), wobei 100 BP = 1% entsprechen.
    const totalBP = Number(depositFee) + Number(performanceFee) + Number(withdrawFee);
    fee = totalBP / 100; // Umrechnung in Prozent
  }

  return { fee, isLoading };
}

// Beispielkomponente, die den Hook verwendet
export default function FeeComponent() {
  const { fee, isLoading } = useCombinedFee();

  if (isLoading) return <p>load Fees...</p>;

  return (
    <div>
      <p>MV-Fee: {fee}%</p>
    </div>
  );
}

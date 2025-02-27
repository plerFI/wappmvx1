import { useReadContract } from "thirdweb/react";
import { contract } from "../contract"

export default function Name() {
    const { name, isNamePending } = useReadContract({
      contract,
      method:
        "function name() view returns (string)",
      params: [],
    });
  
    if (isNamePending) return <p>Loading...</p>
  
    return (
      <div>
          <p>{name}</p>
      </div>
    );
  }

export default function Network() {
  const { network, isNetworkPending } = useReadContract({
    contract,
    method:
      "function network() view returns (string)",
    params: [],
  });

  if (isNetworkPending) return <p>Loading...</p>

  return (
    <div>
        <p>{network}</p>
    </div>
  );
}

export default function TVL() {
    const { tvl, isTvlPending } = useReadContract({
      contract,
      method:
        "function tvl() view returns (uint256)",
      params: [],
    });
  
    if (isTvlPending) return <p>Loading...</p>
  
    return (
      <div>
          <p>TVL: ${tvl}</p>
      </div>
    );
  }

  export default function APY() {
    const { data: apy, isPending: isApyPending } = useReadContract({
      contract,
      method:
        "function apy() view returns (uint256)",
      params: [],
    });
  
    if (isApyPending) return <p>Loading...</p>
  
    return (
      <div>
          <p>{apy}% APY</p>
      </div>
    );
  }
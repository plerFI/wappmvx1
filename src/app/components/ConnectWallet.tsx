import { ConnectButton } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "../client";

const links = {
  termsOfServiceUrl: "/termsofservice",
  privacyPolicyUrl: "/privacypolicy",
};

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("com.ledger"),
  createWallet("app.phantom"),
];

function ConnectWallet() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      theme={darkTheme({
        colors: {
          accentText: "hsl(0, 0%, 73%)",
          accentButtonBg: "hsl(0, 0%, 81%)",
        },
      })}
      connectModal={{
        size: "compact",
        showThirdwebBranding: false,
        termsOfServiceUrl: "/termsofservice",
        privacyPolicyUrl: "/privacypolicy",
      }}
    />
  );
}

export default ConnectWallet;
import { createThirdwebClient } from "thirdweb";

const clientId = process.env.CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

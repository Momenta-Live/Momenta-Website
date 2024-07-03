import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";

import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

const ConnectWalletComp = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <DynamicWagmiConnector>
          <InnerComponent />
        </DynamicWagmiConnector>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const InnerComponent = () => {
  const { primaryWallet, isAuthenticated } = useDynamicContext();

  function isAddressConnectedAndActive() {
    return primaryWallet && primaryWallet.connected && isAuthenticated;
  }

  const isConnectedAndActive = isAddressConnectedAndActive();

  return (
    <div>
      {!isConnectedAndActive && <div className="overlay">Please sign in or sign up</div>}
      <DynamicWidget />
    </div>
  );
};

export default ConnectWalletComp;

// Import MK Components
import MKBox from "components/MKBox";

// Page sections
import VideoSection from "pages/Video/sections/Video";

// Images
import backdrop from "assets/images/cloud_backdrop.png";

// Custom Components
import ConnectWalletComp from "components/Connect/ConnectWalletComp";

import { useWeb3React } from "@web3-react/core";

function Video() {
  const checkForWeb3Data = ({ library, active, account, chainId }) => {
    return library && active && account && chainId;
  };

  const { account, library, active, chainId } = useWeb3React();

  return (
    <>
      <MKBox
        minHeight="100vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0),
              rgba(gradients.dark.state, 0)
            )}, url(${backdrop})`,
          backgroundSize: { xs: "cover", md: "cover" },
          backgroundPosition: { xs: "center", sm: "center", md: "top" },
          display: "grid",
          placeItems: "center",
        }}
      >
        <ConnectWalletComp />
        {checkForWeb3Data({ active, account, library, chainId }) ? (
          <VideoSection />
        ) : (
          <div>Connect to a wallet</div>
        )}
        ;
      </MKBox>
    </>
  );
}

export default Video;

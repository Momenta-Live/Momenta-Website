/* eslint-disable no-unused-vars */
// Import MK Components
import MKBox from "components/MKBox";

// Page sections
import VideoSection from "pages/Video/sections/Video";

// Images
import backdrop from "assets/images/cloud_backdrop.png";

// Custom Components
import ConnectWalletComp from "components/Connect/ConnectWalletComp";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

function Video() {
  const checkForWeb3Data = ({ primaryWallet, isAuthenticated }) => {
    return primaryWallet && isAuthenticated;
  };

  const { primaryWallet, isAuthenticated } = useDynamicContext();

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
        {/* {checkForWeb3Data({ primaryWallet, isAuthenticated }) ? (
          <VideoSection />
        ) : (
          <ConnectWalletComp />
        )} */}
        <ConnectWalletComp />
        <VideoSection />
      </MKBox>
    </>
  );
}

export default Video;

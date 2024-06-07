// Import MK Components
import MKBox from "components/MKBox";

// Page sections
import Hero from "pages/Home/sections/Hero";
import Information from "pages/Home/sections/Information";
import Download from "pages/Home/sections/Download";
import Investor from "pages/Home/sections/Investor";
import CenteredFooter from "components/Footers/CenteredFooter";

// Images
import backdrop from "assets/images/cloud_backdrop.png";

function Home() {
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
        <Hero />
        <Information />
        <Download />
        <Investor />
        <CenteredFooter />
      </MKBox>
    </>
  );
}

export default Home;

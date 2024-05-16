/* eslint-disable no-unused-vars */
/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components

// import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Page sections
import Hero from "pages/Home/sections/Hero";
import Information from "pages/Home/sections/Information";
import Download from "pages/Home/sections/Download";
import Investor from "pages/Home/sections/Investor";
import CenteredFooter from "components/Footers/CenteredFooter";

// Images
import backdrop from "assets/images/backdrop.png";

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

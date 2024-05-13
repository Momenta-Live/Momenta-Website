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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// About Us page sections
import Hero from "pages/Home/sections/Hero";
import Information from "pages/Home/sections/Information";
import Download from "pages/Home/sections/Download";
import Investor from "pages/Home/sections/Investor";
import Newsletter from "pages/Home/sections/Newsletter";

// Images
import bgImage from "assets/images/backgroundClouds.png";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";

function Home() {
  return (
    <>
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0),
              rgba(gradients.dark.state, 0)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: { xs: "center", sm: "center", md: "top" },
          display: "grid",
          placeItems: "center",
        }}
      >
        <Hero />
        <Information />
        <Download />
        <Investor />
      </MKBox>
    </>
  );
}

export default Home;

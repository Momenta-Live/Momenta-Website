import React, { useState, useEffect } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import { TypeAnimation } from "react-type-animation";

// Images
import arrow from "assets/images/tripdownArrow.png";
import "pages/Home/sections/Hero.css";

function Hero() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight, // Scroll down by one viewport height
      behavior: "smooth", // Smooth scrolling
    });
  };

  return (
    <MKBox
      pt={0}
      pb={0}
      mt={-1}
      sx={{
        width: "100%",
        height: "100vh",
        margin: "auto",
      }}
    >
      <Container
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid
          container
          xs={12}
          lg={12}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{
            textAlign: "center",
            height: "100%",
          }}
        >
          <MKTypography variant="h2" color="white" mt={1} mb={5}>
            Momenta Live
          </MKTypography>
          <MKTypography
            variant="h1"
            color="white"
            mb={5}
            sx={({ breakpoints, typography: { size } }) => ({
              [breakpoints.down("md")]: {
                fontSize: size["3xl"],
              },
            })}
          >
            No Creeps, Just Peeps
          </MKTypography>
          <MKBox minHeight={"80px"}>
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Slide Into DMs, Not Dilemmas.",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "Your go-to for private social chatting.",
                1000,
                "Good vibes only.",
                1000,
              ]}
              wrapper="span"
              speed={30}
              style={{
                fontSize: "1.05em",
                display: "inline-block",
                color: "white",
              }}
              repeat={Infinity}
            />
          </MKBox>
          <MKButton
            component="a"
            href="https://swp3137cdbz.typeform.com/to/gwLo3JKL"
            target="_blank"
            variant="gradient"
            color="dark"
            size="large"
            sx={{
              my: "10px",
              width: "90%",
              maxWidth: "400px",
              height: "100px",
              textAlign: "center",
              fontSize: "1.2em",
              fontWeight: "normal",
              textTransform: "capitalize",
              borderRadius: "40px",
            }}
          >
            Join Waitlist
          </MKButton>
        </Grid>
      </Container>
      <div className={`arrowSection ${!visible ? "fade-out" : ""}`}>
        <img className="arrow" src={arrow} alt="arrow" onClick={handleScrollDown} />
      </div>
    </MKBox>
  );
}

export default Hero;

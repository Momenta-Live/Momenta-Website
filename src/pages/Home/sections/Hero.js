// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import { TypeAnimation } from "react-type-animation";

// Images

function Hero() {
  return (
    <MKBox
      pt={20}
      pb={5}
      sx={{
        width: "100%",
        height: "100%",
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
          <MKBox minHeight={"120px"}>
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
                fontSize: "1em",
                display: "inline-block",
                color: "white",
              }}
              repeat={Infinity}
            />
          </MKBox>
          <MKButton
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
    </MKBox>
  );
}

export default Hero;

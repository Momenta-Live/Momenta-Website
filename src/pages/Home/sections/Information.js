// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import InfoCard from "components/Cards/InfoCards/InfoCard";

// Images
import IconCreepBlock from "assets/images/ManDetective.svg";
import IconInvisibleMode from "assets/images/Ghost.svg";
import IconQuickConnect from "assets/images/DashingAway.svg";
import IconGoodTimesOnly from "assets/images/CallMeHand.svg";

function Information() {
  return (
    <MKBox
      sx={{
        width: "100%",
        margin: "auto",
      }}
    >
      <Container
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid container justifyContent="flex-start" spacing={2}>
          <Grid item xs={6} sm={6} md={3}>
            <MKBox py={5}>
              <InfoCard
                className="CustomInfoCard"
                image={IconCreepBlock}
                title="Creep Block"
                description="Like a detective, our AI model spots and blocks predators so you can chat worry-free."
              />
            </MKBox>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <MKBox py={5}>
              <InfoCard
                image={IconInvisibleMode}
                title="Invisible Mode"
                description="Your privacy, our priority! We ensure your privacy so you can share with confidence."
              />
            </MKBox>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <MKBox py={5}>
              <InfoCard
                image={IconQuickConnect}
                title="Quick Connect"
                description="No waiting around here! We match you fast with people who get you based on your filters."
              />
            </MKBox>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <MKBox py={5}>
              <InfoCard
                image={IconGoodTimesOnly}
                title="Good Times Only"
                description="Remember the fun of 2016? We're bringing it back! Start matches and fuel your talks!"
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;

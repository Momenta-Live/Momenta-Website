// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import InfoCard from "components/Cards/InfoCards/InfoCard";

// Images
import IconCreepBlock from "assets/images/IconCreepBlock.png";
import IconInvisibleMode from "assets/images/IconInvisibleMode.png";
import IconQuickConnect from "assets/images/IconQuickConnect.png";
import IconGoodTimesOnly from "assets/images/IconGoodTimesOnly.png";

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
                description="Like a superhero, our Al spots and blocks the bad guys so you can chat worry-free."
              />
            </MKBox>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <MKBox py={5}>
              <InfoCard
                image={IconInvisibleMode}
                title="Invisible Mode"
                description="We keep you hidden so you can share without a care."
              />
            </MKBox>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <MKBox py={5}>
              <InfoCard
                image={IconQuickConnect}
                title="Quick Connect"
                description="No waiting around here! We match you fast with people who get you."
              />
            </MKBox>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <MKBox py={5}>
              <InfoCard
                image={IconGoodTimesOnly}
                title="Good Times Only"
                description="We're bringing back the fun of 2016! Fuel your talks and keep the laughs going."
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;

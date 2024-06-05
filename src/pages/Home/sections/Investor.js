// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

function Investor() {
  return (
    <MKBox component="section" py={2} width={"100%"}>
      <Container>
        <Card>
          <MKBox
            color="white"
            variant="gradient"
            borderRadius="xl"
            bgColor="dark"
            textAlign="center"
            height="50%"
          >
            <Grid
              container
              justifyContent="flex-start"
              sx={{
                py: { xs: "15px", sm: "15px", md: "30px" },
                px: { xs: "20px", sm: "20px", md: "50px" },
              }}
            >
              <Grid
                item
                xs={12}
                md={8}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", sm: "center", md: "start" },
                }}
              >
                <MKBox
                  p={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "center", sm: "center", md: "start" },
                  }}
                >
                  <MKTypography
                    display="inline"
                    variant="body1"
                    fontWeight="regular"
                    color="white"
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: { xs: "center", sm: "center", md: "start" },
                    }}
                  >
                    Interested in Participating in
                  </MKTypography>
                  <MKTypography
                    color="white"
                    display="inline"
                    variant="body1"
                    fontWeight="regular"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "center", sm: "center", md: "end" },
                    }}
                  >
                    Our Next Funding Round?
                  </MKTypography>
                </MKBox>
              </Grid>
              <Grid item xs={12} sm={12} md={4} justifyContent="center">
                <MKBox
                  height={"100%"}
                  p={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", sm: "center", md: "end" },
                  }}
                >
                  <MKButton
                    component="a"
                    href="https://swp3137cdbz.typeform.com/to/HSBLJ1ho"
                    target="_blank"
                    variant="gradient"
                    color="dark"
                    size="large"
                    sx={{
                      py: "20px",
                      my: "10px",
                      width: { xs: "75%", sm: "75%", md: "100%" },
                      textAlign: "center",
                      fontSize: "1em",
                      fontWeight: "normal",
                      textTransform: "capitalize",
                      borderRadius: "60px",
                    }}
                  >
                    Join Investor List
                  </MKButton>
                </MKBox>
              </Grid>
            </Grid>
          </MKBox>
        </Card>
      </Container>
    </MKBox>
  );
}

export default Investor;

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
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";

// Material Kit 2 React examples
import DownloadCard from "examples/Cards/InfoCards/DownloadCard";

// Images
import IconGoogle from "assets/images/IconGoogle.png";
import IconIOS from "assets/images/IconIOS.png";

function Download() {
  return (
    <MKBox component="section" py={2} width={"100%"}>
      <Container>
        <Card>
          <MKBox textAlign="center" height="50%">
            <Grid
              container
              justifyContent="flex-start"
              sx={{
                pb: { xs: "20px", sm: "20px", md: "0" },
                px: { xs: "20px", sm: "20px", md: "50px" },
              }}
            >
              <Grid item xs={12} md={8}>
                <MKBox p={2} textAlign="center">
                  <MKBox p={2} textAlign="center" height="50%">
                    <DownloadCard image={IconGoogle} title="Download Google" />
                  </MKBox>
                  <MKBox p={2} textAlign="center" height="50%">
                    <DownloadCard image={IconIOS} title="Download IOS" />
                  </MKBox>
                </MKBox>
              </Grid>
              <Grid item xs={12} sm={12} md={4} justifyContent="center">
                <MKBox
                  height={"100%"}
                  p={2}
                  sx={{
                    display: "flex",
                    alignItems: { xs: "20px", sm: "20px", md: "center" },
                    justifyContent: { xs: "center", sm: "center", md: "end" },
                  }}
                >
                  <MKButton
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
                    Join Waitlist
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

export default Download;

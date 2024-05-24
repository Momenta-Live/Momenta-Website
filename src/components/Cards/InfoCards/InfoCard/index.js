/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router components

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function InfoCard({ image, title, description }) {
  return (
    <Card
      sx={{
        display: "flex",
        minHeight: { xs: 320, sm: 300, md: 320 },
      }}
    >
      <MKBox
        mt={4}
        position="relative"
        borderRadius="lg"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <img src={image} width="30%" />
      </MKBox>
      <MKBox p={1} textAlign="center" height="50%">
        <MKTypography display="inline" variant="h5" textTransform="capitalize" fontWeight="regular">
          {title}
        </MKTypography>
        <MKBox mt={1} mb={3} height="50%">
          <MKTypography variant="body2" component="p" color="text">
            {description}
          </MKTypography>
        </MKBox>
      </MKBox>
    </Card>
  );
}

// Typechecking props for the CenteredBlogCard
InfoCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default InfoCard;

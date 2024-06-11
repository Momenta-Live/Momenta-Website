// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function DownloadCard({ image, title }) {
  return (
    <MKBox
      position="relative"
      borderRadius="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", sm: "center", md: "flex-start" },
        flexDirection: "row",
      }}
      height={40}
      width={"100%"}
    >
      <MKBox
        component="img"
        src={image}
        alt={title}
        borderRadius="lg"
        height="100%"
        position="relative"
        zIndex={1}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", objectFit: "cover" }}
      />
      <MKBox
        px={6}
        textAlign="center"
        height="100%"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <MKTypography
          display="inline"
          variant="h5"
          fontWeight="regular"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {title}
        </MKTypography>
      </MKBox>
    </MKBox>
  );
}

// Typechecking props for the CenteredBlogCard
DownloadCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default DownloadCard;

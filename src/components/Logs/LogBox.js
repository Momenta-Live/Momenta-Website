import PropTypes from "prop-types";

// MK Components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function LogBox({ logs }) {
  return (
    <MKBox>
      <MKTypography variant="h3">{"Logs"}</MKTypography>
      {logs.map((log, index) => (
        <p
          style={{ backgroundColor: "#ddd", fontFamily: "Courier New", fontSize: "15px" }}
          key={index}
        >
          {JSON.stringify(log)}
        </p>
      ))}
    </MKBox>
  );
}

LogBox.propTypes = {
  title: PropTypes.string.isRequired,
  logs: PropTypes.object.isRequired,
};

export default LogBox;

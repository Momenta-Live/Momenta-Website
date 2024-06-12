import propTypes from "prop-types";

// MK Components
import MKBox from "components/MKBox";

// Custom Components
import Checkmark from "components/Animations/Checkmark";
import Cross from "components/Animations/Cross";
import LoadingCircle from "components/Animations/LoadingCircle";

const AddressInput = ({ isValidUser, onChangeFunc, address }) => {
  return (
    <MKBox
      width="100%"
      px={20}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MKBox
        width="100%"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isValidUser === -1 && <p>Enter the wallet address to continue </p>}

        {isValidUser === 0 && (
          <>
            <LoadingCircle />
            <p>Checking address </p>
          </>
        )}

        {isValidUser === 1 && (
          <>
            <Cross />
            <p>Not a valid address, check logs for more info </p>
          </>
        )}

        {isValidUser === 2 && (
          <>
            <Cross />
            <p>
              Valid address but current wallet and recipient not connected, click{" "}
              <b>Send Chat Request</b> then Ask recipient to <b>Request Call</b>{" "}
            </p>
            <p>
              Push Video can use multiple verification methods but this example checks for Push Chat
              connection between wallets{" "}
            </p>
          </>
        )}

        {isValidUser === 3 && (
          <>
            <Checkmark />
            <p>
              All good, click Request Video Call, if call is not establishing, it might mean chat
              connections are not done for sender and recipient{" "}
            </p>
            <p>
              In that case, ask recipient to request video call (that auto approves any request
              between the wallet){" "}
            </p>
          </>
        )}

        {isValidUser === 4 && (
          <>
            <Checkmark />
            <p>Call requested, recipient should see popup in few secs </p>
          </>
        )}
      </MKBox>
      <MKBox width="60%">
        <input
          type="text"
          value={address}
          onChange={(e) => onChangeFunc(e.target.value)}
          placeholder="Recipient Address"
          style={{ display: "flex", flex: "1", width: "100%" }}
        />
      </MKBox>
    </MKBox>
  );
};

AddressInput.propTypes = {
  isValidUser: propTypes.number,
  onChangeFunc: propTypes.func,
  address: propTypes.string,
};

export default AddressInput;

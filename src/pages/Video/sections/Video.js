import React, { useContext, useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { CONSTANTS, PushAPI } from "@pushprotocol/restapi";
import styled, { keyframes } from "styled-components";

import IncomingVideoModal from "components/Video/IncomingVideoModal";
import Toast from "components/Video/Toast";
import VideoPlayer from "components/Video/VideoPlayer";
import { EnvContext, Web3Context } from "context";

import TopBar from "./TopBar";
import BottomNavBar from "./BottomNavBar";
import UserSection from "./UserSection";
import MessageInputArea from "./MessageInputArea";

const Video = () => {
  const { account, library } = useContext(Web3Context);
  const { env } = useContext(EnvContext);

  let librarySigner;

  const aliceVideoCall = useRef();
  const [data, setData] = useState(CONSTANTS.VIDEO.INITIAL_DATA);
  const [incomingCallerAddress, setIncomingCallerAddress] = useState(null);
  const [isPushStreamConnected, setIsPushStreamConnected] = useState(false);

  const [recipientAddress, setRecipientAddress] = useState("");
  const [pushUser, setPushUser] = useState();

  // -1 for not initialized, 0 for checking in progress, 1 if it's not an address, 2 for user is not connected by any verification condition, 3 for valid user
  const [isValidUser, setIsValidUser] = useState(-1);

  // Log all response
  const [logs, setLogs] = useState(["Logs as the response comes in"]);

  useEffect(
    () => {
      console.log("35 librarySigner useEffect", librarySigner);
      const fetchSigner = async () => {
        if (library && typeof library.getSigner === "function") {
          librarySigner = await library.getSigner();
          console.log("39 librarySigner", librarySigner);
          initializePushAPI();
        } else {
          console.log("library does not have getSigner function");
        }
      };

      fetchSigner();
    },
    [library],
    [logs]
  );

  const initializePushAPI = async () => {
    console.log("initializePushAPI");
    if (!librarySigner) return;
    const user = await PushAPI.initialize(librarySigner, {
      env: env,
    });

    const createdStream = await user.initStream([
      CONSTANTS.STREAM.VIDEO,
      CONSTANTS.STREAM.CONNECT,
      CONSTANTS.STREAM.DISCONNECT,
    ]);

    createdStream.on(CONSTANTS.STREAM.CONNECT, () => {
      setLogs((prevLogs) => ["Video Stream connected!", ...prevLogs]);
      setIsPushStreamConnected(true);
    });

    createdStream.on(CONSTANTS.STREAM.DISCONNECT, () => {
      setLogs((prevLogs) => ["Video Stream disconnected!", ...prevLogs]);
      setIsPushStreamConnected(false);
    });

    createdStream.on(CONSTANTS.STREAM.VIDEO, async (data) => {
      if (data.event === CONSTANTS.VIDEO.EVENT.REQUEST) {
        setLogs((prevLogs) => ["Video Call Requested", ...prevLogs]);
        setIncomingCallerAddress(data.peerInfo.address);
      }

      if (data.event === CONSTANTS.VIDEO.EVENT.APPROVE) {
        setLogs((prevLogs) => ["Video Call Approved", ...prevLogs]);
      }

      if (data.event === CONSTANTS.VIDEO.EVENT.DENY) {
        setLogs((prevLogs) => ["User denied the call", ...prevLogs]);
        alert("User Denied the Call");
      }

      if (data.event === CONSTANTS.VIDEO.EVENT.CONNECT) {
        setLogs((prevLogs) => ["Video call connected", ...prevLogs]);
      }

      if (data.event === CONSTANTS.VIDEO.EVENT.DISCONNECT) {
        setLogs((prevLogs) => ["Video call ended", ...prevLogs]);
        alert("Video Call ended!");
      }
    });

    aliceVideoCall.current = await user.video.initialize(setData, {
      stream: createdStream,
      config: {
        video: true,
        audio: true,
      },
    });
    console.log("waiting for connection");
    await createdStream.connect();
    setPushUser(user);
    console.log("pushUser", user);
  };

  // Here we initialize the push video API, which is the first and important step to make video calls
  useEffect(() => {
    console.log("initializePushAPI useEffect");
    console.log("111 librarySigner", librarySigner);
    if (!librarySigner) return;
    console.log("librarySigner", librarySigner);
    console.log("librarySigner getAddress", librarySigner.getAddress);
    if (data?.incoming[0]?.status !== CONSTANTS.VIDEO.STATUS.UNINITIALIZED) return; // data?.incoming[0]?.status will have a status of CONSTANTS.VIDEO.STATUS.UNINITIALIZED when the video call is not initialized, call ended or denied. So we Initialize the Push API here.
    initializePushAPI();
  }, [env, librarySigner, account, data?.incoming[0]?.status]);

  useEffect(() => {
    setLogs((prevLogs) => [
      `Push stream connection status is ${isPushStreamConnected}`,
      ...prevLogs,
    ]);
  }, [isPushStreamConnected]);

  useEffect(() => {
    if (!recipientAddress) {
      setIsValidUser(-1);
      setLogs((prevLogs) => ["Recipient cannot be empty", ...prevLogs]);

      return;
    }

    const checkUserToUserConnection = async () => {
      setLogs((prevLogs) => [
        `Checking if the recipient and the sender wallets are connected via Chat`,
        ...prevLogs,
      ]);

      // check if the recipient is a valid address
      if (!ethers.isAddress(recipientAddress)) {
        setLogs((prevLogs) => [
          `Recipient is not a valid address, for brevity, the example doesn't support all supported wallet standards`,
          ...prevLogs,
        ]);
        setIsValidUser(1);
        return;
      }

      // little hack to check if the user is connected to the recipient via chat
      console.log("pushUser", pushUser);
      console.log("pushUser.chat", pushUser.chat);
      const response = await pushUser.chat.latest(recipientAddress);
      setLogs((prevLogs) => [`Response from the API is ${JSON.stringify(response)}`, ...prevLogs]);

      if (!response?.length) {
        setLogs((prevLogs) => [
          `Recipient wallet is not connected to sender, can't enable video call`,
          ...prevLogs,
        ]);
        setIsValidUser(2);
      } else {
        try {
          // also accept the request on the pretext if it's not accepted already
          console.log("pushUser", pushUser);
          console.log("pushUser.chat", pushUser.chat);
          await pushUser.chat.accept(recipientAddress);
        } catch (e) {
          setLogs((prevLogs) => [`Error while accepting the chat request, ${e}`, ...prevLogs]);
        }

        setLogs((prevLogs) => [
          `Recipient wallet is connected to sender, enabling video call`,
          ...prevLogs,
        ]);
        setIsValidUser(3);
      }
    };

    checkUserToUserConnection();
  }, [recipientAddress]);

  // This function is used to check if the recipient address is connected to the sender address via Push Chat
  // You can also pass different verification option in the future (Like connected via Lens, etc)
  const changeRecipientAddress = async (address) => {
    setRecipientAddress(address);
    setIsValidUser(0);

    setLogs((prevLogs) => [
      `Recipient address changed to ${
        address ? address : "empty"
      }, checking if the recipient and the sender wallets are connected via Chat`,
      ...prevLogs,
    ]);
  };

  // This function is used to request a video call to a recipient
  const requestVideoCall = async (recipient) => {
    setLogs((prevLogs) => [`Requesting video call to ${recipient}`, ...prevLogs]);
    setIsValidUser(4);
    await aliceVideoCall.current.request([recipient]);
  };

  // This function is used to accept the incoming video call
  const acceptIncomingCall = async () => {
    setLogs((prevLogs) => [`Accepting incoming video call`, ...prevLogs]);
    await aliceVideoCall.current.approve(incomingCallerAddress);
  };

  // This function is used to deny the incoming video call
  const denyIncomingCall = async () => {
    setLogs((prevLogs) => [`Denying incoming video call`, ...prevLogs]);
    await aliceVideoCall.current.deny(incomingCallerAddress);
  };

  // This function is used to end the ongoing video call
  const endCall = async () => {
    setLogs((prevLogs) => [`Ending video call`, ...prevLogs]);
    await aliceVideoCall.current.disconnect();
  };

  return (
    <div>
      <TopBar />
      <div>
        <HContainer>
          {isValidUser === -1 && <p>Enter the wallet address to continue </p>}

          {isValidUser === 0 && (
            <>
              <Loading />
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
                Push Video can use multiple verification methods but this example checks for Push
                Chat connection between wallets{" "}
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
        </HContainer>

        <HContainer>
          <input
            onChange={(e) => changeRecipientAddress(e.target.value)}
            value={recipientAddress}
            style={{ display: "flex", flex: "1" }}
            placeholder="recipient address"
            type="text"
          />
        </HContainer>

        <HContainer>
          {isValidUser === 2 && (
            <button
              onClick={() => {
                pushUser.chat.send(recipientAddress, {
                  content: "Hey, let's connect via video call",
                });
              }}
            >
              Send Chat Request
            </button>
          )}

          {isValidUser === 2 && (
            <button
              onClick={() => {
                pushUser.chat.accept(recipientAddress);
              }}
            >
              Accept Chat Request
            </button>
          )}

          <button
            onClick={() => {
              if (recipientAddress) {
                requestVideoCall(recipientAddress);
              }
            }}
            disabled={isValidUser !== 3 || !recipientAddress || data?.incoming[0]?.status === 3}
          >
            Request Video Call
          </button>
          <button onClick={endCall} disabled={data?.incoming[0]?.status !== 3}>
            End Video Call
          </button>
          <button
            disabled={!data?.incoming[0]}
            onClick={() => {
              aliceVideoCall.current?.config({ video: !data?.local.video }); // This function is used to toggle the video on/off
            }}
          >
            Toggle Video
          </button>

          <button
            disabled={!data?.incoming[0]}
            onClick={() => {
              aliceVideoCall.current?.config({ audio: !data?.local.audio }); // This function is used to toggle the audio on/off
            }}
          >
            Toggle Audio
          </button>

          {data?.incoming[0]?.status === CONSTANTS.VIDEO.STATUS.CONNECTED && (
            <Toast message="Video Call Connected" bg="#4caf50" />
          )}

          {data?.incoming[0].status === CONSTANTS.VIDEO.STATUS.RECEIVED && (
            <IncomingVideoModal
              callerID={incomingCallerAddress}
              onAccept={acceptIncomingCall}
              onReject={denyIncomingCall}
            />
          )}
        </HContainer>
        <HContainer>
          <p>LOCAL VIDEO: {data?.local.video ? "TRUE" : "FALSE"}</p>
          <p>LOCAL AUDIO: {data?.local.audio ? "TRUE" : "FALSE"}</p>
          <p>INCOMING VIDEO: {data?.incoming[0]?.video ? "TRUE" : "FALSE"}</p>
          <p>INCOMING AUDIO: {data?.incoming[0]?.audio ? "TRUE" : "FALSE"}</p>
        </HContainer>
        <hr />

        <HContainer>
          <VContainer>
            <h2 style={{ padding: "10px 0" }}>Local Video</h2>
            <VideoFrame>
              <VideoPlayer stream={data?.local.stream} isMuted={true} />
            </VideoFrame>
          </VContainer>

          <VContainer>
            <h2 style={{ padding: "10px 0" }}>Incoming Video</h2>
            <VideoFrame>
              <VideoPlayer stream={data?.incoming[0].stream} isMuted={false} />
            </VideoFrame>
          </VContainer>
        </HContainer>

        <HContainer>
          <UserSection name="Aliyah" />
          <UserSection name="Victor" />
        </HContainer>

        <MessageInputArea style={{ display: "flex", alignItems: "center" }} />
      </div>

      <BottomNavBar style={{ button: { fontSize: "1.2em" } }} />
    </div>
  );
};

const HContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 40px;
  flex-wrap: nowrap; /* Prevent wrapping */
  @media (max-width: 1200px) {
    flex-wrap: wrap; /* Allow wrapping on smaller screens */
  }
`;

const VContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 48%; /* Adjust width percentage to ensure both containers fit side by side */
  max-width: 48%; /* Adjust width percentage to ensure both containers fit side by side */
  height: auto;
  box-sizing: border-box;
  aspect-ratio: 16 / 9; /* Maintain 16:9 aspect ratio */
  @media (max-width: 1200px) {
    min-width: 100%; /* Adjust for smaller screens */
    max-width: 100%; /* Adjust for smaller screens */
  }
`;

const VideoFrame = styled.div`
  width: 100%;
  height: 0;
  padding-top: 56.25%; /* Aspect ratio for 1920x1080 */
  position: relative;
  background-color: #000;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loading = styled.div`
  border: 2px solid #eee; /* Light grey */
  border-top: 2px solid rgb(226, 8, 128); /* Blue */
  border-radius: 50%;
  width: 12px;
  height: 12px;
  animation: ${spin} 1s linear infinite;
`;

const Checkmark = styled.div`
  width: 12px;
  height: 24px;
  border: solid rgb(52, 168, 6);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
`;

const Cross = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 9px;
    height: 20px;
    width: 2px;
    background-color: red;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

export default Video;

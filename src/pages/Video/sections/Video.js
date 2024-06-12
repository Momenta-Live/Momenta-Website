/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { CONSTANTS, PushAPI } from "@pushprotocol/restapi";
import styled from "styled-components";
import { EnvContext, Web3Context } from "context";

// Custom Components
import IncomingVideoModal from "components/Video/IncomingVideoModal";
import Toast from "components/Video/Toast";
import VideoControlBar from "components/Video/VideoControlBar";
import TopBar from "components/Video/TopBar";
import LogBox from "components/Logs/LogBox";
import TwoWayVideo from "components/Video/TwoWayVideo";
import AddressInput from "components/Connect/AddressInput";
import VideoStatusBar from "components/Video/VideoStatusBar";
import MessageInputArea from "components/Video/MessageInputArea";

// MK Components
import MKBox from "components/MKBox";

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

  useEffect(() => {
    const fetchSigner = async () => {
      if (library && typeof library.getSigner === "function") {
        librarySigner = await library.getSigner();
        initializePushAPI();
      } else {
        console.log("library does not have getSigner function");
      }
    };

    fetchSigner();
  }, [library]);

  const initializePushAPI = async () => {
    console.log("initializePushAPI");
    if (!librarySigner) return;
    const user = await PushAPI.initialize(librarySigner, {
      env: env,
    });

    // Check for errors in userAlice's initialization and handle them if any
    if (user.errors.length > 0) {
      console.log("Error initializing Push API", user.errors);
    }

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
    if (!librarySigner) {
      console.log("librarySigner not initialized");
      return;
    }
    if (data?.incoming[0]?.status !== CONSTANTS.VIDEO.STATUS.UNINITIALIZED) {
      console.log("data?.incoming[0]?.status", data?.incoming[0]?.status);
      return; // data?.incoming[0]?.status will have a status of CONSTANTS.VIDEO.STATUS.UNINITIALIZED when the video call is not initialized, call ended or denied. So we Initialize the Push API here.
    }
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
      if (!ethers.utils.isAddress(recipientAddress)) {
        setLogs((prevLogs) => [
          `Recipient is not a valid address, for brevity, the example doesn't support all supported wallet standards`,
          ...prevLogs,
        ]);
        setIsValidUser(1);
        return;
      }

      // little hack to check if the user is connected to the recipient via chat
      console.log("pushUser", pushUser);
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
          setLogs((prevLogs) => [
            `Recipient wallet is connected to sender, attempting to connect`,
            ...prevLogs,
          ]);
          // also accept the request on the pretext if it's not accepted alreadyS
          const response = await pushUser.chat.accept(recipientAddress);
          console.log("response", response);
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
    <>
      <MKBox width="90%" p={10}>
        <AddressInput
          isValidUser={isValidUser}
          onChangeFunc={changeRecipientAddress}
          address={recipientAddress}
        />

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

        <VideoStatusBar data={data} />

        <hr />

        <TopBar />
        <TwoWayVideo
          streamSelf={data?.local.stream}
          isMutedSelf={true}
          streamOther={data?.incoming[0].stream}
          isMutedOther={false}
        />
        <MessageInputArea />
        <VideoControlBar
          onToggleAudio={() => {
            aliceVideoCall.current?.config({ audio: !data?.local.audio });
          }}
          onToggleVideo={() => {
            aliceVideoCall.current?.config({ video: !data?.local.video });
          }}
        />
        {/*<LogBox logs={logs} />*/}
      </MKBox>
    </>
  );
};

const HContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 40px;
`;

export default Video;

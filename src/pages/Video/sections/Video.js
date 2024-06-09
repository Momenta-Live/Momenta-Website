import React, { useContext, useEffect, useRef, useState } from "react";
import { CONSTANTS, PushAPI } from "@pushprotocol/restapi";
import styled from "styled-components";

import VideoPlayer from "components/Video/VideoPlayer";
import { EnvContext, Web3Context } from "context";

import TopBar from "./TopBar";
import UserSection from "./UserSection";
import BottomNavBar from "./BottomNavBar";
import MessageInputArea from "./MessageInputArea";

const Video = () => {
  const { account, library } = useContext(Web3Context);
  const { env } = useContext(EnvContext);

  let librarySigner;

  const aliceVideoCall = useRef();
  const [data, setData] = useState(CONSTANTS.VIDEO.INITIAL_DATA);
  const [isPushStreamConnected, setIsPushStreamConnected] = useState(false);

  useEffect(() => {
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
  }, [library]);

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
      setIsPushStreamConnected(true);
    });

    createdStream.on(CONSTANTS.STREAM.DISCONNECT, () => {
      setIsPushStreamConnected(false);
    });

    createdStream.on(CONSTANTS.STREAM.VIDEO, async (data) => {
      if (data.event === CONSTANTS.VIDEO.EVENT.REQUEST) {
        // Handle video call request
      }

      if (data.event === CONSTANTS.VIDEO.EVENT.APPROVE) {
        // Handle video call approval
      }

      if (data.event === CONSTANTS.VIDEO.EVENT.DENY) {
        alert("User Denied the Call");
      }

      if (data.event === CONSTANTS.VIDEO.EVENT.CONNECT) {
        // Handle video call connection
      }

      if (data.event === CONSTANTS.VIDEO.EVENT.DISCONNECT) {
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
    // Additional logic here if necessary
  }, [isPushStreamConnected]);

  useEffect(() => {
    // Additional logic here if necessary
  }, []);

  return (
    <div>
      <TopBar />
      <MainContainer>
        <HContainer>
          <VContainer>
            <h2>Local Video</h2>
            <VideoPlayer stream={data?.local.stream} isMuted={true} />
            <UserSection name="Aliyah" />
          </VContainer>
          <VContainer>
            <h2>Incoming Video</h2>
            <VideoPlayer stream={data?.incoming[0].stream} isMuted={false} />
            <UserSection name="Victor" />
          </VContainer>
        </HContainer>
        <MessageInputArea />
        <BottomNavBar />
      </MainContainer>
    </div>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(90deg, rgba(255, 123, 0, 1) 0%, rgba(255, 94, 0, 1) 100%);
`;

const HContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
`;

const VContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  height: fit-content;
`;

export default Video;

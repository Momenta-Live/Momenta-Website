import { StrictMode } from "react";
import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <StrictMode>
    <Web3ReactProvider
      getLibrary={(provider) => new ethers.providers.Web3Provider(provider, "any")}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Web3ReactProvider>
  </StrictMode>
);

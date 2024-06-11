/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { AccountContext, EnvContext, SocketContext, Web3Context } from "context";
import { InjectedConnector } from "@web3-react/injected-connector";
import * as PushApi from "@pushprotocol/restapi";
import { PushAPI } from "@pushprotocol/restapi";
import { useSDKSocket } from "hooks";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Home from "layouts/pages/Home";
import Video from "layouts/pages/Video";

// Material Kit 2 React routes
import routes from "routes";

export default function App() {
  const { pathname } = useLocation();

  const injected = new InjectedConnector({
    supportedChainIds: [
      1, 3, 4, 11155111, 42, 137, 80002, 56, 97, 10, 11155420, 2442, 1101, 421614, 42161, 122, 123,
      80085,
    ],
  });

  const { account, library, active, chainId, activate } = useWeb3React();
  const [env, setEnv] = useState("prod");
  const [isCAIP, setIsCAIP] = useState(false);
  const [signer, setSigner] = useState();
  const [user, setUser] = useState();
  const [pushUser, setPushUser] = useState();
  const [pgpPrivateKey, setPgpPrivateKey] = useState("");

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    (async () => {
      if (!account || !env || !library) return;

      const user = await PushApi.user.get({ account: account, env });
      const librarySigner = await library.getSigner(account);
      const pushUser = await PushAPI.initialize({
        env: env,
        account: account,
        alpha: { feature: ["SCALABILITY_V2"] },
      });
      setPushUser(pushUser);
      setSigner(librarySigner);
    })();
  }, [account, env, library]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const socketData = useSDKSocket({ account, env, chainId, isCAIP });

  return (
    <EnvContext.Provider value={{ env, isCAIP }}>
      <Web3Context.Provider value={{ account, active, library, chainId }}>
        <SocketContext.Provider value={socketData}>
          <AccountContext.Provider value={{ pgpPrivateKey }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                {getRoutes(routes)}
                <Route path="/" element={<Home />} />
                <Route path="/video" element={<Video />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </ThemeProvider>
          </AccountContext.Provider>
        </SocketContext.Provider>
      </Web3Context.Provider>
    </EnvContext.Provider>
  );
}

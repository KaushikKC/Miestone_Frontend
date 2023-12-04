import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import Loading from "../components/loader/Loading";

import { WebWalletConnector } from "starknetkit/webwallet";
import { StarknetConfig, publicProvider } from "@starknet-react/core";
import { goerli, mainnet } from "@starknet-react/chains";

const AppContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({ children }) => {
  const chains = [goerli, mainnet];
  const providers = [publicProvider()];
  const connectors = [
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
  ];

  const [appState, setAppState] = useState({
    loggedIn: false,
  });
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {}, []);

  return (
    <StarknetConfig
      chains={chains}
      providers={providers}
      connectors={connectors}
      autoConnect
    >
      <AppContext.Provider
        value={{
          loading,
          setLoading,
          loadingText,
          setLoadingText,
          appState,
          setAppState,
        }}
      >
        <Toaster />
        {loading === true ? (
          <Loading />
        ) : (
          <>
            {/* <Navbar /> */}
            {children}

            {/* <Footer /> */}
          </>
        )}
      </AppContext.Provider>
    </StarknetConfig>
  );
};

export const useAppContext = () => useContext(AppContext);

import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { connect, disconnect } from "starknetkit";
import { WebWalletConnector } from "starknetkit/webwallet";

import Loading from "../components/loader/Loading";
import Navbar from "../components/Navbar";

const AppContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    loggedIn: false,
    address: null,
    provider: null,
    connection: null,
    userProfile: null,
  });
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const connectWallet = async () => {
    const connection = await connect();

    if (connection && connection.isConnected) {
      setAppState((prevState) => {
        return {
          ...prevState,
          loggedIn: true,
          address: connection.account,
          provider: connection.provider,
          connection,
        };
      });
      getUserAccount(connection.account.address);
    }

    console.log("connection", connection);
  };

  const disconnectWallet = async () => {
    await disconnect();

    setAppState((prevState) => {
      return {
        ...prevState,
        loggedIn: false,
        address: null,
        provider: null,
        connection: null,
      };
    });
  };

  const getUserAccount = async (walletAddress) => {
    try {
      const response = await axios.get(`${backendURL}/user/${walletAddress}`);
      console.log("response", response.data);
      setAppState((prevState) => {
        return {
          ...prevState,
          userProfile: response.data,
        };
      });
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        loadingText,
        setLoadingText,
        appState,
        setAppState,
        connectWallet,
        disconnectWallet,
      }}
    >
      <Toaster />
      {loading === true ? (
        <Loading />
      ) : (
        <div className="">
          <Navbar />
          {children}

          {/* <Footer /> */}
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

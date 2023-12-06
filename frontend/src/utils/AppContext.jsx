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
  });
  const [loading, setLoading] = useState(false);
  const backendURL = "http://localhost:3090";

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
      await getTokenData()
    }

    console.log("connection", connection);
  };

  const disconnectWallet = async () => {
    await disconnect();

    setAppState((prevState) => {
      return {
        ...prevState,
        loggedIn: false,
      };
    });
  };

  const getTokenData = async () => {
    try {
      const response = await axios.get(`${backendURL}/token/mile`);
      console.log("kaushik response", response.data);
      setAppState((prevState) => {
        return {
          ...prevState,
          currentSupply: response.data.token.currentSupply,
        };
      });
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const putTokenData = async (curSupply) => {
    try{
      const response = await axios.put(`${backendURL}/token/${curSupply}`);
      console.log("Response", response);
      await getTokenData();
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }

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
        appState,
        setAppState,
        connectWallet,
        disconnectWallet,
        getTokenData,
        putTokenData
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

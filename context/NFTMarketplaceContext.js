import React, { useState, useContext, useEffect } from "react";
import Web3Modal from "web3modal";
import { Contract, ContractFactory, ethers } from "ethers";
import Router from "next/router";
import { useRouter } from "next/router";
import axios from "axios";
import { create } from "ipfs-http-client";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Web3 from "web3";
import 'react-notifications/lib/notifications.css';
const GOERLI_RPC_URL = process.env.NEXT_PUBLIC_GOERLI_RPC_URL;
const PROJECTID = process.env.NEXT_PUBLIC_PROJECTID;
const PROJECTSECRETEKEY = process.env.NEXT_PUBLIC_PROJECTSECRETEKEY;
const SUBDOMAIN = process.env.NEXT_PUBLIC_SUBDOMAIN;
const etherscanApiKey = "GUPI8ECNNYMSV4EJTYASQH4SACT73V2966";
//To Upload Image to IPFS
const projectId = PROJECTID;
const projectSecretKey = PROJECTSECRETEKEY;
const auth = "Basic " + Buffer.from(projectId + ":" + projectSecretKey).toString("base64");
const subdomain = SUBDOMAIN;

const client = create({
  host: "ipfs.infura.io",
  //host: "ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

//INTERNAL IMPORT
import { NftMarketplaceAddress, NftMarketplaceABI } from "./constant";

// ----FETCHING OR GETTING SMART CONTRACT USING ETHERS.JS
const fetchContract = (signerorProvider) =>
  new ethers.Contract(NftMarketplaceAddress, NftMarketplaceABI, signerorProvider);

//----CONNECTING WITH SMART CONTRACT
const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

// Creating context to managing data
export const NFTMarketplaceContext = React.createContext();

//-----------------------------Sending data to all components---------------------------//
export const NFTMarketplaceProvider = ({ children }) => {
  //USE STATE
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [blockchain, setBlockchain] = useState(0);
  const router = useRouter();
  const [selected_category, setselectedCategory] = useState(true);
  // -----Check If Wallet Is Connected
  const checkWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return setOpenError(true), setError("Install MetaMask");
      //----CHECK IF THERE IS ANY ACCOUNT
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        setBlockchain(window.ethereum.networkVersion);
      } else {
        setError("No Account Found");
        setOpenError(true);
      }
    } catch (error) {
      console.log(`error is ${error}`);
      setError(`Error While Connecting Wallet`);
      setOpenError(true);
    }
  };

  // -----CONNECT WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return setOpenError(true), setError("Install MetaMask");
      //----REQUEST WALLET
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      setBlockchain(window.ethereum.networkVersion);
    } catch (error) {
      console.log(error);
      setError(`Error While Connecting Wallet`);
      setOpenError(true);
    }
  };

  // ----UPLOAD IMAGES TO IPFS
  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      // const url = `https://ipfs.io/ipfs/${added.path}`;

      console.log(`IPFS Image URL ${url}`);
      return url;
    } catch (error) {
      console.log("Error Uploading to IPFS", error);
      setError(`Error Uploading to IPFS`);
      setOpenError(true);
    }
  };

  // ----CREATE NFT & UPLOAD METADATA TO IPFS
  const createNFT = async (name, price, image, description, router, selectedCategory) => {
    if (!name || !description || !price || !image || !selectedCategory) return setOpenError(true), setError(`Missing Data`);

    //Convert data into JSON format
    const data = JSON.stringify({ name, description, image, selectedCategory });

    // ---Add data to IPFS
    try {
      const added = await client.add(data);
      const url = `${subdomain}/ipfs/${added.path}`;
      //const url = `https://ipfs.io/ipfs/${added.path}`;
      console.log("Meta Data URL", url);
      await createSale(url, price);
    } catch (error) {
      console.log(`Error to upload IPFS${error}`);
      setError(`Error to upload IPFS`);
      setOpenError(true);
    }
  };

  // ------INTERNAL FUNCTION TO CREATE NFT SALE
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const price = ethers.utils.parseUnits(formInputPrice, "ether");

      const contract = await connectingWithSmartContract();

      const listingPrice = await contract.getListingPrice();

      // --CREATE NFT
      const transaction = !isReselling
        ? await contract.createToken(url, price, {
          value: listingPrice.toString(),
        })
        : await contract.resellToken(id, price, {
          value: listingPrice.toString(),
        });

      await transaction.wait();
      router.push("/searchPage");
    } catch (error) {
      console.log(`Create sale error ${error}`);
      setError(`Create sale error`);
      setOpenError(true);
    }
  };

  //----makeoffer
  const make_offer = async (id, formInputPrice) => {
    try {
      const price = ethers.utils.parseUnits(formInputPrice, "ether");

      const contract = await connectingWithSmartContract();

      const gasLimit = 300000; // Manually specify the gas limit here

      const transaction = await contract.makeOffer(id, price, { gasLimit });

      await transaction.wait();
      router.push("/searchPage");
    } catch (error) {
      console.log(`make offer error: ${error}`);
      setError(`make offer error`);
      setOpenError(true);
    }
  };


  // ----FETCH ALL NFTs LISTED ON MARKETPLACE
  const fetchNFTS = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
      const contract = fetchContract(provider);

      const data = await contract.fetchMarketItem();
      const tokenURIs = await Promise.all(data.map(d => contract.tokenURI(d.tokenId)));

      const responses = await Promise.all(tokenURIs.map(uri => axios.get(uri)));

      const filteredData = data.filter((d, i) => {

        const { selectedCategory } = responses[i].data;

        const outsideCondition = true;

        return outsideCondition && selectedCategory != undefined;

      });
      console.log(filteredData.length);
      // --Resolve the promise
      const items = await Promise.all(
        filteredData.map(async ({ tokenId, seller, owner, price: unformattedPrice, selectedCategory }) => {
          const tokenURI = await contract.tokenURI(tokenId);
          // console.log("tokenURI", tokenURI);

          const {
            data: { image, name, description },
          } = await axios(tokenURI);
          // console.log(tokenURI);
          const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");
          // console.log(data.tokenId);
          return {
            price,
            tokenId: tokenId.toNumber(),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI,
            selectedCategory,

          };
        })
      );

      return items;
    } catch (error) {
      console.log(`Fectching NFT error${error}`);
      // setError(`Fectching NFT error`);
      // setOpenError(true);
    }
  };

  // ----FETCHING MY NFTs or MY LISTED NFTs
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      // console.log(type);
      const contract = await connectingWithSmartContract();
      const data = type == "fetchItemsListed" ? await contract.fetchItemListed() : await contract.fecthMyNFT();
      // console.log(data.length);
      const items = await Promise.all(
        data.map(async ({ tokenId, seller, owner, price: unformattedPrice, selectedCategory }) => {
          const tokenURI = await contract.tokenURI(tokenId);
          console.log(tokenURI);
          const {
            data: { image, name, description },
          } = await axios.get(tokenURI);
          const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");

          return {
            price,
            tokenId: tokenId.toNumber(),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI,
            selectedCategory,
          };
        })
      );
      return items;
    } catch (error) {
      console.log(`Error while fetchMyNFTorListedNFT ${error}`);
      setError(`Error while fetchMyNFTorListedNFT `);
      setOpenError(true);
    }
  };


  const fetchNFTSbycatogory = async (btntext_category) => {

    try {

      const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);

      const contract = fetchContract(provider);

      const data = await contract.fetchMarketItem();

      // Filter data based on category attribute in tokenURI

      const tokenURIs = await Promise.all(data.map(d => contract.tokenURI(d.tokenId)));

      const responses = await Promise.all(tokenURIs.map(uri => axios.get(uri)));

      const filteredData = data.filter((d, i) => {
        console.log(responses[i]);
        const { selectedCategory } = responses[i].data;

        const outsideCondition = true;

        return outsideCondition && selectedCategory == btntext_category;

      });

      // --Resolve the promise

      const items = await Promise.all(

        filteredData.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {

          const tokenURI = await contract.tokenURI(tokenId);

          // console.log(tokenURI)

          const {

            data: { image, name, description },

          } = await axios(tokenURI);

          console.log(name);

          const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");

          return {

            price,

            tokenId: tokenId.toNumber(),

            seller,

            owner,

            image,

            name,

            description,

            tokenURI,

          };



        })

      );




      return items;

    } 
    catch (error) {

      console.log(`Fectching NFT error${error}`);

      // setError(`Fectching NFT error`);
      // setOpenError(true);

    }

  };

  const fetchtransaction = async () => {
    try {
       const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${currentAccount}&apikey=${etherscanApiKey}`;
       const response = await axios.get(apiUrl);

      if (response.data.status === '1') {
        const transactions = response.data.result;
        return transactions;
      } 
      else {
        console.log('Error:', response.data.message);
      }
    } 
    catch (error) {
      console.log('Error:', error.message);
    }

    // if (typeof window.ethereum !== "undefined") {
    //   try {
    //     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    //     const web3 = new Web3(window.ethereum);
    //    // Fetch past events from the "Transfer" event
    //   // const events = await web3.eth.getPastEvents('Transfer', {
    //   // filter: { from: currentAccount },
    //   // fromBlock: 0,
    //   // toBlock: 'latest',
    //   //  });
    //   // console.log(response);
    //   const transactions = await web3.eth.getTransactions({ from: currentAccount });
    //   console.log(transactions);
    //    return transactions;
    //   } 
    //   catch (error) {
    //     console.error(error);
    //   }
    // }
  }




// ----BUY NFT FUNCTION
const buyNFT = async (nft) => {
  const contract = await connectingWithSmartContract();

  const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

  const transaction = await contract.createMarketSale(nft.tokenId, {
    value: price,
  });

  await transaction.wait();
  router.push("/author");

  try {
  } catch (error) {
    console.log(`Error buy NFT ${error}`);
    setError(`Error buy NFT`);
    setOpenError(true);
  }
};

// ----SetTheme
const setTheme = (data) => {
  document.body.classList.toggle(data);
};

return (
  <NFTMarketplaceContext.Provider
    value={{
      checkWalletIsConnected,
      connectWallet,
      uploadToIPFS,
      createNFT,
      createSale,
      fetchNFTS,
      fetchMyNFTsOrListedNFTs,
      fetchNFTSbycatogory,
      fetchtransaction,
      buyNFT,
      make_offer,
      setTheme,
      setOpenError,
      setError,
      currentAccount,
      blockchain,
      error,
      openError,
    }}
  >
    {children}
  </NFTMarketplaceContext.Provider>
);
};

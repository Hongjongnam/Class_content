import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-Contract";

/*
    web3
    ingToken
    saleToken
*/

const UseWeb3 = () => {
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [ingToken, setIngToken] = useState<Contract>();
  const [saleToken, setSaleToken] = useState<Contract>();

  const getWeb3 = () => {
    try {
      if (window.ethereum) {
        setWeb3(new Web3(window.ethereum as any));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getIngToken = (networkId: number) => {
    if (!web3) return;
    const IngTokenJSON = require("../contracts/IngToken.json");
    const abi: AbiItem = IngTokenJSON.abi;
    const ca: string = IngTokenJSON.networks[networkId].address;

    const instance = new web3.eth.Contract(abi, ca);
    setIngToken(instance);
  };

  const getSaleToken = (networkId: number) => {
    if (!web3) return;
    const saleTokenJSON = require("../contracts/SaleToken.json");
    const abi: AbiItem = saleTokenJSON.abi;
    const ca: string = saleTokenJSON.networks[networkId]?.address;

    const instance = new web3.eth.Contract(abi, ca);
    setSaleToken(instance);
  };

  useEffect(() => {
    getWeb3();
  }, []);

  useEffect(() => {
    (async () => {
      if (!web3) return;
      const networkId: number = await web3.eth.net.getId();
      getIngToken(networkId);
      getSaleToken(networkId);
    })();
  }, [web3]);

  return { web3, ingToken, saleToken };
};

export default UseWeb3;

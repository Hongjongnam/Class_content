import { useEffect, useState } from "react";

const UseAccount = () => {
  const [account, setAccount] = useState<string>("");

  const getAccount = async () => {
    try {
      if (!window.ethereum) throw new Error("errorrrr");
      //   let address = unknown | string;

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts && Array.isArray(accounts)) {
        setAccount(accounts[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getAccount();
  }, []);

  return { account };
};

export default UseAccount;

import { useState } from "react";
import TokenMetaData from "../interface/TokenMetaData.interface";
import axios from "axios";

const UseMetaData = () => {
  const [metadata, setMetadata] = useState<TokenMetaData | undefined>(
    undefined
  );

  // https://gateway.pinata.cloud/ipfs/QmPwjnvWYN4etA5eW4yAbWCTy2ukEC1Jj5417VLGyH5XpU/1/1.json
  const getMetadata = async (_uri: string) => {
    try {
      const response = await axios.get(
        "https://gateway.pinata.cloud/ipfs/QmPwjnvWYN4etA5eW4yAbWCTy2ukEC1Jj5417VLGyH5XpU/1/1.json"
      );
      setMetadata(response.data);

      return response.data;
    } catch (e) {
      console.error(e);
    }
  };

  return { metadata, getMetadata };
};

export default UseMetaData;

import { Box, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import UseMetaData from "../hooks/UseMetaData";
import TokenData from "../interface/Tokendata.interface";
import SaleInput from "./SaleInput";
import TokenCard from "./TokenCard";

interface MyTokenCardProps {
  TokenData: TokenData;
}

const MyTokenCard: FC<MyTokenCardProps> = ({ TokenData }) => {
  const { metadata, getMetadata } = UseMetaData();
  const [tokenPrice, setTokenPrice] = useState<string>(TokenData.price);

  useEffect(() => {
    getMetadata(TokenData.tokenId);
  }, []);

  return (
    <Box>
      <TokenCard metadata={metadata} />
      {tokenPrice === "0" ? (
        <SaleInput tokenId={TokenData.tokenId} setTokenPrice={setTokenPrice} />
      ) : (
        <Text>판매중</Text>
      )}
    </Box>
  );
};

export default MyTokenCard;

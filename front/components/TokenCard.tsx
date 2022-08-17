import { Box, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import TokenMetaData from "../interface/TokenMetaData.interface";

interface TokenCardProps {
  metadata: TokenMetaData | undefined;
}

const TokenCard: FC<TokenCardProps> = ({ metadata }) => {
  return (
    <Box w="200">
      <Image src={metadata?.image} />
      fallbackSrc="loadingImage.png" 이거넣을수있다 Image 태그안에
      <Text>{metadata?.name}</Text>
      <Text>{metadata?.description}</Text>
    </Box>
  );
};

export default TokenCard;

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import UseAccount from "../hooks/UseAccount";
import UseMetaData from "../hooks/UseMetaData";
import UseWeb3 from "../hooks/UseWeb3";
import TokenData from "../interface/Tokendata.interface";
import TokenCard from "./TokenCard";

interface MingtingModalProps {
  isOpen: boolean;
  onClose: () => void;
  getRemain: () => Promise<void>;
  getTokenTable: () => Promise<void>;
}

const MintingModal: FC<MingtingModalProps> = ({
  isOpen,
  onClose,
  getRemain,
}) => {
  const { account } = UseAccount();
  const { web3, ingToken, saleToken } = UseWeb3();
  const { metadata, getMetadata } = UseMetaData();
  // console.log("asdasd", metadata);

  const handleClick = async () => {
    try {
      if (!account || !web3 || !ingToken || !saleToken) return;
      const response = await ingToken.methods.mintToken().send({
        from: account,
        value: web3.utils.toWei("1", "ether"),
      });
      // console.log("asdasd", response.status);
      if (response.status) {
        const lastestToken: TokenData = await saleToken.methods
          .getLatestToken(account)
          .call();

        const tokenURI: string = await ingToken.methods
          .tokenURI(lastestToken.tokenId)
          .call();
        // console.log(tokenURI);

        getMetadata(tokenURI);
        getRemain();
        // getTokenTable();
        // https://gateway.pinata.cloud/ipfs/QmPwjnvWYN4etA5eW4yAbWCTy2ukEC1Jj5417VLGyH5XpU/1/1.json

        // 내가 민팅한 내역을 볼 수 있게
        // 내가 가지고 있는 토큰중에 최신토큰
        // console.log("민팅 잘됐음~ 밑에는 call 잘된지 확인");
        const tokenId: string = await ingToken.methods.totalSupply().call();
        console.log("call 됐나", tokenId);
        // const info = await ingToken.methods.tokenDatas(tokenId).call();
        const info = await ingToken.methods.getTokenType(tokenId).call();
        // console.log("뭐야이건", info);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Minting</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {metadata ? (
              <TokenCard metadata={metadata}></TokenCard>
            ) : (
              <Text>Minting시 1Eth가 소모됩니다.</Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              bg="black"
              colorScheme="black"
              mr={3}
              color="white"
              onClick={handleClick}
            >
              <Text>Continue</Text>
            </Button>

            <Button colorScheme="yellow" mr={3} onClick={onClose}>
              <Text>Close</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MintingModal;

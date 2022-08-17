import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import MintingModal from "../components/MintingModal";
import UseAccount from "../hooks/UseAccount";
import UseWeb3 from "../hooks/UseWeb3";

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account } = UseAccount();
  const { web3, ingToken, saleToken } = UseWeb3();
  const [remain, setRemain] = useState<number>(0);
  const [tokenTable, setTokenTable] = useState<string[][] | undefined>(
    undefined
  );

  const getTokenTable = async () => {
    try {
      if (!ingToken) return;
      const response = await ingToken.methods.getTokenCount().call();

      setTokenTable(response);
    } catch (e) {
      console.error(e);
    }
  };

  const getRemain = async () => {
    try {
      if (!ingToken) return;

      const [totalSupply, MAX_TOKEN_COUNT] = await Promise.all([
        ingToken.methods.totalSupply().call(),
        ingToken.methods.MAX_TOKEN_COUNT().call(),
      ]);

      setRemain(parseInt(MAX_TOKEN_COUNT) - parseInt(totalSupply));
    } catch (e) {
      console.error();
    }
  };

  useEffect(() => {
    getRemain();
    getTokenTable();
  }, [ingToken]);

  return (
    <>
      <Flex
        bg="mistyrose"
        minH="100vh"
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Td>Rank / Type</Td>
                <Td>1</Td>
                <Td>2</Td>
                <Td>3</Td>
                <Td>4</Td>
              </Tr>
            </Thead>
            <Tbody>
              {tokenTable?.map((v, i) => {
                return (
                  <>
                    <Tr>
                      <Td key={i}>{i + 1}</Td>
                      {v.map((j, w) => {
                        return <Td key={w}>{j}</Td>;
                      })}
                    </Tr>
                  </>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Text mb={4}>남은 NFT 갯수 : {remain}</Text>
        <Button colorScheme="yellow" onClick={onOpen}>
          <Text>Minting</Text>
        </Button>
      </Flex>
      <MintingModal
        isOpen={isOpen}
        onClose={onClose}
        getRemain={getRemain}
        getTokenTable={getTokenTable}
      />
    </>
  );
};

export default Home;

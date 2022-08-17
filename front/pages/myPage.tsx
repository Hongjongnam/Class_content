import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import MyTokenCard from "../components/MyTokenCard";
import UseAccount from "../hooks/UseAccount";
import UseWeb3 from "../hooks/UseWeb3";
import TokenData from "../interface/Tokendata.interface";

const myPage: FC = () => {
  const [approveStatus, setApproveStatus] = useState<boolean>(false);
  const [myTokens, setMytokens] = useState<TokenData[] | undefined>(undefined);
  const { account } = UseAccount();
  const { ingToken, saleToken } = UseWeb3();

  const getApproveStatus = async () => {
    try {
      if (!account || !ingToken || !saleToken) return;

      const response = await ingToken.methods
        .isApprovedForAll(account, (saleToken as any)._address)
        .call();

      setApproveStatus(response);
    } catch (e) {
      console.error(e);
    }
  };

  const getMyTokens = async () => {
    try {
      if (!account || !saleToken) return;

      const response = await saleToken.methods.getOwnerTokens(account).call();
      setMytokens(response);
      // console.log("이거봐", response);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = async () => {
    try {
      if (!account || !ingToken || saleToken) return;

      const response = await ingToken.methods
        .setApprovedForAll((saleToken as any)._address, !approveStatus)
        .send({
          from: account,
        });

      if (response.status) {
        setApproveStatus((prev) => !prev);
        // 상태값 바꿔주는거래 prev가
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getApproveStatus();
    getMyTokens();
  }, [account, ingToken, saleToken]);

  return (
    <>
      <Box py="12" px="12" bg="blue.100" minH="100vh">
        <Box py={4} textAlign="center">
          <Text>Approved : {approveStatus ? "True" : "False"}</Text>
          <Button
            size="xs"
            ml="2"
            colorScheme={approveStatus ? "red" : "green"}
            onClick={handleClick}
          >
            {approveStatus ? "취소" : "승인"}
          </Button>
        </Box>
        Mypage
        <Flex wrap="wrap" justifyContent="space-between">
          {myTokens?.map((v) => {
            return <MyTokenCard key={v.tokenId} TokenData={v} />;
          })}
        </Flex>
      </Box>
    </>
  );
};

export default myPage;

import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import UseAccount from "../hooks/UseAccount";

const Header: FC = () => {
  const { account } = UseAccount();

  return (
    <Flex
      position="fixed"
      w="full"
      bg="yellow.100"
      justifyContent="space-between"
      px="12"
      py="2"
    >
      <Box>Logo</Box>
      <Box>
        <Link href="/">
          <Button size="sm" variant="ghost">
            home
          </Button>
        </Link>
        <Link href="/myPage">
          <Button size="sm" variant="ghost">
            나의 NFT
          </Button>
        </Link>
      </Box>
      <Box>Account : {account}</Box>
    </Flex>
  );
};

export default Header;

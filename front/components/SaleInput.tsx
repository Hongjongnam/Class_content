import { Button, Input, InputGroup } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import UseAccount from "../hooks/UseAccount";
import UseWeb3 from "../hooks/UseWeb3";

interface SaleInputProps {
  tokenId: string;
  setTokenPrice: Dispatch<SetStateAction<string>>;
}

const SaleInput: FC<SaleInputProps> = ({ tokenId, setTokenPrice }) => {
  const [price, setPrice] = useState<string>("0");
  const { account } = UseAccount();
  const { web3, saleToken } = UseWeb3();

  const handleClick = async () => {
    try {
      if (!account || !web3 || !saleToken) return;

      const ETH_price = web3.utils.toWei(price, "ether");
      const response = await saleToken.methods
        .SalesToken(tokenId, ETH_price)
        .send({
          from: account,
        });

      if (response.status) {
        setTokenPrice(ETH_price);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <InputGroup>
        <Input
          type="number"
          value={price}
          bg="white"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </InputGroup>
      <Button size="xs" colorScheme="green" onClick={handleClick}>
        판매가능
      </Button>
    </>
  );
};

export default SaleInput;

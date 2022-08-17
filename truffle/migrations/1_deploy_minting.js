const IngToken = artifacts.require("IngToken");
const SaleToken = artifacts.require("SaleToken");

module.exports = async (deployer) => {
  await deployer.deploy(IngToken, "IngToken", "ITK", "http://localhost:3500");
  const IngTokenInstance = await IngToken.deployed();

  await deployer.deploy(SaleToken, IngTokenInstance.address);
};

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  console.log(`Deploying StudySchedule to ${network.name} with account:`, deployer);

  const deployment = await deploy("StudySchedule", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.name === "hardhat" ? 1 : 5,
  });

  console.log("StudySchedule deployed to:", deployment.address);
  console.log("Deployment transaction:", deployment.transactionHash);

  // Verify contract on Etherscan if not on local network
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: deployment.address,
        constructorArguments: [],
      });
      console.log("Contract verified successfully");
    } catch (error) {
      console.log("Contract verification failed:", error);
    }
  }
};

export default func;
func.tags = ["StudySchedule", "all"];